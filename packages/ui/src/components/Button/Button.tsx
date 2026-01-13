import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Button variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
const buttonVariants = cva(
    [
        // Base styles usando tokens semânticos
        "inline-flex items-center justify-center whitespace-nowrap",
        "gap-[var(--gap-2)]",
        "rounded-[var(--radius-md)] text-sm font-medium",
        "transition-colors duration-200",
        // Focus styles (a11y) - usando action-focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Disabled styles - usando tokens de ação
        "disabled:pointer-events-none disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--text-disabled)]",
        // Icon sizing
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    ],
    {
        variants: {
            variant: {
                // Botão primário padrão (roxo filled)
                default: "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)]",
                
                // Botão-secundário (roxo outline)
                secondary:
                    "border-2 border-[var(--color-primary-500)] bg-transparent text-[var(--color-primary-500)] hover:bg-[var(--color-primary-8)] active:bg-[var(--color-primary-16)]",
                
                // Botão-de-atenção (amarelo filled)
                attention: "bg-[var(--color-warning-500)] text-[var(--text-primary)] hover:bg-[var(--color-warning-600)] active:bg-[var(--color-warning-700)]",
                
                // Botão-negativo (outline neutro)
                negative:
                    "border-2 border-[var(--color-primary-500)] bg-transparent text-[var(--color-primary-500)] hover:bg-[var(--color-primary-8)] active:bg-[var(--color-primary-16)]",
                
                // Variantes existentes mantidas
                destructive:
                    "bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)] active:bg-[var(--color-error-700)]",
                outline:
                    "border border-[var(--input-border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--action-hover)] active:bg-[var(--action-selected)]",
                ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--action-hover)] active:bg-[var(--action-selected)]",
                link: "text-[var(--color-primary-500)] underline-offset-4 hover:underline",
                success: "bg-[var(--color-success-500)] text-white hover:bg-[var(--color-success-600)] active:bg-[var(--color-success-700)]",
                warning: "bg-[var(--color-warning-500)] text-[var(--text-primary)] hover:bg-[var(--color-warning-600)] active:bg-[var(--color-warning-700)]",
                info: "bg-[var(--color-info-500)] text-white hover:bg-[var(--color-info-600)] active:bg-[var(--color-info-700)]",
            },
            size: {
                default: "h-10 px-[var(--padding-4)] py-[var(--padding-2)]",
                sm: "h-9 rounded-[var(--radius-md)] px-[var(--padding-3)]",
                lg: "h-11 rounded-[var(--radius-md)] px-[var(--padding-8)]",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

/**
 * Loading spinner component for Button loading state.
 */
function LoadingSpinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    /**
     * If true, the button will be rendered as a child component (Slot).
     * Useful for composition with links or other elements.
     */
    asChild?: boolean;
    /**
     * If true, shows a loading spinner and disables the button.
     */
    loading?: boolean;
}

/**
 * Button component with multiple variants, sizes, and states.
 *
 * @example
 * ```tsx
 * <Button variant="default" size="default">Click me</Button>
 * <Button variant="destructive" loading>Deleting...</Button>
 * <Button asChild>
 *   <a href="/somewhere">Link styled as button</a>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const isDisabled = disabled || loading;

        // When using asChild, we need to ensure only a single child is passed to Slot
        const content = loading ? (
            <>
                <LoadingSpinner className="mr-2" />
                {children}
            </>
        ) : (
            children
        );

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading}
                {...props}
            >
                {content}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
