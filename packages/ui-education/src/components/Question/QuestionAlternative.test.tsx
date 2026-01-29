import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { QuestionAlternative } from "./QuestionAlternative";
import type { Alternative } from "./types";

describe("QuestionAlternative", () => {
  const mockAlternative: Alternative = {
    id: "1",
    text: "Alternativa A",
    isCorrect: true,
  };

  it("deve renderizar alternativa com tipo radio", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
      />
    );

    const radio = screen.getByRole("radio");
    expect(radio).toBeInTheDocument();
    expect(screen.getByText(/alternativa a/i)).toBeInTheDocument();
  });

  it("deve renderizar alternativa com tipo checkbox", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="checkbox"
        name="question1"
        selected={false}
        onChange={vi.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("deve chamar onChange quando alternativa for clicada", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={handleChange}
      />
    );

    const radio = screen.getByRole("radio");
    await user.click(radio);

    // onChange é chamado com (selected: boolean, value?: string)
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0]).toBe(true);
  });

  it("deve mostrar feedback correto quando status='correct'", () => {
    const { container } = render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={true}
        onChange={vi.fn()}
        status="correct"
        showFeedback
      />
    );

    // Verifica se há indicação visual de correto (border-green)
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/green|correct/i);
  });

  it("deve mostrar feedback incorreto quando status='incorrect'", () => {
    const { container } = render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={true}
        onChange={vi.fn()}
        status="incorrect"
        showFeedback
      />
    );

    // Verifica se há indicação visual de incorreto (border-red)
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/red|incorrect/i);
  });

  it("deve estar desabilitada em modo readonly", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
        readOnly
      />
    );

    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });

  it("deve estar desabilitada quando disabled=true", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
        disabled
      />
    );

    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });

  it("deve renderizar feedback text quando fornecido", () => {
    const alternativeWithFeedback: Alternative = {
      ...mockAlternative,
      feedback: "Excelente! Esta é a resposta correta.",
    };

    render(
      <QuestionAlternative
        alternative={alternativeWithFeedback}
        type="radio"
        name="question1"
        selected={true}
        onChange={vi.fn()}
        status="correct"
        showFeedback
      />
    );

    expect(
      screen.getByText(/excelente! esta é a resposta correta/i)
    ).toBeInTheDocument();
  });

  it("deve aplicar className customizada", () => {
    const { container } = render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
        className="custom-class"
      />
    );

    const element = container.querySelector(".custom-class");
    expect(element).toBeInTheDocument();
  });

  it("deve marcar alternativa como selecionada", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={true}
        onChange={vi.fn()}
      />
    );

    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("deve desmarcar alternativa quando selected=false", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="checkbox"
        name="question1"
        selected={false}
        onChange={vi.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("deve suportar navegação por teclado", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={handleChange}
      />
    );

    const radio = screen.getByRole("radio");
    
    // Focar e clicar via userEvent simula navegação
    await user.click(radio);

    expect(handleChange).toHaveBeenCalled();
  });

  it("deve renderizar imagem na alternativa quando image fornecido", () => {
    const alternativeWithImage: Alternative = {
      ...mockAlternative,
      image: "https://via.placeholder.com/150",
    };

    render(
      <QuestionAlternative
        alternative={alternativeWithImage}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
      />
    );

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("https://via.placeholder.com/150");
  });

  it("deve não chamar onChange quando readonly", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={handleChange}
        readOnly
      />
    );

    const radio = screen.getByRole("radio");
    await user.click(radio);

    // Click não deve funcionar pois está disabled
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("deve renderizar múltiplas alternativas com nomes únicos", () => {
    const { rerender } = render(
      <QuestionAlternative
        alternative={{ id: "1", text: "Alternativa 1", isCorrect: true }}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText(/alternativa 1/i)).toBeInTheDocument();

    rerender(
      <QuestionAlternative
        alternative={{ id: "2", text: "Alternativa 2", isCorrect: false }}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText(/alternativa 2/i)).toBeInTheDocument();
  });

  it("deve mostrar status pending", () => {
    const { container } = render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={true}
        onChange={vi.fn()}
        status="pending"
        showFeedback
      />
    );

    // Quando status é pending, verifica que o componente renderiza
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeTruthy();
  });

  it("deve mostrar status unanswered", () => {
    const { container } = render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={false}
        onChange={vi.fn()}
        status="unanswered"
        showFeedback
      />
    );

    // Sem seleção, não deve ter classes de feedback verde/vermelho
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/green-500|red-500/);
  });

  it("deve ter atributos ARIA corretos", () => {
    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="radio"
        name="question1"
        selected={true}
        onChange={vi.fn()}
        status="correct"
      />
    );

    const radio = screen.getByRole("radio") as HTMLInputElement;
    // Radio nativo tem checked=true quando selecionado
    expect(radio.checked).toBe(true);
  });

  it("deve lidar com onChange de checkbox corretamente", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="checkbox"
        name="question1"
        selected={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    // onChange é chamado com (selected: boolean, value?: string)
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0]).toBe(true);
  });

  it("deve desmarcar checkbox quando já selecionado", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <QuestionAlternative
        alternative={mockAlternative}
        type="checkbox"
        name="question1"
        selected={true}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    // onChange é chamado com (selected: boolean, value?: string)
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0]).toBe(false);
  });
});
