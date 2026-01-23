import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    TableToolbar,
    TableSortHeader,
    TableActions,
    TableActionButton,
    TablePagination,
    Badge,
    Checkbox,
    Select,
    Input,
    Button,
    Avatar,
    AvatarFallback,
} from "@fabioeducacross/ui";
import {
    TrendingUp,
    PieChart,
    Users,
    MoreVertical,
    Download,
    Search,
} from "react-feather";

const meta: Meta<typeof Table> = {
    title: "Components/Table",
    component: Table,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Table displays data in a structured grid format with rows and columns.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
    { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
    { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

/**
 * Default table with header and body.
 */
export const Default: Story = {
    render: () => (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@fabioeducacross/ui";

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <caption>A list of your recent invoices.</caption>
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV001</td>
        <td>Paid</td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
    </tbody>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableCaption>A list of your recent invoices.</EdTableCaption>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead>Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow>
        <EdTableCell>INV001</EdTableCell>
        <EdTableCell>Paid</EdTableCell>
        <EdTableCell>Credit Card</EdTableCell>
        <EdTableCell>$250.00</EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableHead, EdTableRow, EdTableCell, EdTableCaption } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Table with footer.
 */
export const WithFooter: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right font-bold">$1,750.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@fabioeducacross/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell>$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV001</td>
        <td>Paid</td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total</td>
        <td class="text-end fw-bold">$1,750.00</td>
      </tr>
    </tfoot>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead>Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow>
        <EdTableCell>INV001</EdTableCell>
        <EdTableCell>Paid</EdTableCell>
        <EdTableCell>Credit Card</EdTableCell>
        <EdTableCell>$250.00</EdTableCell>
      </EdTableRow>
    </EdTableBody>
    <EdTableFooter>
      <EdTableRow>
        <EdTableCell :col-span="3">Total</EdTableCell>
        <EdTableCell>$1,750.00</EdTableCell>
      </EdTableRow>
    </EdTableFooter>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableFooter, EdTableHead, EdTableRow, EdTableCell } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Table with status badges.
 */
export const WithBadges: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    invoice.status === "Paid"
                                        ? "success"
                                        : invoice.status === "Pending"
                                            ? "warning"
                                            : "destructive"
                                }
                            >
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@fabioeducacross/ui";
import { Badge } from "@fabioeducacross/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell><Badge variant="success">Paid</Badge></TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell><Badge variant="warning">Pending</Badge></TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell>$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV001</td>
        <td><span class="badge bg-success">Paid</span></td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
      <tr>
        <td>INV002</td>
        <td><span class="badge bg-warning">Pending</span></td>
        <td>PayPal</td>
        <td class="text-end">$150.00</td>
      </tr>
    </tbody>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead>Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow>
        <EdTableCell>INV001</EdTableCell>
        <EdTableCell><EdBadge variant="success">Paid</EdBadge></EdTableCell>
        <EdTableCell>Credit Card</EdTableCell>
        <EdTableCell>$250.00</EdTableCell>
      </EdTableRow>
      <EdTableRow>
        <EdTableCell>INV002</EdTableCell>
        <EdTableCell><EdBadge variant="warning">Pending</EdBadge></EdTableCell>
        <EdTableCell>PayPal</EdTableCell>
        <EdTableCell>$150.00</EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableHead, EdTableRow, EdTableCell } from "@fabioeducacross/ui-vue3";
import { EdBadge } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Selectable table with checkboxes.
 */
export const Selectable: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Pending" },
];

/**
 * User management table.
 */
export const UserTable: Story = {
    render: () => (
        <Table>
            <TableCaption>Team members and their roles.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    user.status === "Active"
                                        ? "success"
                                        : user.status === "Pending"
                                            ? "warning"
                                            : "secondary"
                                }
                            >
                                {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <button className="text-sm text-primary hover:underline">
                                Edit
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/**
 * Striped table variant.
 */
export const Striped: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[
                    { product: "Widget A", category: "Electronics", stock: 45, price: "$29.99" },
                    { product: "Widget B", category: "Electronics", stock: 12, price: "$49.99" },
                    { product: "Gadget X", category: "Accessories", stock: 78, price: "$19.99" },
                    { product: "Gadget Y", category: "Accessories", stock: 0, price: "$34.99" },
                    { product: "Tool Z", category: "Hardware", stock: 156, price: "$14.99" },
                ].map((item, index) => (
                    <TableRow
                        key={item.product}
                        className={index % 2 === 0 ? "bg-muted/50" : ""}
                    >
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                            <span
                                className={
                                    item.stock === 0
                                        ? "text-destructive"
                                        : item.stock < 20
                                            ? "text-warning"
                                            : ""
                                }
                            >
                                {item.stock === 0 ? "Out of stock" : item.stock}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/**
 * Tabela completa de gestão de turmas com toolbar, ordenação, ações e paginação.
 * Exemplo baseado no design Educacross.
 */
export const StudentManagement: Story = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
        const [selectAll, setSelectAll] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [sortColumn, setSortColumn] = useState<string | null>(null);
        const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

        const studentData = [
            {
                id: 1,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 2,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 3,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 4,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 5,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 6,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 7,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 8,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 9,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 10,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
        ];

        const totalItems = 20;
        const itemsPerPage = 10;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const handleSelectAll = () => {
            if (selectAll) {
                setSelectedRows(new Set());
                setSelectAll(false);
            } else {
                setSelectedRows(new Set(studentData.map((s) => s.id)));
                setSelectAll(true);
            }
        };

        const handleRowSelect = (id: number) => {
            const newSelected = new Set(selectedRows);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            setSelectedRows(newSelected);
            setSelectAll(newSelected.size === studentData.length);
        };

        const handleSort = (column: string) => {
            if (sortColumn === column) {
                setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
                if (sortDirection === "desc") setSortColumn(null);
            } else {
                setSortColumn(column);
                setSortDirection("asc");
            }
        };

        return (
            <div className="space-y-4">
                {/* Filtros superiores */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            Filtro 1
                        </label>
                        <Select
                            value="todos"
                            options={[
                                { value: "todos", label: "Todos" },
                                { value: "ativo", label: "Ativo" },
                                { value: "inativo", label: "Inativo" },
                            ]}
                            onChange={() => {}}
                        />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            Filtro 2
                        </label>
                        <Select
                            value="todos"
                            options={[
                                { value: "todos", label: "Todos" },
                                { value: "opcao1", label: "Opção 1" },
                                { value: "opcao2", label: "Opção 2" },
                            ]}
                            onChange={() => {}}
                        />
                    </div>

                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            Filtro de Período
                        </label>
                        <Select
                            value="periodo"
                            options={[
                                { value: "periodo", label: "09/08/2023 a 22/08/2023" },
                                { value: "outro", label: "Outro período" },
                            ]}
                            onChange={() => {}}
                        />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            &nbsp;
                        </label>
                        <Select
                            value="acoes"
                            options={[
                                { value: "acoes", label: "Ações em lote" },
                                { value: "exportar", label: "Exportar selecionados" },
                                { value: "deletar", label: "Deletar selecionados" },
                            ]}
                            onChange={() => {}}
                            variant="primary"
                        />
                    </div>
                </div>

                {/* Toolbar */}
                <TableToolbar
                    selectedCount={selectedRows.size}
                    onClearSelection={() => {
                        setSelectedRows(new Set());
                        setSelectAll(false);
                    }}
                    showClearSelection={selectedRows.size > 0}
                >
                    <div className="flex items-center gap-4 w-full">
                        {/* Mostrar */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">Mostrar</span>
                            <Select
                                value="10"
                                options={[
                                    { value: "10", label: "10" },
                                    { value: "25", label: "25" },
                                    { value: "50", label: "50" },
                                    { value: "100", label: "100" },
                                ]}
                                onChange={() => {}}
                                className="w-20"
                            />
                        </div>

                        {/* Pesquisar - preenche todo espaço disponível */}
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Pesquisar"
                                className="pl-10 w-full"
                            />
                        </div>

                        {/* Exportar */}
                        <Button variant="default" size="default" className="whitespace-nowrap">
                            <Download size={18} />
                            Exportar em excel
                        </Button>
                    </div>
                </TableToolbar>

                {/* Tabela */}
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] pl-6">
                                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                </TableHead>
                                <TableSortHeader
                                    sortDirection={sortColumn === "turma" ? sortDirection : null}
                                    onSort={() => handleSort("turma")}
                                >
                                    Turma
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "ano" ? sortDirection : null}
                                    onSort={() => handleSort("ano")}
                                >
                                    Ano Escolar
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "professor" ? sortDirection : null}
                                    onSort={() => handleSort("professor")}
                                >
                                    Professor(es)
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "progresso" ? sortDirection : null}
                                    onSort={() => handleSort("progresso")}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <circle cx="12" cy="12" r="1" />
                                        </svg>
                                    }
                                >
                                    Progresso na Missão
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "desempenho" ? sortDirection : null}
                                    onSort={() => handleSort("desempenho")}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                            <line x1="9" x2="9.01" y1="9" y2="9" />
                                            <line x1="15" x2="15.01" y1="9" y2="9" />
                                        </svg>
                                    }
                                >
                                    Desempenho na Missão
                                </TableSortHeader>
                                <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(student.id)}
                                            onChange={() => handleRowSelect(student.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-normal text-foreground">{student.turma}</TableCell>
                                    <TableCell>
                                        <Badge variant="softPrimary">{student.ano}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2">
                                            {student.professores.map((prof, idx) => (
                                                <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                                                    <AvatarFallback className={prof.color}>
                                                        {prof.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm text-muted-foreground">
                                                {student.progresso.jogos}/{student.progresso.total} jogos
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-red-500"
                                                        style={{ width: `${student.progresso.percentual}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-red-500 min-w-[35px]">
                                                    {student.progresso.percentual}%
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl leading-none">{student.desempenho.emoji}</span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {student.desempenho.percentual}%
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <TableActions>
                                            <TableActionButton icon={<TrendingUp size={18} />} variant="primary" />
                                            <TableActionButton icon={<PieChart size={18} />} variant="primary" />
                                            <TableActionButton icon={<Users size={18} />} variant="primary" />
                                            <TableActionButton icon={<MoreVertical size={18} />} />
                                        </TableActions>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Paginação */}
                    <div className="px-6 py-4 border-t">
                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            startIndex={(currentPage - 1) * itemsPerPage + 1}
                            endIndex={Math.min(currentPage * itemsPerPage, totalItems)}
                            totalItems={totalItems}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        );
    },
};
