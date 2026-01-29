import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Input, Label, Checkbox, Badge, Icon } from "@fabioeducacross/ui";

/**
 * ## Catálogo de Átomos
 * 
 * Átomos são os blocos de construção fundamentais do Design System.
 * Eles são elementos HTML básicos estilizados que não podem ser quebrados em partes menores.
 * 
 * ### Exemplos de Átomos:
 * - Button (botões)
 * - Input (campos de entrada)
 * - Label (rótulos)
 * - Checkbox (caixas de seleção)
 * - Radio (botões de rádio)
 * - Badge (etiquetas)
 * - Icon (ícones)
 * - Divider (divisores)
 * - Avatar (fotos de perfil)
 */

const meta: Meta = {
  title: "Atomic Design/01. Átomos",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Átomos

Os **átomos** são os menores componentes indivisíveis do Design System. 
Eles representam elementos HTML básicos como botões, inputs, labels e ícones.

## Características
- ✅ Não possuem dependências de outros componentes
- ✅ Altamente reutilizáveis
- ✅ Controlados por tokens CSS
- ✅ Base para componentes maiores

## Lista de Átomos

| Componente | Descrição |
|------------|-----------|
| Button | Ações primárias e secundárias |
| Input | Entrada de texto |
| Label | Rótulos para inputs |
| Checkbox | Seleção booleana |
| Radio | Seleção única |
| Badge | Etiquetas e status |
| Icon | Ícones Feather/Custom |
| Avatar | Imagem de perfil |
| Divider | Separadores visuais |
| Skeleton | Placeholders de loading |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Showcase de todos os átomos principais
 */
export const Overview: Story = {
  name: "Visão Geral",
  render: () => (
    <div className="space-y-12">
      {/* Buttons */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Icon name="Plus" size="sm" /></Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Inputs</h2>
        <div className="grid gap-4 max-w-md">
          <div>
            <Label htmlFor="demo-input">Label</Label>
            <Input id="demo-input" placeholder="Placeholder text" />
          </div>
          <div>
            <Label htmlFor="demo-disabled">Disabled</Label>
            <Input id="demo-disabled" placeholder="Disabled input" disabled />
          </div>
          <div>
            <Label htmlFor="demo-error">Com Erro</Label>
            <Input id="demo-error" placeholder="Campo inválido" className="border-destructive" />
            <p className="text-sm text-destructive mt-1">Mensagem de erro</p>
          </div>
        </div>
      </section>

      {/* Checkboxes */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Checkboxes</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <Checkbox /> Opção 1
          </label>
          <label className="flex items-center gap-2">
            <Checkbox defaultChecked /> Marcado
          </label>
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox disabled /> Desabilitado
          </label>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>

      {/* Icons */}
      <section>
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Icons</h2>
        <div className="flex flex-wrap gap-4">
          <div className="text-center">
            <Icon name="Home" size="lg" />
            <p className="text-xs mt-1">Home</p>
          </div>
          <div className="text-center">
            <Icon name="User" size="lg" />
            <p className="text-xs mt-1">User</p>
          </div>
          <div className="text-center">
            <Icon name="Settings" size="lg" />
            <p className="text-xs mt-1">Settings</p>
          </div>
          <div className="text-center">
            <Icon name="Search" size="lg" />
            <p className="text-xs mt-1">Search</p>
          </div>
          <div className="text-center">
            <Icon name="Bell" size="lg" />
            <p className="text-xs mt-1">Bell</p>
          </div>
          <div className="text-center">
            <Icon name="Check" size="lg" variant="success" />
            <p className="text-xs mt-1">Check</p>
          </div>
          <div className="text-center">
            <Icon name="X" size="lg" variant="destructive" />
            <p className="text-xs mt-1">X</p>
          </div>
          <div className="text-center">
            <Icon name="AlertCircle" size="lg" variant="warning" />
            <p className="text-xs mt-1">Alert</p>
          </div>
        </div>
      </section>
    </div>
  ),
};

/**
 * Estados interativos dos átomos
 */
export const InteractiveStates: Story = {
  name: "Estados Interativos",
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="font-medium mb-3">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <div className="text-center">
            <Button>Normal</Button>
            <p className="text-xs mt-2 text-muted-foreground">Default</p>
          </div>
          <div className="text-center">
            <Button className="hover:bg-primary/90">Hover</Button>
            <p className="text-xs mt-2 text-muted-foreground">Hover</p>
          </div>
          <div className="text-center">
            <Button disabled>Disabled</Button>
            <p className="text-xs mt-2 text-muted-foreground">Disabled</p>
          </div>
          <div className="text-center">
            <Button loading>Loading</Button>
            <p className="text-xs mt-2 text-muted-foreground">Loading</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-medium mb-3">Input States</h3>
        <div className="grid gap-4 max-w-xs">
          <Input placeholder="Normal" />
          <Input placeholder="Focused" className="ring-2 ring-ring" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Error" className="border-destructive focus-visible:ring-destructive" />
        </div>
      </section>

      <section>
        <h3 className="font-medium mb-3">Badge Sizes</h3>
        <div className="flex items-center gap-4">
          <Badge className="text-xs px-2 py-0.5">Small</Badge>
          <Badge>Default</Badge>
          <Badge className="text-base px-3 py-1">Large</Badge>
        </div>
      </section>
    </div>
  ),
};

/**
 * Composição de átomos
 */
export const Composition: Story = {
  name: "Composição",
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="font-medium mb-3">Button com Ícone</h3>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Icon name="Plus" size="sm" className="mr-2" />
            Adicionar
          </Button>
          <Button variant="destructive">
            <Icon name="Trash2" size="sm" className="mr-2" />
            Excluir
          </Button>
          <Button variant="outline">
            <Icon name="Download" size="sm" className="mr-2" />
            Exportar
          </Button>
          <Button variant="ghost">
            Próximo
            <Icon name="ChevronRight" size="sm" className="ml-2" />
          </Button>
        </div>
      </section>

      <section>
        <h3 className="font-medium mb-3">Input com Label</h3>
        <div className="max-w-sm space-y-4">
          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
          <div>
            <Label htmlFor="password" required>Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-medium mb-3">Badge com Ícone</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" className="gap-1">
            <Icon name="Check" size="xs" /> Aprovado
          </Badge>
          <Badge variant="destructive" className="gap-1">
            <Icon name="X" size="xs" /> Reprovado
          </Badge>
          <Badge variant="warning" className="gap-1">
            <Icon name="Clock" size="xs" /> Pendente
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Icon name="User" size="xs" /> 5 usuários
          </Badge>
        </div>
      </section>
    </div>
  ),
};
