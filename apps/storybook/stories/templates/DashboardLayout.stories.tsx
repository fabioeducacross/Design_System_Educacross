import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarSubItem,
  Header,
  Button,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Badge,
  ThemeSwitcher,
  Logo,
  Icon,
} from "@fabioeducacross/ui";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  BarChart2,
  Calendar,
  FileText,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
} from "react-feather";

const meta: Meta = {
  title: "Templates/Dashboard Layout",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
O **Dashboard Layout** é um template completo para páginas administrativas.

## Características
- ✅ Sidebar colapsável com navegação hierárquica
- ✅ Header com busca, notificações e perfil
- ✅ Área de conteúdo responsiva
- ✅ Suporte a dark mode
- ✅ Mobile-friendly

## Atomic Design
**Nível**: Template (estrutura de página com áreas de conteúdo)

**Composição**:
- Organismo: Sidebar, Header
- Molécula: DropdownMenu, Avatar
- Átomo: Button, Badge, Icon

## Perfis de Usuário
Cada perfil tem menus específicos:
- **Administrador**: Gestão completa da plataforma
- **Coordenador**: Gestão de escolas e turmas
- **Professor**: Gestão de atividades e alunos
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

const DashboardContent: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
    {children || (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {["Alunos Ativos", "Aulas Realizadas", "Média de Desempenho", "Engajamento"].map(
          (metric, i) => (
            <div key={i} className="p-6 bg-card rounded-lg border shadow-sm">
              <p className="text-sm text-muted-foreground">{metric}</p>
              <p className="text-3xl font-bold mt-2">
                {i === 2 ? "85%" : i === 3 ? "92%" : Math.floor(Math.random() * 1000)}
              </p>
            </div>
          )
        )}
      </div>
    )}
  </div>
);

// =============================================================================
// STORIES
// =============================================================================

/**
 * Layout completo com sidebar expandida
 */
export const Default: Story = {
  name: "Layout Padrão",
  render: () => {
    const [activeItem, setActiveItem] = React.useState("dashboard");
    
    return (
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <Sidebar className="w-64 border-r">
          <div className="p-4">
            <Logo size="default" />
          </div>
          
          <nav className="flex-1 p-2 space-y-1">
            <SidebarItem
              icon="Home"
              label="Dashboard"
              variant={activeItem === "dashboard" ? "active" : "default"}
              onClick={() => setActiveItem("dashboard")}
            />
            <SidebarItem
              icon="Users"
              label="Usuários"
              variant={activeItem === "usuarios" ? "active" : "default"}
              expandable
              onClick={() => setActiveItem("usuarios")}
            >
              <SidebarSubItem
                label="Alunos"
                active={activeItem === "alunos"}
                onClick={() => setActiveItem("alunos")}
              />
              <SidebarSubItem
                label="Professores"
                active={activeItem === "professores"}
                onClick={() => setActiveItem("professores")}
              />
              <SidebarSubItem
                label="Coordenadores"
                active={activeItem === "coordenadores"}
                onClick={() => setActiveItem("coordenadores")}
              />
            </SidebarItem>
            <SidebarItem
              icon="BookOpen"
              label="Conteúdos"
              variant={activeItem === "conteudos" ? "active" : "default"}
              onClick={() => setActiveItem("conteudos")}
            />
            <SidebarItem
              icon="BarChart2"
              label="Relatórios"
              variant={activeItem === "relatorios" ? "active" : "default"}
              onClick={() => setActiveItem("relatorios")}
            />
            <SidebarItem
              icon="Calendar"
              label="Agenda"
              variant={activeItem === "agenda" ? "active" : "default"}
              onClick={() => setActiveItem("agenda")}
            />
          </nav>
          
          <div className="p-2 border-t">
            <SidebarItem
              icon="Settings"
              label="Configurações"
              variant={activeItem === "config" ? "active" : "default"}
              onClick={() => setActiveItem("config")}
            />
            <SidebarItem
              icon="HelpCircle"
              label="Ajuda"
              variant={activeItem === "ajuda" ? "active" : "default"}
              onClick={() => setActiveItem("ajuda")}
            />
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-9 pr-4 py-2 w-64 rounded-md border bg-background text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeSwitcher size="sm" />
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">Admin</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    Meu Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto bg-muted/50">
            <DashboardContent title="Dashboard" />
          </main>
        </div>
      </div>
    );
  },
};

/**
 * Layout com sidebar colapsada
 */
export const CollapsedSidebar: Story = {
  name: "Sidebar Colapsada",
  render: () => {
    const [activeItem, setActiveItem] = React.useState("dashboard");
    
    return (
      <div className="flex h-screen bg-background">
        {/* Sidebar Colapsada */}
        <div className="w-16 border-r bg-card flex flex-col items-center py-4">
          <Logo size="sm" className="mb-6" />
          
          <nav className="flex-1 flex flex-col gap-2">
            {[
              { icon: Home, id: "dashboard", label: "Dashboard" },
              { icon: Users, id: "usuarios", label: "Usuários" },
              { icon: BookOpen, id: "conteudos", label: "Conteúdos" },
              { icon: BarChart2, id: "relatorios", label: "Relatórios" },
              { icon: Calendar, id: "agenda", label: "Agenda" },
            ].map(({ icon: IconComponent, id, label }) => (
              <Button
                key={id}
                variant={activeItem === id ? "default" : "ghost"}
                size="icon"
                title={label}
                onClick={() => setActiveItem(id)}
              >
                <IconComponent size={20} />
              </Button>
            ))}
          </nav>
          
          <div className="flex flex-col gap-2 mt-auto">
            <Button variant="ghost" size="icon" title="Configurações">
              <Settings size={20} />
            </Button>
            <Button variant="ghost" size="icon" title="Ajuda">
              <HelpCircle size={20} />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <ThemeSwitcher size="sm" />
              <Avatar size="sm">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-muted/50">
            <DashboardContent title="Dashboard" />
          </main>
        </div>
      </div>
    );
  },
};

/**
 * Layout responsivo com menu mobile
 */
export const MobileLayout: Story = {
  name: "Layout Mobile",
  render: () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    return (
      <div className="h-screen bg-background max-w-md mx-auto border-x">
        {/* Mobile Header */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <Logo size="sm" />
          
          <Avatar size="sm">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </header>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="absolute inset-0 top-14 z-50 bg-background">
            <nav className="p-4 space-y-2">
              {[
                { icon: Home, label: "Dashboard" },
                { icon: Users, label: "Usuários" },
                { icon: BookOpen, label: "Conteúdos" },
                { icon: BarChart2, label: "Relatórios" },
                { icon: Calendar, label: "Agenda" },
                { icon: Settings, label: "Configurações" },
              ].map(({ icon: IconComponent, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  <IconComponent size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Content */}
        <main className="p-4 overflow-auto">
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>
          <div className="grid gap-4">
            {["Alunos", "Aulas", "Desempenho", "Engajamento"].map((metric, i) => (
              <div key={i} className="p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground">{metric}</p>
                <p className="text-2xl font-bold mt-1">
                  {i === 2 ? "85%" : i === 3 ? "92%" : Math.floor(Math.random() * 1000)}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  },
};

/**
 * Layout do Professor
 */
export const TeacherDashboard: Story = {
  name: "Dashboard do Professor",
  render: () => (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 border-r">
        <div className="p-4">
          <Logo size="default" />
        </div>
        
        <nav className="flex-1 p-2 space-y-1">
          <SidebarItem icon="Home" label="Início" variant="active" />
          <SidebarItem icon="BookOpen" label="Minhas Turmas" expandable>
            <SidebarSubItem label="5º Ano A" />
            <SidebarSubItem label="5º Ano B" />
            <SidebarSubItem label="4º Ano A" />
          </SidebarItem>
          <SidebarItem icon="FileText" label="Atividades" />
          <SidebarItem icon="BarChart2" label="Desempenho" />
          <SidebarItem icon="Calendar" label="Calendário" />
        </nav>
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold">Olá, Professor!</h1>
            <p className="text-sm text-muted-foreground">Terça-feira, 28 de Janeiro</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher size="sm" />
            <Avatar size="sm">
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted/50 p-6">
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="p-6 bg-card rounded-lg border">
              <p className="text-sm text-muted-foreground">Alunos Ativos</p>
              <p className="text-3xl font-bold mt-2">127</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <p className="text-sm text-muted-foreground">Atividades Pendentes</p>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <p className="text-sm text-muted-foreground">Média da Turma</p>
              <p className="text-3xl font-bold mt-2">78%</p>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <h2 className="font-semibold mb-4">Próximas Atividades</h2>
            <div className="space-y-3">
              {[
                { turma: "5º Ano A", atividade: "Prova de Matemática", data: "29/01" },
                { turma: "5º Ano B", atividade: "Entrega de Trabalho", data: "30/01" },
                { turma: "4º Ano A", atividade: "Quiz de Ciências", data: "31/01" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.atividade}</p>
                    <p className="text-sm text-muted-foreground">{item.turma}</p>
                  </div>
                  <Badge variant="outline">{item.data}</Badge>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
};
