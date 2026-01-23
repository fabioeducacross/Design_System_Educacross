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
    parameters: {
        multiFrameworkCode: {
            react: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@fabioeducacross/ui";

<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
          Is it accessible?
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show">
        <div class="accordion-body">
          Yes. It adheres to the WAI-ARIA design pattern.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
          Is it styled?
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse">
        <div class="accordion-body">
          Yes. It comes with default styles.
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAccordion type="single" default-value="item-1">
    <EdAccordionItem value="item-1">
      <EdAccordionTrigger>Is it accessible?</EdAccordionTrigger>
      <EdAccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </EdAccordionContent>
    </EdAccordionItem>
    <EdAccordionItem value="item-2">
      <EdAccordionTrigger>Is it styled?</EdAccordionTrigger>
      <EdAccordionContent>
        Yes. It comes with default styles.
      </EdAccordionContent>
    </EdAccordionItem>
  </EdAccordion>
</template>

<script setup lang="ts">
import { EdAccordion, EdAccordionItem, EdAccordionTrigger, EdAccordionContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@fabioeducacross/ui";

<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<!-- NOTA: Bootstrap accordion por padrão permite apenas 1 aberto. -->
<!-- Para múltiplos, remover data-bs-parent. -->
<template>
  <div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#section1">
          Section 1
        </button>
      </h2>
      <div id="section1" class="accordion-collapse collapse">
        <div class="accordion-body">Content for section 1.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#section2">
          Section 2
        </button>
      </h2>
      <div id="section2" class="accordion-collapse collapse">
        <div class="accordion-body">Content for section 2.</div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAccordion type="multiple">
    <EdAccordionItem value="item-1">
      <EdAccordionTrigger>Section 1</EdAccordionTrigger>
      <EdAccordionContent>Content for section 1.</EdAccordionContent>
    </EdAccordionItem>
    <EdAccordionItem value="item-2">
      <EdAccordionTrigger>Section 2</EdAccordionTrigger>
      <EdAccordionContent>Content for section 2.</EdAccordionContent>
    </EdAccordionItem>
  </EdAccordion>
</template>

<script setup lang="ts">
import { EdAccordion, EdAccordionItem, EdAccordionTrigger, EdAccordionContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Collapsible accordion - can close all items.
 */
export const Collapsible: Story = {
    render: () => (
        <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
                <AccordionTrigger>Collapsible Item 1</AccordionTrigger>
                <AccordionContent>
                    This accordion can close all items when you click the active item again.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Collapsible Item 2</AccordionTrigger>
                <AccordionContent>
                    Try clicking an active item to close it completely.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@fabioeducacross/ui";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Collapsible Item 1</AccordionTrigger>
    <AccordionContent>
      This accordion can close all items.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Collapsible Item 2</AccordionTrigger>
    <AccordionContent>
      Try clicking an active item to close it.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="accordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
          Collapsible Item 1
        </button>
      </h2>
      <div id="collapse1" class="accordion-collapse collapse">
        <div class="accordion-body">This accordion can close all items.</div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdAccordion type="single" collapsible>
    <EdAccordionItem value="item-1">
      <EdAccordionTrigger>Collapsible Item 1</EdAccordionTrigger>
      <EdAccordionContent>This accordion can close all items.</EdAccordionContent>
    </EdAccordionItem>
  </EdAccordion>
</template>

<script setup lang="ts">
import { EdAccordion, EdAccordionItem, EdAccordionTrigger, EdAccordionContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
