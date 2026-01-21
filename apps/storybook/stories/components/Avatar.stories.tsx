import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarImage, AvatarFallback } from "@fabioeducacross/ui";

const meta: Meta<typeof Avatar> = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Avatar displays a user's profile image or initials as a fallback.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["xs", "sm", "default", "lg", "xl", "2xl"],
            description: "The size of the avatar",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Avatar with image.
 */
export const Default: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
};

/**
 * Avatar with fallback initials (when image fails to load).
 */
export const Fallback: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="invalid-url.jpg" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
};

/**
 * All avatar sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <Avatar size="xs">
                <AvatarFallback>XS</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
                <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar size="default">
                <AvatarFallback>DF</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
                <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
                <AvatarFallback>XL</AvatarFallback>
            </Avatar>
            <Avatar size="2xl">
                <AvatarFallback>2X</AvatarFallback>
            </Avatar>
        </div>
    ),
};

/**
 * Avatar group showing multiple users.
 */
export const AvatarGroup: Story = {
    render: () => (
        <div className="flex -space-x-4">
            <Avatar className="border-2 border-background">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User 1"
                />
                <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
                <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
                <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
                <AvatarFallback>+5</AvatarFallback>
            </Avatar>
        </div>
    ),
};

/**
 * Avatar with status indicator.
 */
export const WithStatus: Story = {
    render: () => (
        <div className="flex gap-4">
            <div className="relative">
                <Avatar>
                    <AvatarFallback>ON</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
            </div>
            <div className="relative">
                <Avatar>
                    <AvatarFallback>AW</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 ring-2 ring-background" />
            </div>
            <div className="relative">
                <Avatar>
                    <AvatarFallback>OF</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-400 ring-2 ring-background" />
            </div>
        </div>
    ),
};

/**
 * Avatar in a user profile card.
 */
export const InCard: Story = {
    render: () => (
        <div className="flex items-center gap-4 rounded-lg border p-4">
            <Avatar size="lg">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="John Doe"
                />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">
                    john@example.com
                </p>
            </div>
        </div>
    ),
};
