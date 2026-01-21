import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Icon, iconCategories, iconNames, Button, Input } from "@fabioeducacross/ui";
import type { IconName } from "@fabioeducacross/ui";

const meta: Meta<typeof Icon> = {
    title: "Foundations/Icons",
    component: Icon,
    tags: ["autodocs"],
    argTypes: {
        name: {
            control: "select",
            options: iconNames.slice(0, 50), // Limit for storybook controls
            description: "The name of the Feather icon",
        },
        size: {
            control: "select",
            options: ["xs", "sm", "default", "md", "lg", "xl", "2xl"],
        },
        variant: {
            control: "select",
            options: [
                "default",
                "muted",
                "primary",
                "secondary",
                "destructive",
                "success",
                "warning",
            ],
        },
        strokeWidth: {
            control: { type: "range", min: 0.5, max: 3, step: 0.5 },
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
O Design System Educacross utiliza **Feather Icons** como biblioteca de ícones padrão.

Feather é uma coleção de ícones open-source, desenhados com princípios de simplicidade, consistência e flexibilidade.

## Instalação

Os ícones já estão incluídos no pacote \`@fabioeducacross/ui\`.

## Uso Básico

\`\`\`tsx
import { Icon } from "@fabioeducacross/ui";

// Uso simples
<Icon name="Check" />

// Com tamanho
<Icon name="AlertCircle" size="lg" />

// Com cor
<Icon name="Heart" variant="destructive" />

// Com tamanho em pixels
<Icon name="Star" pixelSize={32} />
\`\`\`

## Uso Direto dos Ícones

Você também pode importar ícones diretamente:

\`\`\`tsx
import { Check, AlertCircle, Heart } from "@fabioeducacross/ui";

<Check size={24} />
<AlertCircle className="text-destructive" />
\`\`\`
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/**
 * Ícone básico com controles interativos.
 */
export const Default: Story = {
    args: {
        name: "Star",
        size: "default",
        variant: "default",
        strokeWidth: 2,
    },
};

/**
 * Diferentes tamanhos de ícones.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <div className="text-center">
                <Icon name="Star" size="xs" />
                <p className="text-xs mt-2">xs</p>
            </div>
            <div className="text-center">
                <Icon name="Star" size="sm" />
                <p className="text-xs mt-2">sm</p>
            </div>
            <div className="text-center">
                <Icon name="Star" size="default" />
                <p className="text-xs mt-2">default</p>
            </div>
            <div className="text-center">
                <Icon name="Star" size="md" />
                <p className="text-xs mt-2">md</p>
            </div>
            <div className="text-center">
                <Icon name="Star" size="lg" />
                <p className="text-xs mt-2">lg</p>
            </div>
            <div className="text-center">
                <Icon name="Star" size="xl" />
                <p className="text-xs mt-2">xl</p>
            </div>
            <div className="text-center">
                <Icon name="Star" size="2xl" />
                <p className="text-xs mt-2">2xl</p>
            </div>
        </div>
    ),
};

/**
 * Variantes de cor.
 */
export const ColorVariants: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="default" />
                <p className="text-xs mt-2">default</p>
            </div>
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="muted" />
                <p className="text-xs mt-2">muted</p>
            </div>
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="primary" />
                <p className="text-xs mt-2">primary</p>
            </div>
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="secondary" />
                <p className="text-xs mt-2">secondary</p>
            </div>
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="destructive" />
                <p className="text-xs mt-2">destructive</p>
            </div>
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="success" />
                <p className="text-xs mt-2">success</p>
            </div>
            <div className="text-center">
                <Icon name="Heart" size="lg" variant="warning" />
                <p className="text-xs mt-2">warning</p>
            </div>
        </div>
    ),
};

/**
 * Espessura do traço personalizável.
 */
export const StrokeWidth: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <div className="text-center">
                <Icon name="Circle" size="xl" strokeWidth={0.5} />
                <p className="text-xs mt-2">0.5</p>
            </div>
            <div className="text-center">
                <Icon name="Circle" size="xl" strokeWidth={1} />
                <p className="text-xs mt-2">1</p>
            </div>
            <div className="text-center">
                <Icon name="Circle" size="xl" strokeWidth={1.5} />
                <p className="text-xs mt-2">1.5</p>
            </div>
            <div className="text-center">
                <Icon name="Circle" size="xl" strokeWidth={2} />
                <p className="text-xs mt-2">2 (padrão)</p>
            </div>
            <div className="text-center">
                <Icon name="Circle" size="xl" strokeWidth={2.5} />
                <p className="text-xs mt-2">2.5</p>
            </div>
            <div className="text-center">
                <Icon name="Circle" size="xl" strokeWidth={3} />
                <p className="text-xs mt-2">3</p>
            </div>
        </div>
    ),
};

/**
 * Ícones em botões.
 */
export const InButtons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button>
                <Icon name="Plus" size="sm" className="mr-2" />
                Adicionar
            </Button>
            <Button variant="secondary">
                <Icon name="Download" size="sm" className="mr-2" />
                Download
            </Button>
            <Button variant="outline">
                <Icon name="Settings" size="sm" className="mr-2" />
                Configurações
            </Button>
            <Button variant="destructive">
                <Icon name="Trash2" size="sm" className="mr-2" />
                Excluir
            </Button>
            <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" />
            </Button>
            <Button variant="outline" size="icon">
                <Icon name="Search" />
            </Button>
        </div>
    ),
};

/**
 * Catálogo de ícones por categoria.
 */
export const IconCatalog: Story = {
    render: () => {
        const [search, setSearch] = useState("");
        const [selectedCategory, setSelectedCategory] = useState<string>("all");

        const categories = Object.keys(iconCategories) as Array<
            keyof typeof iconCategories
        >;

        const getFilteredIcons = () => {
            let icons: IconName[] = [];

            if (selectedCategory === "all") {
                icons = iconNames;
            } else {
                icons =
                    iconCategories[selectedCategory as keyof typeof iconCategories] ||
                    [];
            }

            if (search) {
                icons = icons.filter((name) =>
                    name.toLowerCase().includes(search.toLowerCase())
                );
            }

            return icons;
        };

        const filteredIcons = getFilteredIcons();

        return (
            <div className="space-y-6">
                <div className="flex gap-4 flex-wrap items-center">
                    <Input
                        placeholder="Buscar ícones..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm"
                    >
                        <option value="all">Todas categorias</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)} (
                                {iconCategories[cat].length})
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-muted-foreground">
                        {filteredIcons.length} ícones encontrados
                    </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
                    {filteredIcons.slice(0, 120).map((iconName) => (
                        <div
                            key={iconName}
                            className="flex flex-col items-center p-3 rounded-lg hover:bg-muted cursor-pointer group"
                            title={iconName}
                        >
                            <Icon name={iconName} size="md" />
                            <span className="text-[10px] text-muted-foreground mt-2 truncate max-w-full opacity-0 group-hover:opacity-100 transition-opacity">
                                {iconName}
                            </span>
                        </div>
                    ))}
                </div>

                {filteredIcons.length > 120 && (
                    <p className="text-sm text-muted-foreground text-center">
                        Mostrando 120 de {filteredIcons.length} ícones. Use a busca para
                        encontrar ícones específicos.
                    </p>
                )}
            </div>
        );
    },
};

/**
 * Ícones de setas e navegação.
 */
export const ArrowIcons: Story = {
    render: () => (
        <div className="space-y-4">
            <h3 className="font-semibold">Setas e Navegação</h3>
            <div className="grid grid-cols-8 gap-4">
                {iconCategories.arrows.map((iconName) => (
                    <div
                        key={iconName}
                        className="flex flex-col items-center p-2 rounded hover:bg-muted"
                        title={iconName}
                    >
                        <Icon name={iconName} size="md" />
                        <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">
                            {iconName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

/**
 * Ícones de ações.
 */
export const ActionIcons: Story = {
    render: () => (
        <div className="space-y-4">
            <h3 className="font-semibold">Ações</h3>
            <div className="grid grid-cols-8 gap-4">
                {iconCategories.actions.map((iconName) => (
                    <div
                        key={iconName}
                        className="flex flex-col items-center p-2 rounded hover:bg-muted"
                        title={iconName}
                    >
                        <Icon name={iconName} size="md" />
                        <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">
                            {iconName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

/**
 * Ícones de alertas e notificações.
 */
export const AlertIcons: Story = {
    render: () => (
        <div className="space-y-4">
            <h3 className="font-semibold">Alertas e Notificações</h3>
            <div className="grid grid-cols-8 gap-4">
                {iconCategories.alerts.map((iconName) => (
                    <div
                        key={iconName}
                        className="flex flex-col items-center p-2 rounded hover:bg-muted"
                        title={iconName}
                    >
                        <Icon name={iconName} size="md" />
                        <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">
                            {iconName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

/**
 * Ícones de usuários.
 */
export const UserIcons: Story = {
    render: () => (
        <div className="space-y-4">
            <h3 className="font-semibold">Usuários</h3>
            <div className="grid grid-cols-8 gap-4">
                {iconCategories.users.map((iconName) => (
                    <div
                        key={iconName}
                        className="flex flex-col items-center p-2 rounded hover:bg-muted"
                        title={iconName}
                    >
                        <Icon name={iconName} size="md" />
                        <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-full">
                            {iconName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

/**
 * Exemplos de uso em contexto.
 */
export const InContext: Story = {
    render: () => (
        <div className="space-y-8">
            {/* Status indicators */}
            <div className="space-y-2">
                <h3 className="font-semibold">Indicadores de Status</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Icon name="CheckCircle" variant="success" />
                        <span>Sucesso</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Icon name="AlertCircle" variant="warning" />
                        <span>Atenção</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Icon name="XCircle" variant="destructive" />
                        <span>Erro</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Icon name="Info" variant="primary" />
                        <span>Informação</span>
                    </div>
                </div>
            </div>

            {/* Navigation menu */}
            <div className="space-y-2">
                <h3 className="font-semibold">Menu de Navegação</h3>
                <nav className="w-64 border rounded-lg p-2 space-y-1">
                    {[
                        { icon: "Home" as IconName, label: "Início", active: true },
                        { icon: "BookOpen" as IconName, label: "Cursos" },
                        { icon: "Award" as IconName, label: "Conquistas" },
                        { icon: "BarChart2" as IconName, label: "Progresso" },
                        { icon: "Settings" as IconName, label: "Configurações" },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href="#"
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${item.active
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                                }`}
                        >
                            <Icon name={item.icon} size="sm" />
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Feature list */}
            <div className="space-y-2">
                <h3 className="font-semibold">Lista de Recursos</h3>
                <ul className="space-y-3">
                    {[
                        { icon: "Zap" as IconName, text: "Aprendizado adaptativo" },
                        { icon: "Shield" as IconName, text: "Ambiente seguro para crianças" },
                        { icon: "Users" as IconName, text: "Colaboração em tempo real" },
                        { icon: "TrendingUp" as IconName, text: "Relatórios de progresso" },
                    ].map((item) => (
                        <li key={item.text} className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-primary/10">
                                <Icon name={item.icon} variant="primary" />
                            </div>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Social actions */}
            <div className="space-y-2">
                <h3 className="font-semibold">Ações Sociais</h3>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                        <Icon name="Heart" />
                        <span>Curtir</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                        <Icon name="MessageCircle" />
                        <span>Comentar</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                        <Icon name="Share2" />
                        <span>Compartilhar</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                        <Icon name="Bookmark" />
                        <span>Salvar</span>
                    </button>
                </div>
            </div>
        </div>
    ),
};
