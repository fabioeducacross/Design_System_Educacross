# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Fixed
- **Storybook Dependencies**: Alinhadas todas as versões do Storybook para 10.2.0, removido @storybook/addon-interactions conflitante para resolver erros de inicialização.
- **Avatar Images**: Corrigidas referências a imagens inexistentes (user1.jpg, user2.jpg, user.jpg) em Avatar.stories.tsx, substituídas por /logo-educacross.svg para evitar imagens quebradas.
- **MediaCard Images**: Corrigidas referências a "image.jpg" inexistente em MediaCard.stories.tsx, substituídas por /logo-educacross.svg.

### Added
- **Multi-Framework Code Examples**: Todas as 241 stories agora incluem exemplos de código para:
  - React 18+ com TypeScript e hooks (useState, useEffect, controlled components)
  - Vue 2 + Bootstrap 5 (data-bs-* attributes, v-if/v-for, methods, data() return)
  - Vue 3 Composition API com EdComponents (ref(), computed(), @update patterns)
- `DataTableStates` - 10 stories para empty states e loading skeletons
  - NoData, NoResults, Error, CustomContent, WithSecondaryAction
  - LoadingDefault, LoadingComplete, LoadingCompact, LoadingTall, StateTransition
- **Player** - Componente de áudio com 7 stories
  - Controles nativos, título ReactNode, download, autoplay, loop
- **9 Componentes Frontoffice** - ChartDefault, ChartBar, ChartPie, ChartRadialBar, RangeProgressBar, ProgressStat, RainbowProgressBar, LegendCard, LegendEnum
  - Integração com ApexCharts 4.0 e react-apexcharts 1.9
- **Storybook UI Improvements** - Interface visual completamente renovada
  - Tema light modernizado com palette #FAFAFA, contraste otimizado (#111827)
  - Tema dark elegante com background #0B0F19 e primary lighter #9388F7
  - custom-styles.css com 250+ linhas de melhorias visuais
    - Sidebar com hover/selected states suaves (transform, gradient, border-left)
    - Docs page com títulos gradient, H2 com border-bottom, spacing hierárquico
    - Code blocks estilizados (border-radius 12px, background dark, box-shadow)
    - Inline code com background primary alpha 8% e cor #7367F0
    - Scrollbar customizada (8px width, hover interativo, cores light/dark)
    - Search input com focus state primary, border-radius 8px
    - Tables, badges, controls panel com visual clean e moderno
    - Animations fadeIn (0.3s ease-out) em elementos .sbdocs
  - Loading screen com gradient primary (#7367F0 → #9388F7)
  - Critical CSS inline para evitar flash of unstyled content
  - Microinterações com cubic-bezier transitions
  - Documentação completa em docs/STORYBOOK_UI_IMPROVEMENTS.md

### Changed
- Storybook atualizado para v10.1.11 com suporte a `multiFrameworkCode` no parameters
- Todas stories agora exibem 3 abas de código (React/Vue 2/Vue 3) na documentação
- Componentes LOW priority completos: Card (3), Alert (4), Toast (3), Tooltip (3), Header (3), Logo (3)
- **TypeScript Strict Types**: Eliminados todos os 26 warnings de `@typescript-eslint/no-explicit-any`
  - types/common.ts e types/utils.ts: Funções genéricas com `unknown[]` ao invés de `any[]`
  - DataTable helpers: Tipado `Row<TData>` importado de @tanstack/react-table
  - CustomIcon: Tipado `React.ForwardedRef<HTMLImageElement>` e props específicas
  - ChartBar: Tipado formatter com `opts?: { dataPointIndex?: number }`
  - Testes: Interfaces completas `Manifest`, `Tokens`, `ManifestComponent` com todas as propriedades
- **Storybook Themes**: theme.ts e educacross-theme-dark.ts redesenhados com palette moderna
  - Primary vibrante (#7367F0 light, #9388F7 dark)
  - Success green (#10B981 light, #34D399 dark)
  - Border-radius consistente (8px inputs, 12px containers)
  - Contraste AAA mantido em ambos os modos

### Fixed
- Correções de sintaxe em AvatarIcon, Badge e DataTableStates stories
- Resolução de erros de parse em hot reload do Storybook
- **Build DTS**: Corrigidos erros de tipo ApexCharts no ChartBar para build passar
  - Formatter de tooltip.x agora aceita `number` conforme spec
  - Removido `yaxis.position` (propriedade inexistente em ApexYAxis)
  - Refatorado useMemo para tipagem explícita dentro da função
- **Lint**: 8 unused variables em testes corrigidos
- **Typecheck**: 12 erros de interface em testes corrigidos

## [0.1.0] - 2026-01-06

### Added

#### Branding
- `Logo` - Componente reutilizável da logo Educacross com 3 tamanhos (sm, default, lg)
- `AvatarIcon` - Ícone Educacross para usar em avatares quando não há foto do usuário
- `Header` - Componente de cabeçalho com menu, logo e perfil do usuário com avatar
- Integração de assets SVG no sistema de build (tsup + cópia para dist)
- Suporte TypeScript para importação de SVGs e imagens

#### Infrastructure
- Setup inicial do monorepo com pnpm 9.15.0 + Turborepo 2.7.2
- Pacote `@educacross/ui` publicável (ESM + CJS + DTS)
- Tailwind preset com sistema de tokens CSS
- CI/CD com GitHub Actions (lint, typecheck, build, test)
- Storybook 8.4 com addons: Docs, Controls, Actions, Viewport, A11y, Interactions, Themes
- Bundling de assets estáticos (SVG/imagens) no pacote npm

#### Components P1 (Core)
- `Button` - 6 variantes (default, secondary, destructive, outline, ghost, link), 4 tamanhos, loading state
- `Input` - variantes default/error, 3 tamanhos, estados completos
- `Label` - variantes de estilo, indicador de obrigatório

#### Components P2 (Data Display)
- `Card` - container flexível com Header, Content, Footer, Title, Description
- `Badge` - 4 variantes (default, secondary, destructive, outline)
- `Avatar` - imagem com fallback, 4 tamanhos
- `Checkbox` - estados checked/indeterminate, variantes, label integrado
- `Radio` - RadioGroup com controle de estado
- `Select` - dropdown nativo com variantes e estados
- `Dialog` - modal acessível com overlay, trigger, close
- `Alert` - 4 variantes para feedback (default, destructive, success, warning)
- `Toast` - notificações temporárias com auto-dismiss

#### Components P3 (Advanced)
- `Tabs` - navegação em abas com TabsList, TabsTrigger, TabsContent
- `Accordion` - single/multiple com animações
- `Tooltip` - dicas contextuais com delay configurável
- `DropdownMenu` - menu de ações com submenus e separadores
- `Popover` - conteúdo flutuante posicionável
- `Table` - componentes Table, TableHeader, TableBody, TableRow, TableCell, etc.
- `Pagination` - navegação de páginas com links e botões
- `Skeleton` - loading placeholders com variantes

#### Icons
- Integração com Feather Icons via react-feather
- Componente `Icon` com 4 tamanhos e variantes de cor
- Categorização de ícones para fácil descoberta

#### Documentation
- Stories com autodocs para todos os 21 componentes
- Foundations: Colors, Typography, Spacing, Icons
- Guidelines: Accessibility, States
- Patterns: FormField (composição Label + Input)

### Fixed
- Erros de lint `no-empty-object-type` em interfaces vazias
- Erros `no-unused-vars` com prefixo underscore
- Erros `no-constant-binary-expression` em testes
- Path do lint script no Storybook
- Configuração ESLint para permitir hooks em stories
- Warning `exhaustive-deps` no Accordion com useMemo

### Changed
- Warnings `no-explicit-any` resolvidos com tipos corretos
- Warnings `react-refresh/only-export-components` desabilitados para biblioteca
- Configuração `type: module` adicionada ao package.json raiz

### Tests
- 520 testes unitários cobrindo todos os componentes (94% cobertura)
- Testes para AvatarIcon (11), Logo (11), Header (18)
- Testes para Accordion (13), Avatar (17), DropdownMenu (21), Icon (29)
- Testes para Pagination (17), Popover (15), Tabs (12), Tooltip (13)
- Testes para Badge (16), Card (25), Skeleton (30), Table (29)
- Play functions em 6 stories: Dialog, Toast, Select, Accordion, Tabs, DropdownMenu

## [Unreleased]

### Added
- (próximas features)

---

## Convenções de Versionamento

- **MAJOR** (1.0.0): Breaking changes na API pública
- **MINOR** (0.1.0): Novas features retrocompatíveis
- **PATCH** (0.0.1): Bug fixes retrocompatíveis

## Tipos de Mudança

- `Added` - Novas features
- `Changed` - Mudanças em features existentes
- `Deprecated` - Features que serão removidas
- `Removed` - Features removidas
- `Fixed` - Bug fixes
- `Security` - Correções de vulnerabilidades
