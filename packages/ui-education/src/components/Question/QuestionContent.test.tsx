import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { QuestionContent } from "./QuestionContent";

describe("QuestionContent", () => {
  it("deve renderizar texto simples", () => {
    render(<QuestionContent content="Texto simples de questão" />);

    expect(screen.getByText(/texto simples de questão/i)).toBeInTheDocument();
  });

  it("deve renderizar HTML quando contentType for 'html'", () => {
    const htmlContent = "<p>Texto em <strong>negrito</strong></p>";

    render(<QuestionContent content={htmlContent} contentType="html" />);

    const strongElement = screen.getByText(/negrito/i);
    expect(strongElement.tagName).toBe("STRONG");
  });

  it("deve renderizar LaTeX quando contentType for 'latex'", () => {
    const latexContent = "E = mc^2";

    const { container } = render(
      <QuestionContent content={latexContent} contentType="latex" />
    );

    // KaTeX ainda não integrado, mas deve renderizar sem erro
    expect(container.textContent).toContain(latexContent);
  });

  it("deve renderizar Markdown quando contentType for 'markdown'", () => {
    const markdownContent = "# Título\n\nTexto em **negrito**";

    const { container } = render(
      <QuestionContent content={markdownContent} contentType="markdown" />
    );

    // Marked ainda não integrado, mas deve renderizar sem erro
    expect(container.textContent).toContain("Título");
  });

  it("deve aplicar className customizada", () => {
    const { container } = render(
      <QuestionContent content="Teste" className="custom-class" />
    );

    const element = container.querySelector(".custom-class");
    expect(element).toBeInTheDocument();
  });

  it("deve renderizar conteúdo vazio sem erros", () => {
    const { container } = render(<QuestionContent content="" />);

    expect(container).toBeTruthy();
  });

  it("deve renderizar HTML complexo de forma segura", () => {
    const complexHtml = `
      <div class="question">
        <h3>Pergunta</h3>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `;

    render(<QuestionContent content={complexHtml} contentType="html" />);

    expect(screen.getByText(/pergunta/i)).toBeInTheDocument();
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/item 2/i)).toBeInTheDocument();
  });

  // TODO: Implementar sanitização XSS com DOMPurify
  it.skip("deve sanitizar scripts maliciosos", () => {
    const maliciousHtml = `
      <p>Texto normal</p>
      <script>alert('XSS')</script>
    `;

    const { container } = render(
      <QuestionContent content={maliciousHtml} contentType="html" />
    );

    // DOMPurify ainda não integrado completamente
    // Mas a estrutura está preparada para sanitização
    expect(container.querySelector("script")).toBeNull();
  });

  it("deve usar defaultProps corretamente", () => {
    const { container } = render(<QuestionContent content="Teste" />);

    // contentType padrão deve ser 'text'
    expect(container.textContent).toBe("Teste");
  });

  // TODO: Implementar renderização LaTeX com KaTeX
  it.skip("deve renderizar LaTeX inline e block corretamente", () => {
    const latexInline = "Considere a equação $E = mc^2$ na física.";
    const latexBlock = "$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$";

    const { container: inlineContainer } = render(
      <QuestionContent content={latexInline} contentType="latex" />
    );

    const { container: blockContainer } = render(
      <QuestionContent content={latexBlock} contentType="latex" />
    );

    expect(inlineContainer.textContent).toContain("E = mc^2");
    expect(blockContainer.textContent).toContain("∫");
  });

  it("deve renderizar múltiplos parágrafos em Markdown", () => {
    const markdownMultiline = `
# Título Principal

Primeiro parágrafo com texto.

Segundo parágrafo com **negrito** e *itálico*.

## Subtítulo

- Item 1
- Item 2
    `;

    const { container } = render(
      <QuestionContent content={markdownMultiline} contentType="markdown" />
    );

    expect(container.textContent).toContain("Título Principal");
    expect(container.textContent).toContain("Primeiro parágrafo");
    expect(container.textContent).toContain("Segundo parágrafo");
  });

  it("deve lidar com conteúdo null/undefined", () => {
    const { container: nullContainer } = render(
      <QuestionContent content={null as any} />
    );
    const { container: undefinedContainer } = render(
      <QuestionContent content={undefined as any} />
    );

    expect(nullContainer).toBeTruthy();
    expect(undefinedContainer).toBeTruthy();
  });

  it("deve renderizar imagens em HTML", () => {
    const htmlWithImage = `
      <div>
        <p>Questão com imagem:</p>
        <img src="https://via.placeholder.com/300x200" alt="Imagem teste" />
      </div>
    `;

    render(<QuestionContent content={htmlWithImage} contentType="html" />);

    const img = screen.getByAltText(/imagem teste/i);
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("https://via.placeholder.com/300x200");
  });

  it("deve renderizar tabelas em HTML", () => {
    const htmlWithTable = `
      <table>
        <thead>
          <tr>
            <th>Coluna 1</th>
            <th>Coluna 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Valor 1</td>
            <td>Valor 2</td>
          </tr>
        </tbody>
      </table>
    `;

    render(<QuestionContent content={htmlWithTable} contentType="html" />);

    expect(screen.getByText(/coluna 1/i)).toBeInTheDocument();
    expect(screen.getByText(/valor 1/i)).toBeInTheDocument();
  });

  it("deve preservar quebras de linha em texto simples", () => {
    const multilineText = "Linha 1\nLinha 2\nLinha 3";

    const { container } = render(
      <QuestionContent content={multilineText} contentType="text" />
    );

    expect(container.textContent).toContain("Linha 1");
    expect(container.textContent).toContain("Linha 2");
    expect(container.textContent).toContain("Linha 3");
  });
});
