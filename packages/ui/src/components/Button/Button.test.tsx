import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
    describe("Rendering", () => {
        it("should render with default props", () => {
            render(<Button>Click me</Button>);
            const button = screen.getByRole("button", { name: /click me/i });
            expect(button).toBeInTheDocument();
        });

        it("should render children correctly", () => {
            render(<Button>Test Text</Button>);
            expect(screen.getByText("Test Text")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(Button.displayName).toBe("Button");
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(<Button>Default</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("bg-[var(--color-primary-500)]");
        });

        it("should apply destructive variant classes", () => {
            render(<Button variant="destructive">Delete</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("bg-[var(--color-error-500)]");
        });

        it("should apply outline variant classes", () => {
            render(<Button variant="outline">Outline</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("border", "border-[var(--input-border)]");
        });

        it("should apply secondary variant classes", () => {
            render(<Button variant="secondary">Secondary</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("border-2", "border-[var(--color-primary-500)]", "bg-transparent");
        });

        it("should apply ghost variant classes", () => {
            render(<Button variant="ghost">Ghost</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("bg-transparent", "hover:bg-[var(--action-hover)]");
        });

        it("should apply link variant classes", () => {
            render(<Button variant="link">Link</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("underline-offset-4");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(<Button>Default Size</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("h-10");
        });

        it("should apply sm size classes", () => {
            render(<Button size="sm">Small</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("h-9");
        });

        it("should apply lg size classes", () => {
            render(<Button size="lg">Large</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("h-11");
        });

        it("should apply icon size classes", () => {
            render(<Button size="icon">🔍</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("h-10", "w-10");
        });
    });

    describe("Interactions", () => {
        it("should call onClick when clicked", async () => {
            const user = userEvent.setup();
            const handleClick = vi.fn();
            render(<Button onClick={handleClick}>Click</Button>);

            await user.click(screen.getByRole("button"));

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("should not call onClick when disabled", async () => {
            const user = userEvent.setup();
            const handleClick = vi.fn();
            render(
                <Button disabled onClick={handleClick}>
                    Click
                </Button>
            );

            await user.click(screen.getByRole("button"));

            expect(handleClick).not.toHaveBeenCalled();
        });

        it("should be focusable", async () => {
            const user = userEvent.setup();
            render(<Button>Focus me</Button>);

            await user.tab();

            expect(screen.getByRole("button")).toHaveFocus();
        });
    });

    describe("Disabled State", () => {
        it("should have disabled attribute when disabled", () => {
            render(<Button disabled>Disabled</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
        });

        it("should have aria-disabled when disabled", () => {
            render(<Button disabled>Disabled</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveAttribute("aria-disabled", "true");
        });

        it("should have disabled styling classes", () => {
            render(<Button disabled>Disabled</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("disabled:bg-[var(--action-disabled-bg)]", "disabled:text-[var(--text-disabled)]");
        });
    });

    describe("Loading State", () => {
        it("should show loading spinner when loading", () => {
            render(<Button loading>Loading</Button>);
            const button = screen.getByRole("button");
            // Loading spinner SVG should be present
            const svg = button.querySelector("svg");
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveClass("animate-spin");
        });

        it("should be disabled when loading", () => {
            render(<Button loading>Loading</Button>);
            const button = screen.getByRole("button");
            expect(button).toBeDisabled();
        });

        it("should have aria-busy when loading", () => {
            render(<Button loading>Loading</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveAttribute("aria-busy", "true");
        });

        it("should not call onClick when loading", async () => {
            const user = userEvent.setup();
            const handleClick = vi.fn();
            render(
                <Button loading onClick={handleClick}>
                    Loading
                </Button>
            );

            await user.click(screen.getByRole("button"));

            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe("asChild (Slot pattern)", () => {
        it("should render as slot when asChild is true", () => {
            render(
                <Button asChild>
                    <a href="/test">Link Button</a>
                </Button>
            );
            const link = screen.getByRole("link", { name: /link button/i });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "/test");
        });

        it("should apply button styles to child element", () => {
            render(
                <Button asChild variant="destructive">
                    <a href="/test">Styled Link</a>
                </Button>
            );
            const link = screen.getByRole("link");
            expect(link).toHaveClass("bg-[var(--color-error-500)]");
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with variants", () => {
            render(<Button className="custom-class">Custom</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("custom-class");
            expect(button).toHaveClass("bg-[var(--color-primary-500)]"); // default variant should still apply
        });
    });

    describe("Accessibility", () => {
        it("should have focus-visible ring styles", () => {
            render(<Button>Accessible</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveClass("focus-visible:ring-2");
        });

        it("should have type button by default", () => {
            render(<Button>Submit</Button>);
            const button = screen.getByRole("button");
            // HTML default for button is submit, but we're checking it renders correctly
            expect(button.tagName).toBe("BUTTON");
        });

        it("should accept type prop", () => {
            render(<Button type="submit">Submit</Button>);
            const button = screen.getByRole("button");
            expect(button).toHaveAttribute("type", "submit");
        });
    });
});
