# CSS Explorer - Documentação

## Visão Geral

O **CSS Explorer** é uma ferramenta interativa no Storybook que permite explorar todos os tokens CSS e classes Tailwind do Design System Educacross sem criar centenas de stories individuais.

## Localização

```
Storybook → Foundations → CSS Explorer
```

## Funcionalidades

### 1. Token Explorer

Explora todas as variáveis CSS (custom properties) disponíveis no Design System.

**Características:**
- **Leitura dinâmica**: Usa `getComputedStyle(document.documentElement)` para ler tokens diretamente do DOM
- **Filtros por prefixo**: 
  - `--color-*`: Cores (175 tokens)
  - `--font-*`: Tipografia
  - `--radius-*`: Raios de borda
  - `--padding-*`, `--gap-*`: Espaçamentos
  - `--shadow-*`: Sombras
  - `--z-*`: Z-index
- **Busca textual**: Filtra por nome ou valor do token
- **Preview visual**:
  - Swatches para cores (HSL, RGB, hex)
  - Formas para raios de borda
  - Blocos dimensionados para spacing
  - Preview de fonte para tipografia
- **Copy-to-clipboard**: Clique em qualquer token para copiar seu nome

**Exemplo de uso:**
```tsx
// Token copiado: --color-primary-500
.custom-element {
  background: var(--color-primary-500);
}
```

### 2. Class Playground

Explora classes Tailwind CSS curadas do Design System.

**Características:**
- **Manifest curado**: 50+ classes organizadas em 7 categorias
- **Preview interativo**: 
  - Card de exemplo
  - Texto longo
  - Pequenos elementos (badges, blocos, grid)
- **Snippet copiável**: Código pronto para usar
- **Categorias disponíveis**:
  1. Background Colors (8 classes)
  2. Legend Colors - Proficiência (6 classes)
  3. Text Colors (6 classes)
  4. Spacing (8 classes)
  5. Typography (8 classes)
  6. Borders & Radius (8 classes)
  7. Shadows (5 classes)

**Exemplo de uso:**
```tsx
// Selecionado: Legend Colors → Basic
<div className="bg-legend-basic text-white">
  Básico - LARANJA #ff9f43
</div>
```

## Performance

- **1 arquivo de story** (`CssExplorer.stories.tsx`)
- **3 variações**: Token Explorer, Class Playground, Combined
- **Loading assíncrono**: Tokens carregados após render inicial (100ms delay)
- **Limitação inteligente**: Máximo de 1000 propriedades CSS processadas
- **Manifest pequeno**: Classes curadas manualmente

## Validação de Tokens

### Tokens Críticos

Os seguintes tokens devem corresponder aos valores do Frontoffice:

```css
--color-primary-500: #6e63e8;  /* Roxo Educacross */
--legend-basic: #ff9f43;        /* LARANJA - não amarelo! */
--legend-proficient: #28c76f;   /* Verde */
--legend-advanced: #6e63e8;     /* Roxo */
```

### Como Validar

1. Abra o Token Explorer no Storybook
2. Filtre por "color"
3. Busque por "primary-500"
4. Verifique se o swatch exibe roxo #6e63e8
5. Clique para copiar e validar o valor

## Manutenção

### Adicionar Nova Categoria ao Class Playground

Edite `apps/storybook/stories/foundations/css-manifest.ts`:

```typescript
export const cssManifest: ClassCategory[] = [
  // ... categorias existentes
  {
    id: 'nova-categoria',
    name: 'Nova Categoria',
    description: 'Descrição da nova categoria',
    classes: [
      {
        name: 'Nome da Classe',
        className: 'class-name other-class',
        description: 'O que esta classe faz',
        appliesTo: 'both', // 'text' | 'background' | 'border' | 'both'
      },
    ],
  },
];
```

### Adicionar Novo Filtro ao Token Explorer

Edite `apps/storybook/stories/foundations/CssExplorer.stories.tsx`:

```typescript
const prefixCategories = [
  // ... filtros existentes
  { id: "novo-prefixo", name: "Novo Prefixo", icon: "🆕" },
];
```

## Notas Importantes

⚠️ **Legend-Basic é LARANJA** (#ff9f43), não amarelo! É diferente de `warning` (#ffd643).

✅ **Sem Bootstrap-Vue**: Esta story não depende de `bootstrapCompat`.

🎨 **Fonte da Verdade**: Tokens são lidos do CSS oficial (`packages/ui/src/styles.css`).

🚀 **Build Rápido**: Não afeta o tempo de build do Storybook.

## Troubleshooting

### Tokens não aparecem
- Verifique se `packages/ui/dist/styles.css` foi gerado
- Execute `pnpm --filter=@fabioeducacross/ui build`
- Limpe o cache do Storybook: `pnpm --filter=@educacross/storybook clean`

### Preview está travado
- O componente tem um timeout de 100ms para carregar
- Se demorar mais, verifique o console do navegador
- Limite de 1000 propriedades CSS pode estar sendo atingido

### Classes não aplicam corretamente
- Verifique se o Tailwind está configurado corretamente
- Confirme que as classes existem em `tailwind.config.ts`
- Use o inspector do navegador para verificar classes aplicadas

## Roadmap Futuro

- [ ] Export de tokens para JSON
- [ ] Comparação lado-a-lado (Light vs Dark)
- [ ] Histórico de tokens copiados
- [ ] Integração com Figma para validação
- [ ] Dark mode toggle dentro do explorer
