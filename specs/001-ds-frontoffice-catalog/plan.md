# Implementation Plan: Design System baseado no Frontoffice

**Branch**: `001-ds-frontoffice-migration` | **Date**: 2026-01-29 | **Spec**: [spec.md](spec.md)
**Input**: Catálogo de 118 componentes Vue do Frontoffice

---

## Summary

Reformular o Design System para replicar **exatamente** os componentes do Frontoffice Vue, removendo qualquer dependência ou padrão do shadcn/ui. O sistema de cores Legend (proficiência, performance) é a prioridade principal, seguido pela recriação dos componentes de domínio específico.

---

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.3+, Node 22 LTS  
**Primary Dependencies**: React, Tailwind CSS 3.4+, CVA (class-variance-authority), Radix UI (primitivos headless apenas quando necessário)  
**Storage**: N/A (componentes UI apenas)  
**Testing**: Vitest + Storybook play functions  
**Target Platform**: Web (browsers modernos)  
**Project Type**: Monorepo (pnpm workspaces + Turborepo)  
**Performance Goals**: Build < 30s, Storybook cold start < 15s  
**Constraints**: Paridade visual 1:1 com Frontoffice Vue  
**Scale/Scope**: 118 componentes Vue → 118 componentes React

---

## Constitution Check

*GATE: Verificações antes de implementar.*

| Regra da Constitution       | Status    | Ação Requerida                                        |
| --------------------------- | --------- | ----------------------------------------------------- |
| Spec-First                  | ✅ Passou | spec.md criado com catálogo completo                  |
| Test-First                  | 🔄 Pendente | Stories devem ser criadas antes da implementação    |
| A11y-First                  | ✅ Passou | Radix UI mantido para primitivos acessíveis          |
| Tokens-First                | ⚠️ Requer Mudança | Adicionar Legend Colors aos tokens          |
| Docs-First                  | ✅ Passou | Storybook é obrigatório                              |
| **shadcn/ui patterns**      | ❌ REMOVER | Não deve ser referência, apenas Frontoffice         |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-ds-frontoffice-catalog/
├── spec.md              # Catálogo completo de 118 componentes
├── plan.md              # Este arquivo
├── research.md          # Análise do sistema de cores e enums
├── data-model.md        # Definição dos enums de legenda
├── quickstart.md        # Guia rápido de uso
└── tasks.md             # Tarefas detalhadas (próximo passo)
```

### Source Code (repository root)

```text
packages/
├── ui/                          # Pacote principal @educacross/ui
│   ├── src/
│   │   ├── styles.css           # Tokens CSS (adicionar Legend Colors)
│   │   ├── tailwind-preset.ts   # Preset Tailwind (adicionar Legend Colors)
│   │   ├── enums/               # NOVO: Enums de domínio
│   │   │   ├── proficiency.ts
│   │   │   ├── performance.ts
│   │   │   └── index.ts
│   │   └── components/          # Componentes (estrutura mantida)
│   │       ├── BadgeStatus/     # NOVO (baseado no Vue)
│   │       ├── LegendCard/      # ATUALIZAR (usar Legend Colors)
│   │       ├── LegendEnum/      # ATUALIZAR (usar Legend Colors)
│   │       ├── PerformanceCell/ # NOVO
│   │       ├── RainbowProgressBar/ # ATUALIZAR
│   │       └── ...
│   └── package.json
├── ui-charts/                   # Pacote de gráficos
├── ui-education/                # Componentes educacionais
└── ui-pdf/                      # Componentes de PDF

apps/
├── storybook/                   # Documentação
│   └── stories/
│       ├── foundations/         # Cores Legend, Tipografia
│       ├── atoms/               # BadgeStatus, MediaCardIcon
│       ├── molecules/           # LegendCard, StatisticCard
│       └── organisms/           # ListTable, QuestionDetail
```

**Structure Decision**: Manter estrutura atual do monorepo, adicionar pasta `enums/` para centralizar as definições de domínio (proficiency, performance, etc.).

---

## Fases de Implementação

### Fase 0: Tokens e Fundação
**Prioridade**: CRÍTICA  
**Duração**: 1 sprint

1. **Adicionar Legend Colors ao styles.css**
   ```css
   :root {
     --color-legend-advanced: 110 82 232;
     --color-legend-proficient: 40 199 111;
     --color-legend-basic: 255 159 67;
     --color-legend-below-basic: 234 84 85;
     --color-legend-not-completed: 180 183 189;
     --color-legend-in-progress: 0 207 232;
   }
   ```

2. **Atualizar tailwind-preset.ts**
   - Adicionar cores `legend-*` com suporte a opacity

3. **Criar enums TypeScript**
   - `packages/ui/src/enums/proficiency.ts`
   - `packages/ui/src/enums/performance.ts`
   - Espelhar exatamente o comportamento do Vue

4. **Atualizar constitution.md**
   - Remover referência ao shadcn/ui
   - Adicionar seção "Frontoffice Compatibility"

### Fase 1: Componentes P0 (Fundação)
**Prioridade**: ALTA  
**Duração**: 2 sprints

| Componente | Ação | Complexidade |
|------------|------|--------------|
| BadgeStatus | CRIAR | Média |
| CellStatus | CRIAR | Baixa |
| MediaCardIcon | ATUALIZAR | Baixa |
| LegendCard | ATUALIZAR (usar Legend Colors) | Média |
| LegendEnum | ATUALIZAR (usar Legend Colors) | Média |
| ProgressBarHorizontal | VERIFICAR | Baixa |
| RainbowProgressBar | ATUALIZAR | Média |
| ListTable | VERIFICAR | Alta |
| Tab/TabRouter | VERIFICAR | Média |
| ESelect | CRIAR | Alta |
| ToastificationContent | CRIAR | Média |
| PerformanceCell | CRIAR | Média |

### Fase 2: Componentes P1 (Core)
**Prioridade**: MÉDIA  
**Duração**: 2 sprints

- StatisticCards (4 variantes)
- Charts (RadialBar, BarChart, PieChart)
- QuestionDetail + templates
- Timeline
- AppCollapse

### Fase 3: Componentes P2 (Nice-to-have)
**Prioridade**: BAIXA  
**Duração**: Conforme demanda

- Player components
- DeepLink components
- Modais específicos

---

## Validação de Requisitos Não Funcionais

| Requisito | Critério | Verificação |
|-----------|----------|-------------|
| Paridade Visual | Componente React deve ser visualmente idêntico ao Vue | Comparação lado a lado |
| Performance | Build < 30s | `pnpm build` com medição |
| Acessibilidade | WCAG 2.1 AA | Storybook a11y addon |
| Bundle Size | < 50KB gzipped (core) | Análise de bundle |
| TypeScript | Strict mode, sem any | `pnpm typecheck` |

---

## Checklist de PR

- [ ] **Tokens**: Legend Colors adicionados e funcionando
- [ ] **Constitution**: Referência ao shadcn/ui removida
- [ ] **Enums**: proficiency.ts e performance.ts criados
- [ ] **Componentes P0**: Todos com paridade visual
- [ ] **Testes**: Stories com play functions passando
- [ ] **Documentação**: Storybook atualizado
- [ ] **Build**: Todos os 5 pacotes compilando

---

## Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Divergência de comportamento Vue → React | Alto | Média | Testes side-by-side |
| Performance de charts | Médio | Baixa | Lazy loading |
| Escopo grande demais | Alto | Alta | Priorização estrita P0 → P1 → P2 |

---

## Próximo Passo

Gerar `tasks.md` com detalhamento de cada tarefa da Fase 0 e Fase 1.
