import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomIcon, customIcons, type CustomIconCategory } from "@educacross/ui";
import { useState } from "react";

const meta: Meta<typeof CustomIcon> = {
    title: "Foundations/Custom Icons",
    component: CustomIcon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Ícones customizados do Educacross organizados por categorias: Áreas de Conhecimento, Ações, Menu, Interface, Métricas, Redes Sociais, Tipos de Usuários, Agrupamentos, Gamificação, Idioma, Níveis de Proficiência e Matrizes Curriculares (BNCC, SAEB, SARESP, AVALIA).",
            },
        },
    },
    argTypes: {
        category: {
            control: "select",
            options: Object.keys(customIcons),
            description: "Categoria do ícone",
        },
        name: {
            control: "text",
            description: "Nome do ícone dentro da categoria",
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
                "info",
            ],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Exemplo básico do CustomIcon.
 */
export const Default: Story = {
    args: {
        category: "conhecimento",
        name: "Matemática",
        size: "default",
        variant: "default",
    },
};

/**
 * Galeria com todos os ícones organizados por categoria.
 */
export const Gallery: Story = {
    render: () => {
        const [selectedCategory, setSelectedCategory] = useState<CustomIconCategory>("conhecimento");
        const [selectedSize, setSelectedSize] = useState<"sm" | "default" | "md" | "lg">("md");

        const categories: { key: CustomIconCategory; label: string }[] = [
            { key: "conhecimento", label: "Áreas de Conhecimento" },
            { key: "acao", label: "Ícones de Ação" },
            { key: "menu", label: "Ícones do Menu" },
            { key: "interface", label: "Interface" },
            { key: "metricas", label: "Métricas" },
            { key: "social", label: "Redes Sociais" },
            { key: "usuarios", label: "Tipos de Usuários" },
            { key: "agrupamentos", label: "Agrupamentos" },
            { key: "gamificacao", label: "Gamificação" },
            { key: "idioma", label: "Idioma" },
            { key: "proficiencia", label: "Níveis de Proficiência" },
            { key: "educacao-infantil", label: "Educação Infantil - BNCC" },
            { key: "lingua-portuguesa-bncc", label: "LP - BNCC" },
            { key: "lingua-portuguesa-saeb", label: "LP - SAEB" },
            { key: "lingua-portuguesa-saresp", label: "LP - SARESP" },
            { key: "lingua-portuguesa-topicos", label: "LP - Tópicos Educacross" },
            { key: "matematica-bncc", label: "Matemática - BNCC" },
            { key: "matematica-saeb-saresp", label: "Matemática - SAEB/SARESP" },
            { key: "matematica-avalia", label: "Matemática - AVALIA" },
        ];

        return (
            <div className="space-y-6">
                {/* Controles */}
                <div className="flex gap-4 items-center border-b pb-4">
                    <div className="flex gap-2">
                        <label className="font-medium text-sm">Categoria:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as CustomIconCategory)}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            {categories.map((cat) => (
                                <option key={cat.key} value={cat.key}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <label className="font-medium text-sm">Tamanho:</label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value as any)}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value="sm">Small</option>
                            <option value="default">Default</option>
                            <option value="md">Medium</option>
                            <option value="lg">Large</option>
                        </select>
                    </div>
                </div>

                {/* Grid de Ícones */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        {categories.find((c) => c.key === selectedCategory)?.label} (
                        {customIcons[selectedCategory].length} ícones)
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {customIcons[selectedCategory].map((iconName) => (
                            <div
                                key={iconName}
                                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <CustomIcon
                                    category={selectedCategory}
                                    name={iconName}
                                    size={selectedSize}
                                    className="text-foreground"
                                />
                                <span className="text-xs text-center break-words w-full">
                                    {iconName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Visualize todos os ícones customizados do Educacross organizados por categoria.",
            },
        },
    },
};

/**
 * Tamanhos disponíveis dos ícones.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="xs" />
                <span className="text-xs">xs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="sm" />
                <span className="text-xs">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="default" />
                <span className="text-xs">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="md" />
                <span className="text-xs">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="lg" />
                <span className="text-xs">lg</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="xl" />
                <span className="text-xs">xl</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="conhecimento" name="Matemática" size="2xl" />
                <span className="text-xs">2xl</span>
            </div>
        </div>
    ),
};

/**
 * Variantes de cor dos ícones.
 */
export const Variants: Story = {
    render: () => (
        <div className="grid grid-cols-4 gap-6">
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="default" />
                <span className="text-xs">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="muted" />
                <span className="text-xs">muted</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="primary" />
                <span className="text-xs">primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="secondary" />
                <span className="text-xs">secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="destructive" />
                <span className="text-xs">destructive</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="success" />
                <span className="text-xs">success</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="warning" />
                <span className="text-xs">warning</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <CustomIcon category="metricas" name="Pontos" size="lg" variant="info" />
                <span className="text-xs">info</span>
            </div>
        </div>
    ),
};

/**
 * Exemplos de uso dos ícones em contexto.
 */
export const InContext: Story = {
    render: () => (
        <div className="space-y-8">
            {/* Cards de Métricas */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Métricas</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 flex items-center gap-3">
                        <CustomIcon category="metricas" name="Pontos" size="lg" variant="primary" />
                        <div>
                            <p className="text-2xl font-bold">1,250</p>
                            <p className="text-sm text-muted-foreground">Pontos</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-3">
                        <CustomIcon category="metricas" name="Jogos" size="lg" variant="success" />
                        <div>
                            <p className="text-2xl font-bold">45</p>
                            <p className="text-sm text-muted-foreground">Jogos</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-3">
                        <CustomIcon category="metricas" name="Desafios" size="lg" variant="warning" />
                        <div>
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-sm text-muted-foreground">Desafios</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center gap-3">
                        <CustomIcon category="metricas" name="Progresso" size="lg" variant="info" />
                        <div>
                            <p className="text-2xl font-bold">78%</p>
                            <p className="text-sm text-muted-foreground">Progresso</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tipos de Usuários */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Tipos de Usuários</h3>
                <div className="flex gap-4">
                    {["Professor", "Aluno", "Coordenadores", "Diretor"].map((user) => (
                        <div key={user} className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <CustomIcon
                                    category="usuarios"
                                    name={user}
                                    size="lg"
                                    variant="primary"
                                />
                            </div>
                            <span className="text-sm">{user}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Áreas de Conhecimento */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Áreas de Conhecimento</h3>
                <div className="flex gap-4">
                    {["Matemática", "Língua Portuguesa", "Liga das Corujinhas"].map((subject, index) => {
                        const variants = ["primary", "success", "info"] as const;
                        return (
                            <div
                                key={subject}
                                className="border rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
                            >
                                <CustomIcon
                                    category="conhecimento"
                                    name={subject}
                                    size="lg"
                                    variant={variants[index]}
                                />
                                <span className="font-medium">{subject}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Exemplos de como usar os ícones customizados em diferentes contextos da aplicação.",
            },
        },
    },
};
