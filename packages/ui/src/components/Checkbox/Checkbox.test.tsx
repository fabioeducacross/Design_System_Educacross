import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
    describe("Rendering", () => {
        it("should render without label", () => {
            render(<Checkbox />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toBeInTheDocument();
        });

        it("should render with label", () => {
            render(<Checkbox label="Accept terms" />);
            const checkbox = screen.getByRole("checkbox");
            const label = screen.getByText("Accept terms");
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
        });

        it("should render with description", () => {
            render(<Checkbox label="Subscribe" description="Get email updates" />);
            expect(screen.getByText("Get email updates")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(Checkbox.displayName).toBe("Checkbox");
        });
    });

    describe("Checked/Unchecked state", () => {
        it("should be unchecked by default", () => {
            render(<Checkbox />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).not.toBeChecked();
            expect(checkbox).toHaveAttribute("data-state", "unchecked");
        });

        it("should be checked when defaultChecked is true", () => {
            render(<Checkbox defaultChecked />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toBeChecked();
            expect(checkbox).toHaveAttribute("data-state", "checked");
        });

        it("should be checked when checked prop is true", () => {
            render(<Checkbox checked onChange={() => { }} />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toBeChecked();
        });

        it("should toggle when clicked (uncontrolled)", async () => {
            const user = userEvent.setup();
            render(<Checkbox label="Toggle me" />);
            const checkbox = screen.getByRole("checkbox");

            expect(checkbox).not.toBeChecked();

            await user.click(checkbox);
            expect(checkbox).toBeChecked();

            await user.click(checkbox);
            expect(checkbox).not.toBeChecked();
        });

        it("should call onChange when clicked", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(<Checkbox onChange={handleChange} />);

            await user.click(screen.getByRole("checkbox"));

            expect(handleChange).toHaveBeenCalledTimes(1);
        });
    });

    describe("Controlled mode", () => {
        it("should not toggle when controlled", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(<Checkbox checked={false} onChange={handleChange} />);
            const checkbox = screen.getByRole("checkbox");

            await user.click(checkbox);

            // Should call onChange but not toggle (controlled)
            expect(handleChange).toHaveBeenCalled();
            expect(checkbox).not.toBeChecked();
        });
    });

    describe("Disabled state", () => {
        it("should be disabled when disabled prop is true", () => {
            render(<Checkbox disabled />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toBeDisabled();
        });

        it("should not toggle when disabled", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(<Checkbox disabled onChange={handleChange} />);

            await user.click(screen.getByRole("checkbox"));

            expect(handleChange).not.toHaveBeenCalled();
        });
    });

    describe("Error state", () => {
        it("should display error message", () => {
            render(<Checkbox error="This field is required" />);
            const error = screen.getByRole("alert");
            expect(error).toHaveTextContent("This field is required");
        });

        it("should apply error variant when error prop exists", () => {
            render(<Checkbox error="Error" />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveClass("border-[#EA5455]");
        });

        it("should have aria-invalid when error exists", () => {
            render(<Checkbox error="Required" />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveAttribute("aria-invalid", "true");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(<Checkbox />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveClass("h-4", "w-4");
        });

        it("should apply sm size classes", () => {
            render(<Checkbox size="sm" />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveClass("h-3.5", "w-3.5");
        });

        it("should apply lg size classes", () => {
            render(<Checkbox size="lg" />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveClass("h-5", "w-5");
        });
    });

    describe("Label association", () => {
        it("should associate label with checkbox via htmlFor", async () => {
            const user = userEvent.setup();
            render(<Checkbox label="Click me" />);

            // Clicking label should toggle checkbox
            await user.click(screen.getByText("Click me"));

            expect(screen.getByRole("checkbox")).toBeChecked();
        });
    });

    describe("Accessibility", () => {
        it("should be focusable", async () => {
            const user = userEvent.setup();
            render(<Checkbox />);

            await user.tab();

            expect(screen.getByRole("checkbox")).toHaveFocus();
        });

        it("should toggle with Space key", async () => {
            const user = userEvent.setup();
            render(<Checkbox />);
            const checkbox = screen.getByRole("checkbox");

            checkbox.focus();
            await user.keyboard(" ");

            expect(checkbox).toBeChecked();
        });

        it("should have aria-describedby when description is provided", () => {
            render(<Checkbox description="Help text" />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveAttribute("aria-describedby");
        });
    });

    describe("Custom className", () => {
        it("should merge custom className", () => {
            render(<Checkbox className="custom-class" />);
            const checkbox = screen.getByRole("checkbox");
            expect(checkbox).toHaveClass("custom-class");
        });
    });
});
