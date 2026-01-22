
import { Database, CheckCircle, AlertCircle, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useExtractSchema, useDataSourceSchema } from "@/hooks/useDataSources";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  // Convert headers
  let html = markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^###### (.+)$/gm, '<h6>$1</h6>');

  // Convert tables
  html = html.replace(/\|(.+)\|\n\|[-:|\s]+\|\n((\|.+\|\n)+)/g, (match) => {
    const lines = match.split('\n');
    const headers = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => `<th>${cell.trim()}</th>`).join('');
    const rows = lines.slice(2, -1).map(line => {
      const cells = line.split('|').filter(cell => cell.trim() !== '').map(cell => `<td>${cell.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Convert bold and italic
  html = html
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert lists
  html = html
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>');

  // Convert paragraphs (must be done last)
  html = html
    .replace(/^([^<\n].+)$/gm, '<p>$1</p>')
    .replace(/\n\n/g, '<br>');

  return html;
}

export type DataSourceStatus = "connected" | "connecting" | "disconnected" | "error";

interface DataSourceCardProps {
  id: string;
  name: string;
  type: string;
  status: DataSourceStatus;
  lastSync?: Date;
  recordCount?: number;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DataSourceCard({
  id,
  name,
  type,
  status,
  lastSync,
  recordCount,
  icon = <Database className="h-5 w-5" />,
  className,
  onClick,
}: Readonly<DataSourceCardProps>) {
  const [schemaDialogOpen, setSchemaDialogOpen] = useState(false);
  const extractSchema = useExtractSchema(id);
  const { data: schema, isLoading: isLoadingSchema } = useDataSourceSchema(id);

  const handleSchemaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSchemaDialogOpen(true);
    if (!schema) {
      extractSchema.mutate();
    }
  };
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{type}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {lastSync && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">Last Sync</p>
              <p>{lastSync.toLocaleDateString()}</p>
            </div>
          )}
          {recordCount !== undefined && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">Records</p>
              <p>{recordCount.toLocaleString()}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {status === "connected" ? (
            <>
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Syncing normally</span>
            </>
          ) : status === "connecting" ? (
            <>
              <Loader2 className="h-3 w-3 text-blue-500 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : status === "error" ? (
            <>
              <AlertCircle className="h-3 w-3 text-red-500" />
              <span>Connection error</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3 text-amber-500" />
              <span>Disconnected</span>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleSchemaClick}
        >
          <FileText className="h-4 w-4" />
        </Button>
      </CardFooter>

      <Dialog open={schemaDialogOpen} onOpenChange={setSchemaDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Database Schema: {name}</DialogTitle>
            <DialogDescription>
              Schema information for {type} data source
            </DialogDescription>
          </DialogHeader>

          {isLoadingSchema || extractSchema.isPending ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                {extractSchema.isPending ? "Extracting schema..." : "Loading schema..."}
              </p>
            </div>
          ) : schema ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(schema.schemaMarkdown) }} />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No schema information available.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => extractSchema.mutate()}
              >
                Extract Schema
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function StatusBadge({ status }: Readonly<{ status: DataSourceStatus }>) {
  if (status === "connected") {
    return (
      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
        Connected
      </Badge>
    );
  }
  if (status === "error") {
    return (
      <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
        Error
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
      Disconnected
    </Badge>
  );
}
