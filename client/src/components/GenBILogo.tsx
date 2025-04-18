
import { BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenBILogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function GenBILogo({ className, iconOnly = false }: GenBILogoProps) {
  return (
    <div className={cn("flex items-center gap-2 font-semibold", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-sm">
        <BarChart2 className="h-5 w-5" />
      </div>
      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight">
          Gen<span className="text-brand-blue">BI</span>
        </span>
      )}
    </div>
  );
}
