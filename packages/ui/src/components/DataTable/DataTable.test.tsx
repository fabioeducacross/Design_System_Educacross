/**
 * @file DataTable.test.tsx
 * @description Testes do componente DataTable
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";

// ============================================================================
// MOCK DATA
// ============================================================================

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  { id: "1", name: "João Silva", email: "joao@email.com", status: "active" },
  { id: "2", name: "Maria Santos", email: "maria@email.com", status: "active" },
  { id: "3", name: "Pedro Oliveira", email: "pedro@email.com", status: "inactive" },
];

const mockColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

// ============================================================================
// TESTS
// ============================================================================

describe("DataTable", () => {
  describe("Renderização Básica", () => {
    it("deve renderizar tabela com dados", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      // Verifica headers
      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();

      // Verifica dados
      expect(screen.getByText("João Silva")).toBeInTheDocument();
      expect(screen.getByText("joao@email.com")).toBeInTheDocument();
    });

    it("deve renderizar todas as linhas de dados", () => {
      const { container } = render(<DataTable columns={mockColumns} data={mockUsers} />);

      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(3);
    });

    it("deve exibir mensagem quando não há dados", () => {
      render(<DataTable columns={mockColumns} data={[]} />);

      expect(screen.getByText("Nenhum resultado encontrado.")).toBeInTheDocument();
    });

    it("deve exibir mensagem customizada de empty state", () => {
      render(
        <DataTable
          columns={mockColumns}
          data={[]}
          emptyMessage="Sem usuários cadastrados"
        />
      );

      expect(screen.getByText("Sem usuários cadastrados")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("deve exibir loading quando isLoading=true", () => {
      render(<DataTable columns={mockColumns} data={[]} isLoading />);

      expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });

    it("não deve exibir dados durante loading", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} isLoading />);

      expect(screen.queryByText("João Silva")).not.toBeInTheDocument();
      expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });
  });

  describe("Paginação", () => {
    it("renderiza DataTablePagination", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      // Verifica que a paginação avançada está presente
      expect(screen.getByLabelText("Página anterior")).toBeInTheDocument();
      expect(screen.getByLabelText("Próxima página")).toBeInTheDocument();
    });

    it("desabilita botão Anterior na primeira página", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      const prevButton = screen.getByLabelText("Página anterior");
      expect(prevButton).toBeDisabled();
    });

    it("mostra número da página atual", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      // Nova paginação mostra "1 / N" ao invés de "Página 1 de N"
      expect(screen.getByText(/1 \/ 1/)).toBeInTheDocument();
    });
  });

  describe("Estrutura HTML", () => {
    it("deve ter estrutura de tabela HTML semântica", () => {
      const { container } = render(<DataTable columns={mockColumns} data={mockUsers} />);

      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();

      const thead = container.querySelector("thead");
      expect(thead).toBeInTheDocument();

      const tbody = container.querySelector("tbody");
      expect(tbody).toBeInTheDocument();
    });

    it("deve aplicar className customizada no wrapper", () => {
      const { container } = render(
        <DataTable columns={mockColumns} data={mockUsers} className="custom-table" />
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom-table");
    });
  });

  describe("TypeScript Generics", () => {
    it("deve funcionar com tipos customizados", () => {
      interface Product {
        id: number;
        name: string;
        price: number;
      }

      const products: Product[] = [
        { id: 1, name: "Notebook", price: 3000 },
        { id: 2, name: "Mouse", price: 50 },
      ];

      const columns: ColumnDef<Product>[] = [
        { accessorKey: "name", header: "Produto" },
        {
          accessorKey: "price",
          header: "Preço",
          cell: ({ row }) => `R$ ${row.getValue<number>("price")}`,
        },
      ];

      render(<DataTable columns={columns} data={products} />);

      expect(screen.getByText("Notebook")).toBeInTheDocument();
      expect(screen.getByText("R$ 3000")).toBeInTheDocument();
    });
  });

  describe("Sorting Interativo", () => {
    it("renderiza ícones de sorting nos headers ordenáveis", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} enableSorting={true} />);

      const nameHeader = screen.getByText("Nome").closest("th");
      expect(nameHeader).toBeInTheDocument();

      // Deve ter um ícone de sorting (ArrowUpDown quando não ordenado)
      const sortIcon = nameHeader?.querySelector("svg");
      expect(sortIcon).toBeInTheDocument();
    });

    it("altera ícone ao clicar para ordenar", async () => {
      const user = userEvent.setup();
      render(<DataTable columns={mockColumns} data={mockUsers} enableSorting={true} />);

      const nameHeader = screen.getByText("Nome").closest("div[role='button']");
      expect(nameHeader).toBeInTheDocument();

      // Clica para ordenar ascendente
      if (nameHeader) {
        await user.click(nameHeader);
        // Após clicar, deve mostrar ArrowUp
        const sortIcon = nameHeader.querySelector("svg");
        expect(sortIcon).toHaveAttribute("aria-label", "Ordenado crescente");
      }
    });

    it("headers não ordenáveis não têm cursor pointer", () => {
      const nonSortableColumns: ColumnDef<User>[] = [
        {
          accessorKey: "name",
          header: "Nome",
          enableSorting: false,
        },
      ];

      render(<DataTable columns={nonSortableColumns} data={mockUsers} />);

      const nameHeader = screen.getByText("Nome").closest("div");
      expect(nameHeader).not.toHaveAttribute("role", "button");
    });

    it("desabilita sorting quando enableSorting=false", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} enableSorting={false} />);

      const nameHeader = screen.getByText("Nome").closest("th");
      const sortableDiv = nameHeader?.querySelector("div[role='button']");
      
      expect(sortableDiv).not.toBeInTheDocument();
    });

    it("suporta navegação por teclado nos headers", async () => {
      userEvent.setup();
      render(<DataTable columns={mockColumns} data={mockUsers} enableSorting={true} />);

      const nameHeader = screen.getByText("Nome").closest("div[role='button']");
      
      if (nameHeader) {
        // Foca no header
        nameHeader.focus();
        expect(nameHeader).toHaveFocus();

        // Deve ter tabIndex 0
        expect(nameHeader).toHaveAttribute("tabIndex", "0");
      }
    });

    it("aria-label descreve a ação de sorting", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} enableSorting={true} />);

      const nameHeader = screen.getByText("Nome").closest("div[role='button']");
      expect(nameHeader).toHaveAttribute("aria-label", "Ordenar por name");
    });
  });
});
