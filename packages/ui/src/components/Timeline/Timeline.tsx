import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const timelineVariants = cva(["flex"], {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-start",
      alternating: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const timelineItemVariants = cva(["relative flex gap-4"], {
  variants: {
    orientation: {
      vertical: "flex-row pb-8 last:pb-0",
      horizontal: "flex-col items-center pr-8 last:pr-0",
      alternating: "pb-8 last:pb-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const timelineIconVariants = cva(
  ["relative z-10 flex items-center justify-center rounded-full border-2 bg-background"],
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs",
        default: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
      },
      status: {
        default: "border-muted text-muted-foreground",
        active: "border-primary bg-primary text-primary-foreground",
        success: "border-green-500 bg-green-500 text-white",
        warning: "border-yellow-500 bg-yellow-500 text-white",
        error: "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      status: "default",
    },
  }
);

const timelineConnectorVariants = cva(["absolute bg-border"], {
  variants: {
    orientation: {
      vertical: "left-4 top-8 h-[calc(100%-2rem)] w-px -translate-x-1/2",
      horizontal: "left-8 top-4 h-px w-[calc(100%-2rem)] -translate-y-1/2",
      alternating: "left-4 top-8 h-[calc(100%-2rem)] w-px -translate-x-1/2",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface TimelineItemData {
  /**
   * Ícone ou texto dentro do círculo
   */
  icon?: React.ReactNode;
  /**
   * Título do item
   */
  title: string;
  /**
   * Descrição ou conteúdo
   */
  description?: React.ReactNode;
  /**
   * Data/hora (opcional)
   */
  timestamp?: string;
  /**
   * Status visual do item
   */
  status?: "default" | "active" | "success" | "warning" | "error";
}

export interface TimelineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof timelineVariants> {
  /**
   * Array de itens da timeline
   */
  items: TimelineItemData[];
  /**
   * Tamanho dos ícones
   */
  size?: "sm" | "default" | "lg";
  /**
   * Mostrar conectores entre itens
   */
  showConnectors?: boolean;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      orientation = "vertical",
      items,
      size = "default",
      showConnectors = true,
      ...props
    },
    ref
  ) => {
    const isAlternating = orientation === "alternating";

    return (
      <div
        ref={ref}
        role="list"
        aria-label="Timeline"
        className={cn(timelineVariants({ orientation: isAlternating ? "vertical" : orientation }), className)}
        {...props}
      >
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const shouldFlip = isAlternating && !isEven;

          return (
            <div
              key={index}
              role="listitem"
              className={cn(
                timelineItemVariants({ orientation: isAlternating ? "vertical" : orientation }),
                shouldFlip && "flex-row-reverse text-right"
              )}
            >
              {/* Connector */}
              {showConnectors && index < items.length - 1 && (
                <div
                  className={cn(
                    timelineConnectorVariants({ orientation: isAlternating ? "vertical" : orientation })
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Icon Circle */}
              <div
                className={cn(
                  timelineIconVariants({ size, status: item.status || "default" })
                )}
                aria-label={item.status || "timeline item"}
              >
                {item.icon || (index + 1)}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold leading-none">{item.title}</h4>
                  {item.timestamp && (
                    <time className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.timestamp}
                    </time>
                  )}
                </div>
                {item.description && (
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";

export { Timeline, timelineVariants };
