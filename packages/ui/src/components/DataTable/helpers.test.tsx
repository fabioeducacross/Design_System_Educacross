/**
 * @file helpers.test.tsx
 * @description Testes para os helpers do DataTable
 */

import { describe, it, expect, vi } from "vitest";
import {
  createSelectColumn,
  getSelectedRows,
  getSelectedRowIds,
  clearRowSelection,
  toggleAllRowsSelection,
  executeBulkAction,
} from "./helpers";
import type { Table } from "@tanstack/react-table";

// ============================================================================
// MOCK DATA
// ============================================================================

interface MockUser {
  id: number;
  name: string;
  email: string;
}

const mockUsers: MockUser[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

// ============================================================================
// MOCK TABLE
// ============================================================================

function createMockTable(selectedRowIndices: number[] = []): Table<MockUser> {
  const rowSelection: Record<string, boolean> = {};
  selectedRowIndices.forEach((index) => {
    rowSelection[index] = true;
  });

  return {
    getFilteredSelectedRowModel: vi.fn(() => ({
      rows: selectedRowIndices.map((index) => ({
        index,
        original: mockUsers[index],
        getIsSelected: () => true,
        getCanSelect: () => true,
        getToggleSelectedHandler: () => vi.fn(),
      })),
    })),
    getIsAllRowsSelected: vi.fn(() => selectedRowIndices.length === mockUsers.length),
    getIsSomeRowsSelected: vi.fn(() => selectedRowIndices.length > 0 && selectedRowIndices.length < mockUsers.length),
    getToggleAllRowsSelectedHandler: vi.fn(() => vi.fn()),
    resetRowSelection: vi.fn(),
    toggleAllRowsSelected: vi.fn(),
  } as unknown as Table<MockUser>;
}

// ============================================================================
// TESTS: createSelectColumn
// ============================================================================

describe("createSelectColumn", () => {
  it("cria coluna com id 'select' por padrão", () => {
    const column = createSelectColumn<MockUser>();
    expect(column.id).toBe("select");
  });

  it("aceita id customizado", () => {
    const column = createSelectColumn<MockUser>({ id: "selection" });
    expect(column.id).toBe("selection");
  });

  it("desabilita sorting e hiding", () => {
    const column = createSelectColumn<MockUser>();
    expect(column.enableSorting).toBe(false);
    expect(column.enableHiding).toBe(false);
  });

  it("define tamanho de 40", () => {
    const column = createSelectColumn<MockUser>();
    expect(column.size).toBe(40);
  });

  it("header retorna null quando enableSelectAll é false", () => {
    const column = createSelectColumn<MockUser>({ enableSelectAll: false });
    const mockTable = createMockTable([]);
    const header = column.header?.({ table: mockTable } as any);
    expect(header).toBeNull();
  });
});

// ============================================================================
// TESTS: getSelectedRows
// ============================================================================

describe("getSelectedRows", () => {
  it("retorna array vazio quando nenhuma linha selecionada", () => {
    const table = createMockTable([]);
    const selectedRows = getSelectedRows(table);
    expect(selectedRows).toEqual([]);
  });

  it("retorna linhas selecionadas", () => {
    const table = createMockTable([0, 2]); // Alice e Charlie
    const selectedRows = getSelectedRows(table);

    expect(selectedRows).toHaveLength(2);
    expect(selectedRows[0]).toEqual(mockUsers[0]);
    expect(selectedRows[1]).toEqual(mockUsers[2]);
  });

  it("retorna todas as linhas quando todas selecionadas", () => {
    const table = createMockTable([0, 1, 2]);
    const selectedRows = getSelectedRows(table);

    expect(selectedRows).toHaveLength(3);
    expect(selectedRows).toEqual(mockUsers);
  });
});

// ============================================================================
// TESTS: getSelectedRowIds
// ============================================================================

describe("getSelectedRowIds", () => {
  it("retorna array vazio quando nenhuma linha selecionada", () => {
    const table = createMockTable([]);
    const ids = getSelectedRowIds(table, (row) => row.id);
    expect(ids).toEqual([]);
  });

  it("retorna IDs das linhas selecionadas", () => {
    const table = createMockTable([0, 2]); // Alice (id: 1) e Charlie (id: 3)
    const ids = getSelectedRowIds(table, (row) => row.id);

    expect(ids).toEqual([1, 3]);
  });

  it("funciona com getRowId customizado", () => {
    const table = createMockTable([0, 1]);
    const emails = getSelectedRowIds(table, (row) => row.email);

    expect(emails).toEqual(["alice@example.com", "bob@example.com"]);
  });
});

// ============================================================================
// TESTS: clearRowSelection
// ============================================================================

describe("clearRowSelection", () => {
  it("chama resetRowSelection na tabela", () => {
    const table = createMockTable([0, 1]);
    clearRowSelection(table);

    expect(table.resetRowSelection).toHaveBeenCalledTimes(1);
  });
});

// ============================================================================
// TESTS: toggleAllRowsSelection
// ============================================================================

describe("toggleAllRowsSelection", () => {
  it("chama toggleAllRowsSelected na tabela", () => {
    const table = createMockTable([]);
    toggleAllRowsSelection(table);

    expect(table.toggleAllRowsSelected).toHaveBeenCalledTimes(1);
  });
});

// ============================================================================
// TESTS: executeBulkAction
// ============================================================================

describe("executeBulkAction", () => {
  it("executa ação em todas as linhas selecionadas", async () => {
    const table = createMockTable([0, 1]); // Alice e Bob
    const action = vi.fn();

    await executeBulkAction(table, action);

    expect(action).toHaveBeenCalledTimes(2);
    expect(action).toHaveBeenCalledWith(mockUsers[0]);
    expect(action).toHaveBeenCalledWith(mockUsers[1]);
  });

  it("limpa seleção após execução por padrão", async () => {
    const table = createMockTable([0]);
    const action = vi.fn();

    await executeBulkAction(table, action);

    expect(table.resetRowSelection).toHaveBeenCalledTimes(1);
  });

  it("não limpa seleção se clearAfter for false", async () => {
    const table = createMockTable([0]);
    const action = vi.fn();

    await executeBulkAction(table, action, false);

    expect(table.resetRowSelection).not.toHaveBeenCalled();
  });

  it("aguarda ações assíncronas", async () => {
    const table = createMockTable([0, 1]);
    const action = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    );

    await executeBulkAction(table, action);

    expect(action).toHaveBeenCalledTimes(2);
  });

  it("propaga erro quando ação falha", async () => {
    const table = createMockTable([0]);
    const error = new Error("Action failed");
    const action = vi.fn().mockRejectedValue(error);

    await expect(executeBulkAction(table, action)).rejects.toThrow(
      "Action failed"
    );
  });

  it("não limpa seleção quando ação falha", async () => {
    const table = createMockTable([0]);
    const action = vi.fn().mockRejectedValue(new Error("Failed"));

    try {
      await executeBulkAction(table, action);
    } catch {
      // Ignorar erro
    }

    expect(table.resetRowSelection).not.toHaveBeenCalled();
  });
});
