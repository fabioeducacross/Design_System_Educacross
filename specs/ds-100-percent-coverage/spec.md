# Especificação: 100% Component Coverage

## 1. Contexto

**Problema:** O Design System Educacross (@fabioeducacross/ui v0.3.0) possui apenas 28 componentes base, cobrindo 6% dos 138 componentes identificados no Frontoffice. Esta cobertura insuficiente força desenvolvedores a:
- Reimplementar componentes específicos (QuestionCard, Mission, Charts) em cada projeto
- Duplicar código de negócio que poderia ser abstraído em UI
- Manter inconsistências visuais entre aplicações
- Perder velocidade de desenvolvimento

**Oportunidade:** Expandir para 119 componentes (138 Frontoffice - 27 app-specific + 8 gaps) distribuídos em 4 pacotes NPM especializados, alcançando 100% de cobertura reutilizável.

**Escopo:** Este projeto abrange:
- ✅ 36 componentes base (`@fabioeducacross/ui`) com multi-framework (React + Vue 2/3)
- ✅ 53 componentes educacionais (`@fabioeducacross/ui-education`): Questions, Missions, Assessment
- ✅ 16 componentes de gráficos (`@fabioeducacross/ui-charts`): ApexCharts, ECharts, Progress
- ✅ 9 componentes PDF (`@fabioeducacross/ui-pdf`): Certificates, Reports, Export
- ✅ 5 componentes misc (`@fabioeducacross/ui`): Timeline, AutoSuggest, FilterPanel, MediaCard, TabRouter

**Fora de Escopo:**
- ❌ 27 componentes app-specific (DashboardLayout, StudentProfile, CourseDetail, etc.)
- ❌ Backend/API integration components
- ❌ State management libraries (Redux, Zustand)
- ❌ Roteamento/navegação (React Router, Vue Router)

---

## 2. User Stories

### US1: Desenvolvedor Consome Design System Multi-Framework
**Como** desenvolvedor frontend (React/Vue)  
**Quero** instalar e usar componentes do DS em qualquer stack  
**Para** manter consistência visual sem reescrever componentes

**Acceptance Criteria:**
- [ ] Pacote `@fabioeducacross/ui` publicado no npm com 36 componentes
- [ ] README com instruções para React, Vue 2 (Bootstrap), Vue 3
- [ ] TypeScript types exportados para todos componentes
- [ ] Storybook com código React + Vue 2 + Vue 3 para cada componente
- [ ] Cada componente tem `asChild` prop (Radix Slot pattern)
- [ ] Peer dependencies claramente documentadas (react ^18.0.0, vue ^3.4.0)

---

### US2: Desenvolvedor Visualiza Exemplos Multi-Framework no Storybook
**Como** desenvolvedor  
**Quero** ver código React, Vue 2 e Vue 3 lado a lado no Storybook  
**Para** copiar/colar direto no meu projeto sem traduzir sintaxe

**Acceptance Criteria:**
- [ ] Custom addon "Código Multi-Framework" com 3 abas (React, Vue 2, Vue 3)
- [ ] Syntax highlighting com tema vscDarkPlus
- [ ] Botão copy-to-clipboard funcional
- [ ] Código Vue 2 usa Bootstrap classes (funcional)
- [ ] Código Vue 3 mostra API futura com `@fabioeducacross/ui-vue3` (conceptual)
- [ ] Todos 119 componentes possuem multiFrameworkCode parameter

---

### US3: Professor Cria Questões com Componentes Especializados
**Como** desenvolvedor de plataforma educacional  
**Quero** usar componentes prontos para 11 tipos de questão  
**Para** criar atividades sem reimplementar UI complexa

**Acceptance Criteria:**
- [ ] Pacote `@fabioeducacross/ui-education` com 53 componentes
- [ ] 11 templates de questão: MultipleChoice, TrueFalse, FillBlanks, Matching, Ordering, Essay, DragDrop, Canvas, Hotspot, Audio, Video
- [ ] Cada template com 3-4 variantes (Default, WithImage, WithFeedback, WithHints)
- [ ] Props padronizadas: `question`, `options`, `correctAnswer`, `onSubmit`, `feedback`
- [ ] Validação built-in com feedback visual (correct/incorrect states)
- [ ] Accessibility: keyboard navigation, screen reader support

---

### US4: Desenvolvedor Renderiza Gráficos Interativos
**Como** desenvolvedor de dashboards  
**Quero** componentes de gráficos prontos (ApexCharts, ECharts)  
**Para** exibir analytics sem configurar bibliotecas complexas

**Acceptance Criteria:**
- [ ] Pacote `@fabioeducacross/ui-charts` com 16 componentes
- [ ] ApexCharts wrappers: LineChart, BarChart, AreaChart, PieChart, DonutChart, RadarChart (6)
- [ ] ECharts wrappers: HeatMap, TreeMap, Sankey, Funnel, Gauge (5)
- [ ] Progress components: CircularProgress, LinearProgress, StepProgress, RadialProgress, AnimatedProgress (5)
- [ ] Props padronizadas: `data`, `config`, `loading`, `error`, `onInteraction`
- [ ] Responsive por padrão (mobile-first)
- [ ] Dark mode support via CSS variables

---

### US5: Desenvolvedor Exporta Certificados e Relatórios em PDF
**Como** desenvolvedor de plataforma  
**Quero** gerar PDFs de certificados e relatórios com layout pronto  
**Para** oferecer downloads sem backend processing

**Acceptance Criteria:**
- [ ] Pacote `@fabioeducacross/ui-pdf` com 9 componentes
- [ ] CertificateTemplate (3 variantes: Modern, Classic, Minimal)
- [ ] ReportTemplate (3 variantes: Simple, Detailed, Executive)
- [ ] ReportCoverPage, ReportSection, ReportChart
- [ ] `exportToPDF()` helper com jsPDF + html2canvas
- [ ] Props: `data`, `layout`, `orientation`, `fileName`, `onExport`
- [ ] Preview mode antes do download

---

### US6: Time de Design Mantém Tokens CSS Consistentes
**Como** designer ou desenvolvedor  
**Quero** tokens CSS centralizados (cores, spacing, tipografia)  
**Para** garantir consistência visual entre todos componentes

**Acceptance Criteria:**
- [ ] Arquivo `packages/ui/src/styles.css` com todas CSS custom properties
- [ ] Tokens HSL para cores: `--primary`, `--secondary`, `--destructive`, etc.
- [ ] Spacing scale: 0.5rem a 4rem (8px a 64px)
- [ ] Typography scale: text-xs a text-5xl
- [ ] Dark mode automático via classe `.dark` no root
- [ ] Documentação no Storybook: Colors.stories.tsx, Spacing.stories.tsx, Typography.stories.tsx

---

### US7: Desenvolvedor Usa CVA para Variantes
**Como** desenvolvedor  
**Quero** componentes com variantes type-safe (variant, size)  
**Para** evitar classes Tailwind hard-coded e ter autocomplete

**Acceptance Criteria:**
- [ ] Todos componentes usam `class-variance-authority`
- [ ] Padrão: `buttonVariants = cva(baseClasses, { variants, defaultVariants })`
- [ ] Exports: `{ Button, buttonVariants, type ButtonProps }`
- [ ] Props derivadas de `VariantProps<typeof buttonVariants>`
- [ ] `cn()` utility para merge de classes (clsx + tailwind-merge)

---

### US8: Desenvolvedor Contribui Seguindo Padrões
**Como** contribuidor open-source  
**Quero** documentação clara de estrutura e padrões  
**Para** adicionar componentes sem quebrar consistência

**Acceptance Criteria:**
- [ ] `CONTRIBUTING.md` com guidelines atualizados para 4 pacotes
- [ ] `.github/copilot-instructions.md` com padrões CVA, forwardRef, displayName
- [ ] Template de componente: `ComponentName/ComponentName.tsx` + `index.ts`
- [ ] Checklist: CVA ✅, forwardRef ✅, displayName ✅, a11y ✅, tests ✅, stories ✅
- [ ] Conventional Commits enforced (feat, fix, docs, chore)

---

### US9: CI/CD Valida Qualidade e Publica Pacotes
**Como** maintainer  
**Quero** pipeline automatizado de build, test, lint, deploy  
**Para** garantir qualidade antes de publicar no npm

**Acceptance Criteria:**
- [ ] GitHub Actions: lint, typecheck, test, build em paralelo
- [ ] Turborepo cache para builds incrementais (<3min total)
- [ ] Chromatic deploy automático em PRs (280+ snapshots)
- [ ] Changesets para versionamento semântico
- [ ] Publish automático para npm em merge na main
- [ ] Badge de status no README: build ✅, coverage ✅, npm version

---

### US10: Desenvolvedor Migra de Vue 2 para Vue 3
**Como** desenvolvedor em migração  
**Quero** tabela de mapeamento de props React → Vue 2 → Vue 3  
**Para** converter componentes sem consultar docs de cada framework

**Acceptance Criteria:**
- [ ] Arquivo `specs/ds-100-percent-coverage/quickstart.md` com tabela completa
- [ ] Exemplo: React `variant="default"` → Vue 2 `class="btn-primary"` → Vue 3 `:variant="'primary'"`
- [ ] Props comuns mapeadas: variant, size, disabled, loading, onClick/click
- [ ] Event handlers: React `onChange` → Vue 2 `@change` → Vue 3 `@update:modelValue`
- [ ] Troubleshooting section com erros comuns

---

## 3. Requisitos Funcionais

### RF1: Componentes Base (36 total)
**Implementar 28 componentes existentes + 8 gaps com multi-framework support.**

**Detalhes:**
- **Existentes (28):** Accordion, Alert, Avatar, Badge, Button, Card, Checkbox, Dialog, DropdownMenu, Input, Label, Pagination, Popover, Radio, Select, Skeleton, Table, Tabs, Toast, Tooltip, Typography, FormField, DataTable, Divider*, Progress*, Timeline*, ScrollToTop*, AutoSuggest*
- **Gaps (8):** Divider, Progress, Timeline, ScrollToTop, AutoSuggest, FilterPanel, MediaCard, TabRouter
- **Variantes por componente:** Média de 3-4 variantes (e.g., Button: default, destructive, outline, ghost)
- **Multi-framework:** Cada componente exporta código React + Vue 2 Bootstrap + Vue 3 API

---

### RF2: Componentes Educacionais (53 total)
**Criar pacote @fabioeducacross/ui-education com 11 templates de questão × 3-4 variantes.**

**Templates (11):**
1. **MultipleChoice** (4 variantes): Default, WithImage, SingleColumn, MultiColumn
2. **TrueFalse** (3 variantes): Default, WithImage, WithExplanation
3. **FillBlanks** (3 variantes): Default, Inline, Dropdown
4. **Matching** (3 variantes): Default, DragDrop, Grid
5. **Ordering** (3 variantes): Default, DragDrop, Numbered
6. **Essay** (4 variantes): ShortAnswer, LongAnswer, RichText, WithWordCount
7. **DragDrop** (4 variantes): Default, Grid, Zones, Sorting
8. **Canvas** (3 variantes): FreeDrawing, ShapeSelection, ImageAnnotation
9. **Hotspot** (3 variantes): ImageClick, AreaSelection, MultipleHotspots
10. **Audio** (4 variantes): SingleAudio, MultipleAudio, Dictation, Pronunciation
11. **Video** (4 variantes): SingleVideo, MultipleVideo, Timeline, Interactive

**Total:** 11 templates × ~3.5 avg = ~38 question components + 15 support components (QuestionHeader, FeedbackPanel, HintButton, TimerDisplay, etc.)

---

### RF3: Componentes de Gráficos (16 total)
**Criar pacote @fabioeducacross/ui-charts com wrappers ApexCharts + ECharts + Progress.**

**ApexCharts (6):** LineChart, BarChart, AreaChart, PieChart, DonutChart, RadarChart  
**ECharts (5):** HeatMap, TreeMap, Sankey, Funnel, Gauge  
**Progress (5):** CircularProgress, LinearProgress, StepProgress, RadialProgress, AnimatedProgress

**Features:**
- Responsive by default (containerWidth: "100%")
- Dark mode via `theme` prop (light | dark | auto)
- Loading state com skeleton
- Error boundary para falhas de renderização
- Props: `data`, `config`, `loading`, `error`, `onInteraction`

---

### RF4: Componentes PDF (9 total)
**Criar pacote @fabioeducacross/ui-pdf para geração de certificados e relatórios.**

**Componentes (9):**
1. CertificateModern
2. CertificateClassic
3. CertificateMinimal
4. ReportSimple
5. ReportDetailed
6. ReportExecutive
7. ReportCoverPage
8. ReportSection
9. ReportChart

**Features:**
- `exportToPDF(element, options)` helper
- Preview mode antes do download
- Orientation: portrait | landscape
- Paper size: A4, Letter, Legal
- Custom fonts via jsPDF addFont

---

### RF5: Custom Storybook Addon - Multi-Framework Code
**Addon com 3 abas (React, Vue 2, Vue 3) para exibir código lado a lado.**

**Implementação:**
- Localização: `apps/storybook/.storybook/addons/multi-framework-code/`
- Arquivos: `register.tsx`, `Panel.tsx`, `types.ts`, `constants.ts`
- API: `useStorybookApi()` + `api.getData(storyId)` (Storybook 10)
- Syntax highlighting: `react-syntax-highlighter` com `vscDarkPlus`
- Copy button: `navigator.clipboard.writeText(code)`
- Parameter: `parameters.multiFrameworkCode = { react, vue2, vue3 }`

**Status:**
- ✅ Addon implementado e funcional (localhost:6006 + Chromatic Build #15)
- ⏳ Aplicar a todos 119 componentes (4 de 443 tasks completas)

---

### RF6: Monorepo com Turborepo
**Gerenciar 4 pacotes com build, lint, test, publish orquestrados.**

**Estrutura:**
```
packages/
  ui/                    # @fabioeducacross/ui (36 componentes)
  ui-education/          # @fabioeducacross/ui-education (53 componentes)
  ui-charts/             # @fabioeducacross/ui-charts (16 componentes)
  ui-pdf/                # @fabioeducacross/ui-pdf (9 componentes)
apps/
  storybook/             # Documentação unificada (400+ stories)
```

**Turborepo config (`turbo.json`):**
```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "lint": {},
    "test": {},
    "dev": { "cache": false }
  }
}
```

---

### RF7: Publicação NPM Automatizada
**Changesets para versionamento + GitHub Actions para publish.**

**Workflow:**
1. Developer cria PR com changeset (`pnpm changeset`)
2. CI valida: lint, test, build
3. Merge na main → Changesets bot cria "Version PR"
4. Merge Version PR → Publish automático no npm
5. Tags Git criadas automaticamente (v0.4.0, ui-education@0.1.0, etc.)

---

## 4. Requisitos Não-Funcionais

### NFR1: Performance
**Build Time:** Total <3 minutos para 4 pacotes em paralelo via Turborepo  
**Bundle Size:**
- `@fabioeducacross/ui`: <150KB gzipped
- `@fabioeducacross/ui-education`: <200KB gzipped
- `@fabioeducacross/ui-charts`: <180KB gzipped (sem peer deps)
- `@fabioeducacross/ui-pdf`: <120KB gzipped

**Storybook Load:** <5s para 400+ stories (lazy loading via code splitting)

---

### NFR2: Acessibilidade (A11y)
**WCAG 2.1 Level AA compliance para todos componentes.**

**Requisitos:**
- ✅ Focus visible: `focus-visible:ring-2 focus-visible:ring-ring`
- ✅ Keyboard navigation: Enter, Space, Arrow keys, Escape
- ✅ ARIA attributes: `aria-label`, `aria-describedby`, `aria-expanded`, `role`
- ✅ Screen reader support: Testado com NVDA (Windows) e VoiceOver (macOS)
- ✅ Color contrast: Mínimo 4.5:1 para texto, 3:1 para componentes
- ✅ Disabled states: `disabled:pointer-events-none disabled:opacity-50`

---

### NFR3: Compatibilidade
**Browser Support:**
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+

**Framework Versions:**
- React: ^18.0.0 (official)
- Vue 2: 2.7.x (Bootstrap-based, conceptual)
- Vue 3: ^3.4.0 (planned API, conceptual)

**Node.js:** v20.x+ (LTS)

---

### NFR4: Manutenibilidade
**Code Standards:**
- TypeScript 5.7+ strict mode
- ESLint + Prettier enforced
- Conventional Commits (feat, fix, docs, chore)
- 100% TypeScript coverage (no .js files)

**Testing:**
- Unit tests: Vitest (80%+ coverage target)
- Visual regression: Chromatic (100% coverage)
- A11y tests: axe-core in Storybook

---

### NFR5: Documentação
**Storybook:**
- 400+ stories (119 componentes × ~3.5 variantes avg)
- Tags: `["autodocs"]` para todos componentes
- Play functions para testes de interação
- Multi-framework code para todos

**Docs Adicionais:**
- README.md por pacote
- USAGE.md com quickstart
- CONTRIBUTING.md atualizado
- Architecture.md com diagramas

---

## 5. Edge Cases & Constraints

### EC1: Vue 2 Bootstrap é Funcional, Vue 3 é Conceptual
**Situação:** Código Vue 2 usa classes Bootstrap (`btn-primary`) que funcionam se Bootstrap estiver no projeto. Código Vue 3 mostra API futura (`@fabioeducacross/ui-vue3`) que não existe.

**Tratamento:**
- Vue 2: Adicionar disclaimer "Requer Bootstrap CSS"
- Vue 3: Adicionar disclaimer "Pacote em desenvolvimento - API conceptual"
- Documentar no Storybook: "Apenas React é oficialmente suportado"

---

### EC2: 27 Componentes App-Specific Ficam Fora
**Situação:** DashboardLayout, StudentProfile, CourseDetail, etc. são específicos do Frontoffice e não devem ir para o DS.

**Tratamento:**
- Documentar no research.md a análise de quais componentes ficam fora
- Criar diagrama de decisão: "Componente é 100% UI? → DS. Tem lógica de negócio? → App"
- Atualizar COMPONENT_MAPPING.md com coluna "Destino" (DS | App | N/A)

---

### EC3: Peer Dependencies de Charts e PDF
**Situação:** ApexCharts (330KB) e jsPDF (200KB) são pesados para incluir como dependencies diretas.

**Tratamento:**
- Marcar como `peerDependencies` no package.json
- Documentar instalação explícita: `pnpm add apexcharts react-apexcharts`
- Adicionar peer dependency warnings no install
- Criar checklist no README: "Instale peer deps antes de usar"

---

### EC4: Build Time Creep
**Situação:** 119 componentes podem ultrapassar meta de 3min se não otimizados.

**Tratamento:**
- Turborepo cache habilitado (`.turbo/cache`)
- Parallel builds: `pnpm build --parallel`
- Skip unchanged packages: Turborepo detecta automaticamente
- CI cache: GitHub Actions cache de `node_modules` e `.turbo`

---

### EC5: Storybook com 400+ Stories
**Situação:** Carregar 400 stories pode deixar Storybook lento.

**Tratamento:**
- Code splitting automático (Vite lazy load)
- Story indexing: `storyStoreV7` habilitado
- Lazy loading de addons pesados (a11y, interactions)
- Build otimizado: `pnpm build-storybook` gera static files

---

### EC6: TypeScript Strict Mode em 119 Componentes
**Situação:** Manter types consistentes em 119 componentes é desafiador.

**Tratamento:**
- Shared types: `packages/ui/src/types/common.ts` com BaseComponentProps
- CVA types: `VariantProps<typeof componentVariants>` automático
- Linting: `@typescript-eslint/strict` enforced no ESLint
- CI: `pnpm typecheck` bloqueia merge se houver erros

---

## 6. Definições & Glossário

| Termo | Definição |
|-------|-----------|
| **Multi-framework** | Código React (oficial) + Vue 2 Bootstrap (funcional) + Vue 3 (conceptual API) |
| **CVA** | `class-variance-authority` - biblioteca para variantes type-safe |
| **Tokens CSS** | CSS custom properties (--primary, --spacing-4) definidas em styles.css |
| **App-specific** | Componente com lógica de negócio (ex: DashboardLayout) que não vai para DS |
| **Gap components** | 8 componentes faltando no DS: Divider, Progress, Timeline, etc. |
| **Peer dependency** | Biblioteca que o usuário deve instalar manualmente (ApexCharts, jsPDF) |
| **Changesets** | Sistema de versionamento semântico para monorepos |
| **Story** | Exemplo de uso de componente no Storybook (Default, Disabled, Loading, etc.) |
| **Play function** | Teste de interação no Storybook (cliques, inputs, navegação) |
| **Visual regression** | Comparação de screenshots no Chromatic para detectar mudanças visuais |

---

## 7. Acceptance Criteria (Geral)

✅ **Documentação Completa:**
- [ ] spec.md (este arquivo)
- [ ] research.md (análise + decisões técnicas)
- [ ] data-model.md (taxonomia + dependencies)
- [ ] quickstart.md (React → Vue prop mapping)
- [ ] plan.md (já existe)
- [ ] tasks.md (já existe)

✅ **Implementação:**
- [ ] 119 componentes implementados (36 base + 53 education + 16 charts + 9 pdf + 5 misc)
- [ ] 4 pacotes publicados no npm (@fabioeducacross/ui, ui-education, ui-charts, ui-pdf)
- [ ] 400+ stories no Storybook com multi-framework code
- [ ] Custom addon funcional em produção

✅ **Qualidade:**
- [ ] 80%+ test coverage (Vitest)
- [ ] 100% TypeScript coverage
- [ ] 0 linting errors (ESLint + Prettier)
- [ ] WCAG 2.1 AA compliance (axe-core)
- [ ] 100% visual regression coverage (Chromatic)

✅ **Performance:**
- [ ] Build <3min (Turborepo parallel)
- [ ] Bundle sizes dentro das metas (<150KB, <200KB, <180KB, <120KB)
- [ ] Storybook load <5s

✅ **CI/CD:**
- [ ] GitHub Actions: lint, test, build, deploy
- [ ] Changesets automático para versioning
- [ ] Chromatic deploy em PRs
- [ ] npm publish automático em merge

---

## 8. Success Metrics

| Métrica | Target | Atual | Status |
|---------|--------|-------|--------|
| Componentes implementados | 119 | 28 | 🔴 24% |
| Pacotes publicados | 4 | 1 | 🔴 25% |
| Stories criadas | 400+ | 280 | 🟡 70% |
| Multi-framework coverage | 100% | 4/119 | 🔴 3% |
| Build time | <3min | ~2min | 🟢 ✅ |
| Test coverage | 80%+ | 45% | 🟡 56% |
| Bundle size @fabioeducacross/ui | <150KB | 128KB | 🟢 ✅ |

---

## 9. Dependencies & Blockers

**Blocked By:**
- ❌ Nenhum bloqueador externo (decisão interna de priorização)

**Blocks:**
- 🔴 **CRÍTICO:** T006-T443 (439 tasks) bloqueadas até spec.md ser aprovado (Principle I: Spec-First)

**External Dependencies:**
- Radix UI v1.x (estável)
- ApexCharts 3.x (peer dep)
- ECharts 5.x (peer dep)
- jsPDF 2.x (peer dep)
- html2canvas 1.x (peer dep)

---

## 10. Next Steps

1. ✅ **Aprovação desta spec.md** (você aprovou Option B)
2. ⏳ **Criar research.md** (análise detalhada COMPONENT_MAPPING.md)
3. ⏳ **Criar data-model.md** (taxonomia + dependency diagram)
4. ⏳ **Criar quickstart.md** (prop mapping React → Vue)
5. ⏳ **Resolver ambiguidades em plan.md** (4 items)
6. ⏳ **Resolver underspecifications** (5 items)
7. 🚀 **Retomar implementação T006+** (Input Password multi-framework)

---

**Status:** ✅ APPROVED (Option B - Full Compliance)  
**Próximo Artefato:** research.md  
**Estimativa Restante:** 3h (research 1.5h + data-model 1h + quickstart 0.5h)
