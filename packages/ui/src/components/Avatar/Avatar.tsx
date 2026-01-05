import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Avatar variants using class-variance-authority.
 */
const avatarVariants = cva(
    [
        "relative flex shrink-0 overflow-hidden rounded-full",
        "bg-muted",
    ],
    {
        variants: {
            size: {
                xs: "h-6 w-6 text-xs",
                sm: "h-8 w-8 text-sm",
                default: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-lg",
                "2xl": "h-24 w-24 text-2xl",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface AvatarProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> { }

/**
 * Avatar component - displays a user's profile image or initials.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
    ({ className, size, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(avatarVariants({ size, className }))}
            {...props}
        />
    )
);
Avatar.displayName = "Avatar";

export type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * AvatarImage - the image displayed in the avatar.
 */
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
    ({ className, alt, ...props }, ref) => {
        const [hasError, setHasError] = React.useState(false);

        if (hasError) {
            return null;
        }

        return (
            <img
                ref={ref}
                alt={alt}
                className={cn(
                    "aspect-square h-full w-full object-cover",
                    className
                )}
                onError={() => setHasError(true)}
                {...props}
            />
        );
    }
);
AvatarImage.displayName = "AvatarImage";

export type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * AvatarFallback - displayed when the image fails to load or is not provided.
 */
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
                className
            )}
            {...props}
        />
    )
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
