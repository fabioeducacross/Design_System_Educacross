import * as React from "react";
import { cn } from "../../utils";

export interface RainbowProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  showLegend?: boolean;
  legend?: React.ReactNode;
}

/**
 * Barra gradiente com marcador triangular, inspirada em `RainbowProgressBar.vue`.
 */
export const RainbowProgressBar = React.forwardRef<HTMLDivElement, RainbowProgressBarProps>(
  ({ value = 0, legend, showLegend = true, className, ...props }, ref) => {
    const safeValue = React.useMemo(() => {
      if (!Number.isFinite(value)) return 0;
      return Math.max(0, Math.min(100, value));
    }, [value]);

    const triangleStyle: React.CSSProperties = React.useMemo(() => {
      let offset = 0;
      if (safeValue < 4) offset = 4;
      else if (safeValue > 96) offset = -4;

      return {
        clipPath: `polygon(
          calc(${safeValue}% + ${offset}px) 0%,
          calc(${safeValue}% + ${offset - 4}px) 100%,
          calc(${safeValue}% + ${offset + 4}px) 100%
        )`,
      };
    }, [safeValue]);

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
        <div className="h-1.5 rounded bg-gradient-to-r from-destructive via-warning to-success" />
        <div
          className="relative h-2 bg-gradient-to-r from-destructive via-warning to-success rounded"
          style={triangleStyle}
        />
        {showLegend ? legend ?? null : null}
      </div>
    );
  }
);

RainbowProgressBar.displayName = "RainbowProgressBar";

export default RainbowProgressBar;
