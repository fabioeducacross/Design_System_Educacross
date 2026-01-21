import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@fabioeducacross/ui";

const meta: Meta<typeof Badge> = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Badge displays a small status indicator or label. Use it to highlight new items, status, or counts.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "secondary",
                "destructive",
                "outline",
                "success",
                "warning",
                "info",
                "softPrimary",
                "softSecondary",
                "softDestructive",
                "softSuccess",
                "softWarning",
                "softInfo",
            ],
            description: "The visual style of the badge",
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "The size of the badge",
        },
        children: {
            control: "text",
            description: "The content of the badge",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge style.
 */
export const Default: Story = {
    args: {
        children: "Badge",
    },
};

/**
 * All badge variants.
 */
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-semibold">Variantes Sólidas</p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Badge</Badge>
                    <Badge variant="secondary">Badge</Badge>
                    <Badge variant="destructive">Badge</Badge>
                    <Badge variant="warning">Badge</Badge>
                    <Badge variant="info">Badge</Badge>
                    <Badge variant="success">Badge</Badge>
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-semibold">Variantes Suaves (Soft)</p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="softPrimary">Badge</Badge>
                    <Badge variant="softSecondary">Badge</Badge>
                    <Badge variant="softDestructive">Badge</Badge>
                    <Badge variant="softWarning">Badge</Badge>
                    <Badge variant="softInfo">Badge</Badge>
                    <Badge variant="softSuccess">Badge</Badge>
                </div>
            </div>
        </div>
    ),
};

/**
 * All badge sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
        </div>
    ),
};

/**
 * Badges used for status indicators.
 */
export const StatusBadges: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Badge variant="success">Active</Badge>
                <span>User is currently online</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="warning">Pending</Badge>
                <span>Awaiting approval</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="destructive">Error</Badge>
                <span>Action failed</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary">Draft</Badge>
                <span>Not yet published</span>
            </div>
        </div>
    ),
};

/**
 * Badges with counts.
 */
export const WithCounts: Story = {
    render: () => (
        <div className="flex gap-4">
            <div className="relative inline-flex">
                <span className="text-sm">Notifications</span>
                <Badge className="absolute -right-6 -top-2" size="sm">
                    3
                </Badge>
            </div>
            <div className="relative inline-flex">
                <span className="text-sm">Messages</span>
                <Badge
                    className="absolute -right-8 -top-2"
                    variant="destructive"
                    size="sm"
                >
                    99+
                </Badge>
            </div>
        </div>
    ),
};

/**
 * Badges in a list.
 */
export const InList: Story = {
    render: () => (
        <div className="w-[300px] space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
                <span>Feature Request</span>
                <Badge variant="default">New</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
                <span>Bug Fix</span>
                <Badge variant="success">Resolved</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
                <span>Documentation</span>
                <Badge variant="secondary">In Progress</Badge>
            </div>
        </div>
    ),
};
