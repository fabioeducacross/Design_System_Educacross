import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { MultipleChoice } from "./MultipleChoice";

describe("MultipleChoice", () => {
  const mockDataRadio = {
    alternatives: [
      { id: "1", text: "Alternativa A", isCorrect: true },
      { id: "2", text: "Alternativa B", isCorrect: false },
      { id: "3", text: "Alternativa C", isCorrect: false },
    ],
    multipleSelection: false,
  };

  const mockDataCheckbox = {
    alternatives: [
      { id: "1", text: "Opção 1", isCorrect: true },
      { id: "2", text: "Opção 2", isCorrect: true },
      { id: "3", text: "Opção 3", isCorrect: false },
    ],
    multipleSelection: true,
  };

  it("deve renderizar questão múltipla escolha com radio buttons", async () => {
    render(
      <MultipleChoice
        content="Selecione a alternativa correta:"
        data={mockDataRadio}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(/selecione a alternativa correta/i)
      ).toBeInTheDocument();
    });
    
    expect(screen.getAllByText(/alternativa a/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/alternativa b/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/alternativa c/i).length).toBeGreaterThan(0);

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("deve renderizar questão múltipla escolha com checkboxes", () => {
    render(
      <MultipleChoice
        content="Selecione todas as opções corretas:"
        data={mockDataCheckbox}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
  });

  it("deve chamar onAnswerChange quando selecionar radio", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultipleChoice
        content="Questão teste"
        data={mockDataRadio}
        answer={[]}
        onAnswerChange={handleChange}
      />
    );

    const radios = screen.getAllByRole("radio");
    await user.click(radios[0]);

    expect(handleChange).toHaveBeenCalledWith(["1"]);
  });

  it("deve chamar onAnswerChange quando selecionar checkbox", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultipleChoice
        content="Questão teste"
        data={mockDataCheckbox}
        answer={[]}
        onAnswerChange={handleChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(handleChange).toHaveBeenCalledWith(["1"]);
  });

  it("deve permitir múltiplas seleções com checkbox", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultipleChoice
        content="Questão teste"
        data={mockDataCheckbox}
        answer={["1"]}
        onAnswerChange={handleChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]); // Seleciona a segunda opção

    expect(handleChange).toHaveBeenCalledWith(["1", "2"]);
  });

  it("deve desmarcar checkbox quando clicar novamente", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultipleChoice
        content="Questão teste"
        data={mockDataCheckbox}
        answer={["1"]}
        onAnswerChange={handleChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]); // Desmarca a primeira

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("deve mostrar feedback quando showFeedback=true", () => {
    const dataWithFeedback = {
      ...mockDataRadio,
      alternatives: [
        { id: "1", text: "Correta", isCorrect: true, feedback: "Muito bem!" },
        { id: "2", text: "Errada", isCorrect: false, feedback: "Incorreto" },
      ],
    };

    render(
      <MultipleChoice
        content="Questão com feedback"
        data={dataWithFeedback}
        answer={["1"]}
        onAnswerChange={vi.fn()}
        showFeedback={true}
      />
    );

    expect(screen.getByText(/muito bem/i)).toBeInTheDocument();
  });

  it("deve estar em modo readonly quando readOnly=true", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultipleChoice
        content="Questão readonly"
        data={mockDataRadio}
        answer={["1"]}
        onAnswerChange={handleChange}
        readOnly={true}
      />
    );

    const radios = screen.getAllByRole("radio");
    await user.click(radios[1]);

    // Não deve chamar onChange em modo readonly
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("deve aplicar layout grid quando columnsCount fornecido", () => {
    const dataWithColumns = {
      ...mockDataRadio,
      columnsCount: 2,
    };

    const { container } = render(
      <MultipleChoice
        content="Questão em grid"
        data={dataWithColumns}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    // Verifica se há classes de grid aplicadas
    const gridContainer = container.querySelector('[class*="grid"]');
    expect(gridContainer).toBeTruthy();
  });

  it("deve renderizar alternativas com imagens", () => {
    const dataWithImages = {
      alternatives: [
        { id: "1", text: "Com imagem", image: "/img1.jpg" },
        { id: "2", text: "Sem imagem" },
      ],
      multipleSelection: false,
    };

    render(
      <MultipleChoice
        content="Questão com imagens"
        data={dataWithImages}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
  });

  it("deve aplicar className customizada", () => {
    const { container } = render(
      <MultipleChoice
        content="Questão"
        data={mockDataRadio}
        answer={[]}
        onAnswerChange={vi.fn()}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("deve preservar seleção existente ao renderizar", () => {
    render(
      <MultipleChoice
        content="Questão"
        data={mockDataRadio}
        answer={["2"]}
        onAnswerChange={vi.fn()}
      />
    );

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
    expect(radios[2].checked).toBe(false);
  });

  it("deve preservar múltiplas seleções com checkbox", () => {
    render(
      <MultipleChoice
        content="Questão"
        data={mockDataCheckbox}
        answer={["1", "3"]}
        onAnswerChange={vi.fn()}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
    expect(checkboxes[2].checked).toBe(true);
  });

  it("deve renderizar feedback text nas alternativas", () => {
    const dataWithFeedback = {
      alternatives: [
        { id: "1", text: "Opção 1", feedback: "Feedback específico" },
      ],
      multipleSelection: false,
    };

    render(
      <MultipleChoice
        content="Questão"
        data={dataWithFeedback}
        answer={["1"]}
        onAnswerChange={vi.fn()}
        showFeedback={true}
      />
    );

    expect(screen.getByText(/feedback específico/i)).toBeInTheDocument();
  });

  it("deve ter atributos ARIA adequados", () => {
    render(
      <MultipleChoice
        content="Questão acessível"
        data={mockDataRadio}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("name");
      expect(radio).toHaveAttribute("value");
    });
  });

  it("deve permitir navegação por teclado", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultipleChoice
        content="Questão"
        data={mockDataRadio}
        answer={[]}
        onAnswerChange={handleChange}
      />
    );

    const radios = screen.getAllByRole("radio");
    radios[0].focus();
    await user.keyboard(" "); // Pressiona espaço

    expect(handleChange).toHaveBeenCalledWith(["1"]);
  });

  it("deve renderizar alternativas em ordem", () => {
    render(
      <MultipleChoice
        content="Questão"
        data={mockDataRadio}
        answer={[]}
        onAnswerChange={vi.fn()}
      />
    );

    const alternatives = screen.getAllByRole("radio");
    expect(alternatives[0]).toHaveAttribute("value", "1");
    expect(alternatives[1]).toHaveAttribute("value", "2");
    expect(alternatives[2]).toHaveAttribute("value", "3");
  });
});
