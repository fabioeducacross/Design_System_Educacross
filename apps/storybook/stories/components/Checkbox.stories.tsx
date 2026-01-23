import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Checkbox allows users to select one or more options from a list.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "The size of the checkbox",
        },
        variant: {
            control: "select",
            options: ["default", "error"],
            description: "The visual variant",
        },
        label: {
            control: "text",
            description: "Label text",
        },
        description: {
            control: "text",
            description: "Description text below the label",
        },
        error: {
            control: "text",
            description: "Error message",
        },
        disabled: {
            control: "boolean",
            description: "Whether the checkbox is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with label.
 */
export const Default: Story = {
    args: {
        label: "Accept terms and conditions",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<Checkbox label="Accept terms and conditions" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="terms" />
    <label class="form-check-label" for="terms">
      Accept terms and conditions
    </label>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox label="Accept terms and conditions" />
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checked checkbox state.
 */
export const Checked: Story = {
    args: {
        label: "I agree to the terms",
        defaultChecked: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<Checkbox label="I agree to the terms" defaultChecked={true} />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="agree" checked />
    <label class="form-check-label" for="agree">
      I agree to the terms
    </label>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox label="I agree to the terms" :default-checked="true" />
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Indeterminate checkbox state (partial selection).
 */
export const Indeterminate: Story = {
    render: () => {
        const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
        return (
            <Checkbox
                label="Select all items"
                checked={checked === true}
                indeterminate={checked === "indeterminate"}
                onChange={(e) => setChecked(e.target.checked)}
            />
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";
import { useState } from "react";

function IndeterminateExample() {
  const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
  
  return (
    <Checkbox
      label="Select all items"
      checked={checked === true}
      indeterminate={checked === "indeterminate"}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap + JavaScript -->
<template>
  <div class="form-check">
    <input 
      class="form-check-input" 
      type="checkbox" 
      id="selectAll"
      ref="checkbox"
      @change="handleChange"
    />
    <label class="form-check-label" for="selectAll">
      Select all items
    </label>
  </div>
</template>

<script>
export default {
  mounted() {
    // Set indeterminate state via DOM
    this.$refs.checkbox.indeterminate = true;
  },
  methods: {
    handleChange(e) {
      e.target.indeterminate = false;
    }
  }
}
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox
    label="Select all items"
    :checked="checked === true"
    :indeterminate="checked === 'indeterminate'"
    @change="(e) => checked = e.target.checked"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdCheckbox } from "@fabioeducacross/ui-vue3";

const checked = ref<boolean | 'indeterminate'>('indeterminate');
</script>`,
        },
    },
};

/**
 * Checkbox with description.
 */
export const WithDescription: Story = {
    args: {
        label: "Marketing emails",
        description: "Receive emails about new products and features.",
    },
};

/**
 * Controlled checkbox example.
 */
export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <div className="space-y-4">
                <Checkbox
                    label="Controlled checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <p className="text-sm text-muted-foreground">
                    Checked: {checked ? "Yes" : "No"}
                </p>
            </div>
        );
    },
};

/**
 * All checkbox sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Checkbox size="sm" label="Small checkbox" />
            <Checkbox size="default" label="Default checkbox" />
            <Checkbox size="lg" label="Large checkbox" />
        </div>
    ),
};

/**
 * Checkbox states.
 */
export const States: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled & Checked" disabled defaultChecked />
        </div>
    ),
};

/**
 * Checkbox with error.
 */
export const WithError: Story = {
    args: {
        label: "Accept terms",
        error: "You must accept the terms to continue.",
    },
};

/**
 * Checkbox group for multiple selections.
 */
export const CheckboxGroup: Story = {
    render: () => (
        <div className="space-y-4">
            <p className="font-medium">Select your interests:</p>
            <div className="space-y-2">
                <Checkbox label="Technology" />
                <Checkbox label="Design" />
                <Checkbox label="Business" />
                <Checkbox label="Marketing" />
            </div>
        </div>
    ),
};

/**
 * Checkbox in a form with complex layout.
 */
export const InForm: Story = {
    render: () => (
        <div className="w-[400px] space-y-4">
            <div className="rounded-lg border p-4">
                <Checkbox
                    label="Enable notifications"
                    description="Get notified when someone mentions you."
                />
            </div>
            <div className="rounded-lg border p-4">
                <Checkbox
                    label="Enable analytics"
                    description="Help us improve by sending anonymous usage data."
                />
            </div>
            <div className="rounded-lg border p-4">
                <Checkbox
                    label="Enable two-factor authentication"
                    description="Add an extra layer of security to your account."
                />
            </div>
        </div>
    ),
};
