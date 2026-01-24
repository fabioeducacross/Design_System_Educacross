import * as React from "react";
import { cn } from "../../utils";

export interface LegendCardItem {
  icon?: React.ReactNode;
  title: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive" | "info";
}

export interface LegendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LegendCardItem[];
  active?: number | null;
  tooltipActiveText?: string;
  renderContent?: (item: LegendCardItem, index: number) => React.ReactNode;
}

/**
 * Cards de legenda que destacam o item ativo (maior percentual).
 */
export const LegendCard = React.forwardRef<HTMLDivElement, LegendCardProps>(
  ({ items, active = null, tooltipActiveText = "Maior percentual de alunos nesta faixa de proficiência.", renderContent, className, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("flex flex-col md:flex-row gap-2", className)} {...props}>
        {items.map((item, index) => {
          const isActive = active === index;
          const variant = item.variant ?? "primary";
          const border = isActive ? `border-${variant} shadow-${variant}` : "border-border";

          return (
            <div
              key={`${index}-${String(item.title)}`}
              className={cn(
                "relative flex-1 rounded-lg border bg-card text-card-foreground p-4 transition-shadow",
                border
              )}
              title={isActive ? tooltipActiveText : undefined}
            >
              {isActive ? (
                <span className={cn("material-symbols-outlined absolute right-2 top-2 text-xs", `text-${variant}`)}>
                  info
                </span>
              ) : null}
              <div className="text-center mb-2 space-y-2">
                {item.icon}
                <div className="font-semibold text-base">{item.title}</div>
              </div>
              {renderContent ? renderContent(item, index) : null}
            </div>
          );
        })}
      </section>
    );
  }
);

LegendCard.displayName = "LegendCard";

export default LegendCard;
