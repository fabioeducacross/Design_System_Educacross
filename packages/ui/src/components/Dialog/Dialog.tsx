import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Dialog overlay variants.
 */
const dialogOverlayVariants = cva([
    "fixed inset-0 z-50 bg-black/80",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
]);

/**
 * Dialog content variants.
 */
const dialogContentVariants = cva(
    [
        "fixed left-[50%] top-[50%] z-50",
        "grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "gap-4 border bg-background p-6 shadow-lg",
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "sm:rounded-lg",
    ],
    {
        variants: {
            size: {
                sm: "max-w-sm",
                default: "max-w-lg",
                lg: "max-w-2xl",
                xl: "max-w-4xl",
                full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

/**
 * Close icon for dialog.
 */
function CloseIcon({ className }: { className?: string }) {
    return (
        <svg
            className={cn("h-4 w-4", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export interface DialogProps {
    /**
     * Whether the dialog is open.
     */
    open?: boolean;
    /**
     * Default open state when uncontrolled.
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The dialog content.
     */
    children?: React.ReactNode;
}

interface DialogContextValue {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    titleId?: string;
    descriptionId?: string;
    setTitleId: (id: string) => void;
    setDescriptionId: (id: string) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

/**
 * Dialog component - a modal window for important content.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description here.</DialogDescription>
 *     </DialogHeader>
 *     <div>Content goes here</div>
 *     <DialogFooter>
 *       <Button>Save</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
function Dialog({
    open,
    defaultOpen = false,
    onOpenChange,
    children,
}: DialogProps) {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [titleId, setTitleId] = React.useState<string>();
    const [descriptionId, setDescriptionId] = React.useState<string>();
    const isOpen = open !== undefined ? open : internalOpen;

    const handleOpenChange = React.useCallback(
        (newOpen: boolean) => {
            if (open === undefined) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        },
        [open, onOpenChange]
    );

    return (
        <DialogContext.Provider
            value={{
                open: isOpen,
                onOpenChange: handleOpenChange,
                titleId,
                descriptionId,
                setTitleId,
                setDescriptionId,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
}

export interface DialogTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Render as child element instead of button.
     */
    asChild?: boolean;
}

/**
 * DialogTrigger - opens the dialog when clicked.
 */
const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
    ({ asChild, children, onClick, ...props }, ref) => {
        const context = React.useContext(DialogContext);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            context?.onOpenChange(true);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                onClick: handleClick,
                ref,
            });
        }

        return (
            <button ref={ref} type="button" onClick={handleClick} {...props}>
                {children}
            </button>
        );
    }
);
DialogTrigger.displayName = "DialogTrigger";

/**
 * DialogPortal - renders dialog in a portal.
 */
function DialogPortal({ children }: { children: React.ReactNode }) {
    const context = React.useContext(DialogContext);

    if (!context?.open) {
        return null;
    }

    return <>{children}</>;
}

/**
 * DialogOverlay - the backdrop behind the dialog.
 */
const DialogOverlay = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const context = React.useContext(DialogContext);

    const handleClick = () => {
        context?.onOpenChange(false);
    };

    return (
        <div
            ref={ref}
            className={cn(dialogOverlayVariants(), className)}
            onClick={handleClick}
            data-state={context?.open ? "open" : "closed"}
            {...props}
        />
    );
});
DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> { }

/**
 * DialogContent - the main content container of the dialog.
 */
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
    ({ className, children, size, ...props }, ref) => {
        const context = React.useContext(DialogContext);
        const contentRef = React.useRef<HTMLDivElement>(null);

        // Handle escape key
        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    context?.onOpenChange(false);
                }
            };

            if (context?.open) {
                document.addEventListener("keydown", handleKeyDown);
                // Prevent body scroll when dialog is open
                document.body.style.overflow = "hidden";
            }

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "";
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally exclude context to avoid re-render loops
        }, [context?.open, context?.onOpenChange]);

        // Focus trap
        React.useEffect(() => {
            if (context?.open && contentRef.current) {
                contentRef.current.focus();
            }
        }, [context?.open]);

        if (!context?.open) {
            return null;
        }

        return (
            <DialogPortal>
                <DialogOverlay />
                <div
                    ref={ref}
                    className={cn(dialogContentVariants({ size }), className)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={context.titleId}
                    aria-describedby={context.descriptionId}
                    data-state={context.open ? "open" : "closed"}
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={-1}
                    {...props}
                >
                    {children}
                    <button
                        type="button"
                        className={cn(
                            "absolute right-4 top-4 rounded-sm opacity-70",
                            "ring-offset-background transition-opacity",
                            "hover:opacity-100",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            "disabled:pointer-events-none"
                        )}
                        onClick={() => context.onOpenChange(false)}
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </DialogPortal>
        );
    }
);
DialogContent.displayName = "DialogContent";

/**
 * DialogHeader - container for title and description.
 */
const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

/**
 * DialogFooter - container for action buttons.
 */
const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

/**
 * DialogTitle - the title of the dialog.
 */
const DialogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    const id = React.useId();

    React.useEffect(() => {
        context?.setTitleId(id);
        return () => context?.setTitleId("");
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Only sync on id change, context ref is stable
    }, [id, context?.setTitleId]);

    return (
        <h2
            ref={ref}
            id={id}
            className={cn(
                "text-lg font-semibold leading-none tracking-tight",
                className
            )}
            {...props}
        />
    );
});
DialogTitle.displayName = "DialogTitle";

/**
 * DialogDescription - secondary text describing the dialog.
 */
const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    const id = React.useId();

    React.useEffect(() => {
        context?.setDescriptionId(id);
        return () => context?.setDescriptionId("");
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Only sync on id change, context ref is stable
    }, [id, context?.setDescriptionId]);

    return (
        <p
            ref={ref}
            id={id}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});
DialogDescription.displayName = "DialogDescription";

/**
 * DialogClose - closes the dialog when clicked.
 */
const DialogClose = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
    const context = React.useContext(DialogContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        context?.onOpenChange(false);
    };

    return <button ref={ref} type="button" onClick={handleClick} {...props} />;
});
DialogClose.displayName = "DialogClose";

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    dialogContentVariants,
    dialogOverlayVariants,
};
