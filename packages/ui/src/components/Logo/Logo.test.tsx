import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
    describe("Renderização", () => {
        it("deve renderizar corretamente", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toBeInTheDocument();
        });

        it("deve renderizar como elemento SVG", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo.tagName).toBe("svg");
        });

        it("deve ter o atributo role img", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("role", "img");
        });

        it("deve ter aria-label correto", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("aria-label", "Educacross");
        });

        it("deve ter focusable=false para acessibilidade", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("focusable", "false");
        });

        it("deve ter viewBox correto", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("viewBox", "0 0 200 28");
        });

        it("deve ter dimensões width e height", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("width", "200");
            expect(logo).toHaveAttribute("height", "28");
        });

        it("deve ter namespace SVG correto", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
        });

        it("deve ter fill=none no elemento raiz", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveAttribute("fill", "none");
        });

        it("deve conter elementos path (SVG inline)", () => {
            const { container } = render(<Logo />);
            const paths = container.querySelectorAll("path");
            expect(paths.length).toBeGreaterThan(0);
            // Logo Educacross tem 21 paths
            expect(paths.length).toBe(21);
        });
    });

    describe("Variantes de tamanho", () => {
        it("deve aplicar tamanho sm", () => {
            render(<Logo size="sm" />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveClass("h-5");
        });

        it("deve aplicar tamanho default", () => {
            render(<Logo size="default" />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveClass("h-7");
        });

        it("deve aplicar tamanho lg", () => {
            render(<Logo size="lg" />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveClass("h-9");
        });

        it("deve usar tamanho default quando nenhum especificado", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveClass("h-7");
        });

        it("deve manter width auto em todos os tamanhos", () => {
            const { rerender } = render(<Logo size="sm" />);
            expect(screen.getByRole("img")).toHaveClass("w-auto");

            rerender(<Logo size="default" />);
            expect(screen.getByRole("img")).toHaveClass("w-auto");

            rerender(<Logo size="lg" />);
            expect(screen.getByRole("img")).toHaveClass("w-auto");
        });
    });

    describe("Customização", () => {
        it("deve suportar className customizado", () => {
            render(<Logo className="custom-class" />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveClass("custom-class");
            expect(logo).toHaveClass("h-7"); // mantém classe de tamanho
        });

        it("deve combinar className customizado com tamanho", () => {
            render(<Logo size="lg" className="custom-class" />);
            const logo = screen.getByRole("img");
            expect(logo).toHaveClass("custom-class");
            expect(logo).toHaveClass("h-9");
        });

        it("deve suportar props SVG customizadas", () => {
            render(<Logo data-testid="custom-logo" />);
            const logo = screen.getByTestId("custom-logo");
            expect(logo).toBeInTheDocument();
        });
    });

    describe("Ref", () => {
        it("deve suportar ref", () => {
            const ref = { current: null };
            render(<Logo ref={ref} />);
            expect(ref.current).toBeInstanceOf(SVGSVGElement);
        });

        it("deve permitir acesso ao elemento SVG via ref", () => {
            const ref = { current: null };
            render(<Logo ref={ref} />);
            expect(ref.current?.tagName).toBe("svg");
        });
    });

    describe("Acessibilidade", () => {
        it("deve ter displayName correto", () => {
            expect(Logo.displayName).toBe("Logo");
        });

        it("deve ser acessível por role=img", () => {
            render(<Logo />);
            const logo = screen.getByRole("img", { name: /educacross/i });
            expect(logo).toBeInTheDocument();
        });

        it("não deve ser focável por teclado (focusable=false)", () => {
            const { container } = render(<Logo />);
            const logo = container.querySelector("svg");
            expect(logo).toHaveAttribute("focusable", "false");
        });

        it("deve ter aria-label para leitores de tela", () => {
            render(<Logo />);
            const logo = screen.getByRole("img");
            const ariaLabel = logo.getAttribute("aria-label");
            expect(ariaLabel).toBeTruthy();
            expect(ariaLabel).toBe("Educacross");
        });
    });

    describe("Integração", () => {
        it("deve funcionar dentro de um container flex", () => {
            const { container } = render(
                <div className="flex items-center gap-2">
                    <Logo />
                    <span>Educacross</span>
                </div>
            );
            const logo = container.querySelector("svg");
            expect(logo).toBeInTheDocument();
        });

        it("deve funcionar com múltiplos tamanhos no mesmo container", () => {
            render(
                <div>
                    <Logo size="sm" data-testid="logo-sm" />
                    <Logo size="default" data-testid="logo-default" />
                    <Logo size="lg" data-testid="logo-lg" />
                </div>
            );
            expect(screen.getByTestId("logo-sm")).toHaveClass("h-5");
            expect(screen.getByTestId("logo-default")).toHaveClass("h-7");
            expect(screen.getByTestId("logo-lg")).toHaveClass("h-9");
        });
    });
});
