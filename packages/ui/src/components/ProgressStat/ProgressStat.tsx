import * as React from "react";
import { cn } from "../../utils";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);

export interface ProgressStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  height?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive" | "info";
  label?: string;
  tooltip?: string;
}

/**
 * Barra de progresso simples com label e tooltip opcional.
 */
export const ProgressStat = React.forwardRef<HTMLDivElement, ProgressStatProps>(
  ({ value = 0, height = "6px", variant = "primary", label, tooltip, className, ...props }, ref) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        <div className="flex items-center justify-between text-sm font-semibold">
          {label ? <span>{label}</span> : <span />}
          <span
            className={cn(
              variant === "destructive"
                ? "text-destructive"
                : variant === "warning"
                  ? "text-warning"
                  : variant === "success"
                    ? "text-success"
                    : variant === "info"
                      ? "text-info"
                      : "text-primary"
            )}
            title={tooltip}
          >
            {formatNumber(safeValue)}%
          </span>
        </div>
        <div className="bg-muted rounded-full" role="progressbar" aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}>
          <div
            className={cn(
              "rounded-full transition-all",
              variant === "destructive"
                ? "bg-destructive"
                : variant === "warning"
                  ? "bg-warning"
                  : variant === "success"
                    ? "bg-success"
                    : variant === "info"
                      ? "bg-info"
                      : variant === "secondary"
                        ? "bg-secondary"
                        : "bg-primary"
            )}
            style={{ height, width: `${safeValue}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressStat.displayName = "ProgressStat";

export default ProgressStat;
