/**
 * @file DataTablePagination.tsx
 * @description Componente de paginação avançada para DataTable
 * Inclui seletor de page size, navegação, jump-to-page e contagem de resultados
 */

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "../../utils";
import { Button } from "../Button";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props do componente DataTablePagination.
 * 
 * @template TData - Tipo dos dados da tabela
 */
export interface DataTablePaginationProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Instância da tabela do TanStack Table.
   * @required
   */
  table: Table<TData>;

  /**
   * Opções de tamanho de página disponíveis.
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Mostrar seletor de page size.
   * @default true
   */
  showPageSizeSelector?: boolean;

  /**
   * Mostrar contador de resultados "Mostrando X-Y de Z".
   * @default true
   */
  showResultsCount?: boolean;

  /**
   * Mostrar input de jump-to-page.
   * @default true
   */
  showJumpToPage?: boolean;

  /**
   * Mostrar botões de primeira/última página.
   * @default true
   */
  showFirstLastButtons?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DataTablePagination - Paginação avançada com controles completos.
 * 
 * @example Uso básico
 * ```tsx
 * const table = useReactTable({ ... });
 * <DataTablePagination table={table} />
 * ```
 * 
 * @example Configuração personalizada
 * ```tsx
 * <DataTablePagination
 *   table={table}
 *   pageSizeOptions={[5, 10, 20, 50]}
 *   showJumpToPage={false}
 * />
 * ```
 */
export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeSelector = true,
  showResultsCount = true,
  showJumpToPage = true,
  showFirstLastButtons = true,
  className,
  ...rest
}: DataTablePaginationProps<TData>) {
  const [jumpToPageValue, setJumpToPageValue] = React.useState<string>("");

  // Estado de paginação
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;

  // Calcula índices de exibição (1-based para UI)
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  /**
   * Handler para mudança de page size
   */
  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
  };

  /**
   * Handler para jump-to-page
   */
  const handleJumpToPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const page = Number(jumpToPageValue);
    
    // Validação: deve ser número válido entre 1 e pageCount
    if (!isNaN(page) && page >= 1 && page <= pageCount) {
      table.setPageIndex(page - 1); // Converte de 1-based para 0-based
      setJumpToPageValue("");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...rest}
    >
      {/* Lado esquerdo: Page size e contador de resultados */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        {/* Page size selector */}
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Itens por página:
            </span>
            <select
              value={String(pageSize)}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Itens por página"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={String(size)}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Results count */}
        {showResultsCount && (
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Mostrando {startRow} - {endRow} de {totalRows} resultado
            {totalRows !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Lado direito: Navegação */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        {/* Jump to page */}
        {showJumpToPage && pageCount > 1 && (
          <form
            onSubmit={handleJumpToPage}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Ir para página:
            </span>
            <input
              type="number"
              min={1}
              max={pageCount}
              value={jumpToPageValue}
              onChange={(e) => setJumpToPageValue(e.target.value)}
              placeholder={String(pageIndex + 1)}
              className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Número da página"
            />
          </form>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          {/* First page */}
          {showFirstLastButtons && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Primeira página"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page indicator */}
          <span className="flex items-center justify-center text-sm font-medium px-3">
            {pageIndex + 1} / {pageCount}
          </span>

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          {showFirstLastButtons && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Última página"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

DataTablePagination.displayName = "DataTablePagination";
