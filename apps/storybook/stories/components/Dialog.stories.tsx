import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    Button,
    Input,
    Label,
} from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Dialog (Modal) displays content in a layer above the main page, requiring user interaction.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dialog with trigger button.
 */
export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>Content</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Verificar botão de trigger visível", async () => {
            const triggerButton = canvas.getByRole("button", { name: /open dialog/i });
            await expect(triggerButton).toBeVisible();
            await expect(triggerButton).toBeEnabled();
        });

        await step("Abrir dialog", async () => {
            const triggerButton = canvas.getByRole("button", { name: /open dialog/i });
            await userEvent.click(triggerButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar overlay e dialog visíveis", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
            await expect(dialog).toHaveAttribute("aria-modal", "true");
        });

        await step("Verificar estrutura do dialog", async () => {
            const title = body.getByText("Dialog Title");
            await expect(title).toBeVisible();
            
            const content = body.getByText("Content");
            await expect(content).toBeVisible();
            
            const closeButton = body.getByRole("button", { name: /^close$/i });
            await expect(closeButton).toBeVisible();
            
            const saveButton = body.getByRole("button", { name: /save changes/i });
            await expect(saveButton).toBeVisible();
        });

        await step("Verificar botão de fechar (X) no canto", async () => {
            const dialog = body.getByRole("dialog");
            const closeXButton = dialog.querySelector('button[aria-label="Close"]');
            await expect(closeXButton).toBeInTheDocument();
        });

        await step("Fechar dialog pelo botão Close", async () => {
            const closeButton = body.getByRole("button", { name: /^close$/i });
            await userEvent.click(closeButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};

/**
 * Controlled dialog with state management.
 */
export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <div className="space-y-4">
                <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Controlled Dialog</DialogTitle>
                            <DialogDescription>
                                This dialog is controlled by React state.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => setOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog controlado", async () => {
            const openButton = canvas.getByRole("button", { name: /open controlled dialog/i });
            await userEvent.click(openButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog aberto", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
            await expect(body.getByText("Controlled Dialog")).toBeVisible();
        });

        await step("Fechar dialog programaticamente", async () => {
            const closeButton = body.getByRole("button", { name: /^close$/i });
            await userEvent.click(closeButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};

/**
 * Dialog sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Small</Button>
                </DialogTrigger>
                <DialogContent size="sm">
                    <DialogHeader>
                        <DialogTitle>Small Dialog</DialogTitle>
                        <DialogDescription>This is a small dialog.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Default</Button>
                </DialogTrigger>
                <DialogContent size="default">
                    <DialogHeader>
                        <DialogTitle>Default Dialog</DialogTitle>
                        <DialogDescription>This is a default-sized dialog.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Large</Button>
                </DialogTrigger>
                <DialogContent size="lg">
                    <DialogHeader>
                        <DialogTitle>Large Dialog</DialogTitle>
                        <DialogDescription>This is a large dialog with more space for content.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog pequeno", async () => {
            const smallButton = canvas.getByRole("button", { name: /^small$/i });
            await userEvent.click(smallButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog pequeno", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
            await expect(body.getByText("Small Dialog")).toBeVisible();
        });

        await step("Fechar dialog pequeno", async () => {
            const dialog = body.getByRole("dialog");
            const closeButton = dialog.querySelector('button[aria-label="Close"]');
            await userEvent.click(closeButton as Element);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};

/**
 * Dialog with form.
 */
export const WithForm: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 px-6 pb-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue="john@example.com"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog com formulário", async () => {
            const editButton = canvas.getByRole("button", { name: /edit profile/i });
            await userEvent.click(editButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar campos do formulário", async () => {
            const nameInput = await body.findByLabelText(/name/i, {}, { timeout: 2000 });
            await expect(nameInput).toBeVisible();
            await expect(nameInput).toHaveValue("John Doe");

            const emailInput = body.getByLabelText(/email/i);
            await expect(emailInput).toBeVisible();
            await expect(emailInput).toHaveValue("john@example.com");
        });

        await step("Interagir com os campos", async () => {
            const nameInput = body.getByLabelText(/name/i);
            await userEvent.clear(nameInput);
            await userEvent.type(nameInput, "Jane Smith");
            await expect(nameInput).toHaveValue("Jane Smith");
        });

        await step("Verificar botões do footer", async () => {
            const cancelButton = body.getByRole("button", { name: /cancel/i });
            await expect(cancelButton).toBeVisible();
            
            const saveButton = body.getByRole("button", { name: /save changes/i });
            await expect(saveButton).toBeVisible();
        });

        await step("Fechar dialog", async () => {
            const cancelButton = body.getByRole("button", { name: /cancel/i });
            await userEvent.click(cancelButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });
    },
};

/**
 * Confirmation dialog.
 */
export const Confirmation: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog de confirmação", async () => {
            const deleteButton = canvas.getByRole("button", { name: /delete account/i });
            await userEvent.click(deleteButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar mensagem de confirmação", async () => {
            const title = await body.findByText(/are you sure/i, {}, { timeout: 2000 });
            await expect(title).toBeVisible();
            
            const description = body.getByText(/this action cannot be undone/i);
            await expect(description).toBeVisible();
        });

        await step("Verificar botões de ação", async () => {
            const cancelButton = body.getByRole("button", { name: /cancel/i });
            await expect(cancelButton).toBeVisible();
            
            const deleteButtons = body.getAllByRole("button", { name: /delete account/i });
            await expect(deleteButtons[1]).toBeVisible();
        });

        await step("Cancelar ação", async () => {
            const cancelButton = body.getByRole("button", { name: /cancel/i });
            await userEvent.click(cancelButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });
    },
};

/**
 * Test keyboard and overlay interactions.
 */
export const KeyboardAndOverlay: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Keyboard Test</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Test closing with Escape key and clicking outside.
                </DialogDescription>
                <DialogFooter>
                    <Button>Action</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog", async () => {
            const openButton = canvas.getByRole("button", { name: /open dialog/i });
            await userEvent.click(openButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog aberto", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
        });

        await step("Fechar com tecla Escape", async () => {
            await userEvent.keyboard("{Escape}");
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });

        await step("Reabrir dialog", async () => {
            const openButton = canvas.getByRole("button", { name: /open dialog/i });
            await userEvent.click(openButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog reaberto", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
        });

        await step("Fechar com botão X", async () => {
            const dialog = body.getByRole("dialog");
            const closeButton = dialog.querySelector('button[aria-label="Close"]');
            await userEvent.click(closeButton as Element);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado novamente", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};

/**
 * Dialog with scrollable content.
 */
export const ScrollableContent: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Terms of Service</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogDescription>
                        Please read our terms of service carefully.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 px-6 pb-6 overflow-y-auto max-h-[50vh]">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Decline</Button>
                    </DialogClose>
                    <Button>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog com conteúdo rolável", async () => {
            const termsButton = canvas.getByRole("button", { name: /terms of service/i });
            await userEvent.click(termsButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar título e descrição", async () => {
            const title = await body.findByText("Terms of Service", {}, { timeout: 2000 });
            await expect(title).toBeVisible();
            
            const description = body.getByText(/please read our terms/i);
            await expect(description).toBeVisible();
        });

        await step("Verificar conteúdo lorem ipsum visível", async () => {
            const firstParagraph = body.getAllByText(/lorem ipsum/i)[0];
            await expect(firstParagraph).toBeVisible();
        });

        await step("Verificar botões do footer", async () => {
            const declineButton = body.getByRole("button", { name: /decline/i });
            await expect(declineButton).toBeVisible();
            
            const acceptButton = body.getByRole("button", { name: /accept/i });
            await expect(acceptButton).toBeVisible();
        });

        await step("Fechar dialog", async () => {
            const declineButton = body.getByRole("button", { name: /decline/i });
            await userEvent.click(declineButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};
