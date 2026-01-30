/**
 * CSS Class Manifest
 * 
 * Manifest curado de classes CSS organizadas por categoria.
 * Usado pelo CssExplorer para demonstrar classes sem criar múltiplas stories.
 */

export interface ClassCategory {
  id: string;
  name: string;
  description: string;
  classes: ClassItem[];
}

export interface ClassItem {
  name: string;
  className: string;
  description?: string;
  appliesTo?: 'text' | 'background' | 'border' | 'both';
}

export const cssManifest: ClassCategory[] = [
  {
    id: 'colors-bg',
    name: 'Background Colors',
    description: 'Classes de cor de fundo',
    classes: [
      { name: 'Primary', className: 'bg-primary text-primary-foreground', description: 'Cor principal do sistema', appliesTo: 'background' },
      { name: 'Secondary', className: 'bg-secondary text-secondary-foreground', description: 'Cor secundária', appliesTo: 'background' },
      { name: 'Destructive', className: 'bg-destructive text-destructive-foreground', description: 'Cor para ações destrutivas', appliesTo: 'background' },
      { name: 'Success', className: 'bg-success text-success-foreground', description: 'Cor de sucesso', appliesTo: 'background' },
      { name: 'Warning', className: 'bg-warning text-warning-foreground', description: 'Cor de alerta', appliesTo: 'background' },
      { name: 'Muted', className: 'bg-muted text-muted-foreground', description: 'Cor suave', appliesTo: 'background' },
      { name: 'Accent', className: 'bg-accent text-accent-foreground', description: 'Cor de destaque', appliesTo: 'background' },
      { name: 'Card', className: 'bg-card text-card-foreground', description: 'Fundo de cards', appliesTo: 'background' },
    ],
  },
  {
    id: 'colors-legend',
    name: 'Legend Colors (Proficiência)',
    description: 'Cores do sistema de proficiência Educacross',
    classes: [
      { name: 'Advanced', className: 'bg-legend-advanced text-white', description: 'Avançado - Roxo #6e63e8', appliesTo: 'background' },
      { name: 'Proficient', className: 'bg-legend-proficient text-white', description: 'Proficiente - Verde #28c76f', appliesTo: 'background' },
      { name: 'Basic', className: 'bg-legend-basic text-white', description: 'Básico - LARANJA #ff9f43 (não amarelo!)', appliesTo: 'background' },
      { name: 'Below Basic', className: 'bg-legend-below-basic text-white', description: 'Abaixo do Básico - Vermelho #ea5455', appliesTo: 'background' },
      { name: 'Not Completed', className: 'bg-legend-not-completed text-white', description: 'Não Concluído - Cinza #b4b7bd', appliesTo: 'background' },
      { name: 'In Progress', className: 'bg-legend-in-progress text-white', description: 'Em Andamento - Ciano #00cfe8', appliesTo: 'background' },
    ],
  },
  {
    id: 'colors-text',
    name: 'Text Colors',
    description: 'Classes de cor de texto',
    classes: [
      { name: 'Foreground', className: 'text-foreground', description: 'Texto padrão', appliesTo: 'text' },
      { name: 'Muted', className: 'text-muted-foreground', description: 'Texto secundário', appliesTo: 'text' },
      { name: 'Primary', className: 'text-primary', description: 'Texto principal', appliesTo: 'text' },
      { name: 'Destructive', className: 'text-destructive', description: 'Texto destrutivo', appliesTo: 'text' },
      { name: 'Success', className: 'text-success', description: 'Texto de sucesso', appliesTo: 'text' },
      { name: 'Warning', className: 'text-warning', description: 'Texto de alerta', appliesTo: 'text' },
    ],
  },
  {
    id: 'spacing',
    name: 'Spacing',
    description: 'Classes de espaçamento (padding e margin)',
    classes: [
      { name: 'Padding 2', className: 'p-2', description: 'Padding de 8px', appliesTo: 'both' },
      { name: 'Padding 4', className: 'p-4', description: 'Padding de 16px', appliesTo: 'both' },
      { name: 'Padding 6', className: 'p-6', description: 'Padding de 24px', appliesTo: 'both' },
      { name: 'Padding 8', className: 'p-8', description: 'Padding de 32px', appliesTo: 'both' },
      { name: 'Margin 2', className: 'm-2 bg-muted', description: 'Margin de 8px', appliesTo: 'both' },
      { name: 'Margin 4', className: 'm-4 bg-muted', description: 'Margin de 16px', appliesTo: 'both' },
      { name: 'Gap 2', className: 'flex gap-2', description: 'Gap de 8px em flex', appliesTo: 'both' },
      { name: 'Gap 4', className: 'flex gap-4', description: 'Gap de 16px em flex', appliesTo: 'both' },
    ],
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Classes de tipografia',
    classes: [
      { name: 'Heading XL', className: 'text-4xl font-bold', description: 'Título extra grande', appliesTo: 'text' },
      { name: 'Heading Large', className: 'text-3xl font-bold', description: 'Título grande', appliesTo: 'text' },
      { name: 'Heading Medium', className: 'text-2xl font-semibold', description: 'Título médio', appliesTo: 'text' },
      { name: 'Heading Small', className: 'text-xl font-semibold', description: 'Título pequeno', appliesTo: 'text' },
      { name: 'Body Large', className: 'text-lg', description: 'Corpo grande', appliesTo: 'text' },
      { name: 'Body', className: 'text-base', description: 'Corpo padrão', appliesTo: 'text' },
      { name: 'Body Small', className: 'text-sm', description: 'Corpo pequeno', appliesTo: 'text' },
      { name: 'Caption', className: 'text-xs text-muted-foreground', description: 'Legenda', appliesTo: 'text' },
    ],
  },
  {
    id: 'borders',
    name: 'Borders & Radius',
    description: 'Classes de borda e raio',
    classes: [
      { name: 'Border', className: 'border border-border', description: 'Borda padrão', appliesTo: 'border' },
      { name: 'Border 2', className: 'border-2 border-border', description: 'Borda 2px', appliesTo: 'border' },
      { name: 'Border Primary', className: 'border-2 border-primary', description: 'Borda primária', appliesTo: 'border' },
      { name: 'Rounded SM', className: 'rounded-sm border border-border', description: 'Raio pequeno', appliesTo: 'border' },
      { name: 'Rounded', className: 'rounded border border-border', description: 'Raio padrão', appliesTo: 'border' },
      { name: 'Rounded MD', className: 'rounded-md border border-border', description: 'Raio médio', appliesTo: 'border' },
      { name: 'Rounded LG', className: 'rounded-lg border border-border', description: 'Raio grande', appliesTo: 'border' },
      { name: 'Rounded Full', className: 'rounded-full border border-border', description: 'Raio completo', appliesTo: 'border' },
    ],
  },
  {
    id: 'shadows',
    name: 'Shadows',
    description: 'Classes de sombra',
    classes: [
      { name: 'Shadow SM', className: 'shadow-sm', description: 'Sombra pequena', appliesTo: 'both' },
      { name: 'Shadow', className: 'shadow', description: 'Sombra padrão', appliesTo: 'both' },
      { name: 'Shadow MD', className: 'shadow-md', description: 'Sombra média', appliesTo: 'both' },
      { name: 'Shadow LG', className: 'shadow-lg', description: 'Sombra grande', appliesTo: 'both' },
      { name: 'Shadow XL', className: 'shadow-xl', description: 'Sombra extra grande', appliesTo: 'both' },
    ],
  },
];
