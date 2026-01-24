import * as React from "react";
import { cn } from "../../utils";

export type RangeProgressColor = {
  max: number;
  variant: "destructive" | "warning" | "success";
};

const defaultRanges: RangeProgressColor[] = [
  { max: 40, variant: "destructive" },
  { max: 70, variant: "warning" },
  { max: 100, variant: "success" },
];

export interface RangeProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  suffix?: string;
  ranges?: RangeProgressColor[];
  showBottomValue?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const pickRange = (value: number, ranges: RangeProgressColor[]) => {
  const normalized = Math.max(0, Math.min(100, value));
  const found = ranges.find(range => normalized <= range.max);
  return found ?? ranges[ranges.length - 1];
};

/**
 * Barra de progresso com cores dinâmicas por faixa.
 */
export const RangeProgressBar = React.forwardRef<HTMLDivElement, RangeProgressBarProps>(
  (
    {
      value,
      label,
      suffix = "",
      ranges = defaultRanges,
      showBottomValue = false,
      containerClassName,
      labelClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
    const current = React.useMemo(() => pickRange(safeValue, ranges), [ranges, safeValue]);
    const textClass = current.variant === "warning" ? "text-warning" : current.variant === "destructive" ? "text-destructive" : "text-success";
    const bgClass = current.variant === "warning" ? "bg-warning/15" : current.variant === "destructive" ? "bg-destructive/15" : "bg-success/15";
    const barClass = current.variant === "warning" ? "bg-warning" : current.variant === "destructive" ? "bg-destructive" : "bg-success";

    const formatted = `${safeValue.toFixed(0)}${suffix}`;

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className={cn("flex items-center justify-between", containerClassName)}>
          {label ? (
            <span className={cn("font-semibold text-sm", labelClassName)}>{label}</span>
          ) : null}
          {!showBottomValue ? (
            <span className={cn("font-semibold text-sm", textClass)}>{formatted}</span>
          ) : null}
        </div>

        <div className={cn("rounded-lg", bgClass)}>
          <div
            className={cn("h-1.5 rounded-lg transition-all", barClass)}
            style={{ width: `${safeValue}%` }}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={safeValue}
            role="progressbar"
          />
        </div>

        {showBottomValue ? (
          <div className={cn("font-semibold text-sm", textClass)}>{formatted}</div>
        ) : null}

        {suffix ? <div className="text-muted-foreground text-xs">{suffix}</div> : null}

        {children}
      </div>
    );
  }
);

RangeProgressBar.displayName = "RangeProgressBar";

export default RangeProgressBar;
