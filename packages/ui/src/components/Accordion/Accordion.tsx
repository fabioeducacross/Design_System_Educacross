import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Accordion item variants.
 */
const accordionItemVariants = cva("border-b", {
    variants: {
        variant: {
            default: "border-b",
            card: "border rounded-lg mb-2 last:mb-0",
            ghost: "border-none",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

/**
 * Chevron icon for accordion.
 */
function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

interface AccordionContextValue {
    expandedItems: string[];
    toggleItem: (value: string) => void;
    type: "single" | "multiple";
    variant?: "default" | "card" | "ghost";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export interface AccordionProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
    /**
     * Whether one or multiple items can be open at once.
     */
    type?: "single" | "multiple";
    /**
     * The controlled value of expanded items.
     */
    value?: string | string[];
    /**
     * The default value when uncontrolled.
     */
    defaultValue?: string | string[];
    /**
     * Callback when expanded items change.
     */
    onValueChange?: (value: string | string[]) => void;
    /**
     * Whether at least one item must be open (single mode only).
     */
    collapsible?: boolean;
}

/**
 * Accordion component - collapsible content panels.
 *
 * @example
 * ```tsx
 * <Accordion type="single" defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    (
        {
            className,
            type = "single",
            value,
            defaultValue,
            onValueChange,
            collapsible = true,
            variant,
            children,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = React.useState<string[]>(() => {
            if (defaultValue) {
                return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
            }
            return [];
        });

        const expandedItems = value !== undefined
            ? (Array.isArray(value) ? value : [value])
            : internalValue;

        const toggleItem = React.useCallback(
            (itemValue: string) => {
                let newValue: string[];

                if (type === "single") {
                    if (expandedItems.includes(itemValue)) {
                        newValue = collapsible ? [] : [itemValue];
                    } else {
                        newValue = [itemValue];
                    }
                } else {
                    if (expandedItems.includes(itemValue)) {
                        newValue = expandedItems.filter((v) => v !== itemValue);
                    } else {
                        newValue = [...expandedItems, itemValue];
                    }
                }

                if (value === undefined) {
                    setInternalValue(newValue);
                }

                if (type === "single") {
                    onValueChange?.(newValue[0] ?? "");
                } else {
                    onValueChange?.(newValue);
                }
            },
            [type, expandedItems, collapsible, value, onValueChange]
        );

        return (
            <AccordionContext.Provider
                value={{
                    expandedItems,
                    toggleItem,
                    type,
                    variant: variant ?? "default",
                }}
            >
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    }
);
Accordion.displayName = "Accordion";

interface AccordionItemContextValue {
    value: string;
    isExpanded: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export interface AccordionItemProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
    /**
     * The unique value for this accordion item.
     */
    value: string;
}

/**
 * AccordionItem - a single collapsible section.
 */
const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ className, value, variant, ...props }, ref) => {
        const context = React.useContext(AccordionContext);
        const isExpanded = context?.expandedItems.includes(value) ?? false;

        return (
            <AccordionItemContext.Provider value={{ value, isExpanded }}>
                <div
                    ref={ref}
                    data-state={isExpanded ? "open" : "closed"}
                    className={cn(
                        accordionItemVariants({
                            variant: variant ?? context?.variant,
                        }),
                        className
                    )}
                    {...props}
                />
            </AccordionItemContext.Provider>
        );
    }
);
AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * AccordionTrigger - button to toggle accordion item.
 */
const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ className, children, ...props }, ref) => {
        const accordionContext = React.useContext(AccordionContext);
        const itemContext = React.useContext(AccordionItemContext);

        return (
            <h3 className="flex">
                <button
                    ref={ref}
                    type="button"
                    aria-expanded={itemContext?.isExpanded}
                    onClick={() => {
                        if (itemContext?.value) {
                            accordionContext?.toggleItem(itemContext.value);
                        }
                    }}
                    className={cn(
                        "flex flex-1 items-center justify-between py-4 font-medium",
                        "transition-all hover:underline",
                        "[&[data-state=open]>svg]:rotate-180",
                        className
                    )}
                    data-state={itemContext?.isExpanded ? "open" : "closed"}
                    {...props}
                >
                    {children}
                    <ChevronIcon
                        className={cn(
                            itemContext?.isExpanded && "rotate-180"
                        )}
                    />
                </button>
            </h3>
        );
    }
);
AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * AccordionContent - content panel that expands/collapses.
 */
const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ className, children, ...props }, ref) => {
        const itemContext = React.useContext(AccordionItemContext);

        return (
            <div
                ref={ref}
                role="region"
                data-state={itemContext?.isExpanded ? "open" : "closed"}
                className={cn(
                    "overflow-hidden text-sm transition-all",
                    itemContext?.isExpanded
                        ? "animate-accordion-down"
                        : "animate-accordion-up hidden",
                    className
                )}
                {...props}
            >
                <div className="pb-4 pt-0">{children}</div>
            </div>
        );
    }
);
AccordionContent.displayName = "AccordionContent";

export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    accordionItemVariants,
};
