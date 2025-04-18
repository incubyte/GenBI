
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Layers } from "lucide-react";

export type ChartType = "bar" | "line" | "pie" | "table" | "custom";

interface DashboardCardProps {
  title: string;
  description?: string;
  chartType?: ChartType;
  isInteractive?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  footer?: ReactNode;
}

export function DashboardCard({
  title,
  description,
  chartType = "custom",
  isInteractive = true,
  children,
  className,
  onClick,
  footer,
}: DashboardCardProps) {
  const ChartIcon = {
    bar: BarChart,
    line: LineChart,
    pie: PieChart,
    table: Layers,
    custom: Layers,
  }[chartType];

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200",
        isInteractive && "hover:shadow-md cursor-pointer",
        className
      )}
      onClick={isInteractive ? onClick : undefined}
    >
      <CardHeader className="p-4 pb-0 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ChartIcon className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{title}</h3>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
      {footer && <CardFooter className="p-4 pt-0">{footer}</CardFooter>}
    </Card>
  );
}
