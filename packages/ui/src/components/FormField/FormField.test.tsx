/**
 * FormField Component Tests
 * 
 * Valida estrutura básica, acessibilidade e comportamento do FormField.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "./FormField";
import { Input } from "../Input/Input";

describe("FormField", () => {
  describe("Renderização Básica", () => {
    it("deve renderizar label, input e helper text", () => {
      render(
        <FormField label="Nome" helperText="Digite seu nome completo">
          <Input placeholder="João Silva" />
        </FormField>
      );

      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("João Silva")).toBeInTheDocument();
      expect(screen.getByText("Digite seu nome completo")).toBeInTheDocument();
    });

    it("deve gerar ID automático quando não fornecido", () => {
      render(
        <FormField label="Email">
          <Input type="email" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id");
      expect(input.id).toMatch(/^field-/);
    });

    it("deve usar ID customizado quando fornecido", () => {
      render(
        <FormField label="Password" id="custom-password">
          <Input type="password" />
        </FormField>
      );

      const input = screen.getByLabelText("Password");
      expect(input).toHaveAttribute("id", "custom-password");
    });
  });

  describe("Campo Obrigatório (required)", () => {
    it("deve exibir asterisco quando required=true", () => {
      render(
        <FormField label="E-mail" required>
          <Input type="email" />
        </FormField>
      );

      expect(screen.getByText("*")).toBeInTheDocument();
      expect(screen.getByLabelText("obrigatório")).toBeInTheDocument();
    });

    it("deve adicionar aria-required no input", () => {
      render(
        <FormField label="Nome" required>
          <Input />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-required", "true");
    });

    it("não deve exibir asterisco quando required=false", () => {
      render(
        <FormField label="Apelido" required={false}>
          <Input />
        </FormField>
      );

      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("Mensagens de Erro", () => {
    it("deve exibir mensagem de erro quando error está presente", () => {
      render(
        <FormField label="CPF" error="CPF inválido">
          <Input />
        </FormField>
      );

      const errorMsg = screen.getByText("CPF inválido");
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveAttribute("role", "alert");
      expect(errorMsg).toHaveAttribute("aria-live", "polite");
    });

    it("deve adicionar aria-invalid no input quando há erro", () => {
      render(
        <FormField label="Email" error="Email obrigatório">
          <Input type="email" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("erro deve ter prioridade sobre helperText", () => {
      render(
        <FormField
          label="Senha"
          error="Senha muito curta"
          helperText="Mínimo 8 caracteres"
        >
          <Input type="password" />
        </FormField>
      );

      expect(screen.getByText("Senha muito curta")).toBeInTheDocument();
      expect(screen.queryByText("Mínimo 8 caracteres")).not.toBeInTheDocument();
    });

    it("deve vincular erro ao input via aria-describedby", () => {
      render(
        <FormField label="Email" error="Email inválido" id="email-field">
          <Input type="email" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "email-field-error");
    });
  });

  describe("Helper Text", () => {
    it("deve exibir helperText quando não há erro", () => {
      render(
        <FormField label="Username" helperText="Apenas letras e números">
          <Input />
        </FormField>
      );

      expect(screen.getByText("Apenas letras e números")).toBeInTheDocument();
    });

    it("deve vincular helperText ao input via aria-describedby", () => {
      render(
        <FormField label="Bio" helperText="Máximo 160 caracteres" id="bio-field">
          <Input />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "bio-field-helper");
    });

    it("não deve exibir helperText quando há erro", () => {
      render(
        <FormField
          label="Phone"
          error="Formato inválido"
          helperText="(11) 99999-9999"
        >
          <Input />
        </FormField>
      );

      expect(screen.queryByText("(11) 99999-9999")).not.toBeInTheDocument();
    });
  });

  describe("Acessibilidade (a11y)", () => {
    it("label deve estar associado ao input via htmlFor", () => {
      render(
        <FormField label="Full Name" id="name-field">
          <Input />
        </FormField>
      );

      const label = screen.getByText("Full Name");
      const input = screen.getByRole("textbox");

      expect(label).toHaveAttribute("for", "name-field");
      expect(input).toHaveAttribute("id", "name-field");
    });

    it("deve ter estrutura semântica correta", () => {
      const { container } = render(
        <FormField label="Address" helperText="Street, number, city">
          <Input />
        </FormField>
      );

      const label = container.querySelector("label");
      const input = container.querySelector("input");
      const helper = container.querySelector("p");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(helper).toBeInTheDocument();
    });

    it("mensagem de erro deve ter role=alert", () => {
      render(
        <FormField label="Email" error="Campo obrigatório">
          <Input />
        </FormField>
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Campo obrigatório");
    });
  });

  describe("Children (cloneElement)", () => {
    it("deve aceitar Input como child", () => {
      render(
        <FormField label="Email">
          <Input type="email" placeholder="seu@email.com" />
        </FormField>
      );

      const input = screen.getByPlaceholderText("seu@email.com");
      expect(input).toHaveAttribute("type", "email");
    });

    it("deve preservar props originais do child", () => {
      render(
        <FormField label="Amount">
          <Input type="number" min="0" max="100" step="5" />
        </FormField>
      );

      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("type", "number");
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
      expect(input).toHaveAttribute("step", "5");
    });

    it("deve injetar props de acessibilidade no child", () => {
      const { container } = render(
        <FormField label="Password" required error="Senha fraca" id="pwd">
          <Input type="password" />
        </FormField>
      );

      const input = container.querySelector("#pwd") as HTMLInputElement;
      expect(input).toHaveAttribute("id", "pwd");
      expect(input).toHaveAttribute("aria-required", "true");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "pwd-error");
      expect(input.type).toBe("password");
    });
  });

  describe("Classes Customizadas", () => {
    it("deve aceitar className adicional", () => {
      const { container } = render(
        <FormField label="Name" className="custom-field">
          <Input />
        </FormField>
      );

      const fieldWrapper = container.firstChild;
      expect(fieldWrapper).toHaveClass("custom-field");
      expect(fieldWrapper).toHaveClass("space-y-2"); // classe padrão
    });
  });

  describe("Props HTML Adicionais", () => {
    it("deve aceitar data-* attributes", () => {
      const { container } = render(
        <FormField label="Code" data-testid="code-field" data-track="form-field">
          <Input />
        </FormField>
      );

      const fieldWrapper = container.firstChild;
      expect(fieldWrapper).toHaveAttribute("data-testid", "code-field");
      expect(fieldWrapper).toHaveAttribute("data-track", "form-field");
    });
  });

  describe("CVA Variants - Size", () => {
    it("deve aplicar classes de size=sm", () => {
      const { container } = render(
        <FormField label="Small Field" size="sm">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-1");
      
      const label = screen.getByText("Small Field");
      expect(label).toHaveClass("text-xs");
    });

    it("deve aplicar classes de size=md (default)", () => {
      const { container } = render(
        <FormField label="Medium Field" size="md">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-2");
      
      const label = screen.getByText("Medium Field");
      expect(label).toHaveClass("text-sm");
    });

    it("deve aplicar classes de size=lg", () => {
      const { container } = render(
        <FormField label="Large Field" size="lg">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-2.5");
      
      const label = screen.getByText("Large Field");
      expect(label).toHaveClass("text-base");
    });

    it("deve usar size default quando omitido", () => {
      const { container } = render(
        <FormField label="Default Field">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-2");
    });
  });

  describe("CVA Variants - Layout", () => {
    it("deve aplicar layout vertical por padrão", () => {
      const { container } = render(
        <FormField label="Vertical Field">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex-col");
    });

    it("deve aplicar classes de layout horizontal", () => {
      const { container } = render(
        <FormField label="Horizontal Field" layout="horizontal">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex-row", "items-start");
      
      const label = screen.getByText("Horizontal Field");
      expect(label).toHaveClass("pt-2");
      expect(label).toHaveClass("inline-flex");
    });

    it("deve renderizar input em wrapper no layout horizontal", () => {
      const { container } = render(
        <FormField label="Field" layout="horizontal" helperText="Helper">
          <Input data-testid="input" />
        </FormField>
      );

      const input = screen.getByTestId("input");
      const inputWrapper = input.parentElement;
      
      expect(inputWrapper).toHaveClass("flex-1");
      expect(inputWrapper).toHaveClass("space-y-1");
    });

    it("deve renderizar mensagens dentro do wrapper no layout horizontal", () => {
      const { container } = render(
        <FormField 
          label="Field" 
          layout="horizontal" 
          error="Error message"
          helperText="Helper text"
        >
          <Input data-testid="input" />
        </FormField>
      );

      const input = screen.getByTestId("input");
      const inputWrapper = input.parentElement;
      
      const errorMessage = screen.getByText("Error message");
      expect(inputWrapper).toContainElement(errorMessage);
    });
  });

  describe("CVA Variants - Disabled State", () => {
    it("deve aplicar estilos disabled no label", () => {
      render(
        <FormField label="Disabled Field" disabled>
          <Input />
        </FormField>
      );

      const label = screen.getByText("Disabled Field");
      expect(label).toHaveClass("cursor-not-allowed");
      expect(label).toHaveClass("opacity-70");
    });

    it("deve injetar prop disabled no child", () => {
      render(
        <FormField label="Field" disabled>
          <Input data-testid="input" />
        </FormField>
      );

      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();
    });

    it("deve combinar disabled com layout horizontal", () => {
      render(
        <FormField label="Field" layout="horizontal" disabled>
          <Input data-testid="input" />
        </FormField>
      );

      const label = screen.getByText("Field");
      expect(label).toHaveClass("cursor-not-allowed");
      expect(label).toHaveClass("opacity-70");
      
      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();
    });
  });

  describe("CVA Variants - Combinações", () => {
    it("deve combinar size e layout", () => {
      const { container } = render(
        <FormField label="Field" size="lg" layout="horizontal">
          <Input />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-2.5", "flex-row");
      
      const label = screen.getByText("Field");
      expect(label).toHaveClass("text-base", "pt-2");
    });

    it("deve combinar todas variants com error", () => {
      const { container } = render(
        <FormField 
          label="Field" 
          size="sm" 
          layout="horizontal" 
          disabled
          error="Error"
        >
          <Input data-testid="input" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("space-y-1", "flex-row");
      
      const label = screen.getByText("Field");
      expect(label).toHaveClass("text-xs", "cursor-not-allowed");
      
      const error = screen.getByText("Error");
      expect(error).toHaveClass("text-xs", "text-destructive");
      
      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();
    });
  });
});
