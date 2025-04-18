
import { Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface RecentDashboardProps {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  lastViewed: Date;
  className?: string;
}

export function RecentDashboard({
  id,
  title,
  description,
  thumbnailUrl,
  lastViewed,
  className,
}: RecentDashboardProps) {
  return (
    <Link to={`/dashboard/${id}`}>
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all duration-200 hover:shadow-md flex flex-col",
          className
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-lightBlue/20 to-brand-lightTeal/20">
              <span className="text-brand-blue font-medium">{title.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>{format(lastViewed, "MMM d")}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary hover:underline">
            <span>View</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
