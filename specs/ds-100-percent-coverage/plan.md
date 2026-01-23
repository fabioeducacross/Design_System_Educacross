# Implementation Plan: Design System 100% Coverage

**Branch**: `ds-100-percent-coverage` | **Date**: 2026-01-23 | **Spec**: [COMPONENT_MAPPING.md](../../COMPONENT_MAPPING.md)

## Summary

Expandir o Educacross Design System de 28 componentes (20% de cobertura) para 119 componentes (100% de cobertura do que deve estar no DS), incluindo 91 novos componentes dos 138 mapeados no Frontoffice. Implementar multi-framework (React + Vue 2 + Vue 3) em todos os componentes e criar 3 novos pacotes especializados (`ui-education`, `ui-charts`, `ui-pdf`).

## Technical Context

**Language/Version**: TypeScript 5.7+, React 18+  
**Primary Dependencies**: 
- React 18, Tailwind CSS 3.4+, Radix UI
- ApexCharts 3.x, ECharts 5.x (para ui-charts)
- jsPDF 2.x, html2canvas 1.x (para ui-pdf)
- Storybook 10.1.11, Turborepo 2.3+

**Storage**: N/A (componentes stateless)  
**Testing**: Vitest, @testing-library/react, Chromatic (visual regression), Playwright (E2E)  
**Target Platform**: Web (React 18+), navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+)  
**Project Type**: Monorepo (pnpm workspaces + Turborepo)  
**Performance Goals**: 
- Build < 3 min para todos os 4 pacotes em paralelo (Turborepo) - equivale a ~45s por pacote individual
- Bundle size targets (gzipped): ui <150KB, ui-education <200KB, ui-charts <180KB, ui-pdf <120KB
- Storybook load < 5s (400+ stories com lazy loading)
- Tree-shaking efetivo (importação seletiva via ESM)

**Constraints**: 
- Acessibilidade WCAG 2.1 AA obrigatória
- Suporte a temas (light/dark)
- Zero runtime dependencies além de React/Radix
- Compatibilidade com Next.js 14+, Vite 6+

**Scale/Scope**: 
- 119 componentes finais (36 base + 53 education + 16 charts + 9 pdf + 5 misc)
- 415 stories no Storybook (119 componentes × 3.5 variants avg)
- 4 pacotes NPM (@fabioeducacross/ui, ui-education, ui-charts, ui-pdf)
- 3 frameworks: React (oficial funcional), Vue 2 Bootstrap (código funcional se Bootstrap instalado), Vue 3 (API conceptual não-funcional)

**Quality Targets**:
- Test coverage: 80%+ (Vitest unit + integration)
- Visual regression: 100% coverage (Chromatic - todas 415 stories)
- Accessibility: WCAG 2.1 AA compliance (axe-core - 0 violations)

## Constitution Check

✅ **Passes all gates:**
- Monorepo structure já existente e funcionando
- Arquitetura de componentes estabelecida (CVA + Radix UI)
- CI/CD configurado (GitHub Actions + Chromatic)
- Publicação automatizada no GitHub Packages
- Padrões de código estabelecidos (ESLint + Prettier)

## Project Structure

### Documentation (this feature)

```text
specs/ds-100-percent-coverage/
├── plan.md              # Este arquivo
├── research.md          # Análise de componentes do Frontoffice
├── quickstart.md        # Guia rápido de implementação
├── data-model.md        # Taxonomia de componentes
└── tasks.md             # Breakdown de 91 componentes
```

### Source Code (repository root)

```text
packages/
├── ui/                          # ✅ JÁ EXISTE - 28 componentes base
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   └── [21 outros...]
│   │   ├── styles.css
│   │   ├── tailwind-preset.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsup.config.ts
│
├── ui-education/                # 🆕 CRIAR - 53 componentes educacionais
│   ├── src/
│   │   ├── components/
│   │   │   ├── Question/
│   │   │   │   ├── QuestionRenderer.tsx
│   │   │   │   ├── QuestionContent.tsx
│   │   │   │   ├── QuestionAlternative.tsx
│   │   │   │   └── templates/
│   │   │   │       ├── MultipleChoice.tsx
│   │   │   │       ├── TrueFalse.tsx
│   │   │   │       ├── Matching.tsx
│   │   │   │       └── [8 outros templates...]
│   │   │   ├── Mission/
│   │   │   │   ├── MissionCard.tsx
│   │   │   │   ├── MissionDetails.tsx
│   │   │   │   ├── MissionProgress.tsx
│   │   │   │   └── [27 outros...]
│   │   │   ├── Assessment/
│   │   │   │   ├── ProficiencyMeter.tsx
│   │   │   │   ├── EvidenceReport.tsx
│   │   │   │   └── PerformanceCard.tsx
│   │   │   └── Subject/
│   │   │       ├── SubjectBadge.tsx
│   │   │       ├── SubjectSelect.tsx
│   │   │       └── DescriptorTag.tsx
│   │   └── index.ts
│   ├── package.json             # peer: @fabioeducacross/ui
│   └── tsup.config.ts
│
├── ui-charts/                   # 🆕 CRIAR - 16 componentes de gráficos
│   ├── src/
│   │   ├── components/
│   │   │   ├── ApexCharts/
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── PieChart.tsx
│   │   │   │   ├── RadialChart.tsx
│   │   │   │   └── LineChart.tsx
│   │   │   ├── ECharts/
│   │   │   │   ├── EchartBar.tsx
│   │   │   │   ├── EchartDoughnut.tsx
│   │   │   │   ├── EchartLine.tsx
│   │   │   │   ├── EchartRadar.tsx
│   │   │   │   └── EchartScatter.tsx
│   │   │   └── Progress/
│   │   │       ├── ProgressHorizontal.tsx
│   │   │       ├── ProgressVertical.tsx
│   │   │       ├── ProgressCircular.tsx
│   │   │       ├── ProgressRainbow.tsx
│   │   │       └── ProgressWithLabel.tsx
│   │   └── index.ts
│   ├── package.json             # peer: apexcharts, echarts
│   └── tsup.config.ts
│
└── ui-pdf/                      # 🆕 CRIAR - 9 componentes de PDF
    ├── src/
    │   ├── components/
    │   │   ├── PDFRoot.tsx
    │   │   ├── PDFCard.tsx
    │   │   ├── Certificate/
    │   │   │   ├── Certificate.tsx
    │   │   │   ├── CertificateList.tsx
    │   │   │   └── CertificateTemplate.tsx
    │   │   ├── Performance/
    │   │   │   ├── PerformancePDF.tsx
    │   │   │   └── PerformancePDFList.tsx
    │   │   └── Event/
    │   │       ├── EventCertificate.tsx
    │   │       └── EventPerformance.tsx
    │   └── index.ts
    ├── package.json             # peer: jspdf, html2canvas
    └── tsup.config.ts

apps/
└── storybook/                   # ✅ JÁ EXISTE - expandir para 400+ stories
    ├── stories/
    │   ├── components/          # Stories dos componentes base
    │   ├── education/           # 🆕 Stories do ui-education
    │   ├── charts/              # 🆕 Stories do ui-charts
    │   └── pdf/                 # 🆕 Stories do ui-pdf
    └── .storybook/
        └── addons/
            └── multi-framework-code/  # ✅ Addon customizado

tests/
├── visual-regression/           # 🆕 Chromatic snapshots
└── e2e/                        # 🆕 Playwright tests
```

**Structure Decision**: Escolhemos **monorepo com 4 pacotes independentes** porque:
1. Permite versionamento independente (ui-charts pode evoluir sem afetar ui-education)
2. Peer dependencies diferentes (ApexCharts vs jsPDF)
3. Builds otimizados (consumidores só instalam o que precisam)
4. Separação de domínios (base, educação, visualização, documentos)

## Complexity Tracking

| Decisão | Justificativa | Alternativa Rejeitada |
|---------|---------------|----------------------|
| 4 pacotes NPM | Domínios distintos + deps diferentes | Monolito único: forçaria instalação de ApexCharts+jsPDF em todos os projetos |
| 3 frameworks no Storybook | Suporte a bases legadas (Vue 2) + futuro (Vue 3) | Só React: não ajudaria times com código Vue existente |
| Addon customizado Storybook | UI melhor que MDX estático | MDX com code blocks: sem interatividade, dificil copiar código |
| 11 templates de questões | Requisito pedagógico (cada tipo de questão é diferente) | Template genérico: impossível cobrir regras específicas (matching, hotspot, etc) |

---

## 📊 Faseamento: 12 Semanas (3 Sprints de 4 Semanas)

### Sprint 1 (Semanas 1-4): Base Sólida + Infraestrutura

#### Semana 1-2: Completar Base Existente
**Objetivo:** 100% multi-framework nos componentes base + preencher gaps

**Entregas:**
- [ ] Multi-framework em todos os 28 componentes base (~80 stories)
  - Button ✅ (já tem)
  - Input (4 variants)
  - Select (2 variants)
  - Checkbox (3 estados)
  - Radio (2 estados)
  - Card (3 variants)
  - Alert (4 variants)
  - Badge (13 variants)
  - [+ 20 componentes restantes]

- [ ] Criar 8 componentes faltantes (gaps):
  1. Divider (horizontal + vertical)
  2. Progress (5 variants)
  3. Timeline
  4. ScrollToTop
  5. AutoSuggest
  6. FilterPanel
  7. MediaCard variants
  8. TabRouter variant

- [ ] Documentação:
  - [ ] Atualizar USAGE.md com multi-framework
  - [ ] Criar guia de mapeamento React → Vue 2 → Vue 3
  - [ ] Documentar patterns de composição

**Horas:** 80h (2 devs full-time)

#### Semana 3-4: Infraestrutura de Pacotes
**Objetivo:** Setup de monorepo com 3 novos pacotes

**Entregas:**
- [ ] Criar `packages/ui-education/`
  - [ ] package.json com peer dependencies
  - [ ] tsup.config.ts (build para ESM + CJS)
  - [ ] tsconfig.json (extends do root)
  - [ ] README.md com instalação
  - [ ] Estrutura de pastas (Question/, Mission/, Assessment/, Subject/)

- [ ] Criar `packages/ui-charts/`
  - [ ] Setup com peer deps: apexcharts, echarts
  - [ ] Wrappers tipados para ambas libs
  - [ ] Estrutura: ApexCharts/, ECharts/, Progress/

- [ ] Criar `packages/ui-pdf/`
  - [ ] Setup com peer deps: jspdf, html2canvas
  - [ ] Estrutura: Certificate/, Performance/, Event/

- [ ] Configurar build system:
  - [ ] Turbo pipeline para 4 pacotes
  - [ ] GitHub Actions: build + test + publish
  - [ ] Chromatic para todos os pacotes

- [ ] Documentação:
  - [ ] Arquitetura de pacotes (specs/ds-100-percent-coverage/data-model.md)
  - [ ] Guia de contribuição para novos pacotes

**Horas:** 40h (1 dev full-time)

---

### Sprint 2 (Semanas 5-8): Módulo Education Core

#### Semana 5-7: Sistema de Questões (40 componentes)
**Objetivo:** Renderização completa de todos os tipos de questões

**Entregas:**
- [ ] Componentes Core (5):
  - [ ] QuestionRenderer (orquestrador principal)
  - [ ] QuestionContent (HTML seguro + LaTeX)
  - [ ] QuestionAlternative (múltipla escolha, V/F, etc)
  - [ ] QuestionStatus (correto/incorreto/pendente)
  - [ ] EvaluationsHtmlContentRenderer (sanitização)

- [ ] Templates (11):
  - [ ] MultipleChoice (radio buttons)
  - [ ] TrueFalse (boolean)
  - [ ] Matching (drag & drop)
  - [ ] FillInTheBlank (inputs)
  - [ ] Essay (textarea)
  - [ ] Ordering (sortable list)
  - [ ] Matrix (tabela interativa)
  - [ ] Hotspot (clique em imagem)
  - [ ] Cloze (lacunas no texto)
  - [ ] Composite (multi-part)
  - [ ] Interactive (canvas/SVG)

- [ ] Para cada template:
  - [ ] Implementação React
  - [ ] 3-4 stories no Storybook (Default, WithImage, WithFeedback, WithHints)
  - [ ] Multi-framework (React + Vue 2 + Vue 3)
  - [ ] Testes unitários
  - [ ] Testes de acessibilidade
  - [ ] Validation rules: auto-validation para objetivas (MultipleChoice, TrueFalse), manual grading para subjetivas (Essay)
  - [ ] Responsiveness: mobile-first (breakpoints sm:640px, md:768px, lg:1024px)

- [ ] Documentação:
  - [ ] Guia de cada tipo de questão
  - [ ] Exemplos de uso real
  - [ ] API reference

**Horas:** 120h (2 devs full-time x 3 semanas)

#### Semana 8: Sistema de Missões (30 componentes)
**Objetivo:** Interface completa de missões e guias

**Entregas:**
- [ ] Componentes Base (8):
  - [ ] MissionCard
  - [ ] MissionDetails
  - [ ] MissionVisualization
  - [ ] MissionProgress
  - [ ] MissionBookDetails
  - [ ] MissionAndQuestionItem
  - [ ] GuidesLimitAlert
  - [ ] MissionStatus

- [ ] Componentes de Interação (10):
  - [ ] StudentActivityDetail
  - [ ] StudentsDetail
  - [ ] FeedbackAndSend
  - [ ] ShareGuide
  - [ ] DeleteGuide
  - [ ] CancelMission
  - [ ] ExpiredMission
  - [ ] CopyLink
  - [ ] ModalStudentActivityDetails
  - [ ] ModalStudentRoundDetails

- [ ] Multi-framework + Stories + Testes

**Horas:** 40h (2 devs full-time x 1 semana)

---

### Sprint 3 (Semanas 9-12): Módulos Especializados

#### Semana 9-10: Módulo Charts (16 componentes)
**Objetivo:** Biblioteca completa de gráficos educacionais

**Entregas:**
- [ ] ApexCharts (5 wrappers):
  - [ ] BarChart (horizontal + vertical)
  - [ ] PieChart (pie + donut)
  - [ ] RadialChart (circular progress)
  - [ ] LineChart (single + multi-series)
  - [ ] DefaultChart (configurável)

- [ ] ECharts (6 wrappers):
  - [ ] EchartBar
  - [ ] EchartDoughnut
  - [ ] EchartLine
  - [ ] EchartRadar
  - [ ] EchartScatter
  - [ ] EchartStackedArea

- [ ] Progress (5 componentes):
  - [ ] ProgressHorizontal
  - [ ] ProgressVertical
  - [ ] ProgressCircular
  - [ ] ProgressRainbow (multi-color)
  - [ ] ProgressWithLabel

- [ ] Para cada componente:
  - [ ] Props tipadas
  - [ ] Tema light/dark
  - [ ] Responsivo
  - [ ] Acessibilidade (labels, roles)
  - [ ] Stories com dados reais

**Horas:** 80h (2 devs full-time x 2 semanas)

#### Semana 11: Módulo PDF (9 componentes)
**Objetivo:** Geração de certificados e relatórios

**Entregas:**
- [ ] PDFRoot (provider + context)
- [ ] PDFCard (card genérico)
- [ ] PDFCardsList (lista de cards)
- [ ] Certificate/
  - [ ] Certificate (template base)
  - [ ] CertificateList
  - [ ] CertificateTemplate (customizável)
- [ ] Event/
  - [ ] EventCertificate
  - [ ] EventPerformance
- [ ] Performance/
  - [ ] PerformancePDF
  - [ ] PerformancePDFList

- [ ] Funcionalidades:
  - [ ] Download PDF
  - [ ] Preview antes do download
  - [ ] Customização (logo, cores, texto)
  - [ ] Multi-página
  - [ ] Assinatura digital (opcional)

**Horas:** 40h (1 dev full-time)

#### Semana 12: Finalização (22 componentes)
**Objetivo:** Componentes de proficiência, estatísticas e misc

**Entregas:**
- [ ] Proficiência (3):
  - [ ] ProficiencyMeter
  - [ ] ChangeProficiency
  - [ ] SidebarProficiencyInfo

- [ ] Matérias (4):
  - [ ] SubjectsList
  - [ ] SubjectBand
  - [ ] SubjectSelect
  - [ ] DescriptorTag

- [ ] Estatísticas (4):
  - [ ] StatisticCardHorizontal
  - [ ] StatisticCardVertical
  - [ ] StatisticCardWithAreaChart
  - [ ] StatisticCardWithLineChart

- [ ] Legendas (3):
  - [ ] LegendCard
  - [ ] LegendEnum
  - [ ] LegendBadgesReadingMeter

- [ ] Misc (8):
  - [ ] TeacherList
  - [ ] StudentEvidenceReport
  - [ ] ReadingMeterExercise
  - [ ] HelpChat
  - [ ] NPS
  - [ ] FixedStickyFooter
  - [ ] BadgeConditionalValue
  - [ ] PerformanceCell

**Horas:** 80h (2 devs full-time)

---

## 📦 Deliverables Finais

### Pacotes NPM (4)
- [ ] `@fabioeducacross/ui@0.3.0` - 36 componentes base
- [ ] `@fabioeducacross/ui-education@0.1.0` - 53 componentes educacionais
- [ ] `@fabioeducacross/ui-charts@0.1.0` - 16 componentes de gráficos
- [ ] `@fabioeducacross/ui-pdf@0.1.0` - 9 componentes de PDF

### Storybook
- [ ] 400+ stories documentadas
- [ ] Todas com multi-framework (React + Vue 2 + Vue 3)
- [ ] Exemplos de composição
- [ ] Guias de uso

### Documentação
- [ ] USAGE.md atualizado (4 pacotes)
- [ ] COMPONENT_MAPPING.md atualizado (100% coverage)
- [ ] Migration guide: Frontoffice → DS
- [ ] Pattern library
- [ ] API reference completa

### Qualidade
- [ ] 100% testes unitários
- [ ] 100% testes de acessibilidade (WCAG AA)
- [ ] Visual regression (Chromatic)
- [ ] E2E críticos (Playwright)
- [ ] Performance benchmarks

---

## 🎯 Métricas de Sucesso

| Métrica | Baseline | Meta Sprint 1 | Meta Sprint 2 | Meta Final |
|---------|----------|---------------|---------------|------------|
| **Componentes no DS** | 28 | 36 | 76 | 119 |
| **Cobertura do Frontoffice** | 20% | 26% | 55% | 100%* |
| **Stories no Storybook** | ~100 | ~150 | ~280 | 415 |
| **Multi-framework** | 1/100 | 100/150 | 100/280 | 415/415 |
| **Pacotes NPM** | 1 | 4 | 4 | 4 |
| **Build time (paralelo)** | 45s | 90s | 120s | <180s |
| **Bundle size (ui)** | 120KB | 150KB | 150KB | <150KB |
| **Bundle size (education)** | - | - | 200KB | <200KB |
| **Bundle size (charts)** | - | - | 180KB | <180KB |
| **Bundle size (pdf)** | - | - | 120KB | <120KB |
| **Test Coverage** | 45% | 60% | 75% | 80%+ |
| **Visual Regression Coverage** | 70% | 85% | 95% | 100% |

*100% = 119 componentes (138 do Frontoffice - 27 que ficam no app + 8 gaps)

**US3: Prop Mapping Table** disponível em [quickstart.md](quickstart.md) com mapeamento completo React → Vue 2 → Vue 3.

---

## ⚠️ Riscos e Mitigações

| Risco | Prob | Impacto | Mitigação |
|-------|------|---------|-----------|
| **ApexCharts/ECharts incompatíveis com React 18** | Média | Alto | Testar na Semana 3, criar wrappers com Suspense |
| **jsPDF não suporta fontes customizadas** | Baixa | Médio | Alternativa: @react-pdf/renderer |
| **11 templates de questões com lógica complexa** | Alta | Alto | AM2: Definição de "lógica complexa" = drag&drop, canvas drawing, multi-step validation, SVG interactions. Começar pelos mais simples (MultipleChoice, TrueFalse), iterar para complexos (Canvas, Hotspot) |
| **Performance com 400+ stories** | Média | Médio | Lazy loading, code splitting no Storybook |
| **Desalinhamento com Frontoffice** | Média | Alto | Sync semanal com PO, validar protótipos |
| **Vue 2 EOL (fim de 2023)** | Baixa | Baixo | Código conceitual, não precisa funcionar 100% |
| **Quebra de deps ao atualizar Storybook** | Média | Médio | Lock de versões, testes de regressão |

---

## 🚀 Ação Imediata (Hoje)

### Fase 0: Research (2h)
- [x] Análise do COMPONENT_MAPPING.md
- [x] Definição de escopo (119 componentes)
- [x] Criação deste plano

### Fase 1: Multi-Framework nos Top 5 (4h)
- [ ] Input (4 variants) → multi-framework
- [ ] Select (2 variants) → multi-framework
- [ ] Card (3 variants) → multi-framework
- [ ] Alert (4 variants) → multi-framework
- [ ] Checkbox (3 estados) → multi-framework

### Fase 2: Criar Divider + Progress (4h)
- [ ] Divider component (horizontal + vertical)
- [ ] Progress component (5 variants)
- [ ] Stories + multi-framework
- [ ] Testes unitários

**Total hoje:** 10h (1 dev pode completar Fase 1-2 em 1 dia)

---

## 📋 Próximos Documentos

Comandos a executar:
1. `/speckit.research` → gerar `specs/ds-100-percent-coverage/research.md`
2. `/speckit.design` → gerar `data-model.md` + `quickstart.md`
3. `/speckit.tasks` → gerar `tasks.md` (breakdown dos 91 componentes)

---

**Revisão:** @fabioeducacross  
**Status:** 🟢 Pronto para execução  
**Início:** 2026-01-23  
**Conclusão prevista:** 2026-04-17 (12 semanas)
