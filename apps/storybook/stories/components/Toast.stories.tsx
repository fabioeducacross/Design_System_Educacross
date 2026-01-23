import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
    Button,
} from "@fabioeducacross/ui";
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Toast, ToastTitle, ToastDescription } from "@fabioeducacross/ui";

<Toast open>
  <ToastTitle>Notification</ToastTitle>
  <ToastDescription>This is a toast notification message.</ToastDescription>
</Toast>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="toast show" role="alert">
    <div class="toast-header">
      <strong class="me-auto">Notification</strong>
    </div>
    <div class="toast-body">This is a toast notification message.</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdToast :open="true">
    <EdToastTitle>Notification</EdToastTitle>
    <EdToastDescription>This is a toast notification message.</EdToastDescription>
  </EdToast>
</template>

<script setup lang="ts">
import { EdToast, EdToastTitle, EdToastDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify toast content is visible
        await expect(canvas.getByText("Notification")).toBeVisible();
        await expect(canvas.getByText(/this is a toast notification/i)).toBeVisible();
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Toast, ToastTitle, ToastDescription } from "@fabioeducacross/ui";

<Toast open variant="success">
  <ToastTitle>Success</ToastTitle>
  <ToastDescription>Your changes have been saved.</ToastDescription>
</Toast>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="toast show bg-success text-white" role="alert">
    <div class="toast-header bg-success text-white">
      <strong class="me-auto">Success</strong>
    </div>
    <div class="toast-body">Your changes have been saved.</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdToast :open="true" variant="success">
    <EdToastTitle>Success</EdToastTitle>
    <EdToastDescription>Your changes have been saved.</EdToastDescription>
  </EdToast>
</template>

<script setup lang="ts">
import { EdToast, EdToastTitle, EdToastDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Toast, ToastTitle, ToastDescription, ToastAction } from "@fabioeducacross/ui";

<Toast open>
  <div className="flex-1">
    <ToastTitle>Undo action</ToastTitle>
    <ToastDescription>Item has been moved to trash.</ToastDescription>
  </div>
  <ToastAction>Undo</ToastAction>
</Toast>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="toast show" role="alert">
    <div class="d-flex">
      <div class="toast-body">
        <strong>Undo action</strong><br>
        Item has been moved to trash.
      </div>
      <button type="button" class="btn btn-sm btn-primary me-2 m-auto">Undo</button>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdToast :open="true">
    <div class="flex-1">
      <EdToastTitle>Undo action</EdToastTitle>
      <EdToastDescription>Item has been moved to trash.</EdToastDescription>
    </div>
    <EdToastAction>Undo</EdToastAction>
  </EdToast>
</template>

<script setup lang="ts">
import { EdToast, EdToastTitle, EdToastDescription, EdToastAction } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify toast with action is visible
        await expect(canvas.getByText("Undo action")).toBeVisible();
        await expect(canvas.getByRole("button", { name: /undo/i })).toBeVisible();
    },
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
