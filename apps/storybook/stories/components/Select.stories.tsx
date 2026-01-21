import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Select } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Select allows users to choose one option from a dropdown list.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "error"],
            description: "The visual variant",
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "The size of the select",
        },
        placeholder: {
            control: "text",
            description: "Placeholder text",
        },
        disabled: {
            control: "boolean",
            description: "Whether the select is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
];

/**
 * Default select with placeholder.
 */
export const Default: Story = {
    args: {
        placeholder: "Select a fruit",
        options: fruitOptions,
        className: "w-[200px]",
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify select is visible with placeholder
        const select = canvas.getByRole("combobox");
        await expect(select).toBeVisible();

        // Click to open and select an option
        await userEvent.selectOptions(select, "apple");
        await expect(select).toHaveValue("apple");
    },
};

/**
 * Select with pre-selected value.
 */
export const WithValue: Story = {
    args: {
        options: fruitOptions,
        defaultValue: "banana",
        className: "w-[200px]",
    },
};

/**
 * Controlled select.
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("");
        return (
            <div className="space-y-4">
                <Select
                    options={fruitOptions}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Select a fruit"
                    className="w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                    Selected: {value || "None"}
                </p>
            </div>
        );
    },
};

/**
 * All select sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Select
                size="sm"
                options={fruitOptions}
                placeholder="Small"
                className="w-[200px]"
            />
            <Select
                size="default"
                options={fruitOptions}
                placeholder="Default"
                className="w-[200px]"
            />
            <Select
                size="lg"
                options={fruitOptions}
                placeholder="Large"
                className="w-[200px]"
            />
        </div>
    ),
};

/**
 * Disabled select.
 */
export const Disabled: Story = {
    args: {
        options: fruitOptions,
        placeholder: "Select a fruit",
        disabled: true,
        className: "w-[200px]",
    },
};

/**
 * Select with error.
 */
export const WithError: Story = {
    args: {
        options: fruitOptions,
        placeholder: "Select a fruit",
        error: "Please select a fruit.",
        className: "w-[200px]",
    },
};

/**
 * Select with disabled options.
 */
export const DisabledOptions: Story = {
    args: {
        placeholder: "Select a plan",
        options: [
            { value: "free", label: "Free" },
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro (Coming Soon)", disabled: true },
            {
                value: "enterprise",
                label: "Enterprise (Coming Soon)",
                disabled: true,
            },
        ],
        className: "w-[250px]",
    },
};

/**
 * Select in a form layout.
 */
export const InForm: Story = {
    render: () => (
        <div className="w-[300px] space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="country">
                    Country
                </label>
                <Select
                    id="country"
                    placeholder="Select your country"
                    options={[
                        { value: "br", label: "Brazil" },
                        { value: "us", label: "United States" },
                        { value: "uk", label: "United Kingdom" },
                        { value: "de", label: "Germany" },
                        { value: "fr", label: "France" },
                    ]}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="language">
                    Language
                </label>
                <Select
                    id="language"
                    placeholder="Select language"
                    options={[
                        { value: "pt", label: "Portuguese" },
                        { value: "en", label: "English" },
                        { value: "es", label: "Spanish" },
                        { value: "de", label: "German" },
                    ]}
                />
            </div>
        </div>
    ),
};
