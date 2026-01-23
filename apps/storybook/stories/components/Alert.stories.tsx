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
    parameters: {
        multiFrameworkCode: {
            react: `import { Alert, AlertTitle, AlertDescription } from "@fabioeducacross/ui";

<Alert className="w-[450px]">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="alert alert-info" style="width: 450px">
    <h5 class="alert-heading mb-2">Heads up!</h5>
    <p class="mb-0">
      You can add components to your app using the CLI.
    </p>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAlert class="w-[450px]">
    <EdAlertTitle>Heads up!</EdAlertTitle>
    <EdAlertDescription>
      You can add components to your app using the CLI.
    </EdAlertDescription>
  </EdAlert>
</template>

<script setup lang="ts">
import { EdAlert, EdAlertTitle, EdAlertDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Destructive alert for errors.
 */
export const Destructive: Story = {
    render: () => (
        <Alert variant="destructive" className="w-[450px]">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Something went wrong. Please try again.
            </AlertDescription>
        </Alert>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Alert, AlertTitle, AlertDescription } from "@fabioeducacross/ui";

<Alert variant="destructive" className="w-[450px]">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="alert alert-danger" style="width: 450px">
    <h5 class="alert-heading mb-2">Error</h5>
    <p class="mb-0">
      Something went wrong. Please try again.
    </p>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAlert variant="destructive" class="w-[450px]">
    <EdAlertTitle>Error</EdAlertTitle>
    <EdAlertDescription>
      Something went wrong. Please try again.
    </EdAlertDescription>
  </EdAlert>
</template>

<script setup lang="ts">
import { EdAlert, EdAlertTitle, EdAlertDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Success alert for positive feedback.
 */
export const Success: Story = {
    render: () => (
        <Alert variant="success" className="w-[450px]">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
                Your changes have been saved successfully.
            </AlertDescription>
        </Alert>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Alert, AlertTitle, AlertDescription } from "@fabioeducacross/ui";

<Alert variant="success" className="w-[450px]">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="alert alert-success" style="width: 450px">
    <h5 class="alert-heading mb-2">Success</h5>
    <p class="mb-0">
      Your changes have been saved successfully.
    </p>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAlert variant="success" class="w-[450px]">
    <EdAlertTitle>Success</EdAlertTitle>
    <EdAlertDescription>
      Your changes have been saved successfully.
    </EdAlertDescription>
  </EdAlert>
</template>

<script setup lang="ts">
import { EdAlert, EdAlertTitle, EdAlertDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Warning alert for caution messages.
 */
export const Warning: Story = {
    render: () => (
        <Alert variant="warning" className="w-[450px]">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
                Please review your input before continuing.
            </AlertDescription>
        </Alert>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Alert, AlertTitle, AlertDescription } from "@fabioeducacross/ui";

<Alert variant="warning" className="w-[450px]">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Please review your input before continuing.
  </AlertDescription>
</Alert>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="alert alert-warning" style="width: 450px">
    <h5 class="alert-heading mb-2">Warning</h5>
    <p class="mb-0">
      Please review your input before continuing.
    </p>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAlert variant="warning" class="w-[450px]">
    <EdAlertTitle>Warning</EdAlertTitle>
    <EdAlertDescription>
      Please review your input before continuing.
    </EdAlertDescription>
  </EdAlert>
</template>

<script setup lang="ts">
import { EdAlert, EdAlertTitle, EdAlertDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
