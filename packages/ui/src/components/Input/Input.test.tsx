import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
    describe("Rendering", () => {
        it("should render with default props", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toBeInTheDocument();
        });

        it("should render with placeholder", () => {
            render(<Input placeholder="Enter text..." />);
            const input = screen.getByPlaceholderText("Enter text...");
            expect(input).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(Input.displayName).toBe("Input");
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("border-border");
        });

        it("should apply error variant when error prop is true", () => {
            render(<Input error />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("border-[#EA5455]");
        });

        it("should apply error variant when variant is error", () => {
            render(<Input variant="error" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("border-[#EA5455]");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("h-10");
        });

        it("should apply sm size classes", () => {
            render(<Input inputSize="sm" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("h-9");
        });

        it("should apply lg size classes", () => {
            render(<Input inputSize="lg" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("h-11");
        });
    });

    describe("Interactions", () => {
        it("should call onChange when typing", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(<Input onChange={handleChange} />);

            await user.type(screen.getByRole("textbox"), "hello");

            expect(handleChange).toHaveBeenCalled();
        });

        it("should update value when typing", async () => {
            const user = userEvent.setup();
            render(<Input />);
            const input = screen.getByRole("textbox");

            await user.type(input, "test value");

            expect(input).toHaveValue("test value");
        });

        it("should be focusable", async () => {
            const user = userEvent.setup();
            render(<Input />);

            await user.tab();

            expect(screen.getByRole("textbox")).toHaveFocus();
        });

        it("should call onFocus when focused", async () => {
            const user = userEvent.setup();
            const handleFocus = vi.fn();
            render(<Input onFocus={handleFocus} />);

            await user.click(screen.getByRole("textbox"));

            expect(handleFocus).toHaveBeenCalledTimes(1);
        });

        it("should call onBlur when blurred", async () => {
            const user = userEvent.setup();
            const handleBlur = vi.fn();
            render(<Input onBlur={handleBlur} />);
            const input = screen.getByRole("textbox");

            await user.click(input);
            await user.tab();

            expect(handleBlur).toHaveBeenCalledTimes(1);
        });
    });

    describe("Disabled State", () => {
        it("should have disabled attribute when disabled", () => {
            render(<Input disabled />);
            const input = screen.getByRole("textbox");
            expect(input).toBeDisabled();
        });

        it("should not allow typing when disabled", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(<Input disabled onChange={handleChange} />);

            await user.type(screen.getByRole("textbox"), "hello");

            expect(handleChange).not.toHaveBeenCalled();
        });

        it("should have disabled styling classes", () => {
            render(<Input disabled />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("disabled:cursor-not-allowed", "disabled:bg-muted", "disabled:opacity-50");
        });
    });

    describe("Input Types", () => {
        it("should support text type", () => {
            render(<Input type="text" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("type", "text");
        });

        it("should support email type", () => {
            render(<Input type="email" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("type", "email");
        });

        it("should support password type", () => {
            render(<Input type="password" />);
            // Password inputs don't have textbox role
            const input = document.querySelector('input[type="password"]');
            expect(input).toBeInTheDocument();
        });

        it("should support number type", () => {
            render(<Input type="number" />);
            const input = screen.getByRole("spinbutton");
            expect(input).toBeInTheDocument();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with variants", () => {
            render(<Input className="custom-class" />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("custom-class");
            expect(input).toHaveClass("border-border"); // default variant should still apply
        });
    });

    describe("Accessibility", () => {
        it("should have focus-visible ring styles", () => {
            render(<Input />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveClass("focus-visible:ring-2");
        });

        it("should support aria-label", () => {
            render(<Input aria-label="Email address" />);
            const input = screen.getByLabelText("Email address");
            expect(input).toBeInTheDocument();
        });

        it("should support aria-describedby", () => {
            render(
                <>
                    <Input aria-describedby="help-text" />
                    <span id="help-text">Enter your email</span>
                </>
            );
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("aria-describedby", "help-text");
        });

        it("should support aria-invalid for error state", () => {
            render(<Input aria-invalid="true" error />);
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("aria-invalid", "true");
        });
    });

    describe("Ref forwarding", () => {
        it("should forward ref correctly", () => {
            const ref = vi.fn();
            render(<Input ref={ref} />);
            expect(ref).toHaveBeenCalled();
            expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
        });
    });
});
