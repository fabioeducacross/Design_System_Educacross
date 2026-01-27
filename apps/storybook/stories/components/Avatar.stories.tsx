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
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarImage, AvatarFallback } from "@fabioeducacross/ui";

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="avatar">
    <img 
      src="https://github.com/shadcn.png" 
      alt="User avatar"
      class="rounded-circle"
      style="width: 40px; height: 40px; object-fit: cover;"
    />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatar>
    <EdAvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
    <EdAvatarFallback>CN</EdAvatarFallback>
  </EdAvatar>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarImage, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarImage, AvatarFallback } from "@fabioeducacross/ui";

<Avatar>
  <AvatarImage src="invalid-url.jpg" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div 
    class="avatar rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
    style="width: 40px; height: 40px; font-size: 16px; font-weight: 500;"
  >
    JD
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatar>
    <EdAvatarImage src="invalid-url.jpg" alt="User avatar" />
    <EdAvatarFallback>JD</EdAvatarFallback>
  </EdAvatar>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarImage, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Avatar with only fallback (no image).
 */
export const WithFallback: Story = {
    render: () => (
        <Avatar>
            <AvatarFallback>AB</AvatarFallback>
        </Avatar>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarFallback } from "@fabioeducacross/ui";

<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div 
    class="avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
    style="width: 40px; height: 40px; font-size: 16px; font-weight: 500;"
  >
    AB
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAvatar>
    <EdAvatarFallback>AB</EdAvatarFallback>
  </EdAvatar>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarFallback } from "@fabioeducacross/ui";

<div className="flex items-end gap-4">
  <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
  <Avatar size="default"><AvatarFallback>DF</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-end gap-3">
    <img src="/logo-educacross.svg" class="rounded-circle" style="width: 32px; height: 32px;" />
    <img src="/logo-educacross.svg" class="rounded-circle" style="width: 40px; height: 40px;" />
    <img src="/logo-educacross.svg" class="rounded-circle" style="width: 48px; height: 48px;" />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-end gap-4">
    <EdAvatar size="sm"><EdAvatarFallback>SM</EdAvatarFallback></EdAvatar>
    <EdAvatar size="default"><EdAvatarFallback>DF</EdAvatarFallback></EdAvatar>
    <EdAvatar size="lg"><EdAvatarFallback>LG</EdAvatarFallback></EdAvatar>
  </div>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarImage, AvatarFallback } from "@fabioeducacross/ui";

<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarImage src="/logo-educacross.svg" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex" style="margin-left: -1rem;">
    <img src="/logo-educacross.svg" class="rounded-circle border border-white" style="width: 40px; height: 40px; margin-left: -0.5rem;" />
    <img src="/logo-educacross.svg" class="rounded-circle border border-white" style="width: 40px; height: 40px; margin-left: -0.5rem;" />
    <span class="rounded-circle border border-white bg-secondary text-white d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; margin-left: -0.5rem;">+5</span>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex -space-x-4">
    <EdAvatar class="border-2 border-background">
      <EdAvatarImage src="/logo-educacross.svg" />
      <EdAvatarFallback>U1</EdAvatarFallback>
    </EdAvatar>
    <EdAvatar class="border-2 border-background">
      <EdAvatarFallback>U2</EdAvatarFallback>
    </EdAvatar>
    <EdAvatar class="border-2 border-background">
      <EdAvatarFallback>+5</EdAvatarFallback>
    </EdAvatar>
  </div>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarImage, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarFallback } from "@fabioeducacross/ui";

<div className="relative">
  <Avatar><AvatarFallback>ON</AvatarFallback></Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="position-relative d-inline-block">
    <img src="/logo-educacross.svg" class="rounded-circle" style="width: 40px; height: 40px;" />
    <span class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white" style="width: 12px; height: 12px;"></span>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="relative">
    <EdAvatar><EdAvatarFallback>ON</EdAvatarFallback></EdAvatar>
    <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
  </div>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Avatar, AvatarImage, AvatarFallback } from "@fabioeducacross/ui";

<div className="flex items-center gap-4 rounded-lg border p-4">
  <Avatar size="lg">
    <AvatarImage src="/logo-educacross.svg" alt="John Doe" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <div>
    <p className="font-medium">John Doe</p>
    <p className="text-sm text-muted-foreground">john@example.com</p>
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="card">
    <div class="card-body d-flex align-items-center gap-3">
      <img src="/logo-educacross.svg" class="rounded-circle" style="width: 48px; height: 48px;" />
      <div>
        <div class="fw-semibold">John Doe</div>
        <div class="text-muted small">john@example.com</div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center gap-4 rounded-lg border p-4">
    <EdAvatar size="lg">
      <EdAvatarImage src="/logo-educacross.svg" alt="John Doe" />
      <EdAvatarFallback>JD</EdAvatarFallback>
    </EdAvatar>
    <div>
      <p class="font-medium">John Doe</p>
      <p class="text-sm text-muted-foreground">john@example.com</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdAvatar, EdAvatarImage, EdAvatarFallback } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
