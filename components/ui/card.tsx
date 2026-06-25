import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = true, glass = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-border p-6 transition-all duration-300",
          glass && "glass-card",
          hover && "hover:-translate-y-0.5",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("mb-4", className)} {...props} />;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("font-display text-xl", className)}
      {...props}
    />
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn(className)} {...props} />;
}
