import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Tooltip content variants.
 */
const tooltipContentVariants = cva(
    [
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5",
        "text-sm text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    ],
    {
        variants: {
            side: {
                top: "data-[side=top]:slide-in-from-bottom-2",
                bottom: "data-[side=bottom]:slide-in-from-top-2",
                left: "data-[side=left]:slide-in-from-right-2",
                right: "data-[side=right]:slide-in-from-left-2",
            },
        },
        defaultVariants: {
            side: "top",
        },
    }
);

interface TooltipContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLElement>;
    side: "top" | "bottom" | "left" | "right";
    delayDuration: number;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export interface TooltipProviderProps {
    /**
     * The delay in milliseconds before showing the tooltip.
     */
    delayDuration?: number;
    /**
     * The delay in milliseconds before hiding the tooltip.
     */
    skipDelayDuration?: number;
    children: React.ReactNode;
}

/**
 * TooltipProvider - provides global tooltip configuration.
 */
function TooltipProvider({
    delayDuration: _delayDuration = 400,
    children,
}: TooltipProviderProps) {
    // delayDuration is configured per-tooltip, provider just groups tooltips
    return <>{children}</>;
}

export interface TooltipProps {
    /**
     * Whether the tooltip is open.
     */
    open?: boolean;
    /**
     * Default open state.
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The preferred side of the trigger to render against.
     */
    side?: "top" | "bottom" | "left" | "right";
    /**
     * The delay in milliseconds before showing.
     */
    delayDuration?: number;
    children: React.ReactNode;
}

/**
 * Tooltip component - displays brief information on hover.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip content</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
function Tooltip({
    open,
    defaultOpen = false,
    onOpenChange,
    side = "top",
    delayDuration = 400,
    children,
}: TooltipProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const triggerRef = React.useRef<HTMLElement>(null);
    const isOpen = open !== undefined ? open : internalOpen;

    const setOpen = React.useCallback(
        (newOpen: boolean) => {
            if (open === undefined) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        },
        [open, onOpenChange]
    );

    return (
        <TooltipContext.Provider
            value={{ open: isOpen, setOpen, triggerRef, side, delayDuration }}
        >
            {children}
        </TooltipContext.Provider>
    );
}

export interface TooltipTriggerProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Render as child element.
     */
    asChild?: boolean;
}

/**
 * TooltipTrigger - element that triggers the tooltip.
 */
const TooltipTrigger = React.forwardRef<HTMLSpanElement, TooltipTriggerProps>(
    ({ asChild, children, ...props }, ref) => {
        const context = React.useContext(TooltipContext);
        const timeoutRef = React.useRef<NodeJS.Timeout>();

        const handleMouseEnter = () => {
            timeoutRef.current = setTimeout(() => {
                context?.setOpen(true);
            }, context?.delayDuration ?? 400);
        };

        const handleMouseLeave = () => {
            clearTimeout(timeoutRef.current);
            context?.setOpen(false);
        };

        React.useEffect(() => {
            return () => clearTimeout(timeoutRef.current);
        }, []);

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                ref,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                onFocus: () => context?.setOpen(true),
                onBlur: () => context?.setOpen(false),
            });
        }

        return (
            <span
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={() => context?.setOpen(true)}
                onBlur={() => context?.setOpen(false)}
                tabIndex={0}
                {...props}
            >
                {children}
            </span>
        );
    }
);
TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipContentVariants> {
    /**
     * Offset from the trigger element.
     */
    sideOffset?: number;
}

/**
 * TooltipContent - the content displayed in the tooltip.
 */
const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
    ({ className, side: _side, sideOffset = 4, ...props }, ref) => {
        const context = React.useContext(TooltipContext);

        if (!context?.open) {
            return null;
        }

        const positionStyles: React.CSSProperties = {
            position: "absolute",
            zIndex: 50,
        };

        // Position based on side
        switch (context.side) {
            case "top":
                positionStyles.bottom = "100%";
                positionStyles.left = "50%";
                positionStyles.transform = "translateX(-50%)";
                positionStyles.marginBottom = sideOffset;
                break;
            case "bottom":
                positionStyles.top = "100%";
                positionStyles.left = "50%";
                positionStyles.transform = "translateX(-50%)";
                positionStyles.marginTop = sideOffset;
                break;
            case "left":
                positionStyles.right = "100%";
                positionStyles.top = "50%";
                positionStyles.transform = "translateY(-50%)";
                positionStyles.marginRight = sideOffset;
                break;
            case "right":
                positionStyles.left = "100%";
                positionStyles.top = "50%";
                positionStyles.transform = "translateY(-50%)";
                positionStyles.marginLeft = sideOffset;
                break;
        }

        return (
            <div
                ref={ref}
                role="tooltip"
                data-side={context.side}
                data-state={context.open ? "open" : "closed"}
                style={positionStyles}
                className={cn(
                    tooltipContentVariants({ side: context.side }),
                    className
                )}
                {...props}
            />
        );
    }
);
TooltipContent.displayName = "TooltipContent";

export {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
    tooltipContentVariants,
};
