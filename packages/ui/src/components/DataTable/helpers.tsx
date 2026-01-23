/**
 * @file helpers.tsx
 * @description Helper functions para DataTable, incluindo criação de colunas de seleção
 */

import * as React from "react";
import type { ColumnDef, Table } from "@tanstack/react-table";
import { Checkbox } from "../Checkbox";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Tipo para ação de linha customizada.
 */
export interface RowAction<TData> {
  /**
   * Label da ação.
   */
  label: string;
  /**
   * Ícone da ação (componente React ou string).
   */
  icon?: React.ReactNode;
  /**
   * Handler quando a ação é clicada.
   */
  onClick: (row: TData) => void;
  /**
   * Se a ação está desabilitada para esta linha.
   */
  disabled?: (row: TData) => boolean;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}

// ============================================================================
// SELECTION COLUMN HELPER
// ============================================================================

/**
 * Cria uma coluna de seleção com checkbox para DataTable.
 * 
 * @template TData - Tipo dos dados da tabela
 * @param options - Opções de configuração
 * @returns Definição de coluna para checkboxes de seleção
 * 
 * @example
 * ```tsx
 * const columns: ColumnDef<User>[] = [
 *   createSelectColumn<User>(),
 *   // ... outras colunas
 * ];
 * ```
 */
export function createSelectColumn<TData>(
  options?: {
    /**
     * ID da coluna (default: "select")
     */
    id?: string;
    /**
     * Se deve mostrar o checkbox de "select all" no header
     */
    enableSelectAll?: boolean;
  }
): ColumnDef<TData> {
  const { id = "select", enableSelectAll = true } = options ?? {};

  return {
    id,
    // Header com checkbox de "select all"
    header: ({ table }: { table: Table<TData> }) => {
      if (!enableSelectAll) {
        return null;
      }

      const isChecked = table.getIsAllRowsSelected() || table.getIsSomeRowsSelected();

      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isChecked}
            onChange={table.getToggleAllRowsSelectedHandler()}
            aria-label="Selecionar todas as linhas"
          />
        </div>
      );
    },
    // Cell com checkbox individual
    cell: ({ row }: { row: any }) => {
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Selecionar linha ${row.index + 1}`}
          />
        </div>
      );
    },
    // Propriedades de estilo
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };
}

// ============================================================================
// ROW SELECTION HELPERS
// ============================================================================

/**
 * Obtém as linhas selecionadas da tabela.
 * 
 * @template TData - Tipo dos dados da tabela
 * @param table - Instância da tabela
 * @returns Array com os dados das linhas selecionadas
 * 
 * @example
 * ```tsx
 * const selectedRows = getSelectedRows(table);
 * console.log(`${selectedRows.length} linhas selecionadas`);
 * ```
 */
export function getSelectedRows<TData>(table: Table<TData>): TData[] {
  return table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);
}

/**
 * Obtém os IDs das linhas selecionadas.
 * 
 * @template TData - Tipo dos dados da tabela
 * @param table - Instância da tabela
 * @param getRowId - Função para extrair ID da linha
 * @returns Array com os IDs das linhas selecionadas
 * 
 * @example
 * ```tsx
 * const selectedIds = getSelectedRowIds(table, (row) => row.id);
 * // ["1", "5", "12"]
 * ```
 */
export function getSelectedRowIds<TData>(
  table: Table<TData>,
  getRowId: (row: TData) => string | number
): Array<string | number> {
  return getSelectedRows(table).map(getRowId);
}

/**
 * Limpa a seleção de todas as linhas.
 * 
 * @param table - Instância da tabela
 * 
 * @example
 * ```tsx
 * clearRowSelection(table);
 * ```
 */
export function clearRowSelection<TData>(table: Table<TData>): void {
  table.resetRowSelection();
}

/**
 * Inverte a seleção de todas as linhas.
 * 
 * @param table - Instância da tabela
 * 
 * @example
 * ```tsx
 * toggleAllRowsSelection(table);
 * ```
 */
export function toggleAllRowsSelection<TData>(table: Table<TData>): void {
  table.toggleAllRowsSelected();
}

// ============================================================================
// BULK ACTIONS HELPER
// ============================================================================

/**
 * Executa uma ação em todas as linhas selecionadas.
 * 
 * @template TData - Tipo dos dados da tabela
 * @param table - Instância da tabela
 * @param action - Função a executar em cada linha selecionada
 * @param clearAfter - Se deve limpar a seleção após execução (default: true)
 * 
 * @example
 * ```tsx
 * // Deletar linhas selecionadas
 * executeBulkAction(
 *   table,
 *   async (row) => await deleteUser(row.id),
 *   true
 * );
 * ```
 */
export async function executeBulkAction<TData>(
  table: Table<TData>,
  action: (row: TData) => void | Promise<void>,
  clearAfter = true
): Promise<void> {
  const selectedRows = getSelectedRows(table);

  try {
    // Executar ação em todas as linhas
    await Promise.all(selectedRows.map((row) => action(row)));

    // Limpar seleção se solicitado
    if (clearAfter) {
      clearRowSelection(table);
    }
  } catch (error) {
    console.error("Erro ao executar bulk action:", error);
    throw error;
  }
}
