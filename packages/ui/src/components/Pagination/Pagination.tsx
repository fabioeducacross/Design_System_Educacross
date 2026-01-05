import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Pagination button variants.
 */
const paginationButtonVariants = cva(
    [
        "inline-flex items-center justify-center whitespace-nowrap rounded-md",
        "text-sm font-medium ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                default: "bg-background hover:bg-accent hover:text-accent-foreground",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-5",
                icon: "h-10 w-10",
            },
            isActive: {
                true: "bg-primary text-primary-foreground hover:bg-primary/90",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "icon",
            isActive: false,
        },
    }
);

/**
 * Chevron left icon.
 */
function ChevronLeftIcon({ className }: { className?: string }) {
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
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

/**
 * Chevron right icon.
 */
function ChevronRightIcon({ className }: { className?: string }) {
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
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}

/**
 * More horizontal icon (ellipsis).
 */
function MoreHorizontalIcon({ className }: { className?: string }) {
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    );
}

export type PaginationProps = React.HTMLAttributes<HTMLElement>;

/**
 * Pagination - navigation for multi-page content.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
    ({ className, ...props }, ref) => (
        <nav
            ref={ref}
            role="navigation"
            aria-label="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    )
);
Pagination.displayName = "Pagination";

/**
 * PaginationContent - container for pagination items.
 */
const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";

/**
 * PaginationItem - wrapper for individual pagination element.
 */
const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

export interface PaginationLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof paginationButtonVariants> {
    /**
     * Whether this is the current page.
     */
    isActive?: boolean;
}

/**
 * PaginationLink - link to a specific page.
 */
const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
    ({ className, isActive, variant, size = "icon", ...props }, ref) => (
        <a
            ref={ref}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                paginationButtonVariants({ variant, size, isActive }),
                className
            )}
            {...props}
        />
    )
);
PaginationLink.displayName = "PaginationLink";

export interface PaginationButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationButtonVariants> {
    /**
     * Whether this is the current page.
     */
    isActive?: boolean;
}

/**
 * PaginationButton - button alternative to link.
 */
const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
    ({ className, isActive, variant, size = "icon", ...props }, ref) => (
        <button
            ref={ref}
            type="button"
            aria-current={isActive ? "page" : undefined}
            className={cn(
                paginationButtonVariants({ variant, size, isActive }),
                className
            )}
            {...props}
        />
    )
);
PaginationButton.displayName = "PaginationButton";

export type PaginationPreviousProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * PaginationPrevious - link to previous page.
 */
const PaginationPrevious = React.forwardRef<
    HTMLAnchorElement,
    PaginationPreviousProps
>(({ className, ...props }, ref) => (
    <a
        ref={ref}
        aria-label="Go to previous page"
        className={cn(
            paginationButtonVariants({ variant: "default", size: "default" }),
            "gap-1 pl-2.5",
            className
        )}
        {...props}
    >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Previous</span>
    </a>
));
PaginationPrevious.displayName = "PaginationPrevious";

export type PaginationNextProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * PaginationNext - link to next page.
 */
const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
    ({ className, ...props }, ref) => (
        <a
            ref={ref}
            aria-label="Go to next page"
            className={cn(
                paginationButtonVariants({ variant: "default", size: "default" }),
                "gap-1 pr-2.5",
                className
            )}
            {...props}
        >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
        </a>
    )
);
PaginationNext.displayName = "PaginationNext";

/**
 * PaginationEllipsis - indicates more pages.
 */
const PaginationEllipsis = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        aria-hidden
        className={cn(
            "flex h-9 w-9 items-center justify-center",
            className
        )}
        {...props}
    >
        <MoreHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationButton,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    paginationButtonVariants,
};
