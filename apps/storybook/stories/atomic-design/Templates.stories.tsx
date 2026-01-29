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
  Menu,
  X,
  LogOut,
  User,
  HelpCircle,
  Plus,
  Filter,
  MoreHorizontal,
} from "react-feather";

const meta: Meta = {
  title: "Atomic Design/04. Templates",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Templates

Os **templates** são estruturas de página que definem onde os organismos serão posicionados.
Eles focam na estrutura do conteúdo, não no conteúdo em si.

## Características
- ✅ Definem estrutura de página
- ✅ Posicionam organismos
- ✅ Articulam layout responsivo
- ✅ Abstraem conteúdo específico

## Lista de Templates

| Template | Descrição |
|----------|-----------|
| Dashboard | Sidebar + Header + Content Area |
| Auth | Login/Registro centrado |
| List | Header + Filtros + Tabela |
| Detail | Header + Tabs + Conteúdo |
| Settings | Sidebar secundária + Formulário |
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

const SidebarNav: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
  const items = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Usuários" },
    { icon: BookOpen, label: "Conteúdos" },
    { icon: BarChart2, label: "Relatórios" },
    { icon: Calendar, label: "Agenda" },
  ];

  if (collapsed) {
    return (
      <div className="w-16 border-r bg-card flex flex-col items-center py-4 shrink-0">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold mb-6">
          E
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {items.map(({ icon: IconComponent, label, active }) => (
            <button
              key={label}
              title={label}
              className={`p-2 rounded-md ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              <IconComponent size={20} />
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-2 mt-auto">
          <button title="Configurações" className="p-2 rounded-md hover:bg-muted">
            <Settings size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 border-r bg-card flex flex-col shrink-0">
      <div className="p-4 border-b">
        <div className="font-bold text-primary text-xl">Educacross</div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {items.map(({ icon: IconComponent, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
              active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
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
    </div>
  );
};

const TopHeader: React.FC<{ title?: string; showSearch?: boolean }> = ({ 
  title = "Dashboard",
  showSearch = true 
}) => (
  <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
    <div className="flex items-center gap-4">
      {title && <h1 className="text-lg font-semibold">{title}</h1>}
      {showSearch && (
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-9 w-64" />
        </div>
      )}
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-md hover:bg-muted relative">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
          3
        </span>
      </button>
      <button className="flex items-center gap-2 p-1 rounded-md hover:bg-muted">
        <Avatar size="sm">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <span className="hidden md:block text-sm">Admin</span>
        <ChevronDown size={16} />
      </button>
    </div>
  </header>
);

// =============================================================================
// STORIES
// =============================================================================

/**
 * Template Dashboard padrão
 */
export const DashboardTemplate: Story = {
  name: "Dashboard",
  render: () => (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-auto bg-muted/50 p-6">
          {/* Métricas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {["Alunos Ativos", "Aulas Hoje", "Desempenho", "Engajamento"].map((m, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{m}</p>
                  <p className="text-3xl font-bold mt-2">
                    {i === 2 ? "85%" : i === 3 ? "92%" : Math.floor(Math.random() * 500 + 100)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Conteúdo Principal */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar size="sm">
                        <AvatarFallback>A{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Aluno {i} completou atividade</p>
                        <p className="text-xs text-muted-foreground">há {i * 5} minutos</p>
                      </div>
                      <Badge variant="success">100%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Prova de Matemática", "Entrega de Trabalho", "Reunião de Pais"].map((evento, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{evento}</p>
                        <p className="text-xs text-muted-foreground">5º Ano A</p>
                      </div>
                      <Badge variant="outline">{29 + i}/01</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  ),
};

/**
 * Template com sidebar colapsada
 */
export const CompactDashboard: Story = {
  name: "Dashboard Compacto",
  render: () => (
    <div className="flex h-screen bg-background">
      <SidebarNav collapsed />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title="Dashboard" showSearch={false} />
        <main className="flex-1 overflow-auto bg-muted/50 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {["Alunos", "Aulas", "Média", "Engajamento"].map((m, i) => (
              <Card key={i}>
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-muted-foreground">{m}</p>
                  <p className="text-2xl font-bold mt-1">
                    {i === 2 ? "85%" : i === 3 ? "92%" : Math.floor(Math.random() * 500)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  ),
};

/**
 * Template de Login/Auth
 */
export const AuthTemplate: Story = {
  name: "Autenticação",
  render: () => (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div className="text-primary-foreground font-bold text-2xl">Educacross</div>
        <div className="text-primary-foreground">
          <h1 className="text-4xl font-bold mb-4">
            Transformando a educação com tecnologia
          </h1>
          <p className="text-lg opacity-80">
            Plataforma completa para gestão educacional, acompanhamento de desempenho
            e engajamento de alunos.
          </p>
        </div>
        <p className="text-primary-foreground/60 text-sm">
          © 2024 Educacross. Todos os direitos reservados.
        </p>
      </div>
      
      {/* Lado direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="lg:hidden font-bold text-primary text-2xl mb-4">Educacross</div>
            <CardTitle>Bem-vindo de volta!</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Senha</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                Lembrar-me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueci a senha
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button className="w-full">Entrar</Button>
            <p className="text-sm text-muted-foreground text-center">
              Não tem conta?{" "}
              <a href="#" className="text-primary hover:underline">Cadastre-se</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
};

/**
 * Template de Lista/Tabela
 */
export const ListTemplate: Story = {
  name: "Lista de Dados",
  render: () => (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title="Usuários" />
        <main className="flex-1 overflow-auto bg-muted/50 p-6">
          <Card>
            {/* Toolbar */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar usuários..." className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" /> Filtros
                </Button>
              </div>
              <Button size="sm">
                <Plus size={16} className="mr-2" /> Novo Usuário
              </Button>
            </div>
            
            {/* Tabela */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Escola</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { nome: "Maria Silva", email: "maria@escola.com", perfil: "Professor", status: "Ativo", escola: "E.M. João XXIII" },
                  { nome: "José Santos", email: "jose@escola.com", perfil: "Aluno", status: "Ativo", escola: "E.M. João XXIII" },
                  { nome: "Ana Costa", email: "ana@escola.com", perfil: "Coordenador", status: "Pendente", escola: "E.E. São Paulo" },
                ].map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>{user.nome.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.nome}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{user.perfil}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Ativo" ? "success" : "warning"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.escola}</TableCell>
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
            <div className="p-4 border-t flex items-center justify-between text-sm">
              <span className="text-muted-foreground">1-3 de 127 resultados</span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  ),
};

/**
 * Template Mobile
 */
export const MobileTemplate: Story = {
  name: "Layout Mobile",
  render: () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    return (
      <div className="h-screen bg-background max-w-md mx-auto border-x relative">
        {/* Header Mobile */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-10">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="font-bold text-primary">Educacross</div>
          <Avatar size="sm">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </header>

        {/* Menu Overlay */}
        {menuOpen && (
          <div className="absolute inset-0 top-14 bg-background z-50">
            <nav className="p-4 space-y-2">
              {[
                { icon: Home, label: "Dashboard" },
                { icon: Users, label: "Usuários" },
                { icon: BookOpen, label: "Conteúdos" },
                { icon: BarChart2, label: "Relatórios" },
                { icon: Settings, label: "Configurações" },
              ].map(({ icon: IconComponent, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  <IconComponent size={20} />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Conteúdo */}
        <main className="p-4 overflow-auto" style={{ height: "calc(100vh - 56px)" }}>
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>
          
          <div className="grid gap-4 grid-cols-2 mb-6">
            {["Alunos", "Aulas", "Média", "Taxa"].map((m, i) => (
              <Card key={i}>
                <CardContent className="pt-4 pb-4 text-center">
                  <p className="text-xs text-muted-foreground">{m}</p>
                  <p className="text-xl font-bold">{i === 2 ? "85%" : i === 3 ? "92%" : Math.floor(Math.random() * 500)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>A{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Aluno {i}</p>
                    <p className="text-xs text-muted-foreground">há {i * 5}min</p>
                  </div>
                  <Badge variant="success" className="text-xs">100%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  },
};
