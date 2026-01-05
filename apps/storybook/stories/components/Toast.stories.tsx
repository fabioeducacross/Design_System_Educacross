import type { Meta, StoryObj } from "@storybook/react";
import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
    Button,
} from "@educacross/ui";
import { useState } from "react";

const meta: Meta<typeof Toast> = {
    title: "Components/Toast",
    component: Toast,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Toast displays brief, temporary notifications to users.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive", "success", "warning", "info"],
            description: "The visual style of the toast",
        },
        duration: {
            control: "number",
            description: "Duration before auto-close (ms). 0 to disable.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toast.
 */
export const Default: Story = {
    render: () => (
        <Toast open className="relative w-[350px]">
            <ToastTitle>Notification</ToastTitle>
            <ToastDescription>
                This is a toast notification message.
            </ToastDescription>
        </Toast>
    ),
};

/**
 * All toast variants.
 */
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Toast open variant="default" className="relative w-[350px]">
                <ToastTitle>Default</ToastTitle>
                <ToastDescription>Default toast message.</ToastDescription>
            </Toast>
            <Toast open variant="success" className="relative w-[350px]">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>
                    Your changes have been saved.
                </ToastDescription>
            </Toast>
            <Toast open variant="warning" className="relative w-[350px]">
                <ToastTitle>Warning</ToastTitle>
                <ToastDescription>Please review your input.</ToastDescription>
            </Toast>
            <Toast open variant="info" className="relative w-[350px]">
                <ToastTitle>Information</ToastTitle>
                <ToastDescription>
                    New updates are available.
                </ToastDescription>
            </Toast>
            <Toast open variant="destructive" className="relative w-[350px]">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>Something went wrong.</ToastDescription>
            </Toast>
        </div>
    ),
};

/**
 * Toast with action button.
 */
export const WithAction: Story = {
    render: () => (
        <Toast open className="relative w-[350px]">
            <div className="flex-1">
                <ToastTitle>Undo action</ToastTitle>
                <ToastDescription>
                    Item has been moved to trash.
                </ToastDescription>
            </div>
            <ToastAction>Undo</ToastAction>
        </Toast>
    ),
};

/**
 * Toast with close button.
 */
export const WithClose: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <div className="space-y-4">
                {!open && (
                    <Button onClick={() => setOpen(true)}>Show Toast</Button>
                )}
                <Toast
                    open={open}
                    onClose={() => setOpen(false)}
                    className="relative w-[350px]"
                >
                    <ToastTitle>Closable Toast</ToastTitle>
                    <ToastDescription>
                        Click the X or wait for it to auto-close.
                    </ToastDescription>
                </Toast>
            </div>
        );
    },
};

/**
 * Interactive toast demo with triggers.
 */
export const Interactive: Story = {
    render: () => {
        const [toasts, setToasts] = useState<
            Array<{ id: number; variant: "default" | "destructive" | "success"; title: string; description: string }>
        >([]);

        const addToast = (
            variant: "default" | "destructive" | "success",
            title: string,
            description: string
        ) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, variant, title, description }]);
        };

        const removeToast = (id: number) => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        };

        return (
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            addToast("success", "Success!", "Action completed.")
                        }
                    >
                        Success Toast
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() =>
                            addToast("destructive", "Error!", "Something went wrong.")
                        }
                    >
                        Error Toast
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            addToast("default", "Info", "Here's some information.")
                        }
                    >
                        Info Toast
                    </Button>
                </div>
                <ToastViewport className="relative flex flex-col gap-2">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            open
                            variant={toast.variant}
                            onClose={() => removeToast(toast.id)}
                            duration={3000}
                            className="relative"
                        >
                            <ToastTitle>{toast.title}</ToastTitle>
                            <ToastDescription>
                                {toast.description}
                            </ToastDescription>
                        </Toast>
                    ))}
                </ToastViewport>
            </div>
        );
    },
};

/**
 * Toast in viewport position.
 */
export const InViewport: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <div>
                <Button onClick={() => setOpen(true)}>Show Toast</Button>
                <ToastViewport>
                    <Toast
                        open={open}
                        onClose={() => setOpen(false)}
                        duration={3000}
                    >
                        <ToastTitle>Positioned Toast</ToastTitle>
                        <ToastDescription>
                            This toast appears in the viewport corner.
                        </ToastDescription>
                    </Toast>
                </ToastViewport>
            </div>
        );
    },
};
