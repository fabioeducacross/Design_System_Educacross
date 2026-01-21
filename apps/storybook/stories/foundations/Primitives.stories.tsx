import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, spacing, borderRadius, opacityColors, themeVariables, misc } from "@fabioeducacross/ui";

const meta: Meta = {
    title: "Foundations/Primitives",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
# Primitivas do Design System

Tokens de design extraídos do Figma. Essas primitivas formam a base do sistema visual da Educacross.

## Uso

As primitivas estão disponíveis como:
- **CSS Custom Properties** - no arquivo \`styles.css\`
- **Classes Tailwind** - via preset do Tailwind
- **Constantes TypeScript** - para uso programático

\`\`\`tsx
// CSS Custom Properties
<div style={{ backgroundColor: 'var(--color-primary-500)' }}>

// Classes Tailwind  
<div className="bg-primary-500 text-primary-100">

// TypeScript
import { colors } from "@fabioeducacross/ui";
console.log(colors.primary[500]); // "#7367F0"
\`\`\`
                `,
            },
        },
    },
};

export default meta;

// ============================================
// CORES
// ============================================

const ColorSwatch = ({
    name,
    shades,
}: {
    name: string;
    shades: Record<string, string>;
}) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 capitalize">{name}</h3>
        <div className="grid grid-cols-9 gap-2">
            {Object.entries(shades).map(([shade, color]) => (
                <div key={shade} className="text-center">
                    <div
                        className="h-16 rounded-lg border border-gray-200 mb-2"
                        style={{ backgroundColor: color }}
                    />
                    <div className="text-xs font-medium">{shade}</div>
                    <div className="text-xs text-gray-500">{color}</div>
                </div>
            ))}
        </div>
    </div>
);

export const Colors: StoryObj = {
    render: () => (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-6">Paleta de Cores</h2>
                <p className="text-muted-foreground mb-8">
                    Cores sólidas do Design System Educacross. Cada cor possui 9 tons (100-900),
                    onde 500 é o tom principal.
                </p>
            </div>

            <ColorSwatch name="Primary (Roxo Educacross)" shades={colors.primary} />
            <ColorSwatch name="Secondary (Cinza Neutro)" shades={colors.secondary} />
            <ColorSwatch name="Info (Ciano)" shades={colors.info} />
            <ColorSwatch name="Success (Verde)" shades={colors.success} />
            <ColorSwatch name="Warning (Laranja)" shades={colors.warning} />
            <ColorSwatch name="Error (Vermelho)" shades={colors.error} />
            <ColorSwatch name="Gray (Escala de Cinza)" shades={colors.gray} />
        </div>
    ),
};

// ============================================
// CORES COM OPACIDADE
// ============================================

const OpacitySwatch = ({
    name,
    shades,
}: {
    name: string;
    shades: Record<string, string>;
}) => (
    <div className="mb-6">
        <h4 className="text-md font-medium mb-2 capitalize">{name}</h4>
        <div className="flex gap-3">
            {Object.entries(shades).map(([shade, color]) => (
                <div key={shade} className="text-center">
                    <div
                        className="h-12 w-16 rounded-lg border border-gray-200"
                        style={{ backgroundColor: color }}
                    />
                    <div className="text-xs font-medium mt-1">{shade}%</div>
                </div>
            ))}
        </div>
    </div>
);

export const OpacityColors: StoryObj = {
    render: () => (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Cores com Opacidade</h2>
                <p className="text-muted-foreground mb-6">
                    Variantes de cor com opacidade reduzida, úteis para estados de hover,
                    backgrounds sutis e efeitos de sobreposição.
                </p>
            </div>

            <OpacitySwatch name="Primary" shades={opacityColors.primary} />
            <OpacitySwatch name="Secondary" shades={opacityColors.secondary} />
            <OpacitySwatch name="Info" shades={opacityColors.info} />
            <OpacitySwatch name="Success" shades={opacityColors.success} />
            <OpacitySwatch name="Warning" shades={opacityColors.warning} />
            <OpacitySwatch name="Error" shades={opacityColors.error} />
            <OpacitySwatch name="Gray" shades={opacityColors.gray} />
        </div>
    ),
};

// ============================================
// SPACING
// ============================================

export const Spacing: StoryObj = {
    render: () => (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Espaçamento</h2>
                <p className="text-muted-foreground mb-6">
                    Tokens de espaçamento para padding e gap. Baseado em múltiplos de 4px.
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Padding</h3>
                <div className="space-y-3">
                    {Object.entries(spacing.padding).map(([scale, value]) => (
                        <div key={scale} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">padding-{scale}</div>
                            <div className="w-16 text-sm text-gray-500">{value}</div>
                            <div className="flex-1">
                                <div
                                    className="bg-primary-500 h-4 rounded"
                                    style={{ width: value }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Gap</h3>
                <div className="space-y-3">
                    {Object.entries(spacing.gap).map(([scale, value]) => (
                        <div key={scale} className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium">gap-{scale}</div>
                            <div className="w-16 text-sm text-gray-500">{value}</div>
                            <div className="flex-1">
                                <div
                                    className="bg-info-500 h-4 rounded"
                                    style={{ width: value }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};

// ============================================
// BORDER RADIUS
// ============================================

export const BorderRadius: StoryObj = {
    render: () => (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Border Radius</h2>
                <p className="text-muted-foreground mb-6">
                    Tokens de arredondamento de bordas para manter consistência visual.
                </p>
            </div>

            <div className="flex flex-wrap gap-6">
                {Object.entries(borderRadius).map(([name, value]) => (
                    <div key={name} className="text-center">
                        <div
                            className="w-20 h-20 bg-primary-500 mb-2"
                            style={{ borderRadius: value }}
                        />
                        <div className="text-sm font-medium">radius-{name}</div>
                        <div className="text-xs text-gray-500">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    ),
};

// ============================================
// TODOS OS TOKENS
// ============================================

export const AllTokens: StoryObj = {
    render: () => (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Resumo de Tokens</h2>
                <p className="text-muted-foreground mb-6">
                    Visão geral de todos os design tokens disponíveis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">📏 Spacing</h3>
                    <p className="text-sm text-gray-600">
                        {Object.keys(spacing.padding).length} tokens de padding
                        <br />
                        {Object.keys(spacing.gap).length} tokens de gap
                    </p>
                </div>

                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🎨 Cores</h3>
                    <p className="text-sm text-gray-600">
                        7 categorias de cor
                        <br />
                        9 tons por categoria (100-900)
                        <br />
                        5 níveis de opacidade
                    </p>
                </div>

                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🔲 Border Radius</h3>
                    <p className="text-sm text-gray-600">
                        {Object.keys(borderRadius).length} tamanhos
                        <br />
                        De xs (2px) a round (500px)
                    </p>
                </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Como usar</h3>
                <pre className="text-sm overflow-x-auto">
{`// Importar tokens TypeScript
import { colors, spacing, borderRadius } from "@fabioeducacross/ui";

// Usar CSS Custom Properties
<div style={{ 
  backgroundColor: 'var(--color-primary-500)',
  padding: 'var(--padding-4)',
  borderRadius: 'var(--radius-md)'
}} />

// Usar classes Tailwind
<div className="bg-primary-500 p-4 rounded-md" />`}
                </pre>
            </div>
        </div>
    ),
};

// ============================================
// VARIÁVEIS SEMÂNTICAS
// ============================================

const VariableSwatch = ({
    name,
    value,
    isColor = true,
}: {
    name: string;
    value: string;
    isColor?: boolean;
}) => (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
        {isColor && (
            <div
                className="w-10 h-10 rounded border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: value }}
            />
        )}
        <div className="flex-1">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-gray-500 font-mono">{value}</div>
        </div>
    </div>
);

export const ThemeVariables: StoryObj = {
    render: () => (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Variáveis de Tema</h2>
                <p className="text-muted-foreground mb-6">
                    Tokens semânticos que mudam entre Light e Dark mode. Esses tokens são usados
                    para textos, ações, bordas e backgrounds de layout.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Light Mode */}
                <div className="p-4 border rounded-lg bg-white">
                    <h3 className="text-lg font-semibold mb-4">☀️ Light Mode</h3>
                    
                    <h4 className="text-sm font-medium text-gray-500 mb-2 mt-4">Textos</h4>
                    <VariableSwatch name="text-primary" value={themeVariables.light.textPrimary} />
                    <VariableSwatch name="text-secondary" value={themeVariables.light.textSecondary} />
                    <VariableSwatch name="text-subtitle" value={themeVariables.light.textSubtitle} />
                    <VariableSwatch name="text-disabled" value={themeVariables.light.textDisabled} />
                    
                    <h4 className="text-sm font-medium text-gray-500 mb-2 mt-4">Ações</h4>
                    <VariableSwatch name="action-active" value={themeVariables.light.actionActive} />
                    <VariableSwatch name="action-hover" value={themeVariables.light.actionHover} />
                    <VariableSwatch name="action-selected" value={themeVariables.light.actionSelected} />
                    <VariableSwatch name="action-disabled" value={themeVariables.light.actionDisabled} />
                    
                    <h4 className="text-sm font-medium text-gray-500 mb-2 mt-4">Bordas</h4>
                    <VariableSwatch name="divider" value={themeVariables.light.divider} />
                    <VariableSwatch name="outline-border" value={themeVariables.light.outlineBorder} />
                    <VariableSwatch name="input-border" value={themeVariables.light.inputBorder} />
                    
                    <h4 className="text-sm font-medium text-gray-500 mb-2 mt-4">Backgrounds</h4>
                    <VariableSwatch name="body-bg" value={themeVariables.light.bodyBg} />
                    <VariableSwatch name="paper" value={themeVariables.light.paper} />
                    <VariableSwatch name="avatar-bg" value={themeVariables.light.avatarBg} />
                </div>

                {/* Dark Mode */}
                <div className="p-4 border rounded-lg bg-gray-900 text-white">
                    <h3 className="text-lg font-semibold mb-4">🌙 Dark Mode</h3>
                    
                    <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Textos</h4>
                    <VariableSwatch name="text-primary" value={themeVariables.dark.textPrimary} />
                    <VariableSwatch name="text-secondary" value={themeVariables.dark.textSecondary} />
                    <VariableSwatch name="text-subtitle" value={themeVariables.dark.textSubtitle} />
                    <VariableSwatch name="text-disabled" value={themeVariables.dark.textDisabled} />
                    
                    <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Ações</h4>
                    <VariableSwatch name="action-active" value={themeVariables.dark.actionActive} />
                    <VariableSwatch name="action-hover" value={themeVariables.dark.actionHover} />
                    <VariableSwatch name="action-selected" value={themeVariables.dark.actionSelected} />
                    <VariableSwatch name="action-disabled" value={themeVariables.dark.actionDisabled} />
                    
                    <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Bordas</h4>
                    <VariableSwatch name="divider" value={themeVariables.dark.divider} />
                    <VariableSwatch name="outline-border" value={themeVariables.dark.outlineBorder} />
                    <VariableSwatch name="input-border" value={themeVariables.dark.inputBorder} />
                    
                    <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Backgrounds</h4>
                    <VariableSwatch name="body-bg" value={themeVariables.dark.bodyBg} />
                    <VariableSwatch name="paper" value={themeVariables.dark.paper} />
                    <VariableSwatch name="avatar-bg" value={themeVariables.dark.avatarBg} />
                </div>
            </div>
        </div>
    ),
};

// ============================================
// MISC TOKENS
// ============================================

export const MiscTokens: StoryObj = {
    render: () => (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Tokens Diversos</h2>
                <p className="text-muted-foreground mb-6">
                    Tokens para layout, redes sociais e outros usos específicos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">📐 Layout</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-medium">card-header</span>
                            <span className="text-gray-500 font-mono">{misc.cardHeader}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-medium">card-padding</span>
                            <span className="text-gray-500 font-mono">{misc.cardPadding}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-medium">card-footer</span>
                            <span className="text-gray-500 font-mono">{misc.cardFooter}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-medium">form-gap</span>
                            <span className="text-gray-500 font-mono">{misc.formGap}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-medium">container-xl</span>
                            <span className="text-gray-500 font-mono">{misc.containerXl}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">🌐 Redes Sociais</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded"
                                style={{ backgroundColor: misc.bgFacebook }}
                            />
                            <div>
                                <div className="font-medium">Facebook</div>
                                <div className="text-xs text-gray-500 font-mono">{misc.bgFacebook}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded"
                                style={{ backgroundColor: misc.bgTwitter }}
                            />
                            <div>
                                <div className="font-medium">Twitter</div>
                                <div className="text-xs text-gray-500 font-mono">{misc.bgTwitter}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded"
                                style={{ backgroundColor: misc.bgLinkedin }}
                            />
                            <div>
                                <div className="font-medium">LinkedIn</div>
                                <div className="text-xs text-gray-500 font-mono">{misc.bgLinkedin}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
