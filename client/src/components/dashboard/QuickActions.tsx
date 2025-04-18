
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuickActionProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export function QuickAction({
  icon,
  label,
  onClick,
  variant = "outline",
  className,
}: QuickActionProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn("flex items-center gap-2", className)}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}

interface QuickActionsProps {
  className?: string;
  children: ReactNode;
}

export function QuickActions({ className, children }: QuickActionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {children}
    </div>
  );
}
