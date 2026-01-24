import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "@fabioeducacross/ui";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
O **Divider** separa visualmente conteúdos em seções.

## Características
- ✅ 2 orientações: horizontal, vertical
- ✅ 3 espessuras: thin, medium, thick
- ✅ Suporte a texto no centro (apenas horizontal)
- ✅ Acessível: role="separator", aria-orientation
- ✅ Tokens semânticos do Figma
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the divider",
    },
    thickness: {
      control: "select",
      options: ["thin", "medium", "thick"],
      description: "Thickness of the divider",
    },
    text: {
      control: "text",
      description: "Optional text to display in the center (horizontal only)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default horizontal divider.
 */
export const Default: Story = {
  args: {},
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<Divider />`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <hr class="border-top" />
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDivider />
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Horizontal divider (explicit).
 */
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<Divider orientation="horizontal" />`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <hr class="border-top" />
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDivider orientation="horizontal" />
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Vertical divider between elements.
 */
export const Vertical: Story = {
  render: (args: React.ComponentProps<typeof Divider>) => (
    <div className="flex items-center gap-4 h-24">
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
  args: {
    orientation: "vertical",
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<div className="flex items-center gap-4 h-24">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3" style="height: 96px">
    <span>Left</span>
    <div class="vr"></div>
    <span>Right</span>
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center gap-4 h-24">
    <span>Left</span>
    <EdDivider orientation="vertical" />
    <span>Right</span>
  </div>
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Divider with text in the center.
 */
export const WithText: Story = {
  args: {
    text: "OR",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<Divider text="OR" />`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3">
    <hr class="flex-grow-1" />
    <span class="text-muted small">OR</span>
    <hr class="flex-grow-1" />
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDivider text="OR" />
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Divider with longer text.
 */
export const WithLongerText: Story = {
  args: {
    text: "Continue with email",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<Divider text="Continue with email" />`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3">
    <hr class="flex-grow-1" />
    <span class="text-muted small">Continue with email</span>
    <hr class="flex-grow-1" />
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDivider text="Continue with email" />
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Different thickness options.
 */
export const Thickness: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Thin</p>
        <Divider thickness="thin" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium</p>
        <Divider thickness="medium" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Thick</p>
        <Divider thickness="thick" />
      </div>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<div className="space-y-4">
  <Divider thickness="thin" />
  <Divider thickness="medium" />
  <Divider thickness="thick" />
</div>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <hr class="border-top" />
    <hr class="border-top border-2" />
    <hr class="border-top border-3" />
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdDivider thickness="thin" />
    <EdDivider thickness="medium" />
    <EdDivider thickness="thick" />
  </div>
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Practical example: Login form with social auth divider.
 */
export const InLoginForm: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <button className="w-full py-2 border rounded hover:bg-accent">
        Continue with Google
      </button>
      <button className="w-full py-2 border rounded hover:bg-accent">
        Continue with GitHub
      </button>
      <Divider text="OR" />
      <button className="w-full py-2 border rounded hover:bg-accent">
        Continue with Email
      </button>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `import { Divider } from "@fabioeducacross/ui";

<div className="space-y-4">
  <button className="w-full py-2 border rounded">
    Continue with Google
  </button>
  <button className="w-full py-2 border rounded">
    Continue with GitHub
  </button>
  <Divider text="OR" />
  <button className="w-full py-2 border rounded">
    Continue with Email
  </button>
</div>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <button class="btn btn-outline-secondary">
      Continue with Google
    </button>
    <button class="btn btn-outline-secondary">
      Continue with GitHub
    </button>
    <div class="d-flex align-items-center gap-3">
      <hr class="flex-grow-1" />
      <span class="text-muted small">OR</span>
      <hr class="flex-grow-1" />
    </div>
    <button class="btn btn-outline-secondary">
      Continue with Email
    </button>
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <button class="w-full py-2 border rounded">
      Continue with Google
    </button>
    <button class="w-full py-2 border rounded">
      Continue with GitHub
    </button>
    <EdDivider text="OR" />
    <button class="w-full py-2 border rounded">
      Continue with Email
    </button>
  </div>
</template>

<script setup lang="ts">
import { EdDivider } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};
