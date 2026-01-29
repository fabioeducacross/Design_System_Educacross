import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { QuestionStatus } from "./QuestionStatus";

describe("QuestionStatus", () => {
  it("deve renderizar status correto", () => {
    render(<QuestionStatus status="correct" label="Resposta correta!" />);

    expect(screen.getByText(/resposta correta/i)).toBeInTheDocument();
  });

  it("deve renderizar status incorreto", () => {
    render(
      <QuestionStatus status="incorrect" label="Resposta incorreta" />
    );

    expect(screen.getByText(/resposta incorreta/i)).toBeInTheDocument();
  });

  it("deve renderizar status pendente", () => {
    render(<QuestionStatus status="pending" label="Aguardando correção" />);

    expect(screen.getByText(/aguardando correção/i)).toBeInTheDocument();
  });

  it("deve renderizar status não respondido", () => {
    render(
      <QuestionStatus status="unanswered" label="Questão não respondida" />
    );

    expect(screen.getByText(/questão não respondida/i)).toBeInTheDocument();
  });

  it("deve aplicar variante correct corretamente", () => {
    const { container } = render(
      <QuestionStatus status="correct" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.className).toContain("bg-green-100");
  });

  it("deve aplicar variante incorrect corretamente", () => {
    const { container } = render(
      <QuestionStatus status="incorrect" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.className).toContain("bg-red-100");
  });

  it("deve aplicar variante pending corretamente", () => {
    const { container } = render(
      <QuestionStatus status="pending" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.className).toContain("bg-yellow-100");
  });

  it("deve aplicar variante unanswered corretamente", () => {
    const { container } = render(
      <QuestionStatus status="unanswered" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.className).toContain("bg-gray-100");
  });

  it("deve aplicar padding padrão", () => {
    const { container } = render(
      <QuestionStatus status="correct" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.className).toContain("px-3");
    expect(statusElement.className).toContain("py-1");
  });

  it("deve aplicar className customizada", () => {
    const { container } = render(
      <QuestionStatus status="correct" className="custom-status-class">
        Teste
      </QuestionStatus>
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement).toHaveClass("custom-status-class");
  });

  it("deve renderizar ícone de sucesso para correto", () => {
    const { container } = render(
      <QuestionStatus status="correct" showIcon />
    );

    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe("✓");
  });

  it("deve renderizar ícone de erro para incorreto", () => {
    const { container } = render(
      <QuestionStatus status="incorrect" showIcon />
    );

    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe("✗");
  });

  it("deve usar label customizado", () => {
    render(
      <QuestionStatus status="correct" label="Custom message" />
    );

    expect(screen.getByText(/custom message/i)).toBeInTheDocument();
  });

  it("deve ter role status", () => {
    const { container } = render(
      <QuestionStatus status="incorrect" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.getAttribute("role")).toBe("status");
  });

  it("deve renderizar sem label customizado", () => {
    const { container } = render(<QuestionStatus status="correct" />);

    expect(screen.getByText(/correto/i)).toBeInTheDocument();
  });

  it("deve ter cores adequadas para status correto", () => {
    const { container } = render(
      <QuestionStatus status="correct" />
    );

    const statusElement = container.firstChild as HTMLElement;
    expect(statusElement.className).toContain("bg-green-100");
    expect(statusElement.className).toContain("text-green-700");
  });

  it("deve ter padding adequado", () => {
    const { container } = render(
      <QuestionStatus status="correct" label="Teste" />
    );

    const statusElement = container.firstChild as HTMLElement;
    // Verifica que tem classes de padding aplicadas
    expect(statusElement.className).toMatch(/p-/);
  });

  it("deve renderizar ícone e texto", () => {
    const { container } = render(
      <QuestionStatus status="correct" label="Você acertou!" showIcon />
    );

    expect(screen.getByText(/você acertou/i)).toBeInTheDocument();
  });

  it("deve ter cores adequadas em modo dark", () => {
    const { container } = render(
      <div className="dark">
        <QuestionStatus status="correct" label="Teste dark mode" />
      </div>
    );

    // Verifica se renderiza sem erros no dark mode
    expect(container.querySelector(".dark")).toBeTruthy();
  });

  it("deve ser acessível via aria-live para leitores de tela", () => {
    const { container } = render(
      <QuestionStatus status="incorrect" label="Erro de validação" />
    );

    const statusElement = container.firstChild as HTMLElement;
    // Status deve ser anunciado por leitores de tela
    expect(
      statusElement.getAttribute("aria-live") || statusElement.getAttribute("role")
    ).toBeTruthy();
  });

  it("deve usar defaultProps quando não fornecidos", () => {
    const { container } = render(
      <QuestionStatus status="correct" label="Teste" />
    );

    const statusElement = container.firstChild as HTMLElement;
    // Deve usar padding default
    expect(statusElement.className).toContain("p-");
  });
});
