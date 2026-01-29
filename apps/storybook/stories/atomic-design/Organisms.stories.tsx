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
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Progress,
} from "@fabioeducacross/ui";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  BarChart2,
  Bell,
  Search,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
} from "react-feather";

const meta: Meta = {
  title: "Atomic Design/03. Organismos",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Organismos

Os **organismos** são grupos de moléculas funcionando juntos para formar seções distintas de interface.
Eles são componentes complexos e relativamente autônomos.

## Características
- ✅ Combinam múltiplas moléculas e átomos
- ✅ Formam seções de interface completas
- ✅ Podem ter estado próprio
- ✅ Representam partes distintas de uma página

## Lista de Organismos

| Componente | Composição |
|------------|------------|
| Header | Logo + Navigation + Search + UserMenu |
| Sidebar | Logo + NavItems + Footer |
| DataTable | Toolbar + Table + Pagination |
| FilterPanel | FormFields + Buttons |
| Accordion | Multiple AccordionItems |
| TabPanel | TabList + TabContent |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Showcase de organismos principais
 */
export const Overview: Story = {
  name: "Visão Geral",
  render: () => (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Header</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cabeçalho completo com logo, navegação, busca e menu do usuário.
        </p>
        <div className="border rounded-lg">
          <header className="h-16 px-6 flex items-center justify-between border-b bg-card">
            <div className="flex items-center gap-8">
              <div className="font-bold text-primary text-xl">Educacross</div>
              <nav className="hidden md:flex items-center gap-4">
                <Button variant="ghost" size="sm">Dashboard</Button>
                <Button variant="ghost" size="sm">Turmas</Button>
                <Button variant="ghost" size="sm">Relatórios</Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-9 w-48" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
        </div>
      </section>

      {/* Sidebar */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Sidebar</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Menu lateral com navegação hierárquica.
        </p>
        <div className="border rounded-lg w-64">
          <div className="p-4 border-b">
            <div className="font-bold text-primary">Educacross</div>
          </div>
          <nav className="p-2 space-y-1">
            {[
              { icon: Home, label: "Dashboard", active: true },
              { icon: Users, label: "Usuários", badge: "12" },
              { icon: BookOpen, label: "Conteúdos" },
              { icon: BarChart2, label: "Relatórios" },
            ].map(({ icon: IconComponent, label, active, badge }) => (
              <button
                key={label}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent size={18} />
                  {label}
                </div>
                {badge && <Badge variant={active ? "secondary" : "outline"} className="text-xs">{badge}</Badge>}
              </button>
            ))}
          </nav>
          <div className="p-2 border-t">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted">
              <Settings size={18} />
              Configurações
            </button>
          </div>
        </div>
      </section>

      {/* Table com Toolbar */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">DataTable</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Tabela com toolbar, ordenação e ações por linha.
        </p>
        <div className="border rounded-lg">
          {/* Toolbar */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar alunos..." className="pl-9 w-48" />
              </div>
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" /> Filtros
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" /> Exportar
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" /> Novo
              </Button>
            </div>
          </div>
          
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Desempenho</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { nome: "Ana Silva", turma: "5º A", desempenho: 92, status: "aprovado" },
                { nome: "Bruno Santos", turma: "5º A", desempenho: 78, status: "em_andamento" },
                { nome: "Carla Lima", turma: "5º B", desempenho: 45, status: "reprovado" },
              ].map((aluno, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{aluno.nome}</TableCell>
                  <TableCell>{aluno.turma}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={aluno.desempenho} className="w-20 h-2" />
                      <span className="text-sm">{aluno.desempenho}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        aluno.status === "aprovado" ? "success" :
                        aluno.status === "reprovado" ? "destructive" : "warning"
                      }
                    >
                      {aluno.status === "aprovado" ? "Aprovado" :
                       aluno.status === "reprovado" ? "Reprovado" : "Em andamento"}
                    </Badge>
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
          
          {/* Pagination */}
          <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <span>1-3 de 127 resultados</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm">Próximo</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
};

/**
 * Tabs como organismo
 */
export const TabsOrganism: Story = {
  name: "Tabs Panel",
  render: () => (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Configurações do Usuário</CardTitle>
        <CardDescription>Gerencie suas preferências de conta</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="perfil">
          <TabsList className="mb-4">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="perfil" className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <Button size="sm">Alterar foto</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input defaultValue="Admin User" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="admin@escola.edu.br" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seguranca" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Senha atual</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-sm font-medium">Nova senha</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button>Alterar senha</Button>
          </TabsContent>
          
          <TabsContent value="notificacoes">
            <div className="space-y-4">
              {["Email", "Push", "SMS"].map((tipo) => (
                <div key={tipo} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Notificações por {tipo}</p>
                    <p className="text-sm text-muted-foreground">Receba alertas via {tipo.toLowerCase()}</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="privacidade">
            <p className="text-muted-foreground">Configurações de privacidade em breve.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
};

/**
 * Accordion como organismo
 */
export const AccordionOrganism: Story = {
  name: "Accordion FAQ",
  render: () => (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Perguntas Frequentes</CardTitle>
        <CardDescription>Encontre respostas para dúvidas comuns</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Como faço para redefinir minha senha?</AccordionTrigger>
            <AccordionContent>
              Acesse a página de login e clique em "Esqueci minha senha". Digite seu email 
              cadastrado e você receberá um link para criar uma nova senha.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Como adiciono alunos à minha turma?</AccordionTrigger>
            <AccordionContent>
              Vá em Turmas → Selecione a turma → Clique em "Gerenciar Alunos" → 
              Use o botão "Adicionar Alunos" para buscar e adicionar novos estudantes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Como exporto os relatórios de desempenho?</AccordionTrigger>
            <AccordionContent>
              Em Relatórios, selecione o período desejado e clique no botão "Exportar". 
              Você pode escolher entre PDF, Excel ou CSV.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Posso personalizar as atividades?</AccordionTrigger>
            <AccordionContent>
              Sim! Acesse Conteúdos → Minhas Atividades → Criar Nova. Você pode 
              combinar diferentes tipos de questões e definir critérios de avaliação.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  ),
};

/**
 * Painel de Filtros
 */
export const FilterPanelOrganism: Story = {
  name: "Filter Panel",
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-base">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Nome ou email..." className="pl-9" />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Status</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="cursor-pointer">Todos</Badge>
            <Badge variant="outline" className="cursor-pointer">Ativos</Badge>
            <Badge variant="outline" className="cursor-pointer">Inativos</Badge>
            <Badge variant="outline" className="cursor-pointer">Pendentes</Badge>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Perfil</label>
          <div className="space-y-2">
            {["Todos", "Administradores", "Professores", "Alunos", "Coordenadores"].map((perfil) => (
              <label key={perfil} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" defaultChecked={perfil === "Todos"} />
                {perfil}
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Escola</label>
          <select className="w-full p-2 border rounded-md text-sm">
            <option>Todas as escolas</option>
            <option>E.M. João XXIII</option>
            <option>E.E. São Paulo</option>
            <option>Colégio Estadual</option>
          </select>
        </div>
      </CardContent>
      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1">Limpar</Button>
        <Button className="flex-1">Aplicar</Button>
      </div>
    </Card>
  ),
};

/**
 * Card de Métricas como organismo
 */
export const MetricsGrid: Story = {
  name: "Metrics Grid",
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Total de Alunos", value: "1,234", change: "+12%", up: true, icon: Users },
        { label: "Aulas Realizadas", value: "456", change: "+8%", up: true, icon: BookOpen },
        { label: "Média de Desempenho", value: "78%", change: "-2%", up: false, icon: BarChart2 },
        { label: "Taxa de Engajamento", value: "92%", change: "+5%", up: true, icon: Home },
      ].map((metric, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <metric.icon size={20} className="text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{metric.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant={metric.up ? "success" : "destructive"}
                className="text-xs gap-1"
              >
                <Icon name={metric.up ? "TrendingUp" : "TrendingDown"} size="xs" />
                {metric.change}
              </Badge>
              <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
