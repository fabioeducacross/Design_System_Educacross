import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants } from "./Badge";

describe("Badge", () => {
    describe("Renderização", () => {
        it("deve renderizar com conteúdo de texto", () => {
            render(<Badge>New</Badge>);
            expect(screen.getByText("New")).toBeInTheDocument();
        });

        it("deve aplicar classes base", () => {
            render(<Badge>Badge</Badge>);
            const badge = screen.getByText("Badge");
            expect(badge).toHaveClass("inline-flex", "items-center", "rounded-full");
        });

        it("deve suportar className customizado", () => {
            render(<Badge className="custom-class">Badge</Badge>);
            expect(screen.getByText("Badge")).toHaveClass("custom-class");
        });

        it("deve propagar atributos HTML", () => {
            render(<Badge data-testid="badge-test">Badge</Badge>);
            expect(screen.getByTestId("badge-test")).toBeInTheDocument();
        });
    });

    describe("Variantes", () => {
        it("deve renderizar variante default", () => {
            render(<Badge variant="default">Default</Badge>);
            const badge = screen.getByText("Default");
            expect(badge).toHaveClass("bg-[#6E63E8]", "text-white");
        });

        it("deve renderizar variante secondary", () => {
            render(<Badge variant="secondary">Secondary</Badge>);
            const badge = screen.getByText("Secondary");
            expect(badge).toHaveClass("bg-[#82868B]", "text-white");
        });

        it("deve renderizar variante destructive", () => {
            render(<Badge variant="destructive">Destructive</Badge>);
            const badge = screen.getByText("Destructive");
            expect(badge).toHaveClass("bg-[#EA5455]", "text-white");
        });

        it("deve renderizar variante outline", () => {
            render(<Badge variant="outline">Outline</Badge>);
            const badge = screen.getByText("Outline");
            expect(badge).toHaveClass("text-foreground");
        });

        it("deve renderizar variante success", () => {
            render(<Badge variant="success">Success</Badge>);
            const badge = screen.getByText("Success");
            expect(badge).toHaveClass("bg-[#28C76F]", "text-white");
        });

        it("deve renderizar variante warning", () => {
            render(<Badge variant="warning">Warning</Badge>);
            const badge = screen.getByText("Warning");
            expect(badge).toHaveClass("bg-[#FF9F43]", "text-white");
        });
    });

    describe("Tamanhos", () => {
        it("deve renderizar tamanho default", () => {
            render(<Badge size="default">Default</Badge>);
            const badge = screen.getByText("Default");
            expect(badge).toHaveClass("text-xs");
        });

        it("deve renderizar tamanho sm", () => {
            render(<Badge size="sm">Small</Badge>);
            const badge = screen.getByText("Small");
            expect(badge).toHaveClass("text-[10px]");
        });

        it("deve renderizar tamanho lg", () => {
            render(<Badge size="lg">Large</Badge>);
            const badge = screen.getByText("Large");
            expect(badge).toHaveClass("text-sm");
        });
    });

    describe("badgeVariants", () => {
        it("deve exportar função badgeVariants", () => {
            expect(typeof badgeVariants).toBe("function");
        });

        it("deve gerar classes para variante default", () => {
            const classes = badgeVariants({ variant: "default" });
            expect(classes).toContain("bg-[#6E63E8]");
        });

        it("deve gerar classes para tamanho sm", () => {
            const classes = badgeVariants({ size: "sm" });
            expect(classes).toContain("text-[10px]");
        });
    });
});
