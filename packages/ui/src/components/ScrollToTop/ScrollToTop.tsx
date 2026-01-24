import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { ArrowUp } from "lucide-react";

const scrollToTopVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        fixed: [
          "fixed z-50 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90",
          "opacity-0 pointer-events-none data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto",
        ],
        floating: [
          "bg-background border-2 border-primary text-primary shadow-md hover:bg-primary hover:text-primary-foreground",
        ],
        inline: [
          "bg-muted text-muted-foreground hover:bg-muted/80",
        ],
      },
      size: {
        sm: "h-10 w-10 text-sm",
        default: "h-12 w-12 text-base",
        lg: "h-14 w-14 text-lg",
      },
      position: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6",
      },
    },
    defaultVariants: {
      variant: "fixed",
      size: "default",
      position: "bottom-right",
    },
  }
);

export interface ScrollToTopProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof scrollToTopVariants> {
  /**
   * Threshold em pixels para mostrar o botão (apenas variant="fixed")
   */
  threshold?: number;
  /**
   * Comportamento de scroll suave
   */
  smooth?: boolean;
  /**
   * Ícone customizado (padrão: ArrowUp do lucide-react)
   */
  icon?: React.ReactNode;
  /**
   * Callback quando o botão é clicado
   */
  onScrollToTop?: () => void;
}

const ScrollToTop = React.forwardRef<HTMLButtonElement, ScrollToTopProps>(
  (
    {
      className,
      variant = "fixed",
      size,
      position,
      threshold = 300,
      smooth = true,
      icon,
      onScrollToTop,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(variant !== "fixed");

    React.useEffect(() => {
      if (variant !== "fixed") return;

      const handleScroll = () => {
        const scrolled = window.scrollY > threshold;
        setIsVisible(scrolled);
      };

      // Check initial state
      handleScroll();

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [variant, threshold]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (smooth) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, 0);
      }

      onScrollToTop?.();
      onClick?.(event);
    };

    // For inline variant, always render without position classes
    if (variant === "inline") {
      return (
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          className={cn(
            scrollToTopVariants({ variant, size }),
            className
          )}
          aria-label="Voltar ao topo"
          {...props}
        >
          {icon || <ArrowUp className="h-5 w-5" />}
        </button>
      );
    }

    // For fixed and floating variants
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        data-visible={isVisible}
        className={cn(
          scrollToTopVariants({ variant, size, position: variant === "fixed" ? position : undefined }),
          className
        )}
        aria-label="Voltar ao topo"
        aria-hidden={variant === "fixed" && !isVisible}
        {...props}
      >
        {icon || <ArrowUp className="h-5 w-5" />}
      </button>
    );
  }
);

ScrollToTop.displayName = "ScrollToTop";

export { ScrollToTop, scrollToTopVariants };
