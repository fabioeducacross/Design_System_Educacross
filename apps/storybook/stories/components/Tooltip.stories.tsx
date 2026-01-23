import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
    Button,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component:
                    "Tooltip displays informative text when users hover over an element.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Default tooltip on hover.
 */
export const Default: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>This is a tooltip</p>
                </TooltipContent>
            </Tooltip>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from "@fabioeducacross/ui";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button 
    class="btn btn-outline-secondary" 
    data-bs-toggle="tooltip" 
    title="This is a tooltip"
  >
    Hover me
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTooltipProvider>
    <EdTooltip>
      <EdTooltipTrigger as-child>
        <EdButton variant="outline">Hover me</EdButton>
      </EdTooltipTrigger>
      <EdTooltipContent>
        <p>This is a tooltip</p>
      </EdTooltipContent>
    </EdTooltip>
  </EdTooltipProvider>
</template>

<script setup lang="ts">
import { EdTooltip, EdTooltipTrigger, EdTooltipContent, EdTooltipProvider, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Tooltips on different sides.
 */
export const Sides: Story = {
    render: () => (
        <div className="flex justify-center items-center gap-8 p-20">
            <Tooltip side="top">
                <TooltipTrigger asChild>
                    <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip on top</TooltipContent>
            </Tooltip>

            <Tooltip side="bottom">
                <TooltipTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip on bottom</TooltipContent>
            </Tooltip>

            <Tooltip side="left">
                <TooltipTrigger asChild>
                    <Button variant="outline">Left</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip on left</TooltipContent>
            </Tooltip>

            <Tooltip side="right">
                <TooltipTrigger asChild>
                    <Button variant="outline">Right</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip on right</TooltipContent>
            </Tooltip>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from "@fabioeducacross/ui";

<TooltipProvider>
  <Tooltip side="top">
    <TooltipTrigger asChild><Button>Top</Button></TooltipTrigger>
    <TooltipContent>Tooltip on top</TooltipContent>
  </Tooltip>
  <Tooltip side="bottom">
    <TooltipTrigger asChild><Button>Bottom</Button></TooltipTrigger>
    <TooltipContent>Tooltip on bottom</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top">Top</button>
    <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Bottom">Bottom</button>
    <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="Left">Left</button>
    <button class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="right" title="Right">Right</button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTooltipProvider>
    <EdTooltip side="top">
      <EdTooltipTrigger as-child><EdButton>Top</EdButton></EdTooltipTrigger>
      <EdTooltipContent>Tooltip on top</EdTooltipContent>
    </EdTooltip>
    <EdTooltip side="bottom">
      <EdTooltipTrigger as-child><EdButton>Bottom</EdButton></EdTooltipTrigger>
      <EdTooltipContent>Tooltip on bottom</EdTooltipContent>
    </EdTooltip>
  </EdTooltipProvider>
</template>

<script setup lang="ts">
import { EdTooltip, EdTooltipTrigger, EdTooltipContent, EdTooltipProvider, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Tooltip with custom delay.
 */
export const CustomDelay: Story = {
    render: () => (
        <div className="flex justify-center gap-4 p-20">
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Button variant="outline">No delay</Button>
                </TooltipTrigger>
                <TooltipContent>Shows immediately</TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                    <Button variant="outline">1s delay</Button>
                </TooltipTrigger>
                <TooltipContent>Shows after 1 second</TooltipContent>
            </Tooltip>
        </div>
    ),
};

/**
 * Tooltip with rich content.
 */
export const RichContent: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button>View Details</Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <div className="space-y-1">
                        <p className="font-semibold">Keyboard Shortcuts</p>
                        <p className="text-xs text-muted-foreground">
                            Press <kbd className="px-1 bg-muted rounded">Ctrl+K</kbd> to open
                            command palette
                        </p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from "@fabioeducacross/ui";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button>View Details</Button></TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <div>
        <p className="font-semibold">Keyboard Shortcuts</p>
        <p>Press <kbd>Ctrl+K</kbd> to open command palette</p>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button 
    class="btn btn-primary" 
    data-bs-toggle="tooltip" 
    data-bs-html="true" 
    title="<strong>Keyboard Shortcuts</strong><br>Press Ctrl+K"
  >
    View Details
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTooltipProvider>
    <EdTooltip>
      <EdTooltipTrigger as-child><EdButton>View Details</EdButton></EdTooltipTrigger>
      <EdTooltipContent class="max-w-xs">
        <div>
          <p class="font-semibold">Keyboard Shortcuts</p>
          <p>Press <kbd>Ctrl+K</kbd> to open command palette</p>
        </div>
      </EdTooltipContent>
    </EdTooltip>
  </EdTooltipProvider>
</template>

<script setup lang="ts">
import { EdTooltip, EdTooltipTrigger, EdTooltipContent, EdTooltipProvider, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Tooltip on icons.
 */
export const OnIcons: Story = {
    render: () => (
        <div className="flex justify-center gap-4 p-20">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="p-2 rounded hover:bg-accent">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                </TooltipTrigger>
                <TooltipContent>Add new item</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="p-2 rounded hover:bg-accent">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                    </button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="p-2 rounded hover:bg-accent text-destructive">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
            </Tooltip>
        </div>
    ),
};

/**
 * Tooltip on disabled elements.
 */
export const OnDisabled: Story = {
    render: () => (
        <div className="flex justify-center gap-4 p-20">
            <Tooltip>
                <TooltipTrigger>
                    <span>
                        <Button disabled>Disabled Button</Button>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    This action is currently unavailable
                </TooltipContent>
            </Tooltip>
        </div>
    ),
};
