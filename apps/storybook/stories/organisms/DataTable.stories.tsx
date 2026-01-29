import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  DataTable,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Checkbox,
} from "@fabioeducacross/ui";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronUp, ChevronDown, Search, Plus, Download, Filter } from "react-feather";

// Componente de ícone de ordenação (substitui ArrowUpDown que não existe no react-feather)
const SortIcon = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex flex-col ${className}`}>
    <ChevronUp className="h-3 w-3 -mb-1" />
    <ChevronDown className="h-3 w-3" />
  </span>
);

// =============================================================================
// TIPOS DE DADOS
// =============================================================================

interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  perfil: "admin" | "professor" | "aluno" | "coordenador";
  status: "ativo" | "inativo" | "pendente";
  ultimoAcesso: string;
  escola: string;
}

interface Estudante {
  id: string;
  nome: string;
  turma: string;
  desempenho: number;
  status: "aprovado" | "reprovado" | "em_andamento";
  ultimaAtividade: string;
}

// =============================================================================
// DADOS DE EXEMPLO
// =============================================================================

const usuarios: Usuario[] = [
  {
    id: "1",
    nome: "Maria Silva",
    email: "maria.silva@escola.com",
    avatar: "",
    perfil: "professor",
    status: "ativo",
    ultimoAcesso: "2024-01-28",
    escola: "Escola Municipal João XXIII",
  },
  {
    id: "2",
    nome: "José Santos",
    email: "jose.santos@escola.com",
    perfil: "aluno",
    status: "ativo",
    ultimoAcesso: "2024-01-27",
    escola: "Escola Municipal João XXIII",
  },
  {
    id: "3",
    nome: "Ana Costa",
    email: "ana.costa@escola.com",
    perfil: "coordenador",
    status: "pendente",
    ultimoAcesso: "2024-01-25",
    escola: "Escola Estadual São Paulo",
  },
  {
    id: "4",
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@escola.com",
    perfil: "admin",
    status: "ativo",
    ultimoAcesso: "2024-01-28",
    escola: "Secretaria de Educação",
  },
  {
    id: "5",
    nome: "Fernanda Lima",
    email: "fernanda.lima@escola.com",
    perfil: "professor",
    status: "inativo",
    ultimoAcesso: "2024-01-10",
    escola: "Escola Municipal João XXIII",
  },
];

const estudantes: Estudante[] = [
  { id: "1", nome: "Pedro Alves", turma: "5º A", desempenho: 92, status: "aprovado", ultimaAtividade: "2024-01-28" },
  { id: "2", nome: "Juliana Ferreira", turma: "5º A", desempenho: 78, status: "em_andamento", ultimaAtividade: "2024-01-27" },
  { id: "3", nome: "Lucas Martins", turma: "5º B", desempenho: 45, status: "reprovado", ultimaAtividade: "2024-01-20" },
  { id: "4", nome: "Camila Rodrigues", turma: "5º B", desempenho: 88, status: "aprovado", ultimaAtividade: "2024-01-28" },
  { id: "5", nome: "Rafael Santos", turma: "5º A", desempenho: 65, status: "em_andamento", ultimaAtividade: "2024-01-26" },
  { id: "6", nome: "Beatriz Costa", turma: "5º C", desempenho: 95, status: "aprovado", ultimaAtividade: "2024-01-28" },
  { id: "7", nome: "Gabriel Oliveira", turma: "5º C", desempenho: 72, status: "em_andamento", ultimaAtividade: "2024-01-25" },
  { id: "8", nome: "Amanda Silva", turma: "5º A", desempenho: 38, status: "reprovado", ultimaAtividade: "2024-01-15" },
];

// =============================================================================
// COLUNAS
// =============================================================================

const colunasUsuarios: ColumnDef<Usuario>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected(!row.getIsSelected())}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <SortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const usuario = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarImage src={usuario.avatar} />
            <AvatarFallback>
              {usuario.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{usuario.nome}</p>
            <p className="text-sm text-muted-foreground">{usuario.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "perfil",
    header: "Perfil",
    cell: ({ row }) => {
      const perfil = row.getValue("perfil") as string;
      const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        admin: "destructive",
        professor: "default",
        aluno: "secondary",
        coordenador: "outline",
      };
      const labelMap: Record<string, string> = {
        admin: "Admin",
        professor: "Professor",
        aluno: "Aluno",
        coordenador: "Coordenador",
      };
      return <Badge variant={variantMap[perfil]}>{labelMap[perfil]}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning"> = {
        ativo: "success",
        inativo: "destructive",
        pendente: "warning",
      };
      const labelMap: Record<string, string> = {
        ativo: "Ativo",
        inativo: "Inativo",
        pendente: "Pendente",
      };
      return <Badge variant={variantMap[status]}>{labelMap[status]}</Badge>;
    },
  },
  {
    accessorKey: "escola",
    header: "Escola",
  },
  {
    accessorKey: "ultimoAcesso",
    header: "Último Acesso",
    cell: ({ row }) => {
      const data = new Date(row.getValue("ultimoAcesso") as string);
      return data.toLocaleDateString("pt-BR");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const usuario = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => alert(`Editar: ${usuario.nome}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Ver detalhes: ${usuario.nome}`)}>
              Ver detalhes
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => alert(`Excluir: ${usuario.nome}`)}
              className="text-destructive"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const colunasEstudantes: ColumnDef<Estudante>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estudante
        <SortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "turma",
    header: "Turma",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("turma")}</Badge>,
  },
  {
    accessorKey: "desempenho",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Desempenho
        <SortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const desempenho = row.getValue("desempenho") as number;
      const cor = desempenho >= 70 ? "text-success" : desempenho >= 50 ? "text-warning" : "text-destructive";
      return <span className={`font-semibold ${cor}`}>{desempenho}%</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Situação",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variantMap: Record<string, "success" | "destructive" | "warning"> = {
        aprovado: "success",
        reprovado: "destructive",
        em_andamento: "warning",
      };
      const labelMap: Record<string, string> = {
        aprovado: "Aprovado",
        reprovado: "Reprovado",
        em_andamento: "Em Andamento",
      };
      return <Badge variant={variantMap[status]}>{labelMap[status]}</Badge>;
    },
  },
  {
    accessorKey: "ultimaAtividade",
    header: "Última Atividade",
    cell: ({ row }) => {
      const data = new Date(row.getValue("ultimaAtividade") as string);
      return data.toLocaleDateString("pt-BR");
    },
  },
];

// =============================================================================
// META
// =============================================================================

const meta: Meta<typeof DataTable> = {
  title: "Organisms/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
O **DataTable** é um organismo completo para exibição de dados tabulares com recursos avançados.

## Características
- ✅ Ordenação por coluna
- ✅ Paginação configurável
- ✅ Filtro global
- ✅ Seleção de linhas (checkbox)
- ✅ Colunas personalizáveis
- ✅ Ações por linha
- ✅ Estados vazios/loading
- ✅ Responsivo

## Atomic Design
**Nível**: Organismo (combina átomos e moléculas para formar uma unidade funcional completa)

**Composição**:
- Átomo: Checkbox, Badge, Avatar, Button
- Molécula: DropdownMenu, Input
- Organismo: DataTable (este componente)

## Dependências
Usa TanStack Table v8 internamente para gerenciamento de estado.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// =============================================================================
// STORIES
// =============================================================================

/**
 * Tabela básica com ordenação e paginação
 */
export const Default: Story = {
  render: () => (
    <DataTable
      columns={colunasUsuarios}
      data={usuarios}
    />
  ),
};

/**
 * Tabela com toolbar de busca e ações
 */
export const WithToolbar: Story = {
  name: "Com Toolbar",
  render: () => {
    const [filterValue, setFilterValue] = React.useState("");
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>
        <DataTable
          columns={colunasUsuarios}
          data={usuarios.filter((u) =>
            u.nome.toLowerCase().includes(filterValue.toLowerCase()) ||
            u.email.toLowerCase().includes(filterValue.toLowerCase())
          )}
        />
      </div>
    );
  },
};

/**
 * Tabela de estudantes com métricas de desempenho
 */
export const StudentPerformance: Story = {
  name: "Desempenho de Estudantes",
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Acompanhamento de Estudantes</h2>
          <p className="text-sm text-muted-foreground">
            Desempenho dos estudantes na turma 5º Ano
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-current" /> 3 Aprovados
          </Badge>
          <Badge variant="warning" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-current" /> 3 Em Andamento
          </Badge>
          <Badge variant="destructive" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-current" /> 2 Reprovados
          </Badge>
        </div>
      </div>
      <DataTable
        columns={colunasEstudantes}
        data={estudantes}
        pageSize={5}
      />
    </div>
  ),
};

/**
 * Tabela com seleção de múltiplas linhas
 */
export const WithSelection: Story = {
  name: "Com Seleção",
  render: () => {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Use as colunas com checkboxes para seleção de linhas.
          A lógica de seleção é gerenciada internamente pelo TanStack Table.
        </p>
        <DataTable
          columns={colunasUsuarios}
          data={usuarios}
        />
      </div>
    );
  },
};

/**
 * Tabela com diferentes tamanhos de página
 */
export const PageSizes: Story = {
  name: "Tamanhos de Página",
  render: () => {
    const [pageSize, setPageSize] = React.useState(5);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Itens por página:</span>
          {[5, 10, 20].map((size) => (
            <Button
              key={size}
              variant={pageSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => setPageSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
        <DataTable
          columns={colunasEstudantes}
          data={estudantes}
          pageSize={pageSize}
        />
      </div>
    );
  },
};

/**
 * Tabela compacta para espaços reduzidos
 */
export const Compact: Story = {
  name: "Compacta",
  render: () => (
    <div className="max-w-2xl">
      <DataTable
        columns={colunasEstudantes.slice(0, 4)}
        data={estudantes.slice(0, 5)}
        pageSize={5}
        className="text-sm"
      />
    </div>
  ),
};

/**
 * Tabela vazia com estado de placeholder
 */
export const Empty: Story = {
  name: "Estado Vazio",
  render: () => (
    <DataTable
      columns={colunasUsuarios}
      data={[]}
    />
  ),
};
