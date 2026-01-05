import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Dropdown menu content variants.
 */
const dropdownMenuContentVariants = cva(
    [
        "z-50 min-w-[8rem] overflow-hidden rounded-md border",
        "bg-popover p-1 text-popover-foreground shadow-md",
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

interface DropdownMenuContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

export interface DropdownMenuProps {
    /**
     * Whether the menu is open.
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
 * DropdownMenu component - action menu with multiple options.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Action 1</DropdownMenuItem>
 *     <DropdownMenuItem>Action 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
function DropdownMenu({
    open,
    defaultOpen = false,
    onOpenChange,
    children,
}: DropdownMenuProps) {
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

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && !triggerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setOpen]);

    return (
        <DropdownMenuContext.Provider value={{ open: isOpen, setOpen, triggerRef }}>
            <div className="relative inline-block">{children}</div>
        </DropdownMenuContext.Provider>
    );
}

export interface DropdownMenuTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Render as child element.
     */
    asChild?: boolean;
}

/**
 * DropdownMenuTrigger - button to open the menu.
 */
const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
    ({ asChild, children, onClick, ...props }, _ref) => {
        const context = React.useContext(DropdownMenuContext);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            context?.setOpen(!context.open);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                ref: context?.triggerRef,
                onClick: handleClick,
                "aria-expanded": context?.open,
                "aria-haspopup": true,
            });
        }

        return (
            <button
                ref={context?.triggerRef}
                type="button"
                aria-expanded={context?.open}
                aria-haspopup="menu"
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        );
    }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuContentVariants> {
    /**
     * Alignment of the menu.
     */
    align?: "start" | "center" | "end";
    /**
     * Offset from trigger.
     */
    sideOffset?: number;
}

/**
 * DropdownMenuContent - container for menu items.
 */
const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({ className, side = "bottom", align = "start", sideOffset = 4, ...props }, ref) => {
        const context = React.useContext(DropdownMenuContext);

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
                ref={ref}
                role="menu"
                data-state={context.open ? "open" : "closed"}
                data-side={side}
                style={positionStyles}
                className={cn(dropdownMenuContentVariants({ side }), className)}
                {...props}
            />
        );
    }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether the item is destructive.
     */
    destructive?: boolean;
}

/**
 * DropdownMenuItem - a single menu item.
 */
const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
    ({ className, destructive, onClick, ...props }, ref) => {
        const context = React.useContext(DropdownMenuContext);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            context?.setOpen(false);
        };

        return (
            <button
                ref={ref}
                role="menuitem"
                type="button"
                onClick={handleClick}
                className={cn(
                    "relative flex w-full cursor-pointer select-none items-center",
                    "rounded-sm px-2 py-1.5 text-sm outline-none",
                    "transition-colors hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    "disabled:pointer-events-none disabled:opacity-50",
                    destructive && "text-destructive hover:text-destructive",
                    className
                )}
                {...props}
            />
        );
    }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/**
 * DropdownMenuSeparator - visual separator between items.
 */
const DropdownMenuSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        role="separator"
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/**
 * DropdownMenuLabel - non-interactive label for a group.
 */
const DropdownMenuLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("px-2 py-1.5 text-sm font-semibold", className)}
        {...props}
    />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    dropdownMenuContentVariants,
};
