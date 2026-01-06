import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
    describe("Renderização", () => {
        it("deve renderizar corretamente", () => {
            render(<Logo />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toBeInTheDocument();
        });

        it("deve ter o src correto da logo", () => {
            render(<Logo />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveAttribute(
                "src",
                expect.stringContaining("logo-educacross")
            );
        });

        it("deve ter o atributo role img", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toBeInTheDocument();
        });
    });

    describe("Variantes de tamanho", () => {
        it("deve aplicar tamanho sm", () => {
            render(<Logo size="sm" />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveClass("h-5");
        });

        it("deve aplicar tamanho default", () => {
            render(<Logo size="default" />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveClass("h-7");
        });

        it("deve aplicar tamanho lg", () => {
            render(<Logo size="lg" />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveClass("h-9");
        });

        it("deve usar tamanho default quando nenhum especificado", () => {
            render(<Logo />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveClass("h-7");
        });

        it("deve manter width auto em todos os tamanhos", () => {
            const { rerender } = render(<Logo size="sm" />);
            expect(screen.getByAltText("Educacross")).toHaveClass("w-auto");

            rerender(<Logo size="default" />);
            expect(screen.getByAltText("Educacross")).toHaveClass("w-auto");

            rerender(<Logo size="lg" />);
            expect(screen.getByAltText("Educacross")).toHaveClass("w-auto");
        });
    });

    describe("Customização", () => {
        it("deve suportar className customizado", () => {
            render(<Logo className="custom-class" />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveClass("custom-class");
            expect(logo).toHaveClass("h-7"); // mantém classe de tamanho
        });

        it("deve combinar className customizado com tamanho", () => {
            render(<Logo size="lg" className="custom-class" />);
            const logo = screen.getByAltText("Educacross");
            expect(logo).toHaveClass("custom-class");
            expect(logo).toHaveClass("h-9");
        });
    });

    describe("Ref", () => {
        it("deve suportar ref", () => {
            const ref = { current: null };
            render(<Logo ref={ref} />);
            expect(ref.current).toBeInstanceOf(HTMLImageElement);
        });
    });
});
