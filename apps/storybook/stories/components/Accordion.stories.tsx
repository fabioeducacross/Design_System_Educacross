import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Accordion displays collapsible content panels for presenting information in a limited amount of space.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/**
 * Default single-mode accordion.
 */
export const Default: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-1" className="w-full max-w-md">
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern for accordions.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the Educacross design system.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default with smooth open/close transitions.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify default open item content is visible
        await expect(canvas.getByText(/adheres to the wai-aria/i)).toBeVisible();

        // Click on second trigger to switch
        const secondTrigger = canvas.getByRole("button", { name: /is it styled/i });
        await userEvent.click(secondTrigger);

        // Verify second content is now visible
        await expect(canvas.getByText(/default styles that matches/i)).toBeVisible();
    },
};

/**
 * Multiple items can be open at once.
 */
export const Multiple: Story = {
    render: () => (
        <Accordion type="multiple" className="w-full max-w-md">
            <AccordionItem value="item-1">
                <AccordionTrigger>Section 1</AccordionTrigger>
                <AccordionContent>
                    Content for section 1. Multiple sections can be open simultaneously.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Section 2</AccordionTrigger>
                <AccordionContent>
                    Content for section 2. Click to toggle each section independently.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Section 3</AccordionTrigger>
                <AccordionContent>
                    Content for section 3. All three can be open at the same time.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * Controlled accordion with external state.
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState<string>("");

        return (
            <div className="space-y-4 max-w-md">
                <div className="flex gap-2 flex-wrap">
                    <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => setValue("item-1")}
                    >
                        Open 1
                    </button>
                    <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => setValue("item-2")}
                    >
                        Open 2
                    </button>
                    <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => setValue("")}
                    >
                        Close All
                    </button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Expanded: {value || "none"}
                </p>

                <Accordion
                    type="single"
                    value={value}
                    onValueChange={(v) => setValue(v as string)}
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger>First Section</AccordionTrigger>
                        <AccordionContent>
                            This is controlled externally.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Second Section</AccordionTrigger>
                        <AccordionContent>
                            Use the buttons above to control this accordion.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    },
};

/**
 * Card variant with separated items.
 */
export const CardVariant: Story = {
    render: () => (
        <Accordion type="single" variant="card" className="w-full max-w-md">
            <AccordionItem value="item-1" variant="card">
                <AccordionTrigger className="px-4">What is your refund policy?</AccordionTrigger>
                <AccordionContent className="px-4">
                    We offer a 30-day money-back guarantee for all purchases. If you're not
                    satisfied, contact our support team for a full refund.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" variant="card">
                <AccordionTrigger className="px-4">How do I contact support?</AccordionTrigger>
                <AccordionContent className="px-4">
                    You can reach our support team via email at support@example.com or through
                    our live chat feature available 24/7.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" variant="card">
                <AccordionTrigger className="px-4">Can I upgrade my plan?</AccordionTrigger>
                <AccordionContent className="px-4">
                    Yes! You can upgrade your plan at any time from your account settings. The
                    new plan will be prorated for the remaining billing period.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * Non-collapsible accordion (always one item open).
 */
export const NonCollapsible: Story = {
    render: () => (
        <Accordion
            type="single"
            defaultValue="item-1"
            collapsible={false}
            className="w-full max-w-md"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Always One Open</AccordionTrigger>
                <AccordionContent>
                    At least one item must always be open. Try clicking the same trigger again.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Cannot Close All</AccordionTrigger>
                <AccordionContent>
                    This behavior is useful for navigation or when content must always be visible.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * FAQ section example.
 */
export const FAQ: Story = {
    render: () => (
        <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" defaultValue="faq-1">
                <AccordionItem value="faq-1">
                    <AccordionTrigger>What is Educacross?</AccordionTrigger>
                    <AccordionContent>
                        Educacross is an educational platform designed to provide interactive
                        learning experiences for students of all ages. Our gamified approach
                        makes learning engaging and effective.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                    <AccordionTrigger>How much does it cost?</AccordionTrigger>
                    <AccordionContent>
                        We offer flexible pricing plans starting from free tier for individual
                        learners to enterprise plans for schools and organizations. Visit our
                        pricing page for detailed information.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                    <AccordionTrigger>Is there a mobile app?</AccordionTrigger>
                    <AccordionContent>
                        Yes! Educacross is available on iOS and Android devices. Download from
                        the App Store or Google Play to learn on the go.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                    <AccordionTrigger>How do I get started?</AccordionTrigger>
                    <AccordionContent>
                        Simply create an account, choose your learning path, and start
                        exploring! Our onboarding wizard will guide you through the initial
                        setup.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};
