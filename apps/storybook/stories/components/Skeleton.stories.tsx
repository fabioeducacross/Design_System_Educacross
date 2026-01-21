import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Skeleton,
    SkeletonText,
    SkeletonCircle,
    SkeletonCard,
    SkeletonAvatar,
    SkeletonTable,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Skeleton> = {
    title: "Components/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Skeleton provides a placeholder preview while content is loading.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Basic skeleton shapes.
 */
export const Default: Story = {
    render: () => (
        <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
        </div>
    ),
};

/**
 * Different shapes.
 */
export const Shapes: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                </div>
            </div>
            <Skeleton className="h-[100px] w-full rounded-lg" />
            <div className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
            </div>
        </div>
    ),
};

/**
 * SkeletonText for paragraphs.
 */
export const Text: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <p className="text-sm text-muted-foreground mb-2">3 lines (default)</p>
                <SkeletonText />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">5 lines, 80% last line</p>
                <SkeletonText lines={5} lastLineWidth="80%" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">2 lines, 40% last line</p>
                <SkeletonText lines={2} lastLineWidth="40%" />
            </div>
        </div>
    ),
};

/**
 * SkeletonCircle for avatars.
 */
export const Circles: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <SkeletonCircle size="sm" />
            <SkeletonCircle size="md" />
            <SkeletonCircle size="lg" />
            <SkeletonCircle size="xl" />
        </div>
    ),
};

/**
 * SkeletonCard preset.
 */
export const Card: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    ),
};

/**
 * SkeletonAvatar with text.
 */
export const Avatar: Story = {
    render: () => (
        <div className="space-y-4">
            <SkeletonAvatar />
            <SkeletonAvatar />
            <SkeletonAvatar />
        </div>
    ),
};

/**
 * SkeletonTable for data tables.
 */
export const Table: Story = {
    render: () => <SkeletonTable rows={5} columns={4} />,
};

/**
 * Variants.
 */
export const Variants: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <p className="text-sm text-muted-foreground mb-2">Default</p>
                <Skeleton className="h-8 w-full" variant="default" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">Primary</p>
                <Skeleton className="h-8 w-full" variant="primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">Card</p>
                <Skeleton className="h-8 w-full" variant="card" />
            </div>
        </div>
    ),
};

/**
 * Loading card example.
 */
export const LoadingCard: Story = {
    render: () => (
        <div className="border rounded-lg p-4 w-[350px]">
            <div className="flex items-center gap-4 mb-4">
                <SkeletonCircle size="lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <SkeletonText lines={3} />
            <div className="flex gap-2 mt-4">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
            </div>
        </div>
    ),
};

/**
 * Loading profile page.
 */
export const ProfilePage: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div className="flex items-start gap-6">
                <SkeletonCircle size="xl" />
                <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <div className="flex gap-4">
                        <Skeleton className="h-9 w-28" />
                        <Skeleton className="h-9 w-28" />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="border rounded-lg p-4 space-y-4">
                <Skeleton className="h-6 w-32" />
                <SkeletonText lines={4} />
            </div>

            {/* Activity */}
            <div className="border rounded-lg p-4 space-y-4">
                <Skeleton className="h-6 w-40" />
                <SkeletonAvatar />
                <SkeletonAvatar />
                <SkeletonAvatar />
            </div>
        </div>
    ),
};

/**
 * Loading dashboard.
 */
export const Dashboard: Story = {
    render: () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-[200px] w-full" />
                </div>
                <div className="border rounded-lg p-4 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <SkeletonTable rows={4} columns={3} />
                </div>
            </div>
        </div>
    ),
};
