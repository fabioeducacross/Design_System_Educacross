import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const dividerVariants = cva(["bg-border"], {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    thickness: {
      thin: "",
      medium: "",
      thick: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      thickness: "medium",
      className: "h-0.5",
    },
    {
      orientation: "horizontal",
      thickness: "thick",
      className: "h-1",
    },
    {
      orientation: "vertical",
      thickness: "medium",
      className: "w-0.5",
    },
    {
      orientation: "vertical",
      thickness: "thick",
      className: "w-1",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    thickness: "thin",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {
  /**
   * Text to display in the center of the divider
   */
  text?: string;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation, thickness, text, ...props }, ref) => {
    if (text && orientation === "horizontal") {
      return (
        <div
          role="separator"
          aria-orientation={orientation || "horizontal"}
          className={cn(
            "flex items-center gap-4 text-sm text-muted-foreground",
            className
          )}
        >
          <hr
            ref={ref}
            className={cn(
              dividerVariants({ orientation, thickness }),
              "flex-1"
            )}
            {...props}
          />
          <span className="whitespace-nowrap">{text}</span>
          <hr
            className={cn(
              dividerVariants({ orientation, thickness }),
              "flex-1"
            )}
          />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation || "horizontal"}
        className={cn(dividerVariants({ orientation, thickness }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
