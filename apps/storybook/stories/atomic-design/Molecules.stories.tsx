import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  FormField,
  Input,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Alert,
  AlertTitle,
  AlertDescription,
  Icon,
} from "@fabioeducacross/ui";

const meta: Meta = {
  title: "Atomic Design/02. Moléculas",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Moléculas

As **moléculas** são grupos de átomos funcionando juntos como uma unidade.
Elas são relativamente simples, mas formam componentes funcionais.

## Características
- ✅ Combinam 2 ou mais átomos
- ✅ Formam unidades funcionais
- ✅ Possuem propósito definido
- ✅ Reutilizáveis em contextos diferentes

## Lista de Moléculas

| Componente | Composição |
|------------|------------|
| FormField | Label + Input + HelperText |
| Card | Container + Header + Content + Footer |
| Alert | Icon + Title + Description |
| Avatar (com badge) | Image + Fallback + Status |
| Tooltip | Trigger + Content |
| Select | Input + Options |
| Tab Item | Icon + Label + Badge |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Showcase de moléculas principais
 */
export const Overview: Story = {
  name: "Visão Geral",
  render: () => (
    <div className="space-y-12">
      {/* FormField */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">FormField</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Label + Input + HelperText/Error combinados em um campo de formulário acessível.
        </p>
        <div className="grid gap-4 max-w-md">
          <FormField label="Nome completo" required helperText="Como aparece no documento">
            <Input placeholder="João da Silva" />
          </FormField>
          <FormField label="Email" required error="Email inválido">
            <Input type="email" placeholder="joao@email.com" />
          </FormField>
          <FormField label="Perfil" helperText="Selecione seu tipo de conta">
            <Select
              options={[
                { value: "aluno", label: "Aluno" },
                { value: "professor", label: "Professor" },
                { value: "coordenador", label: "Coordenador" },
              ]}
              placeholder="Selecione..."
            />
          </FormField>
        </div>
      </section>

      {/* Card */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Card</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Container com header, content e footer para agrupar informações relacionadas.
        </p>
        <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Título do Card</CardTitle>
              <CardDescription>Descrição breve do conteúdo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Conteúdo principal do card com informações relevantes.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancelar</Button>
              <Button size="sm">Salvar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Maria Silva</CardTitle>
                <CardDescription>Professora de Matemática</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge>5º Ano</Badge>
                <Badge variant="outline">127 alunos</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alert */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Alert</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Mensagens de feedback combinando ícone, título e descrição.
        </p>
        <div className="space-y-4 max-w-lg">
          <Alert>
            <Icon name="Info" size="sm" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>
              Esta é uma mensagem informativa para o usuário.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <Icon name="AlertCircle" size="sm" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Ocorreu um erro ao processar sua solicitação.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Tooltip */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Tooltip</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Trigger + Content para dicas contextuais.
        </p>
        <TooltipProvider>
          <div className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Icon name="HelpCircle" size="sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clique para obter ajuda</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="Settings" size="sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configurações</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="Bell" size="sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>3 notificações não lidas</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </section>
    </div>
  ),
};

/**
 * FormField com diferentes tipos de input
 */
export const FormFieldVariants: Story = {
  name: "FormField - Variantes",
  render: () => (
    <div className="max-w-md space-y-6">
      <FormField label="Texto" required>
        <Input placeholder="Digite aqui..." />
      </FormField>

      <FormField label="Email" helperText="Usaremos para notificações">
        <Input type="email" placeholder="seu@email.com" />
      </FormField>

      <FormField label="Senha" required>
        <Input type="password" placeholder="••••••••" />
      </FormField>

      <FormField label="Telefone">
        <Input type="tel" placeholder="(11) 99999-9999" />
      </FormField>

      <FormField label="Tipo de Usuário" required>
        <Select
          options={[
            { value: "admin", label: "Administrador" },
            { value: "professor", label: "Professor" },
            { value: "aluno", label: "Aluno" },
          ]}
          placeholder="Selecione o tipo..."
        />
      </FormField>

      <FormField label="Lembrar-me" layout="horizontal">
        <Checkbox />
      </FormField>

      <FormField label="Gênero" layout="vertical">
        <RadioGroup name="genero" defaultValue="nao-informar">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <Radio value="masculino" /> Masculino
            </label>
            <label className="flex items-center gap-2">
              <Radio value="feminino" /> Feminino
            </label>
            <label className="flex items-center gap-2">
              <Radio value="nao-informar" /> Não informar
            </label>
          </div>
        </RadioGroup>
      </FormField>
    </div>
  ),
};

/**
 * Card com diferentes layouts
 */
export const CardVariants: Story = {
  name: "Card - Variantes",
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Card Simples */}
      <Card>
        <CardHeader>
          <CardTitle>Card Simples</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Apenas header e conteúdo.
          </p>
        </CardContent>
      </Card>

      {/* Card com Imagem */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
        <CardHeader>
          <CardTitle>Card com Imagem</CardTitle>
          <CardDescription>Área de destaque visual</CardDescription>
        </CardHeader>
      </Card>

      {/* Card Interativo */}
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Card Interativo</CardTitle>
            <Icon name="ChevronRight" size="sm" className="text-muted-foreground" />
          </div>
          <CardDescription>Clique para ver mais</CardDescription>
        </CardHeader>
      </Card>

      {/* Card de Estatística */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total de Alunos</CardDescription>
          <CardTitle className="text-3xl">1,234</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="success" className="gap-1">
            <Icon name="TrendingUp" size="xs" /> +12%
          </Badge>
          <span className="text-xs text-muted-foreground ml-2">vs. mês anterior</span>
        </CardContent>
      </Card>

      {/* Card de Perfil */}
      <Card>
        <CardContent className="pt-6 text-center">
          <Avatar size="lg" className="mx-auto mb-3">
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <CardTitle className="text-base">João Santos</CardTitle>
          <CardDescription>Professor de Ciências</CardDescription>
          <div className="flex justify-center gap-2 mt-3">
            <Badge variant="outline">5º Ano</Badge>
            <Badge variant="outline">6º Ano</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Card com Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Ação Pendente</CardTitle>
          <CardDescription>Avalie a atividade</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Button className="flex-1" size="sm">Avaliar</Button>
          <Button variant="outline" size="sm">Depois</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

/**
 * Alert com diferentes variantes
 */
export const AlertVariants: Story = {
  name: "Alert - Variantes",
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Alert>
        <Icon name="Info" size="sm" />
        <AlertTitle>Dica</AlertTitle>
        <AlertDescription>
          Use atalhos de teclado para navegar mais rápido.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <Icon name="AlertTriangle" size="sm" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Sua sessão expira em 5 minutos. Salve seu trabalho.
        </AlertDescription>
      </Alert>

      <Alert className="border-success/50 bg-success/10 text-success">
        <Icon name="CheckCircle" size="sm" />
        <AlertTitle>Sucesso!</AlertTitle>
        <AlertDescription>
          Atividade salva com sucesso.
        </AlertDescription>
      </Alert>

      <Alert className="border-warning/50 bg-warning/10 text-warning">
        <Icon name="AlertCircle" size="sm" />
        <AlertTitle>Aviso</AlertTitle>
        <AlertDescription>
          Algumas respostas ainda não foram enviadas.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * Exemplo de formulário completo
 */
export const CompleteForm: Story = {
  name: "Formulário Completo",
  render: () => (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Cadastro de Usuário</CardTitle>
        <CardDescription>Preencha os dados para criar uma nova conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Nome" required>
            <Input placeholder="Primeiro nome" />
          </FormField>
          <FormField label="Sobrenome" required>
            <Input placeholder="Sobrenome" />
          </FormField>
        </div>

        <FormField label="Email" required helperText="Use seu email institucional">
          <Input type="email" placeholder="seu@escola.edu.br" />
        </FormField>

        <FormField label="Perfil" required>
          <Select
            options={[
              { value: "aluno", label: "Aluno" },
              { value: "professor", label: "Professor" },
              { value: "coordenador", label: "Coordenador" },
            ]}
            placeholder="Selecione seu perfil..."
          />
        </FormField>

        <FormField label="Senha" required helperText="Mínimo 8 caracteres">
          <Input type="password" placeholder="••••••••" />
        </FormField>

        <FormField label="Confirmar Senha" required>
          <Input type="password" placeholder="••••••••" />
        </FormField>

        <FormField label="Termos" layout="horizontal">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Li e aceito os <a href="#" className="text-primary underline">Termos de Uso</a>
            </label>
          </div>
        </FormField>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Criar Conta</Button>
      </CardFooter>
    </Card>
  ),
};
