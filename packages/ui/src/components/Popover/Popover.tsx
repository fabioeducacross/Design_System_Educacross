import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Popover content variants.
 */
const popoverContentVariants = cva(
    [
        "z-50 w-72 rounded-md border bg-popover p-4",
        "text-popover-foreground shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
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
            side: "bottom",
        },
    }
);

interface PopoverContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLButtonElement>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export interface PopoverProps {
    /**
     * Whether the popover is open.
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
    children: React.ReactNode;
}

/**
 * Popover component - floating content panel.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>
 *     Content goes here
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({
    open,
    defaultOpen = false,
    onOpenChange,
    children,
}: PopoverProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
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

    // Close on escape
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, setOpen]);

    return (
        <PopoverContext.Provider value={{ open: isOpen, setOpen, triggerRef }}>
            <div className="relative inline-block">{children}</div>
        </PopoverContext.Provider>
    );
}

export interface PopoverTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Render as child element.
     */
    asChild?: boolean;
}

/**
 * PopoverTrigger - button to open the popover.
 */
const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ asChild, children, onClick, ...props }, _ref) => {
        const context = React.useContext(PopoverContext);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            context?.setOpen(!context.open);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                ref: context?.triggerRef,
                onClick: handleClick,
                "aria-expanded": context?.open,
                "aria-haspopup": "dialog",
            });
        }

        return (
            <button
                ref={context?.triggerRef}
                type="button"
                aria-expanded={context?.open}
                aria-haspopup="dialog"
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        );
    }
);
PopoverTrigger.displayName = "PopoverTrigger";

export interface PopoverContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popoverContentVariants> {
    /**
     * Alignment of the popover.
     */
    align?: "start" | "center" | "end";
    /**
     * Offset from trigger.
     */
    sideOffset?: number;
}

/**
 * PopoverContent - the floating content panel.
 */
const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ className, side = "bottom", align = "center", sideOffset = 4, ...props }, ref) => {
        const context = React.useContext(PopoverContext);
        const contentRef = React.useRef<HTMLDivElement>(null);

        // Click outside to close
        React.useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (
                    context?.open &&
                    contentRef.current &&
                    !contentRef.current.contains(e.target as Node) &&
                    !context.triggerRef.current?.contains(e.target as Node)
                ) {
                    context.setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [context]);

        if (!context?.open) {
            return null;
        }

        const positionStyles: React.CSSProperties = {
            position: "absolute",
            zIndex: 50,
        };

        // Vertical position
        if (side === "bottom") {
            positionStyles.top = `calc(100% + ${sideOffset}px)`;
        } else if (side === "top") {
            positionStyles.bottom = `calc(100% + ${sideOffset}px)`;
        }

        // Horizontal alignment
        if (align === "start") {
            positionStyles.left = 0;
        } else if (align === "end") {
            positionStyles.right = 0;
        } else {
            positionStyles.left = "50%";
            positionStyles.transform = "translateX(-50%)";
        }

        return (
            <div
                ref={(node) => {
                    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                }}
                role="dialog"
                data-state={context.open ? "open" : "closed"}
                data-side={side}
                style={positionStyles}
                className={cn(popoverContentVariants({ side }), className)}
                {...props}
            />
        );
    }
);
PopoverContent.displayName = "PopoverContent";

/**
 * PopoverClose - button to close the popover.
 */
const PopoverClose = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
    const context = React.useContext(PopoverContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        context?.setOpen(false);
    };

    return <button ref={ref} type="button" onClick={handleClick} {...props} />;
});
PopoverClose.displayName = "PopoverClose";

export {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
    popoverContentVariants,
};
