import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "secondary" | "accent" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-secondary/10 text-secondary border border-secondary/20",
  accent: "bg-accent/10 text-accent border border-accent/20",
  outline: "border border-border text-muted-foreground",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium font-mono tracking-wide",
        badgeStyles[variant],
        className
      )}
      {...props}
    />
  );
}
