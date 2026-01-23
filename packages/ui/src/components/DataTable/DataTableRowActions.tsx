/**
 * @file DataTableRowActions.tsx
 * @description Dropdown com ações contextuais para cada linha do DataTable
 */

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../../utils";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../DropdownMenu";
import type { RowAction } from "./helpers";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props do componente DataTableRowActions.
 * 
 * @template TData - Tipo dos dados da linha
 */
export interface DataTableRowActionsProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dados da linha.
   * @required
   */
  row: TData;

  /**
   * Lista de ações disponíveis para a linha.
   * @required
   */
  actions: RowAction<TData>[];

  /**
   * Label do botão de ações (acessibilidade).
   * @default "Ações da linha"
   */
  ariaLabel?: string;

  /**
   * Label opcional para exibir no topo do menu.
   */
  menuLabel?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DataTableRowActions - Menu de ações contextuais para linhas da tabela.
 * 
 * Renderiza um botão com ícone "..." que abre um dropdown com ações.
 * Cada ação pode ter ícone, label, handler onClick e estado disabled.
 * 
 * @template TData - Tipo dos dados da linha
 * 
 * @example
 * ```tsx
 * <DataTableRowActions
 *   row={user}
 *   actions={[
 *     {
 *       label: "Editar",
 *       icon: <Edit className="h-4 w-4" />,
 *       onClick: (row) => editUser(row.id),
 *     },
 *     {
 *       label: "Deletar",
 *       icon: <Trash className="h-4 w-4" />,
 *       onClick: (row) => deleteUser(row.id),
 *       className: "text-destructive",
 *     },
 *   ]}
 * />
 * ```
 */
export function DataTableRowActions<TData>({
  row,
  actions,
  ariaLabel = "Ações da linha",
  menuLabel,
  className,
  ...rest
}: DataTableRowActionsProps<TData>): JSX.Element {
  // Filtrar ações que não estão desabilitadas
  const availableActions = React.useMemo(() => {
    return actions.filter((action) => {
      if (action.disabled) {
        return !action.disabled(row);
      }
      return true;
    });
  }, [actions, row]);

  // Se não há ações disponíveis, não renderizar nada
  if (availableActions.length === 0) {
    return <div className={cn("h-8 w-8", className)} {...rest} />;
  }

  return (
    <div className={cn("flex items-center justify-center", className)} {...rest}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            aria-label={ariaLabel}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {menuLabel && (
            <>
              <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}

          {availableActions.map((action, index) => {
            // Separador se a ação tiver destructive
            const showSeparatorBefore =
              index > 0 && action.className?.includes("destructive");

            return (
              <React.Fragment key={`${action.label}-${index}`}>
                {showSeparatorBefore && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  onClick={() => action.onClick(row)}
                  className={cn("flex items-center gap-2", action.className)}
                >
                  {action.icon && (
                    <span className="shrink-0">{action.icon}</span>
                  )}
                  <span>{action.label}</span>
                </DropdownMenuItem>
              </React.Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

DataTableRowActions.displayName = "DataTableRowActions";
