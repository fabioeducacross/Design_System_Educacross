import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn (className utility)", () => {
    it("should merge class names", () => {
        const result = cn("px-4", "py-2");
        expect(result).toBe("px-4 py-2");
    });

    it("should handle undefined values", () => {
        const result = cn("px-4", undefined, "py-2");
        expect(result).toBe("px-4 py-2");
    });

    it("should handle false conditionals", () => {
        const condition = false;
        const result = cn("px-4", condition && "hidden", "py-2");
        expect(result).toBe("px-4 py-2");
    });

    it("should handle true conditionals", () => {
        const condition = true;
        const result = cn("px-4", condition && "hidden", "py-2");
        expect(result).toBe("px-4 hidden py-2");
    });

    it("should merge conflicting Tailwind classes", () => {
        // tailwind-merge should resolve conflicts with last class winning
        const result = cn("px-4", "px-8");
        expect(result).toBe("px-8");
    });

    it("should merge conflicting padding with margin", () => {
        const result = cn("p-4", "m-2");
        expect(result).toBe("p-4 m-2");
    });

    it("should handle array inputs", () => {
        const result = cn(["px-4", "py-2"]);
        expect(result).toBe("px-4 py-2");
    });

    it("should handle object inputs for conditional classes", () => {
        const result = cn({
            "px-4": true,
            "py-2": true,
            hidden: false,
        });
        expect(result).toBe("px-4 py-2");
    });

    it("should handle mixed inputs", () => {
        const result = cn("base", ["array-class"], { "obj-class": true });
        expect(result).toBe("base array-class obj-class");
    });

    it("should handle empty inputs", () => {
        const result = cn();
        expect(result).toBe("");
    });

    it("should handle null values", () => {
        const result = cn("px-4", null, "py-2");
        expect(result).toBe("px-4 py-2");
    });

    it("should handle complex Tailwind conflict resolution", () => {
        // bg-red-500 should be overridden by bg-blue-500
        const result = cn("bg-red-500 text-white", "bg-blue-500");
        expect(result).toBe("text-white bg-blue-500");
    });

    it("should preserve non-conflicting responsive classes", () => {
        const result = cn("md:px-4", "lg:px-8");
        expect(result).toBe("md:px-4 lg:px-8");
    });

    it("should resolve same breakpoint conflicts", () => {
        const result = cn("md:px-4", "md:px-8");
        expect(result).toBe("md:px-8");
    });
});
