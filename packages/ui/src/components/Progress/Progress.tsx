import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const progressVariants = cva(["relative overflow-hidden"], {
  variants: {
    variant: {
      linear: "w-full rounded-full bg-secondary",
      circular: "inline-flex items-center justify-center",
      stepped: "flex items-center gap-2",
      radial: "inline-flex items-center justify-center relative",
      animated: "inline-flex items-center justify-center font-mono font-semibold",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  compoundVariants: [
    // Linear sizes
    { variant: "linear", size: "sm", className: "h-1" },
    { variant: "linear", size: "default", className: "h-2" },
    { variant: "linear", size: "lg", className: "h-3" },
    // Circular sizes
    { variant: "circular", size: "sm", className: "h-12 w-12" },
    { variant: "circular", size: "default", className: "h-16 w-16" },
    { variant: "circular", size: "lg", className: "h-24 w-24" },
    // Radial sizes
    { variant: "radial", size: "sm", className: "h-16 w-16" },
    { variant: "radial", size: "default", className: "h-24 w-24" },
    { variant: "radial", size: "lg", className: "h-32 w-32" },
    // Animated sizes
    { variant: "animated", size: "sm", className: "text-2xl" },
    { variant: "animated", size: "default", className: "text-4xl" },
    { variant: "animated", size: "lg", className: "text-6xl" },
  ],
  defaultVariants: {
    variant: "linear",
    size: "default",
  },
});

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof progressVariants> {
  /**
   * Valor atual do progresso (0-100)
   */
  value?: number;
  /**
   * Valor máximo (padrão 100)
   */
  max?: number;
  /**
   * Mostrar label com percentual
   */
  showLabel?: boolean;
  /**
   * Estado indeterminado (animação contínua)
   */
  indeterminate?: boolean;
  /**
   * Cor do progresso (usa tokens CSS)
   */
  color?: "primary" | "success" | "warning" | "destructive";
  /**
   * Número de passos (apenas para variant="stepped")
   */
  steps?: number;
  /**
   * Passo atual (apenas para variant="stepped", 1-indexed)
   */
  currentStep?: number;
  /**
   * Duração da animação em ms (apenas para variant="animated")
   */
  duration?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      max = 100,
      showLabel = false,
      indeterminate = false,
      color = "primary",
      steps = 4,
      currentStep = 1,
      duration = 2000,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const [animatedValue, setAnimatedValue] = React.useState(0);

    // Animated variant - count up effect
    React.useEffect(() => {
      if (variant === "animated") {
        const increment = value / (duration / 16); // 60 FPS
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setAnimatedValue(value);
            clearInterval(timer);
          } else {
            setAnimatedValue(Math.floor(current));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [variant, value, duration]);

    const colorClasses = {
      primary: "bg-primary",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      destructive: "bg-destructive",
    };

    // Linear Progress
    if (variant === "linear") {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={indeterminate ? "Loading..." : `${percentage.toFixed(0)}%`}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              colorClasses[color],
              indeterminate && "animate-pulse"
            )}
            style={{ width: indeterminate ? "100%" : `${percentage}%` }}
          />
          {showLabel && !indeterminate && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      );
    }

    // Circular Progress
    if (variant === "circular") {
      const strokeWidth = size === "sm" ? 3 : size === "lg" ? 5 : 4;
      const radius = size === "sm" ? 20 : size === "lg" ? 44 : 28;
      const circumference = 2 * Math.PI * radius;
      const offset = indeterminate ? 0 : circumference - (percentage / 100) * circumference;

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              className="text-secondary"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50%"
              cy="50%"
            />
            <circle
              className={cn("transition-all duration-300", indeterminate && "animate-spin")}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="hsl(var(--primary))"
              fill="transparent"
              r={radius}
              cx="50%"
              cy="50%"
            />
          </svg>
          {showLabel && !indeterminate && (
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      );
    }

    // Stepped Progress
    if (variant === "stepped") {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps}
          aria-valuenow={currentStep}
          className={cn(progressVariants({ variant, size }), "w-full", className)}
          {...props}
        >
          {Array.from({ length: steps }, (_, i) => i + 1).map((step) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium transition-colors",
                    step <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background text-muted-foreground"
                  )}
                >
                  {step}
                </div>
                {showLabel && (
                  <span className="text-xs text-muted-foreground">Passo {step}</span>
                )}
              </div>
              {step < steps && (
                <div
                  className={cn(
                    "h-0.5 flex-1 transition-colors",
                    step < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    // Radial Progress
    if (variant === "radial") {
      const strokeWidth = size === "sm" ? 4 : size === "lg" ? 8 : 6;
      const radius = size === "sm" ? 28 : size === "lg" ? 60 : 44;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percentage / 100) * circumference;

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              className="text-secondary"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50%"
              cy="50%"
            />
            <circle
              className="transition-all duration-500"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="hsl(var(--primary))"
              fill="transparent"
              r={radius}
              cx="50%"
              cy="50%"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))",
              }}
            />
          </svg>
          {showLabel && (
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      );
    }

    // Animated Progress (number count-up)
    if (variant === "animated") {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={`${animatedValue} de ${max}`}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <span className="tabular-nums">{animatedValue}</span>
          {showLabel && <span className="ml-1 text-base text-muted-foreground">/ {max}</span>}
        </div>
      );
    }

    return null;
  }
);

Progress.displayName = "Progress";

export { Progress, progressVariants };
