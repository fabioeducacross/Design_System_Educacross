/**
 * @file DataTable.tsx
 * @description Componente organismo de tabela de dados com sorting, paginação e filtros
 * Usa TanStack Table v8 para gerenciamento de estado e lógica
 */

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type PaginationState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../../utils";
import { DataTablePagination } from "./DataTablePagination";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props do componente DataTable.
 * 
 * @template TData - Tipo dos dados da tabela
 * @template TValue - Tipo dos valores das células (geralmente unknown)
 * 
 * @example Uso básico
 * ```tsx
 * interface User {
 *   id: string;
 *   name: string;
 *   email: string;
 * }
 * 
 * const columns: ColumnDef<User>[] = [
 *   { accessorKey: "name", header: "Nome" },
 *   { accessorKey: "email", header: "Email" },
 * ];
 * 
 * <DataTable columns={columns} data={users} />
 * ```
 */
export interface DataTableProps<TData, TValue = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Definição das colunas da tabela.
   * Usa o formato ColumnDef do TanStack Table.
   * 
   * @required
   * @see https://tanstack.com/table/v8/docs/guide/column-defs
   * @example
   * ```tsx
   * const columns: ColumnDef<User>[] = [
   *   {
   *     accessorKey: "name",
   *     header: "Nome",
   *     cell: ({ row }) => row.getValue("name"),
   *   },
   * ];
   * ```
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * Array de dados a serem exibidos na tabela.
   * 
   * @required
   * @example [{ id: 1, name: "João" }, { id: 2, name: "Maria" }]
   */
  data: TData[];

  /**
   * Estado de paginação controlado (opcional).
   * Se fornecido, o componente opera em modo controlado.
   * 
   * @optional
   * @example
   * ```tsx
   * const [pagination, setPagination] = useState<PaginationState>({
   *   pageIndex: 0,
   *   pageSize: 10,
   * });
   * 
   * <DataTable
   *   data={data}
   *   columns={columns}
   *   pagination={pagination}
   *   onPaginationChange={setPagination}
   * />
   * ```
   */
  pagination?: PaginationState;

  /**
   * Callback para mudanças de paginação (modo controlado).
   * 
   * @optional
   */
  onPaginationChange?: (updater: PaginationState | ((old: PaginationState) => PaginationState)) => void;

  /**
   * Número de linhas por página (modo não-controlado).
   * 
   * @optional
   * @default 10
   */
  pageSize?: number;

  /**
   * Se a tabela permite ordenação.
   * 
   * @optional
   * @default true
   */
  enableSorting?: boolean;

  /**
   * Se a tabela permite filtros.
   * 
   * @optional
   * @default true
   */
  enableFiltering?: boolean;

  /**
   * Se exibe o loading state.
   * 
   * @optional
   * @default false
   */
  isLoading?: boolean;

  /**
   * Mensagem exibida quando não há dados.
   * 
   * @optional
   * @default "Nenhum resultado encontrado."
   */
  emptyMessage?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DataTable — Tabela de dados avançada com sorting, paginação e filtros
 * 
 * Componente organismo que encapsula TanStack Table v8 para criar tabelas
 * de dados robustas e acessíveis.
 * 
 * **Features principais:**
 * - ✅ Sorting client-side (crescente/decrescente)
 * - ✅ Paginação controlada e não-controlada
 * - ✅ Filtros por coluna
 * - ✅ Visibilidade de colunas configurável
 * - ✅ Estados de loading e empty
 * - ✅ Acessível (WCAG 2.1 AA)
 * - ✅ TypeScript genérico para type-safety
 * 
 * @component
 * @example Básico
 * ```tsx
 * interface User {
 *   id: string;
 *   name: string;
 *   email: string;
 * }
 * 
 * const columns: ColumnDef<User>[] = [
 *   { accessorKey: "name", header: "Nome" },
 *   { accessorKey: "email", header: "Email" },
 * ];
 * 
 * const users: User[] = [
 *   { id: "1", name: "João Silva", email: "joao@email.com" },
 *   { id: "2", name: "Maria Santos", email: "maria@email.com" },
 * ];
 * 
 * <DataTable columns={columns} data={users} />
 * ```
 * 
 * @param props - Propriedades do DataTable
 * @returns React component
 */
export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  pagination: controlledPagination,
  onPaginationChange,
  pageSize = 10,
  enableSorting = true,
  enableFiltering = true,
  isLoading = false,
  emptyMessage = "Nenhum resultado encontrado.",
  className,
  ...rest
}: DataTableProps<TData, TValue>) {
  // Estados internos (modo não-controlado)
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // Determina se está em modo controlado
  const isControlled = controlledPagination !== undefined && onPaginationChange !== undefined;
  const paginationState = isControlled ? controlledPagination : internalPagination;
  const onPaginationChangeHandler = isControlled ? onPaginationChange : setInternalPagination;

  // Inicializa TanStack Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: onPaginationChangeHandler,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: paginationState,
    },
  });

  return (
    <div className={cn("w-full space-y-4", className)} {...rest}>
      {/* Tabela */}
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          {/* Header */}
          <thead className="[&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort() && enableSorting;
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            canSort && "cursor-pointer select-none hover:text-foreground"
                          )}
                          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                          onKeyDown={canSort ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          } : undefined}
                          role={canSort ? "button" : undefined}
                          tabIndex={canSort ? 0 : undefined}
                          aria-label={canSort ? `Ordenar por ${header.column.id}` : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {canSort && (
                            <span className="ml-auto">
                              {isSorted === "asc" ? (
                                <ArrowUp className="h-4 w-4" aria-label="Ordenado crescente" />
                              ) : isSorted === "desc" ? (
                                <ArrowDown className="h-4 w-4" aria-label="Ordenado decrescente" />
                              ) : (
                                <ArrowUpDown className="h-4 w-4 opacity-50" aria-label="Ordenável" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody className="[&_tr:last-child]:border-0">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Carregando...
                </td>
              </tr>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação avançada */}
      <DataTablePagination table={table} />
    </div>
  );
}

DataTable.displayName = "DataTable";
