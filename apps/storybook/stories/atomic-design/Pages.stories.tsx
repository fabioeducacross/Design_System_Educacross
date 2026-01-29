import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  Icon,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Progress,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
} from "@fabioeducacross/ui";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  BarChart2,
  Calendar,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  LogOut,
  User,
  FileText,
} from "react-feather";

const meta: Meta = {
  title: "Atomic Design/05. Páginas",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Páginas

As **páginas** são instâncias específicas de templates com conteúdo real.
Elas representam o que o usuário final realmente verá.

## Características
- ✅ Templates preenchidos com dados reais
- ✅ Representam funcionalidades completas
- ✅ Validam a experiência do usuário
- ✅ Testam fluxos completos

## Páginas do Educacross

| Página | Descrição |
|--------|-----------|
| Dashboard Admin | Visão geral do administrador |
| Dashboard Professor | Visão do professor |
| Lista de Alunos | Gestão de estudantes |
| Detalhes do Aluno | Perfil e desempenho |
| Relatório de Turma | Métricas e análises |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// COMPONENTES AUXILIARES
// =============================================================================

const AppShell: React.FC<{ 
  children: React.ReactNode;
  activeMenu?: string;
  title?: string;
}> = ({ children, activeMenu = "dashboard", title }) => {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "usuarios", icon: Users, label: "Usuários" },
    { id: "conteudos", icon: BookOpen, label: "Conteúdos" },
    { id: "relatorios", icon: BarChart2, label: "Relatórios" },
    { id: "agenda", icon: Calendar, label: "Agenda" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col shrink-0">
        <div className="p-4 border-b">
          <div className="font-bold text-primary text-xl">Educacross</div>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map(({ id, icon: IconComponent, label }) => (
            <button
              key={id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                activeMenu === id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <IconComponent size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted">
            <Settings size={18} />
            Configurações
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted">
            <HelpCircle size={18} />
            Ajuda
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md hover:bg-muted relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-muted/50">
          {children}
        </main>
      </div>
    </div>
  );
};

// =============================================================================
// DADOS DE EXEMPLO
// =============================================================================

const alunos = [
  { id: 1, nome: "Ana Silva", turma: "5º A", desempenho: 92, status: "aprovado", ultimaAtividade: "Hoje" },
  { id: 2, nome: "Bruno Santos", turma: "5º A", desempenho: 78, status: "em_andamento", ultimaAtividade: "Ontem" },
  { id: 3, nome: "Carla Lima", turma: "5º B", desempenho: 45, status: "reprovado", ultimaAtividade: "3 dias" },
  { id: 4, nome: "Diego Oliveira", turma: "5º B", desempenho: 88, status: "aprovado", ultimaAtividade: "Hoje" },
  { id: 5, nome: "Eva Ferreira", turma: "5º A", desempenho: 65, status: "em_andamento", ultimaAtividade: "2 dias" },
  { id: 6, nome: "Felipe Costa", turma: "5º C", desempenho: 95, status: "aprovado", ultimaAtividade: "Hoje" },
];

const atividades = [
  { titulo: "Prova de Matemática", turma: "5º A", data: "29/01", tipo: "prova" },
  { titulo: "Quiz de Ciências", turma: "5º B", data: "30/01", tipo: "quiz" },
  { titulo: "Entrega de Trabalho", turma: "5º A", data: "31/01", tipo: "trabalho" },
  { titulo: "Simulado Geral", turma: "Todas", data: "01/02", tipo: "simulado" },
];

// =============================================================================
// STORIES
// =============================================================================

/**
 * Dashboard do Administrador com métricas e atividades
 */
export const AdminDashboard: Story = {
  name: "Dashboard do Administrador",
  render: () => (
    <AppShell activeMenu="dashboard" title="Dashboard">
      <div className="p-6">
        {/* Métricas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Alunos</p>
                  <p className="text-3xl font-bold">1,234</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="text-primary" size={24} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <Badge variant="success" className="gap-1">
                  <TrendingUp size={12} /> +12%
                </Badge>
                <span className="text-xs text-muted-foreground">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aulas Realizadas</p>
                  <p className="text-3xl font-bold">456</p>
                </div>
                <div className="p-3 bg-success/10 rounded-full">
                  <BookOpen className="text-success" size={24} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <Badge variant="success" className="gap-1">
                  <TrendingUp size={12} /> +8%
                </Badge>
                <span className="text-xs text-muted-foreground">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Média de Desempenho</p>
                  <p className="text-3xl font-bold">78%</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-full">
                  <BarChart2 className="text-warning" size={24} />
                </div>
              </div>
              <Progress value={78} className="mt-3 h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Engajamento</p>
                  <p className="text-3xl font-bold">92%</p>
                </div>
                <div className="p-3 bg-info/10 rounded-full">
                  <CheckCircle className="text-info" size={24} />
                </div>
              </div>
              <Progress value={92} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Atividades Recentes */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Atividades Recentes</CardTitle>
              <Button variant="ghost" size="sm">Ver todas</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alunos.slice(0, 5).map((aluno) => (
                  <div key={aluno.id} className="flex items-center gap-4">
                    <Avatar size="sm">
                      <AvatarFallback>
                        {aluno.nome.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{aluno.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        Completou atividade · {aluno.turma}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={aluno.desempenho >= 70 ? "success" : aluno.desempenho >= 50 ? "warning" : "destructive"}
                      >
                        {aluno.desempenho}%
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{aluno.ultimaAtividade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Próximos Eventos</CardTitle>
              <Button variant="ghost" size="icon">
                <Plus size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {atividades.map((atividade, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded">
                      <Calendar size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{atividade.titulo}</p>
                      <p className="text-xs text-muted-foreground">{atividade.turma}</p>
                    </div>
                    <Badge variant="outline">{atividade.data}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  ),
};

/**
 * Dashboard do Professor
 */
export const TeacherDashboard: Story = {
  name: "Dashboard do Professor",
  render: () => (
    <AppShell activeMenu="dashboard" title="">
      <div className="p-6">
        {/* Saudação */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Olá, Professor!</h1>
          <p className="text-muted-foreground">Terça-feira, 28 de Janeiro de 2026</p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <p className="text-sm opacity-80">Minhas Turmas</p>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm opacity-80 mt-2">127 alunos no total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Atividades Pendentes</p>
              <p className="text-3xl font-bold text-warning">12</p>
              <p className="text-sm text-muted-foreground mt-2">Para corrigir</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Média Geral</p>
              <p className="text-3xl font-bold text-success">78%</p>
              <Progress value={78} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Turmas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Minhas Turmas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { nome: "5º Ano A", alunos: 35, media: 82, cor: "bg-blue-500" },
                { nome: "5º Ano B", alunos: 42, media: 75, cor: "bg-green-500" },
                { nome: "4º Ano A", alunos: 50, media: 78, cor: "bg-purple-500" },
              ].map((turma, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${turma.cor}`} />
                      <span className="font-semibold">{turma.nome}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{turma.alunos} alunos</span>
                      <span>Média: {turma.media}%</span>
                    </div>
                    <Progress value={turma.media} className="mt-2 h-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades para Corrigir */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Atividades para Corrigir</CardTitle>
            <Badge variant="warning">12 pendentes</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { aluno: "Ana Silva", atividade: "Prova de Matemática", turma: "5º A", entrega: "há 2h" },
                { aluno: "Bruno Santos", atividade: "Trabalho de Ciências", turma: "5º B", entrega: "há 5h" },
                { aluno: "Carla Lima", atividade: "Quiz de Geografia", turma: "4º A", entrega: "ontem" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Avatar size="sm">
                    <AvatarFallback>
                      {item.aluno.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{item.aluno}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.atividade} · {item.turma}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{item.entrega}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Corrigir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  ),
};

/**
 * Lista de Alunos
 */
export const StudentList: Story = {
  name: "Lista de Alunos",
  render: () => (
    <AppShell activeMenu="usuarios" title="Alunos">
      <div className="p-6">
        <Card>
          {/* Toolbar */}
          <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar alunos..." className="pl-9 w-64" />
              </div>
              <Select
                options={[
                  { value: "todas", label: "Todas as turmas" },
                  { value: "5a", label: "5º Ano A" },
                  { value: "5b", label: "5º Ano B" },
                  { value: "5c", label: "5º Ano C" },
                ]}
                placeholder="Filtrar por turma"
              />
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" /> Mais filtros
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" /> Exportar
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" /> Novo Aluno
              </Button>
            </div>
          </div>

          {/* Tabela */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Desempenho</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atividade</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow key={aluno.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback>
                          {aluno.nome.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{aluno.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{aluno.turma}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={aluno.desempenho} className="w-16 h-2" />
                      <span
                        className={`text-sm font-medium ${
                          aluno.desempenho >= 70
                            ? "text-success"
                            : aluno.desempenho >= 50
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                      >
                        {aluno.desempenho}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        aluno.status === "aprovado"
                          ? "success"
                          : aluno.status === "reprovado"
                          ? "destructive"
                          : "warning"
                      }
                    >
                      {aluno.status === "aprovado"
                        ? "Aprovado"
                        : aluno.status === "reprovado"
                        ? "Reprovado"
                        : "Em andamento"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {aluno.ultimaAtividade}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginação */}
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Exibindo 1-6 de 127 alunos
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="default" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  ),
};

/**
 * Detalhes do Aluno
 */
export const StudentDetail: Story = {
  name: "Detalhes do Aluno",
  render: () => (
    <AppShell activeMenu="usuarios" title="">
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span className="hover:text-foreground cursor-pointer">Alunos</span>
          <ChevronRight size={14} />
          <span className="text-foreground">Ana Silva</span>
        </div>

        {/* Cabeçalho do Perfil */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar size="lg" className="w-24 h-24 text-2xl">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">Ana Silva</h1>
                  <Badge variant="success">Aprovado</Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> 5º Ano A
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} /> Matrícula: 2024001
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> Última atividade: Hoje
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit size={16} className="mr-2" /> Editar
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Conteúdo */}
        <Tabs defaultValue="desempenho">
          <TabsList className="mb-6">
            <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
            <TabsTrigger value="atividades">Atividades</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
          </TabsList>

          <TabsContent value="desempenho">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Métricas */}
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <p className="text-5xl font-bold text-success">92%</p>
                    <p className="text-sm text-muted-foreground">Média geral</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Matemática</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-24 h-2" />
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Português</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-24 h-2" />
                        <span className="text-sm font-medium">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ciências</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-24 h-2" />
                        <span className="text-sm font-medium">90%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico placeholder */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Evolução ao Longo do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      [Gráfico de evolução do desempenho]
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="atividades">
            <Card>
              <CardHeader>
                <CardTitle>Atividades Realizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Atividade</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Nota</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { nome: "Prova de Matemática", data: "28/01", nota: 9.5, status: "corrigido" },
                      { nome: "Quiz de Ciências", data: "25/01", nota: 8.8, status: "corrigido" },
                      { nome: "Trabalho de Português", data: "22/01", nota: null, status: "pendente" },
                    ].map((ativ, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{ativ.nome}</TableCell>
                        <TableCell>{ativ.data}</TableCell>
                        <TableCell>
                          {ativ.nota !== null ? (
                            <span className="font-semibold text-success">{ativ.nota}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={ativ.status === "corrigido" ? "success" : "warning"}>
                            {ativ.status === "corrigido" ? "Corrigido" : "Pendente"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Histórico de atividades do aluno
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dados">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Dados pessoais e de contato
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  ),
};
