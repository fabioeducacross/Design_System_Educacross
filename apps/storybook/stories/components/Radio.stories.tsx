import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, Radio } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/Radio",
    component: RadioGroup,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Radio allows users to select one option from a list of mutually exclusive choices.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Whether the radio group is disabled",
        },
        error: {
            control: "boolean",
            description: "Whether the radio group has an error",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group.
 */
export const Default: Story = {
    render: () => (
        <RadioGroup name="plan" defaultValue="basic">
            <Radio value="basic" label="Basic" />
            <Radio value="pro" label="Pro" />
            <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="plan" defaultValue="basic">
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan" id="basic" value="basic" checked />
      <label class="form-check-label" for="basic">
        Basic
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan" id="pro" value="pro" />
      <label class="form-check-label" for="pro">
        Pro
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan" id="enterprise" value="enterprise" />
      <label class="form-check-label" for="enterprise">
        Enterprise
      </label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="plan" default-value="basic">
    <EdRadio value="basic" label="Basic" />
    <EdRadio value="pro" label="Pro" />
    <EdRadio value="enterprise" label="Enterprise" />
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checked radio state example.
 */
export const Checked: Story = {
    render: () => (
        <RadioGroup name="plan-checked" defaultValue="pro">
            <Radio value="basic" label="Basic" />
            <Radio value="pro" label="Pro" />
            <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="plan-checked" defaultValue="pro">
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-checked" id="basic2" value="basic" />
      <label class="form-check-label" for="basic2">
        Basic
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-checked" id="pro2" value="pro" checked />
      <label class="form-check-label" for="pro2">
        Pro
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-checked" id="enterprise2" value="enterprise" />
      <label class="form-check-label" for="enterprise2">
        Enterprise
      </label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="plan-checked" default-value="pro">
    <EdRadio value="basic" label="Basic" />
    <EdRadio value="pro" label="Pro" />
    <EdRadio value="enterprise" label="Enterprise" />
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Radio with descriptions.
 */
export const WithDescriptions: Story = {
    render: () => (
        <RadioGroup name="plan-desc" defaultValue="basic">
            <Radio
                value="basic"
                label="Basic"
                description="Perfect for getting started"
            />
            <Radio
                value="pro"
                label="Pro"
                description="Best for growing teams"
            />
            <Radio
                value="enterprise"
                label="Enterprise"
                description="For large organizations"
            />
        </RadioGroup>
    ),
};

/**
 * Controlled radio group.
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("option1");
        return (
            <div className="space-y-4">
                <RadioGroup
                    name="controlled"
                    value={value}
                    onValueChange={setValue}
                >
                    <Radio value="option1" label="Option 1" />
                    <Radio value="option2" label="Option 2" />
                    <Radio value="option3" label="Option 3" />
                </RadioGroup>
                <p className="text-sm text-muted-foreground">
                    Selected: {value}
                </p>
            </div>
        );
    },
};

/**
 * Radio sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <RadioGroup name="size-sm" defaultValue="a">
                <Radio value="a" label="Small radio" size="sm" />
            </RadioGroup>
            <RadioGroup name="size-default" defaultValue="b">
                <Radio value="b" label="Default radio" size="default" />
            </RadioGroup>
            <RadioGroup name="size-lg" defaultValue="c">
                <Radio value="c" label="Large radio" size="lg" />
            </RadioGroup>
        </div>
    ),
};

/**
 * Disabled radio group.
 */
export const Disabled: Story = {
    render: () => (
        <RadioGroup name="disabled-group" defaultValue="option1" disabled>
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
        </RadioGroup>
    ),
};

/**
 * Radio group with error state.
 */
export const WithError: Story = {
    render: () => (
        <div className="space-y-2">
            <RadioGroup name="error-group" error>
                <Radio value="option1" label="Option 1" />
                <Radio value="option2" label="Option 2" />
                <Radio value="option3" label="Option 3" />
            </RadioGroup>
            <p className="text-sm text-destructive">
                Please select an option.
            </p>
        </div>
    ),
};

/**
 * Radio group in a card layout.
 */
export const CardLayout: Story = {
    render: () => (
        <RadioGroup name="card-layout" defaultValue="starter" className="gap-4">
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Radio value="starter" className="mt-1" />
                <div>
                    <p className="font-medium">Starter</p>
                    <p className="text-sm text-muted-foreground">
                        Up to 5 users, 10GB storage
                    </p>
                    <p className="mt-2 font-semibold">$9/month</p>
                </div>
            </label>
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Radio value="professional" className="mt-1" />
                <div>
                    <p className="font-medium">Professional</p>
                    <p className="text-sm text-muted-foreground">
                        Up to 20 users, 50GB storage
                    </p>
                    <p className="mt-2 font-semibold">$29/month</p>
                </div>
            </label>
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Radio value="enterprise" className="mt-1" />
                <div>
                    <p className="font-medium">Enterprise</p>
                    <p className="text-sm text-muted-foreground">
                        Unlimited users, unlimited storage
                    </p>
                    <p className="mt-2 font-semibold">Contact us</p>
                </div>
            </label>
        </RadioGroup>
    ),
};
