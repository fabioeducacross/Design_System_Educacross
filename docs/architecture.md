# Arquitetura de Pacotes - Educacross Design System

## Visão Geral

O Educacross Design System é organizado como um **monorepo multi-pacote** usando pnpm workspaces + Turborepo, contendo 4 pacotes NPM especializados.

## Estrutura de Pacotes

```
packages/
├── ui/                   # @fabioeducacross/ui - Componentes base
├── ui-education/         # @fabioeducacross/ui-education - Educação
├── ui-charts/            # @fabioeducacross/ui-charts - Visualizações
└── ui-pdf/               # @fabioeducacross/ui-pdf - Geração de PDFs
```

---

## 1. @fabioeducacross/ui

**Status**: ✅ Produção (v0.2.0)  
**Propósito**: Componentes base reutilizáveis do Design System

### Conteúdo
- **47 componentes React** com TypeScript
- Primitivos de UI: Button, Input, Select, Checkbox, Radio, etc.
- Componentes compostos: FormField, DataTable, Sidebar
- Tailwind CSS preset + Design tokens (CSS variables)
- Dark mode nativo
- Acessibilidade WCAG 2.1 AA

### Dependências
```json
{
  "peerDependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "dependencies": {
    "@radix-ui/*": "vários primitivos",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  }
}
```

### Instalação
```bash
pnpm add @fabioeducacross/ui
```

---

## 2. @fabioeducacross/ui-education

**Status**: 🚧 Em Desenvolvimento (v0.1.0)  
**Propósito**: Componentes especializados para plataforma educacional

### Conteúdo Planejado
- **Sistema de Questões** (40 componentes)
  - QuestionRenderer, QuestionContent, QuestionAlternative
  - 11 templates: MultipleChoice, TrueFalse, Matching, Essay, etc.
  
- **Sistema de Missões** (30 componentes)
  - MissionCard, MissionDetails, MissionProgress
  - Componentes de interação: FeedbackAndSend, ShareGuide, etc.

- **Avaliações e Disciplinas**
  - Assessment components
  - Subject components

### Dependências
```json
{
  "peerDependencies": {
    "@fabioeducacross/ui": "workspace:*",
    "react": "^18.3.0"
  },
  "dependencies": {
    "dompurify": "^3.2.3",     // Sanitização HTML
    "katex": "^0.16.11",       // LaTeX
    "marked": "^15.0.4"        // Markdown
  }
}
```

### Roadmap
- Phase 4 (T134-T208): Sistema de Questões
- Phase 5 (T209-T280): Sistema de Missões

---

## 3. @fabioeducacross/ui-charts

**Status**: 🚧 Planejado (v0.1.0)  
**Propósito**: Wrappers de bibliotecas de charts com tema Educacross

### Conteúdo Planejado
- **ApexCharts Wrappers**
  - ChartLine, ChartArea, ChartBar, ChartColumn
  - ChartPie, ChartDonut, ChartRadialBar, ChartRadar

- **ECharts Wrappers**
  - EChartLine, EChartBar, EChartScatter
  - EChartHeatmap, EChartTreeMap, EChartSunburst

- **Progress Variants**
  - RangeProgressBar, RainbowProgressBar
  - ProgressStat, CircularProgress

### Dependências
```json
{
  "peerDependencies": {
    "@fabioeducacross/ui": "workspace:*",
    "apexcharts": "^3.54.0 || ^4.0.0",
    "echarts": "^5.5.0"
  },
  "dependencies": {
    "react-apexcharts": "^1.4.1",
    "echarts-for-react": "^3.0.2"
  }
}
```

### Nota
Alguns componentes de charts básicos já existem em `@fabioeducacross/ui` (ChartDefault, ChartBar, ChartPie, ChartRadialBar). Este pacote consolidará e expandirá essas funcionalidades.

---

## 4. @fabioeducacross/ui-pdf

**Status**: 🚧 Planejado (v0.1.0)  
**Propósito**: Geração de PDFs (certificados, relatórios, etc.)

### Conteúdo Planejado
- **Certificados**
  - CertificateTemplate, CertificateModern, CertificateClassic
  - CertificateGenerator, CertificatePreview

- **Relatórios de Performance**
  - PerformanceReport, GradeReport, AttendanceReport
  - ProgressReport, ComparisonReport

- **Relatórios de Eventos**
  - EventCertificate, EventSummary, ParticipantList
  - EventSchedule, EventStats

### Dependências
```json
{
  "peerDependencies": {
    "@fabioeducacross/ui": "workspace:*",
    "jspdf": "^2.5.2",
    "html2canvas": "^1.4.1"
  }
}
```

---

## Arquitetura de Dependências

```mermaid
graph TD
    A[@fabioeducacross/ui]
    B[@fabioeducacross/ui-education]
    C[@fabioeducacross/ui-charts]
    D[@fabioeducacross/ui-pdf]
    
    B --> A
    C --> A
    D --> A
    
    E[Aplicação Final]
    E --> A
    E --> B
    E --> C
    E --> D
```

**Princípio**: Todos os pacotes especializados dependem de `@fabioeducacross/ui` como base.

---

## Build System

### Turborepo
- **Cache distribuído** para builds rápidas
- **Pipelines paralelos** para tasks independentes
- **Invalidação inteligente** baseada em mudanças

### Configuração (turbo.json)
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "cache": false
    }
  }
}
```

### Comandos
```bash
# Build todos os pacotes
pnpm build

# Build específico
pnpm --filter @fabioeducacross/ui build
pnpm --filter @fabioeducacross/ui-education build

# Dev mode com hot reload
pnpm dev

# Testes de todos os pacotes
pnpm test
```

---

## CI/CD

### GitHub Actions (.github/workflows/)

**ci.yml**: Lint, TypeCheck, Test em todos os pacotes  
**publish.yml**: Publish automático ao criar tag (v*)  
**deploy-storybook.yml**: Deploy do Storybook no GitHub Pages  
**chromatic.yml**: Visual testing com Chromatic

### Publish Strategy
1. Criar tag: `git tag v0.2.1 && git push --tags`
2. GitHub Actions:
   - Build todos os 4 pacotes
   - Commita `dist/` de cada pacote
   - Cria GitHub Release
   - Publica no NPM (se configurado)

---

## Publicação

### GitHub Packages
```bash
pnpm add github:fabioeducacross/Design_System_Educacross#v0.2.0
```

### NPM (futuro)
```bash
pnpm add @fabioeducacross/ui
pnpm add @fabioeducacross/ui-education
pnpm add @fabioeducacross/ui-charts
pnpm add @fabioeducacross/ui-pdf
```

---

## Versionamento

- **Semantic Versioning** (semver.org)
- Cada pacote tem versão independente
- Major version bump quando breaking changes
- CHANGELOG.md individual por pacote

---

## Documentação

### Storybook
- URL: https://fabioeducacross.github.io/Design_System_Educacross/
- Multi-framework code examples (React, Vue 2, Vue 3)
- 56+ stories com autodocs
- Play functions para testes de interação

### Estrutura
```
apps/storybook/stories/
├── components/       # Stories de @fabioeducacross/ui
├── education/        # Stories de @fabioeducacross/ui-education
├── charts/           # Stories de @fabioeducacross/ui-charts
├── pdf/              # Stories de @fabioeducacross/ui-pdf
├── foundations/      # Design tokens, cores, tipografia
├── patterns/         # Padrões de composição
└── examples/         # Exemplos complexos
```

---

## Próximos Passos

1. ✅ **Sprint 1**: Multi-framework + 8 componentes gap → **COMPLETO**
2. ✅ **Phase 3**: Infraestrutura de 3 novos pacotes → **COMPLETO**
3. ⏳ **Phase 4**: Sistema de Questões (T134-T208)
4. ⏳ **Phase 5**: Sistema de Missões (T209-T280)

---

Última atualização: 28 de janeiro de 2026
