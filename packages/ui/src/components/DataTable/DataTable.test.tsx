/**
 * @file DataTable.test.tsx
 * @description Testes do componente DataTable
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
    it("deve renderizar botões de paginação", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      expect(screen.getByText("Anterior")).toBeInTheDocument();
      expect(screen.getByText("Próximo")).toBeInTheDocument();
    });

    it("deve desabilitar botão Anterior na primeira página", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      const prevButton = screen.getByText("Anterior");
      expect(prevButton).toBeDisabled();
    });

    it("deve mostrar número da página atual", () => {
      render(<DataTable columns={mockColumns} data={mockUsers} />);

      expect(screen.getByText(/Página 1 de/)).toBeInTheDocument();
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
});
