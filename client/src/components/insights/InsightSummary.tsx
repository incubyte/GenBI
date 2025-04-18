
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lightbulb, TrendingDown, TrendingUp, BarChart } from "lucide-react";

interface InsightProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Insight({
  title,
  description,
  icon = <Lightbulb className="h-5 w-5 text-amber-500" />,
  className,
}: InsightProps) {
  return (
    <div className={cn("flex items-start gap-3 p-3", className)}>
      <div className="mt-0.5">{icon}</div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface InsightSummaryProps {
  query: string;
  insights: {
    title: string;
    description: string;
    type?: "info" | "positive" | "negative" | "neutral";
  }[];
  className?: string;
}

export function InsightSummary({
  query,
  insights,
  className,
}: InsightSummaryProps) {
  const getIcon = (type: string = "info") => {
    switch (type) {
      case "positive":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "negative":
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case "neutral":
        return <BarChart className="h-5 w-5 text-brand-blue" />;
      default:
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium">AI-Generated Insights</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on your query: "{query}"
        </p>
      </CardHeader>
      <CardContent className="grid gap-1">
        {insights.map((insight, index) => (
          <Insight
            key={index}
            title={insight.title}
            description={insight.description}
            icon={getIcon(insight.type)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
