import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    Button,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Card is a container component for grouping related content and actions.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "elevated", "outline", "interactive"],
            description: "The visual style of the card",
        },
        padding: {
            control: "select",
            options: ["none", "sm", "default", "lg"],
            description: "The padding inside the card",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card with all sub-components.
 */
export const Default: Story = {
    render: (args) => (
        <Card {...args} className="w-[350px]">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                    Card description with additional context.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    This is the main content area of the card. You can place any
                    content here.
                </p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
            </CardFooter>
        </Card>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button 
} from "@fabioeducacross/ui";

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      Card description with additional context.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the main content area of the card.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="card" style="width: 350px">
    <div class="card-header">
      <h5 class="card-title mb-1">Card Title</h5>
      <p class="card-text text-muted mb-0">
        Card description with additional context.
      </p>
    </div>
    <div class="card-body">
      <p>This is the main content area of the card.</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <button class="btn btn-outline-primary">Cancel</button>
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCard class="w-[350px]">
    <EdCardHeader>
      <EdCardTitle>Card Title</EdCardTitle>
      <EdCardDescription>
        Card description with additional context.
      </EdCardDescription>
    </EdCardHeader>
    <EdCardContent>
      <p>This is the main content area of the card.</p>
    </EdCardContent>
    <EdCardFooter class="flex justify-between">
      <EdButton variant="outline">Cancel</EdButton>
      <EdButton>Save</EdButton>
    </EdCardFooter>
  </EdCard>
</template>

<script setup lang="ts">
import { 
  EdCard, 
  EdCardHeader, 
  EdCardTitle, 
  EdCardDescription, 
  EdCardContent, 
  EdCardFooter,
  EdButton 
} from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Elevated card with shadow.
 */
export const Elevated: Story = {
    render: () => (
        <Card variant="elevated" className="w-[350px]">
            <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>
                    This card has a shadow that increases on hover.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Hover over this card to see the shadow effect.</p>
            </CardContent>
        </Card>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@fabioeducacross/ui";

<Card variant="elevated" className="w-[350px]">
  <CardHeader>
    <CardTitle>Elevated Card</CardTitle>
    <CardDescription>
      This card has a shadow that increases on hover.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Hover over this card to see the shadow effect.</p>
  </CardContent>
</Card>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="card shadow-sm" style="width: 350px">
    <div class="card-header">
      <h5 class="card-title mb-1">Elevated Card</h5>
      <p class="card-text text-muted mb-0">
        This card has a shadow that increases on hover.
      </p>
    </div>
    <div class="card-body">
      <p>Hover over this card to see the shadow effect.</p>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCard variant="elevated" class="w-[350px]">
    <EdCardHeader>
      <EdCardTitle>Elevated Card</EdCardTitle>
      <EdCardDescription>
        This card has a shadow that increases on hover.
      </EdCardDescription>
    </EdCardHeader>
    <EdCardContent>
      <p>Hover over this card to see the shadow effect.</p>
    </EdCardContent>
  </EdCard>
</template>

<script setup lang="ts">
import { 
  EdCard, 
  EdCardHeader, 
  EdCardTitle, 
  EdCardDescription, 
  EdCardContent 
} from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Interactive card that responds to hover.
 */
export const Interactive: Story = {
    render: () => (
        <Card variant="interactive" className="w-[350px]">
            <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>
                    Click this card to perform an action.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>This card is clickable and has hover states.</p>
            </CardContent>
        </Card>
    ),
};

/**
 * Outline card without shadow.
 */
export const Outline: Story = {
    render: () => (
        <Card variant="outline" className="w-[350px]">
            <CardHeader>
                <CardTitle>Outline Card</CardTitle>
                <CardDescription>A simple bordered card.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>No shadow, just a clean border.</p>
            </CardContent>
        </Card>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@fabioeducacross/ui";

<Card variant="outline" className="w-[350px]">
  <CardHeader>
    <CardTitle>Outline Card</CardTitle>
    <CardDescription>A simple bordered card.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>No shadow, just a clean border.</p>
  </CardContent>
</Card>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="card border" style="width: 350px">
    <div class="card-header bg-transparent">
      <h5 class="card-title mb-1">Outline Card</h5>
      <p class="card-text text-muted mb-0">
        A simple bordered card.
      </p>
    </div>
    <div class="card-body">
      <p>No shadow, just a clean border.</p>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCard variant="outline" class="w-[350px]">
    <EdCardHeader>
      <EdCardTitle>Outline Card</EdCardTitle>
      <EdCardDescription>
        A simple bordered card.
      </EdCardDescription>
    </EdCardHeader>
    <EdCardContent>
      <p>No shadow, just a clean border.</p>
    </EdCardContent>
  </EdCard>
</template>

<script setup lang="ts">
import { 
  EdCard, 
  EdCardHeader, 
  EdCardTitle, 
  EdCardDescription, 
  EdCardContent 
} from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Cards with different padding sizes.
 */
export const Padding: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Card padding="sm" className="w-[350px]">
                <CardTitle>Small Padding</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Compact card with less padding.
                </p>
            </Card>
            <Card padding="default" className="w-[350px]">
                <CardTitle>Default Padding</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Standard padding for most use cases.
                </p>
            </Card>
            <Card padding="lg" className="w-[350px]">
                <CardTitle>Large Padding</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Spacious card with more breathing room.
                </p>
            </Card>
        </div>
    ),
};

/**
 * Card used as a form container.
 */
export const FormCard: Story = {
    render: () => (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                    Enter your details to create a new account.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        placeholder="John Doe"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Create Account</Button>
            </CardFooter>
        </Card>
    ),
};
