import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    Button,
} from "@fabioeducacross/ui";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "DropdownMenu displays a list of actions or options triggered by a button.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * Default dropdown menu.
 */
export const Default: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Help</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button } from "@fabioeducacross/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Help</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      Open Menu
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><a class="dropdown-item" href="#">Settings</a></li>
      <li><a class="dropdown-item" href="#">Help</a></li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item" href="#">Logout</a></li>
    </ul>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDropdownMenu>
    <EdDropdownMenuTrigger as-child>
      <EdButton variant="outline">Open Menu</EdButton>
    </EdDropdownMenuTrigger>
    <EdDropdownMenuContent>
      <EdDropdownMenuItem>Profile</EdDropdownMenuItem>
      <EdDropdownMenuItem>Settings</EdDropdownMenuItem>
      <EdDropdownMenuItem>Help</EdDropdownMenuItem>
      <EdDropdownMenuSeparator />
      <EdDropdownMenuItem>Logout</EdDropdownMenuItem>
    </EdDropdownMenuContent>
  </EdDropdownMenu>
</template>

<script setup lang="ts">
import { EdDropdownMenu, EdDropdownMenuTrigger, EdDropdownMenuContent, EdDropdownMenuItem, EdDropdownMenuSeparator, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Click to open dropdown
        const triggerButton = canvas.getByRole("button", { name: /open menu/i });
        await userEvent.click(triggerButton);

        // Verify menu items are visible
        await expect(canvas.getByRole("menu")).toBeVisible();
        await expect(canvas.getByRole("menuitem", { name: /profile/i })).toBeVisible();
        await expect(canvas.getByRole("menuitem", { name: /settings/i })).toBeVisible();
        await expect(canvas.getByRole("menuitem", { name: /logout/i })).toBeVisible();

        // Close by pressing Escape
        await userEvent.keyboard("{Escape}");
    },
};

/**
 * With labels and groups.
 */
export const WithLabels: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Support</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Contact Us</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, Button } from "@fabioeducacross/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Account</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Account</button>
    <ul class="dropdown-menu">
      <li><h6 class="dropdown-header">My Account</h6></li>
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><a class="dropdown-item" href="#">Billing</a></li>
    </ul>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDropdownMenu>
    <EdDropdownMenuTrigger as-child><EdButton>Account</EdButton></EdDropdownMenuTrigger>
    <EdDropdownMenuContent>
      <EdDropdownMenuLabel>My Account</EdDropdownMenuLabel>
      <EdDropdownMenuSeparator />
      <EdDropdownMenuItem>Profile</EdDropdownMenuItem>
    </EdDropdownMenuContent>
  </EdDropdownMenu>
</template>

<script setup lang="ts">
import { EdDropdownMenu, EdDropdownMenuTrigger, EdDropdownMenuContent, EdDropdownMenuItem, EdDropdownMenuSeparator, EdDropdownMenuLabel, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * With destructive action.
 */
export const WithDestructive: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button } from "@fabioeducacross/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Actions</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="dropdown">
    <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Actions</button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Edit</a></li>
      <li><a class="dropdown-item" href="#">Duplicate</a></li>
      <li><hr class="dropdown-divider" /></li>
      <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
    </ul>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDropdownMenu>
    <EdDropdownMenuTrigger as-child><EdButton variant="outline">Actions</EdButton></EdDropdownMenuTrigger>
    <EdDropdownMenuContent>
      <EdDropdownMenuItem>Edit</EdDropdownMenuItem>
      <EdDropdownMenuSeparator />
      <EdDropdownMenuItem destructive>Delete</EdDropdownMenuItem>
    </EdDropdownMenuContent>
  </EdDropdownMenu>
</template>

<script setup lang="ts">
import { EdDropdownMenu, EdDropdownMenuTrigger, EdDropdownMenuContent, EdDropdownMenuItem, EdDropdownMenuSeparator, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * With disabled items.
 */
export const WithDisabled: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem disabled>Share (Premium)</DropdownMenuItem>
                    <DropdownMenuItem disabled>Export (Premium)</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};

/**
 * Controlled dropdown.
 */
export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="flex justify-center gap-4 p-20">
                <Button variant="outline" onClick={() => setOpen(true)}>
                    External Open
                </Button>

                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button>Menu ({open ? "Open" : "Closed"})</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Option 1</DropdownMenuItem>
                        <DropdownMenuItem>Option 2</DropdownMenuItem>
                        <DropdownMenuItem>Option 3</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    },
};

/**
 * Alignment options.
 */
export const Alignment: Story = {
    render: () => (
        <div className="flex justify-center gap-8 p-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Align Start</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                    <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Align Center</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                    <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Align End</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                    <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};

/**
 * User menu example.
 */
export const UserMenu: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full border p-1 pr-4 hover:bg-accent">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                            JD
                        </div>
                        <span className="text-sm">John Doe</span>
                        <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">john@example.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};
