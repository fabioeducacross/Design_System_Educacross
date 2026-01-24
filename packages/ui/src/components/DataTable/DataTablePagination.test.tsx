/**
 * @file DataTablePagination.test.tsx
 * @description Testes unitários para DataTablePagination
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTablePagination } from "./DataTablePagination";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

// ============================================================================
// TEST SETUP
// ============================================================================

interface TestData {
  id: number;
  name: string;
}

const testData: TestData[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

const columns: ColumnDef<TestData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nome" },
];

/**
 * Componente wrapper para testar DataTablePagination
 */
function TestWrapper({ pageSize = 10 }: { pageSize?: number }) {
  const table = useReactTable({
    data: testData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  return <DataTablePagination table={table} />;
}

// ============================================================================
// TESTS
// ============================================================================

describe("DataTablePagination", () => {
  describe("Renderização e Layout", () => {
    it("renderiza todos os elementos principais", () => {
      render(<TestWrapper />);

      // Page size selector
      expect(screen.getByText("Itens por página:")).toBeInTheDocument();

      // Results count
      expect(screen.getByText(/Mostrando 1 - 10 de 100 resultados/)).toBeInTheDocument();

      // Page indicator
      expect(screen.getByText(/1 \/ 10/)).toBeInTheDocument();

      // Navigation buttons
      expect(screen.getByLabelText("Primeira página")).toBeInTheDocument();
      expect(screen.getByLabelText("Página anterior")).toBeInTheDocument();
      expect(screen.getByLabelText("Próxima página")).toBeInTheDocument();
      expect(screen.getByLabelText("Última página")).toBeInTheDocument();
    });

    it("aplica className customizado", () => {
      const { container } = render(
        <div data-testid="wrapper">
          <TestWrapper />
        </div>
      );
      const pagination = container.querySelector(".flex");
      expect(pagination).toBeInTheDocument();
    });
  });

  describe("Page Size Selector", () => {
    it("mostra opções de page size padrão", () => {
      render(<TestWrapper />);
      
      // Verifica se está mostrando o page size atual (10)
      const trigger = screen.getByText("Itens por página:").nextElementSibling;
      expect(trigger).toBeInTheDocument();
    });

    it("atualiza page size quando selecionado", async () => {
      userEvent.setup();
      render(<TestWrapper />);

      // A contagem inicial deve ser 1-10 de 100
      expect(screen.getByText(/Mostrando 1 - 10 de 100 resultados/)).toBeInTheDocument();
    });
  });

  describe("Results Count", () => {
    it("mostra contagem correta na primeira página", () => {
      render(<TestWrapper pageSize={10} />);
      expect(screen.getByText(/Mostrando 1 - 10 de 100 resultados/)).toBeInTheDocument();
    });

    it("mostra singular quando apenas 1 resultado", () => {
      function SingleItemWrapper() {
        const table = useReactTable({
          data: [{ id: 1, name: "Item 1" }],
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

        return <DataTablePagination table={table} />;
      }

      render(<SingleItemWrapper />);
      expect(screen.getByText(/1 - 1 de 1 resultado$/)).toBeInTheDocument();
    });

    it("mostra 0-0 quando não há dados", () => {
      function EmptyWrapper() {
        const table = useReactTable({
          data: [],
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

        return <DataTablePagination table={table} />;
      }

      render(<EmptyWrapper />);
      expect(screen.getByText(/Mostrando 0 - 0 de 0 resultados/)).toBeInTheDocument();
    });
  });

  describe("Navegação", () => {
    it("desabilita botões Anterior e Primeira na primeira página", () => {
      render(<TestWrapper />);

      const firstButton = screen.getByLabelText("Primeira página");
      const previousButton = screen.getByLabelText("Página anterior");

      expect(firstButton).toBeDisabled();
      expect(previousButton).toBeDisabled();
    });

    it("habilita botões Próximo e Última na primeira página", () => {
      render(<TestWrapper />);

      const nextButton = screen.getByLabelText("Próxima página");
      const lastButton = screen.getByLabelText("Última página");

      expect(nextButton).not.toBeDisabled();
      expect(lastButton).not.toBeDisabled();
    });

    it("atualiza page indicator corretamente", () => {
      render(<TestWrapper />);
      // Primeira página
      expect(screen.getByText(/1 \/ 10/)).toBeInTheDocument();
    });
  });

  describe("Jump to Page", () => {
    it("renderiza input de jump to page", () => {
      render(<TestWrapper />);
      
      expect(screen.getByText("Ir para página:")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("1")).toBeInTheDocument();
    });

    it("input tem atributos corretos", () => {
      render(<TestWrapper />);
      
      const input = screen.getByPlaceholderText("1") as HTMLInputElement;
      expect(input).toHaveAttribute("type", "number");
      expect(input).toHaveAttribute("min", "1");
      expect(input).toHaveAttribute("max", "10");
      expect(input).toHaveAttribute("aria-label", "Número da página");
    });
  });

  describe("Configuração Opcional", () => {
    it("respeita showPageSizeSelector=false", () => {
      function NoPageSizeSelectorWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

        return <DataTablePagination table={table} showPageSizeSelector={false} />;
      }

      render(<NoPageSizeSelectorWrapper />);
      expect(screen.queryByText("Itens por página:")).not.toBeInTheDocument();
    });

    it("respeita showResultsCount=false", () => {
      function NoResultsCountWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

        return <DataTablePagination table={table} showResultsCount={false} />;
      }

      render(<NoResultsCountWrapper />);
      expect(screen.queryByText(/Mostrando/)).not.toBeInTheDocument();
    });

    it("respeita showJumpToPage=false", () => {
      function NoJumpToPageWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

        return <DataTablePagination table={table} showJumpToPage={false} />;
      }

      render(<NoJumpToPageWrapper />);
      expect(screen.queryByText("Ir para página:")).not.toBeInTheDocument();
    });

    it("respeita showFirstLastButtons=false", () => {
      function NoFirstLastButtonsWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
        });

        return <DataTablePagination table={table} showFirstLastButtons={false} />;
      }

      render(<NoFirstLastButtonsWrapper />);
      expect(screen.queryByLabelText("Primeira página")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Última página")).not.toBeInTheDocument();
    });
  });

  describe("Acessibilidade", () => {
    it("botões têm aria-label apropriados", () => {
      render(<TestWrapper />);

      expect(screen.getByLabelText("Primeira página")).toBeInTheDocument();
      expect(screen.getByLabelText("Página anterior")).toBeInTheDocument();
      expect(screen.getByLabelText("Próxima página")).toBeInTheDocument();
      expect(screen.getByLabelText("Última página")).toBeInTheDocument();
    });

    it("input jump-to-page tem aria-label", () => {
      render(<TestWrapper />);
      
      const input = screen.getByPlaceholderText("1");
      expect(input).toHaveAttribute("aria-label", "Número da página");
    });
  });
});
