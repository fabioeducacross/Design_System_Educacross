import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, AlertDescription } from "@fabioeducacross/ui";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Alert displays important messages to users. Use for notifications, warnings, errors, or success messages.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive", "success", "warning", "info"],
            description: "The visual style of the alert",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert.
 */
export const Default: Story = {
    render: () => (
        <Alert className="w-[450px]">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the CLI.
            </AlertDescription>
        </Alert>
    ),
};

/**
 * All alert variants.
 */
export const Variants: Story = {
    render: () => (
        <div className="flex w-[450px] flex-col gap-4">
            <Alert variant="default">
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>
                    This is a default alert message.
                </AlertDescription>
            </Alert>
            <Alert variant="info">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    This is an informational alert message.
                </AlertDescription>
            </Alert>
            <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                    Your changes have been saved successfully.
                </AlertDescription>
            </Alert>
            <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                    Please review your input before continuing.
                </AlertDescription>
            </Alert>
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Something went wrong. Please try again.
                </AlertDescription>
            </Alert>
        </div>
    ),
};

/**
 * Alert with icon.
 */
export const WithIcon: Story = {
    render: () => (
        <div className="flex w-[450px] flex-col gap-4">
            <Alert>
                <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    Your session will expire in 5 minutes.
                </AlertDescription>
            </Alert>
            <Alert variant="success">
                <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                    Your profile has been updated.
                </AlertDescription>
            </Alert>
            <Alert variant="destructive">
                <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to save changes. Please try again.
                </AlertDescription>
            </Alert>
        </div>
    ),
};

/**
 * Alert without title.
 */
export const WithoutTitle: Story = {
    render: () => (
        <Alert className="w-[450px]">
            <AlertDescription>
                This is an alert without a title. Sometimes you just need a
                simple message.
            </AlertDescription>
        </Alert>
    ),
};

/**
 * Alert in a form context.
 */
export const InFormContext: Story = {
    render: () => (
        <div className="w-[400px] space-y-4">
            <Alert variant="warning">
                <AlertTitle>Required fields missing</AlertTitle>
                <AlertDescription>
                    Please fill in all required fields marked with an asterisk
                    (*).
                </AlertDescription>
            </Alert>
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                </label>
                <input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm"
                    placeholder="Enter your email"
                />
            </div>
        </div>
    ),
};
