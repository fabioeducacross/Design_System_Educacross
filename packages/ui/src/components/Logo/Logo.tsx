import * as React from "react";
import { cn } from "../../utils";
import logoEducacross from "../../assets/images/logo-educacross.svg";

/**
 * LogoProps - propriedades do componente Logo.
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Tamanho da logo.
     * @default "default"
     */
    size?: "sm" | "default" | "lg";
}

const logoSizes = {
    sm: "h-5",
    default: "h-7",
    lg: "h-9",
};

/**
 * Logo - componente da logo Educacross.
 *
 * @example
 * ```tsx
 * <Logo size="default" />
 * <Logo size="lg" className="my-custom-class" />
 * ```
 */
export const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
    ({ size = "default", className, alt = "Educacross", ...props }, ref) => {
        return (
            <img
                ref={ref}
                src={logoEducacross}
                alt={alt}
                className={cn(logoSizes[size], "w-auto", className)}
                {...props}
            />
        );
    }
);

Logo.displayName = "Logo";
