
import { Database, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type DataSourceStatus = "connected" | "disconnected" | "error";

interface DataSourceCardProps {
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
  name,
  type,
  status,
  lastSync,
  recordCount,
  icon = <Database className="h-5 w-5" />,
  className,
  onClick,
}: DataSourceCardProps) {
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
      
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {status === "connected" ? (
            <>
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Syncing normally</span>
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
      </CardFooter>
    </Card>
  );
}

function StatusBadge({ status }: { status: DataSourceStatus }) {
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
