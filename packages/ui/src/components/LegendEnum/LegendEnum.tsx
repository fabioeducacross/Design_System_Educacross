import * as React from "react";
import { cn } from "../../utils";

export interface LegendEnumValue {
  text: string;
  legend?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive" | "info";
}

export interface LegendEnumGroup {
  text?: string;
  enum: LegendEnumValue[];
}

export interface LegendEnumProps extends React.HTMLAttributes<HTMLDivElement> {
  legends: LegendEnumGroup[];
  cardClassName?: string;
  showBorder?: boolean;
  renderValue?: (value: LegendEnumValue) => React.ReactNode;
}

const badgeClass = (variant?: LegendEnumValue["variant"]) => {
  switch (variant) {
    case "destructive":
      return "bg-destructive/15 text-destructive border-destructive/30";
    case "warning":
      return "bg-warning/15 text-warning border-warning/30";
    case "success":
      return "bg-success/15 text-success border-success/30";
    case "info":
      return "bg-info/15 text-info border-info/30";
    case "secondary":
      return "bg-secondary/15 text-secondary border-secondary/30";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

/**
 * Lista de legendas enumeradas, com badges e texto opcional.
 */
export const LegendEnum = React.forwardRef<HTMLDivElement, LegendEnumProps>(
  ({ legends, cardClassName, showBorder = false, renderValue, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-card text-card-foreground",
          showBorder ? "border border-border shadow-none" : "shadow-sm",
          cardClassName,
          className
        )}
        {...props}
      >
        {legends.map((legend, legendIndex) => (
          <React.Fragment key={`legend-${legendIndex}`}>
            <div className={cn("p-4 text-sm", legendIndex === 0 ? "pt-4" : "pt-2")}> 
              <div className="flex flex-wrap items-center justify-center gap-2">
                {legend.text ? <div className="font-medium text-center">{legend.text}:</div> : null}
                {legend.enum.map((item, itemIndex) => (
                  <div key={`legend-${legendIndex}-item-${itemIndex}`} className="flex flex-col items-center gap-1 text-center">
                    {renderValue ? (
                      renderValue(item)
                    ) : (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold",
                          badgeClass(item.variant)
                        )}
                      >
                        {item.text}
                      </span>
                    )}
                    {item.legend ? (
                      <span className="text-muted-foreground text-xs" dangerouslySetInnerHTML={{ __html: item.legend }} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            {legendIndex < legends.length - 1 ? <hr className="border-border" /> : null}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

LegendEnum.displayName = "LegendEnum";

export default LegendEnum;
