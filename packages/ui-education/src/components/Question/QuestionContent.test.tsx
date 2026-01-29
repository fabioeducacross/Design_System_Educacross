import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { QuestionContent } from "./QuestionContent";

describe("QuestionContent", () => {
  it("deve renderizar texto simples", async () => {
    render(<QuestionContent content="Texto simples de questão" />);

    await waitFor(() => {
      expect(screen.getByText(/texto simples de questão/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar HTML com tags permitidas", async () => {
    const htmlContent = "<p>Texto em <strong>negrito</strong></p>";

    render(<QuestionContent content={htmlContent} />);

    await waitFor(() => {
      const strongElement = screen.getByText(/negrito/i);
      expect(strongElement.tagName).toBe("STRONG");
    });
  });

  it("deve renderizar LaTeX inline ($...$)", async () => {
    const latexContent = "Considere $E = mc^2$ na física.";

    const { container } = render(
      <QuestionContent content={latexContent} enableLatex={true} />
    );

    await waitFor(() => {
      // KaTeX renderiza em spans com classe katex
      const katexElement = container.querySelector(".katex");
      expect(katexElement).toBeInTheDocument();
    });
  });

  it("deve renderizar LaTeX display ($$...$$)", async () => {
    const latexContent = "Fórmula: $$x^2 + y^2 = z^2$$";

    const { container } = render(
      <QuestionContent content={latexContent} enableLatex={true} />
    );

    await waitFor(() => {
      // KaTeX display mode usa katex-display
      const katexElement = container.querySelector(".katex-display");
      expect(katexElement).toBeInTheDocument();
    });
  });

  it("deve renderizar Markdown com marked", async () => {
    const markdownContent = "# Título\n\nTexto em **negrito**";

    const { container } = render(
      <QuestionContent content={markdownContent} enableMarkdown={true} />
    );

    await waitFor(() => {
      expect(container.querySelector("h1")).toBeInTheDocument();
      expect(container.querySelector("strong")).toBeInTheDocument();
    });
  });

  it("deve aplicar className customizada", async () => {
    const { container } = render(
      <QuestionContent content="Teste" className="custom-class" />
    );

    await waitFor(() => {
      const element = container.querySelector(".custom-class");
      expect(element).toBeInTheDocument();
    });
  });

  it("deve renderizar conteúdo vazio sem erros", async () => {
    const { container } = render(<QuestionContent content="" />);

    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it("deve renderizar HTML complexo de forma segura", async () => {
    const complexHtml = `
      <div class="question">
        <h3>Pergunta</h3>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `;

    render(<QuestionContent content={complexHtml} />);

    await waitFor(() => {
      expect(screen.getByText(/pergunta/i)).toBeInTheDocument();
      expect(screen.getByText(/item 1/i)).toBeInTheDocument();
      expect(screen.getByText(/item 2/i)).toBeInTheDocument();
    });
  });

  it("deve sanitizar scripts maliciosos", async () => {
    const maliciousHtml = `
      <p>Texto normal</p>
      <script>alert('XSS')</script>
    `;

    const { container } = render(
      <QuestionContent content={maliciousHtml} sanitize={true} />
    );

    await waitFor(() => {
      // Script deve ser removido pelo DOMPurify
      expect(container.querySelector("script")).toBeNull();
      // Texto normal deve permanecer
      expect(screen.getByText(/texto normal/i)).toBeInTheDocument();
    });
  });

  it("deve sanitizar atributos maliciosos", async () => {
    const maliciousHtml = `
      <a href="javascript:alert('XSS')">Link perigoso</a>
      <img src="x" onerror="alert('XSS')" alt="test" />
    `;

    const { container } = render(
      <QuestionContent content={maliciousHtml} sanitize={true} enableMarkdown={false} />
    );

    await waitFor(() => {
      const img = container.querySelector("img");
      
      // onerror deve ser removido (não está na whitelist)
      expect(img?.getAttribute("onerror")).toBeNull();
      // src e alt são permitidos
      expect(img?.getAttribute("src")).toBe("x");
      expect(img?.getAttribute("alt")).toBe("test");
    });
  });

  it("deve usar defaultProps corretamente", async () => {
    const { container } = render(<QuestionContent content="Teste" />);

    await waitFor(() => {
      // Por padrão, enableLatex, enableMarkdown e sanitize são true
      expect(container.textContent).toContain("Teste");
    });
  });

  it("deve renderizar múltiplos parágrafos em Markdown", async () => {
    const markdownMultiline = `
# Título Principal

Primeiro parágrafo com texto.

Segundo parágrafo com **negrito** e *itálico*.

## Subtítulo

- Item 1
- Item 2
    `;

    const { container } = render(
      <QuestionContent content={markdownMultiline} enableMarkdown={true} />
    );

    await waitFor(() => {
      expect(container.querySelector("h1")).toBeInTheDocument();
      expect(container.querySelector("h2")).toBeInTheDocument();
      expect(container.querySelector("ul")).toBeInTheDocument();
    });
  });

  it("deve lidar com conteúdo null/undefined graciosamente", async () => {
    // Renderizar com null/undefined não deve quebrar
    const { container: nullContainer } = render(
      <QuestionContent content={null as any} />
    );

    // Deve mostrar loading ou fallback
    await waitFor(() => {
      expect(nullContainer).toBeTruthy();
    }, { timeout: 2000 });
  });

  it("deve renderizar imagens em HTML", async () => {
    const htmlWithImage = `
      <div>
        <p>Questão com imagem:</p>
        <img src="https://via.placeholder.com/300x200" alt="Imagem teste" />
      </div>
    `;

    // Desabilitar markdown para não escapar o HTML
    render(<QuestionContent content={htmlWithImage} enableMarkdown={false} />);

    await waitFor(() => {
      const img = screen.getByAltText(/imagem teste/i);
      expect(img).toBeInTheDocument();
      expect(img.getAttribute("src")).toBe("https://via.placeholder.com/300x200");
    });
  });

  it("deve renderizar tabelas em HTML", async () => {
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

    render(<QuestionContent content={htmlWithTable} />);

    await waitFor(() => {
      expect(screen.getByText(/coluna 1/i)).toBeInTheDocument();
      expect(screen.getByText(/valor 1/i)).toBeInTheDocument();
    });
  });

  it("deve preservar texto simples sem processamento quando desabilitado", async () => {
    const simpleText = "Texto simples sem formatação";

    const { container } = render(
      <QuestionContent 
        content={simpleText} 
        enableLatex={false}
        enableMarkdown={false}
        sanitize={false}
      />
    );

    await waitFor(() => {
      expect(container.textContent).toContain(simpleText);
    });
  });
});
