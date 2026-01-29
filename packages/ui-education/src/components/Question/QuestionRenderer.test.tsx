import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { QuestionRenderer } from "./QuestionRenderer";
import type { QuestionType } from "./types";

describe("QuestionRenderer", () => {
  it("deve renderizar sem erros", async () => {
    const { container } = render(
      <QuestionRenderer
        type="multiple-choice"
        questionId="q1"
        content="Qual é a capital do Brasil?"
        data={{
          alternatives: [
            { id: "1", text: "São Paulo", isCorrect: false },
            { id: "2", text: "Brasília", isCorrect: true },
            { id: "3", text: "Rio de Janeiro", isCorrect: false },
          ],
          multipleSelection: false,
        }}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    expect(container).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText(/qual é a capital do brasil/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo multiple-choice", async () => {
    render(
      <QuestionRenderer
        type="multiple-choice"
        questionId="q1"
        content="Pergunta múltipla escolha"
        data={{
          alternatives: [
            { id: "1", text: "Opção A" },
            { id: "2", text: "Opção B" },
          ],
          multipleSelection: false,
        }}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/opção a/i)).toBeInTheDocument();
      expect(screen.getByText(/opção b/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo true-false", async () => {
    render(
      <QuestionRenderer
        type="true-false"
        questionId="q2"
        content="O céu é azul?"
        data={{
          correctAnswer: true,
        }}
        answer={undefined}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/o céu é azul/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo essay", async () => {
    render(
      <QuestionRenderer
        type="essay"
        questionId="q3"
        content="Escreva sobre a Revolução Francesa"
        data={{
          maxWords: 500,
          minWords: 100,
        }}
        answer=""
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/revolução francesa/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo fill-in-blank", async () => {
    render(
      <QuestionRenderer
        type="fill-in-blank"
        questionId="q4"
        content="A capital do Brasil é ___"
        data={{
          blanks: [{ id: "1", position: 0, correctAnswers: ["Brasília"] }],
        }}
        answer={{}}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/a capital do brasil/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo matching", async () => {
    render(
      <QuestionRenderer
        type="matching"
        questionId="q5"
        content="Relacione os países com suas capitais"
        data={{
          leftItems: [
            { id: "1", text: "Brasil" },
            { id: "2", text: "França" },
          ],
          rightItems: [
            { id: "a", text: "Brasília" },
            { id: "b", text: "Paris" },
          ],
        }}
        answer={{}}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/relacione os países/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo ordering", async () => {
    render(
      <QuestionRenderer
        type="ordering"
        questionId="q6"
        content="Ordene os eventos cronologicamente"
        data={{
          items: [
            { id: "1", text: "Descobrimento do Brasil" },
            { id: "2", text: "Independência" },
          ],
        }}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/ordene os eventos/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar tipo matrix", async () => {
    render(
      <QuestionRenderer
        type="matrix"
        questionId="q7"
        content="Avalie os itens"
        data={{
          rows: [{ id: "1", text: "Item 1" }],
          columns: [{ id: "a", text: "Coluna A" }],
        }}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/avalie os itens/i)).toBeInTheDocument();
    });
  });

  it("deve aplicar className customizada", async () => {
    const { container } = render(
      <QuestionRenderer
        type="multiple-choice"
        questionId="q1"
        content="Questão teste"
        data={{ alternatives: [] }}
        answer={[]}
        onAnswerChange={vi.fn()}
        className="custom-class"
      />
    );

    await waitFor(() => {
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  it("deve passar props readOnly e showFeedback para template", async () => {
    render(
      <QuestionRenderer
        type="multiple-choice"
        questionId="q1"
        content="Questão com feedback"
        data={{
          alternatives: [
            { id: "1", text: "Opção A", isCorrect: true, feedback: "Correto!" },
          ],
          multipleSelection: false,
        }}
        answer={["1"]}
        onAnswerChange={vi.fn()}
        readOnly={true}
        showFeedback={true}
      />
    );

    // Aguarda template carregar
    await waitFor(() => {
      expect(screen.getByText(/opção a/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar com estado de carregamento inicialmente", () => {
    const { container } = render(
      <QuestionRenderer
        type="multiple-choice"
        questionId="q1"
        content="Teste"
        data={{ alternatives: [] }}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    // Verifica loading skeleton
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });

  it("deve renderizar conteúdo após carregamento", async () => {
    render(
      <QuestionRenderer
        type="multiple-choice"
        questionId="q1"
        content="Pergunta carregada"
        data={{
          alternatives: [{ id: "1", text: "Opção" }],
          multipleSelection: false,
        }}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/pergunta carregada/i)).toBeInTheDocument();
    });
  });
});
