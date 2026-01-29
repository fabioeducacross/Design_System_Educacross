import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, Radio } from "./Radio";

describe("RadioGroup", () => {
    describe("Rendering", () => {
        it("should render radio group", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );
            expect(screen.getByRole("radiogroup")).toBeInTheDocument();
        });

        it("should render all radio options", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                    <Radio value="c" label="Option C" />
                </RadioGroup>
            );
            expect(screen.getAllByRole("radio")).toHaveLength(3);
        });

        it("should have correct display name", () => {
            expect(RadioGroup.displayName).toBe("RadioGroup");
        });
    });

    describe("Selection", () => {
        it("should select defaultValue initially", () => {
            render(
                <RadioGroup name="test" defaultValue="b">
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio", { name: "Option B" })).toBeChecked();
            expect(screen.getByRole("radio", { name: "Option A" })).not.toBeChecked();
        });

        it("should select controlled value", () => {
            render(
                <RadioGroup name="test" value="a">
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio", { name: "Option A" })).toBeChecked();
        });

        it("should change selection when clicked (uncontrolled)", async () => {
            const user = userEvent.setup();
            render(
                <RadioGroup name="test" defaultValue="a">
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );

            const optionB = screen.getByRole("radio", { name: "Option B" });
            await user.click(optionB);

            expect(optionB).toBeChecked();
            expect(screen.getByRole("radio", { name: "Option A" })).not.toBeChecked();
        });

        it("should call onValueChange when selection changes", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(
                <RadioGroup name="test" defaultValue="a" onValueChange={handleChange}>
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );

            await user.click(screen.getByRole("radio", { name: "Option B" }));

            expect(handleChange).toHaveBeenCalledWith("b");
        });
    });

    describe("Disabled state", () => {
        it("should disable all radios when group is disabled", () => {
            render(
                <RadioGroup name="test" disabled>
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );

            expect(screen.getByRole("radio", { name: "Option A" })).toBeDisabled();
            expect(screen.getByRole("radio", { name: "Option B" })).toBeDisabled();
        });

        it("should disable individual radio", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" disabled />
                </RadioGroup>
            );

            expect(screen.getByRole("radio", { name: "Option A" })).not.toBeDisabled();
            expect(screen.getByRole("radio", { name: "Option B" })).toBeDisabled();
        });
    });

    describe("Error state", () => {
        it("should apply error variant to all radios when group has error", () => {
            render(
                <RadioGroup name="test" error>
                    <Radio value="a" label="Option A" />
                    <Radio value="b" label="Option B" />
                </RadioGroup>
            );

            const radios = screen.getAllByRole("radio");
            radios.forEach((radio) => {
                expect(radio).toHaveClass("border-[#EA5455]");
            });
        });
    });
});

describe("Radio", () => {
    describe("Rendering", () => {
        it("should render radio within group", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toBeInTheDocument();
        });

        it("should render with label", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="My Label" />
                </RadioGroup>
            );
            expect(screen.getByText("My Label")).toBeInTheDocument();
        });

        it("should render with description", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option" description="Help text" />
                </RadioGroup>
            );
            expect(screen.getByText("Help text")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(Radio.displayName).toBe("Radio");
        });
    });

    describe("Data state attribute", () => {
        it("should have data-state=unchecked when not selected", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveAttribute("data-state", "unchecked");
        });

        it("should have data-state=checked when selected", () => {
            render(
                <RadioGroup name="test" defaultValue="a">
                    <Radio value="a" label="Option A" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveAttribute("data-state", "checked");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveClass("h-4", "w-4");
        });

        it("should apply sm size classes", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" size="sm" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveClass("h-3.5", "w-3.5");
        });

        it("should apply lg size classes", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" size="lg" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveClass("h-5", "w-5");
        });
    });

    describe("Accessibility", () => {
        it("should be focusable", async () => {
            const user = userEvent.setup();
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                </RadioGroup>
            );

            await user.tab();

            expect(screen.getByRole("radio")).toHaveFocus();
        });

        it("should select with Space key", async () => {
            const user = userEvent.setup();
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Option A" />
                </RadioGroup>
            );
            const radio = screen.getByRole("radio");

            radio.focus();
            await user.keyboard(" ");

            expect(radio).toBeChecked();
        });

        it("should have aria-describedby when description is provided", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" description="Help" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveAttribute("aria-describedby");
        });
    });

    describe("Label association", () => {
        it("should select radio when clicking label", async () => {
            const user = userEvent.setup();
            render(
                <RadioGroup name="test">
                    <Radio value="a" label="Click me" />
                </RadioGroup>
            );

            await user.click(screen.getByText("Click me"));

            expect(screen.getByRole("radio")).toBeChecked();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className", () => {
            render(
                <RadioGroup name="test">
                    <Radio value="a" className="custom-class" />
                </RadioGroup>
            );
            expect(screen.getByRole("radio")).toHaveClass("custom-class");
        });
    });
});
