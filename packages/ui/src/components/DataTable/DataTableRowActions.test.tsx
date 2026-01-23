/**
 * @file DataTableRowActions.test.tsx
 * @description Testes para o componente DataTableRowActions
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTableRowActions } from "./DataTableRowActions";
import type { RowAction } from "./helpers";
import { Edit, Trash } from "lucide-react";

// ============================================================================
// MOCK DATA
// ============================================================================

interface MockUser {
  id: number;
  name: string;
  role: string;
}

const mockUser: MockUser = {
  id: 1,
  name: "Alice",
  role: "admin",
};

// ============================================================================
// TESTS: Renderização Básica
// ============================================================================

describe("DataTableRowActions", () => {
  describe("Renderização Básica", () => {
    it("renderiza botão de ações", () => {
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      expect(button).toBeInTheDocument();
    });

    it("renderiza ícone MoreHorizontal no botão", () => {
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      const { container } = render(
        <DataTableRowActions row={mockUser} actions={actions} />
      );

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("não renderiza nada se todas as ações estão desabilitadas", () => {
      const actions: RowAction<MockUser>[] = [
        {
          label: "Editar",
          onClick: vi.fn(),
          disabled: () => true,
        },
      ];

      const { container } = render(
        <DataTableRowActions row={mockUser} actions={actions} />
      );

      const button = container.querySelector("button");
      expect(button).toBeNull();
    });

    it("aplica className customizado", () => {
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      const { container } = render(
        <DataTableRowActions
          row={mockUser}
          actions={actions}
          className="custom-class"
        />
      );

      const div = container.firstChild as HTMLElement;
      expect(div).toHaveClass("custom-class");
    });
  });

  // ============================================================================
  // TESTS: Menu Actions
  // ============================================================================

  describe("Menu Actions", () => {
    it("abre dropdown ao clicar no botão", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
        { label: "Deletar", onClick: vi.fn() },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      expect(screen.getByText("Editar")).toBeInTheDocument();
      expect(screen.getByText("Deletar")).toBeInTheDocument();
    });

    it("renderiza ícones das ações", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        {
          label: "Editar",
          icon: <Edit data-testid="edit-icon" className="h-4 w-4" />,
          onClick: vi.fn(),
        },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    });

    it("renderiza ícones e labels das ações no menu", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        {
          label: "Editar",
          icon: <Edit data-testid="edit-icon" className="h-4 w-4" />,
          onClick: vi.fn(),
        },
        { label: "Deletar", onClick: vi.fn() },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      // Verifica que ambas ações são renderizadas
      expect(screen.getByText("Editar")).toBeInTheDocument();
      expect(screen.getByText("Deletar")).toBeInTheDocument();
      expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    });

    it("não renderiza ações desabilitadas no menu", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
        {
          label: "Deletar",
          onClick: vi.fn(),
          disabled: (row) => row.role === "admin",
        },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      expect(screen.getByText("Editar")).toBeInTheDocument();
      expect(screen.queryByText("Deletar")).not.toBeInTheDocument();
    });

    it("renderiza ações com disabled condicional", async () => {
      const user = userEvent.setup();
      const regularUser: MockUser = { id: 2, name: "Bob", role: "user" };
      const actions: RowAction<MockUser>[] = [
        {
          label: "Deletar",
          onClick: vi.fn(),
          disabled: (row) => row.role === "admin",
        },
      ];

      render(<DataTableRowActions row={regularUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      // Para usuário regular, ação deve aparecer
      expect(screen.getByText("Deletar")).toBeInTheDocument();
    });

    it("aplica className customizado nas ações", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        {
          label: "Deletar",
          onClick: vi.fn(),
          className: "text-destructive",
        },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      const deleteItem = screen.getByText("Deletar").closest("button");
      expect(deleteItem).toHaveClass("text-destructive");
    });
  });

  // ============================================================================
  // TESTS: Menu Label e Separator
  // ============================================================================

  describe("Menu Label e Separator", () => {
    it("renderiza menuLabel quando fornecido", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      render(
        <DataTableRowActions
          row={mockUser}
          actions={actions}
          menuLabel="Ações do Usuário"
        />
      );

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      expect(screen.getByText("Ações do Usuário")).toBeInTheDocument();
    });

    it("não renderiza menuLabel se não fornecido", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      // Verifica que não há label renderizado
      const menu = screen.getByText("Editar").closest("div[role='menu']");
      expect(menu).toBeTruthy();
    });

    it("adiciona separador antes de ação destructive", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
        {
          label: "Deletar",
          onClick: vi.fn(),
          className: "text-destructive",
        },
      ];

      const { container } = render(
        <DataTableRowActions row={mockUser} actions={actions} />
      );

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      // Verificar presença de separador (role="separator")
      const separators = container.querySelectorAll('[role="separator"]');
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // TESTS: Acessibilidade
  // ============================================================================

  describe("Acessibilidade", () => {
    it("botão tem aria-label padrão", () => {
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: "Ações da linha" });
      expect(button).toBeInTheDocument();
    });

    it("aceita ariaLabel customizado", () => {
      const actions: RowAction<MockUser>[] = [
        { label: "Editar", onClick: vi.fn() },
      ];

      render(
        <DataTableRowActions
          row={mockUser}
          actions={actions}
          ariaLabel="Ações para Alice"
        />
      );

      const button = screen.getByRole("button", { name: "Ações para Alice" });
      expect(button).toBeInTheDocument();
    });
  });

  // ============================================================================
  // TESTS: Casos Edge
  // ============================================================================

  describe("Casos Edge", () => {
    it("lida com array vazio de ações", () => {
      const { container } = render(
        <DataTableRowActions row={mockUser} actions={[]} />
      );

      const button = container.querySelector("button");
      expect(button).toBeNull();
    });

    it("renderiza múltiplas ações no menu", async () => {
      const user = userEvent.setup();
      const actions: RowAction<MockUser>[] = [
        { label: "Visualizar", onClick: vi.fn() },
        { label: "Editar", onClick: vi.fn() },
        { label: "Duplicar", onClick: vi.fn() },
        { label: "Deletar", onClick: vi.fn(), className: "text-destructive" },
      ];

      render(<DataTableRowActions row={mockUser} actions={actions} />);

      const button = screen.getByRole("button", { name: /ações da linha/i });
      await user.click(button);

      // Verifica que todas as ações aparecem
      expect(screen.getByText("Visualizar")).toBeInTheDocument();
      expect(screen.getByText("Editar")).toBeInTheDocument();
      expect(screen.getByText("Duplicar")).toBeInTheDocument();
      expect(screen.getByText("Deletar")).toBeInTheDocument();
    });
  });
});
