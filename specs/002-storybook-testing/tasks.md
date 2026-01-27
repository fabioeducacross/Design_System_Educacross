# Tasks: Storybook Testing & Quality

**Input**: Design documents from `/specs/002-storybook-testing/`  
**Prerequisites**: plan.md ✅, storybook-best-practices.md ✅

**Tests**: Incluídos - são o objetivo principal desta feature

**Organization**: Tasks agrupadas por sprint (user story equivalente) para implementação e teste independentes.

## Format: `[ID] [P?] [Sprint] Description`

- **[P]**: Pode executar em paralelo (arquivos diferentes, sem dependências)
- **[Sprint]**: A qual sprint a tarefa pertence (S1-S5)
- Caminhos exatos de arquivo incluídos

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Inicialização e estrutura básica de testes

- [ ] T001 Criar estrutura de diretórios: `apps/storybook/.storybook/test/`, `apps/storybook/tests/{integration,accessibility,visual}/`
- [ ] T002 [P] Criar `apps/storybook/vitest.config.ts` com configuração de coverage (threshold 80%)
- [ ] T003 [P] Adicionar scripts no `apps/storybook/package.json`: `test:storybook`, `test:watch`, `test:coverage`, `test:ui`
- [ ] T004 [P] Criar `apps/storybook/.storybook/test/setup.ts` com helpers globais (render, userEvent, waitFor)

---

## Phase 2: Foundational (Pré-requisitos Bloqueantes)

**Purpose**: Infraestrutura central que DEVE estar completa antes de QUALQUER sprint

**⚠️ CRÍTICO**: Nenhum trabalho de sprint pode começar até esta fase estar completa

- [ ] T005 Configurar viewports responsivos em `apps/storybook/.storybook/preview.ts` (mobile 375px, tablet 768px, desktop 1440px)
- [ ] T006 [P] Criar `apps/storybook/.storybook/test/a11y-rules.ts` com regras axe-core customizadas (color-contrast, aria-labels)
- [ ] T007 [P] Atualizar `apps/storybook/.storybook/main.ts` para incluir addon-interactions e addon-coverage
- [ ] T008 Criar `apps/storybook/tests/setup.global.ts` com configuração de timeouts e retry logic
- [ ] T009 [P] Documentar padrões de teste em `specs/002-storybook-testing/quickstart.md`

**Checkpoint**: Fundação pronta - implementação de sprints pode começar em paralelo

---

## Phase 3: Sprint 1 - Infraestrutura Base (Priority: P1) 🎯 MVP

**Goal**: Configurar ambiente de testes e ferramentas visuais

**Independent Test**: Executar `pnpm test:storybook` e gerar relatório de coverage

### Implementation Sprint 1

- [ ] T010 [P] [S1] Instalar `@storybook/addon-visual-tests` via `pnpm dlx storybook add @storybook/addon-visual-tests`
- [ ] T011 [P] [S1] Criar `apps/storybook/.storybook/test/visual-config.ts` com configuração de threshold (5% tolerance)
- [ ] T012 [S1] Configurar baseline screenshots em `apps/storybook/tests/visual/baseline/`
- [ ] T013 [P] [S1] Adicionar viewport stories para mobile em `apps/storybook/stories/foundations/Spacing.stories.tsx`
- [ ] T014 [P] [S1] Adicionar viewport stories para tablet em `apps/storybook/stories/foundations/Typography.stories.tsx`
- [ ] T015 [S1] Criar script `test:visual` no package.json que executa testes visuais
- [ ] T016 [S1] Validar coverage report sendo gerado em `apps/storybook/coverage/`
- [ ] T017 [S1] Criar exemplo de teste visual em `apps/storybook/tests/visual/button.visual.test.ts`

**Checkpoint**: Infraestrutura de testes configurada e funcional

---

## Phase 4: Sprint 2 - Testes de Interação (Priority: P1) 🎯 MVP

**Goal**: Adicionar play functions em 10 componentes críticos

**Independent Test**: Executar stories com play functions e validar interações

### Implementation Sprint 2

- [ ] T020 [P] [S2] Play function Button: click, loading, disabled em `apps/storybook/stories/components/Button.stories.tsx`
- [ ] T021 [P] [S2] Play function Input: typing, validation, clear em `apps/storybook/stories/components/Input.stories.tsx`
- [ ] T022 [P] [S2] Play function Dialog: open, close, esc key, click outside em `apps/storybook/stories/components/Dialog.stories.tsx`
- [ ] T023 [P] [S2] Play function Select: dropdown, keyboard navigation, selection em `apps/storybook/stories/components/Select.stories.tsx`
- [ ] T024 [P] [S2] Play function Tabs: navigation, keyboard arrows em `apps/storybook/stories/components/Tabs.stories.tsx`
- [ ] T025 [P] [S2] Play function Pagination: next, prev, jump to page em `apps/storybook/stories/components/Pagination.stories.tsx`
- [ ] T026 [P] [S2] Play function Toast: show, dismiss, timeout em `apps/storybook/stories/components/Toast.stories.tsx`
- [ ] T027 [P] [S2] Play function Tooltip: hover, focus, delay em `apps/storybook/stories/components/Tooltip.stories.tsx`
- [ ] T028 [P] [S2] Play function DropdownMenu: open, select item, close em `apps/storybook/stories/components/DropdownMenu.stories.tsx`
- [ ] T029 [P] [S2] Play function Accordion: expand, collapse, multiple em `apps/storybook/stories/components/Accordion.stories.tsx`
- [ ] T030 [S2] Criar teste de integração form submission em `apps/storybook/tests/integration/form-submission.test.ts`
- [ ] T031 [S2] Criar teste de integração navigation flow em `apps/storybook/tests/integration/navigation.test.ts`
- [ ] T032 [S2] Documentar padrões de play function em `specs/002-storybook-testing/contracts/play-functions.ts`

**Checkpoint**: 10 componentes com testes de interação funcionais

---

## Phase 5: Sprint 3 - Acessibilidade (Priority: P1) 🎯 MVP

**Goal**: Auditar e corrigir violações WCAG 2.1 AA em 37 componentes

**Independent Test**: Executar addon a11y e validar 0 violações críticas

### Tests Sprint 3 (Executar ANTES da implementação)

- [ ] T035 [P] [S3] Teste keyboard navigation (Tab, Enter, Esc, Arrows) em `apps/storybook/tests/accessibility/keyboard-navigation.test.ts`
- [ ] T036 [P] [S3] Teste screen reader (ARIA attributes) em `apps/storybook/tests/accessibility/screen-reader.test.ts`
- [ ] T037 [P] [S3] Teste color contrast (4.5:1 ratio) em `apps/storybook/tests/accessibility/color-contrast.test.ts`

### Implementation Sprint 3

- [ ] T040 [S3] Auditar todos os 37 componentes via addon a11y na interface do Storybook
- [ ] T041 [P] [S3] Corrigir violações em Button: adicionar aria-label quando só ícone em `packages/ui/src/components/Button/Button.tsx`
- [ ] T042 [P] [S3] Corrigir violações em Input: associar label com aria-describedby em `packages/ui/src/components/Input/Input.tsx`
- [ ] T043 [P] [S3] Corrigir violações em Dialog: trap focus, aria-modal em `packages/ui/src/components/Dialog/Dialog.tsx`
- [ ] T044 [P] [S3] Corrigir violações em Select: aria-expanded, aria-selected em `packages/ui/src/components/Select/Select.tsx`
- [ ] T045 [P] [S3] Corrigir violações em Tabs: aria-selected, role=tablist em `packages/ui/src/components/Tabs/Tabs.tsx`
- [ ] T046 [P] [S3] Corrigir violações em Toast: role=alert, aria-live em `packages/ui/src/components/Toast/Toast.tsx`
- [ ] T047 [P] [S3] Corrigir violações em Tooltip: aria-describedby em `packages/ui/src/components/Tooltip/Tooltip.tsx`
- [ ] T048 [P] [S3] Corrigir violações em DropdownMenu: aria-haspopup, aria-expanded em `packages/ui/src/components/DropdownMenu/DropdownMenu.tsx`
- [ ] T049 [P] [S3] Corrigir violações em Pagination: aria-label="Go to page X" em `packages/ui/src/components/Pagination/Pagination.tsx`
- [ ] T050 [P] [S3] Corrigir violações em Table: scope, caption em `packages/ui/src/components/Table/Table.tsx`
- [ ] T051 [S3] Configurar regras customizadas axe-core em `apps/storybook/.storybook/test/a11y-rules.ts`
- [ ] T052 [S3] Validar navegação por teclado em todos componentes interativos
- [ ] T053 [S3] Adicionar testes de foco visível (focus-visible:ring-2)

**Checkpoint**: 0 violações críticas de acessibilidade (WCAG A/AA)

---

## Phase 6: Sprint 4 - Testes Visuais (Priority: P2)

**Goal**: Configurar testes visuais com screenshots e responsividade

**Independent Test**: Gerar baselines e executar comparação visual

### Implementation Sprint 4

- [ ] T060 [S4] Gerar baseline screenshots para todos componentes em 3 viewports (mobile/tablet/desktop)
- [ ] T061 [P] [S4] Teste visual Button em `apps/storybook/tests/visual/button.visual.test.ts` (variants, sizes, states)
- [ ] T062 [P] [S4] Teste visual Input em `apps/storybook/tests/visual/input.visual.test.ts` (normal, error, disabled)
- [ ] T063 [P] [S4] Teste visual Card em `apps/storybook/tests/visual/card.visual.test.ts` (light/dark theme)
- [ ] T064 [P] [S4] Teste visual Dialog em `apps/storybook/tests/visual/dialog.visual.test.ts` (open/close animation)
- [ ] T065 [P] [S4] Teste visual Table em `apps/storybook/tests/visual/table.visual.test.ts` (responsividade)
- [ ] T066 [S4] Configurar threshold de diferença (5% tolerance) em visual-config.ts
- [ ] T067 [S4] Criar teste de responsividade mobile (375px) para todos componentes
- [ ] T068 [S4] Criar teste de responsividade tablet (768px) para todos componentes
- [ ] T069 [S4] Criar teste de responsividade desktop (1440px) para todos componentes
- [ ] T070 [S4] Teste de temas: light mode para 10 componentes principais
- [ ] T071 [S4] Teste de temas: dark mode para 10 componentes principais
- [ ] T072 [S4] Configurar máscaras para ignorar elementos dinâmicos (timestamps, random IDs)
- [ ] T073 [S4] Adicionar script `test:visual:update` para atualizar baselines

**Checkpoint**: Testes visuais detectando regressões de CSS/layout

---

## Phase 7: Sprint 5 - CI/CD & Automação (Priority: P2)

**Goal**: Automatizar testes em pipeline GitHub Actions

**Independent Test**: Push para branch e validar workflow executando

### Implementation Sprint 5

- [ ] T080 [P] [S5] Criar workflow `.github/workflows/storybook-tests.yml` com steps: install, build, test
- [ ] T081 [P] [S5] Configurar matriz de navegadores (Chrome, Firefox) no workflow
- [ ] T082 [S5] Adicionar step de upload coverage para Codecov no workflow
- [ ] T083 [P] [S5] Criar workflow `.github/workflows/visual-regression.yml` para PRs
- [ ] T084 [S5] Configurar comentários automáticos em PRs com diff de coverage
- [ ] T085 [P] [S5] Adicionar badge de coverage no `README.md` ([![Coverage](https://codecov.io/...)](...))
- [ ] T086 [P] [S5] Configurar cache de node_modules no workflow (actions/cache@v3)
- [ ] T087 [S5] Adicionar step de instalação do Playwright browsers
- [ ] T088 [S5] Configurar retry automático para testes flaky (max 3 tentativas)
- [ ] T089 [S5] Adicionar timeout global de 10min no workflow
- [ ] T090 [S5] Configurar artifact upload para screenshots de testes visuais falhados
- [ ] T091 [S5] Criar script `test:ci` no package.json que roda todos os testes em modo CI
- [ ] T092 [S5] Testar workflow localmente com act (https://github.com/nektos/act)
- [ ] T093 [S5] Documentar processo de CI/CD em `specs/002-storybook-testing/contracts/ci-workflow.yml`

**Checkpoint**: Pipeline CI/CD executando todos os testes automaticamente

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Melhorias que afetam múltiplos sprints

- [ ] T100 [P] Atualizar `docs/storybook-best-practices.md` com resultados finais (coverage %, violações a11y)
- [ ] T101 [P] Criar `TESTING.md` na raiz com guia de contribuição para testes
- [ ] T102 Refatorar helpers de teste duplicados em arquivo centralizado
- [ ] T103 [P] Adicionar testes unitários para helpers em `apps/storybook/.storybook/test/setup.test.ts`
- [ ] T104 Otimizar performance de testes (paralelização, sharding)
- [ ] T105 [P] Documentar como atualizar baselines visuais em `specs/002-storybook-testing/quickstart.md`
- [ ] T106 Revisar e corrigir flaky tests (aumentar timeouts, waitFor adequados)
- [ ] T107 [P] Criar exemplo de teste E2E completo em `apps/storybook/tests/integration/complete-journey.test.ts`
- [ ] T108 Validar coverage atingiu 80%+ (lines, functions, branches, statements)
- [ ] T109 [P] Gravar vídeo walkthrough dos testes (Loom) e adicionar link no README
- [ ] T110 Apresentar resultados para o time (demo dos testes rodando)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências - pode começar imediatamente
- **Foundational (Phase 2)**: Depende de Setup completo - BLOQUEIA todos os sprints
- **Sprints (Phase 3-7)**: Todos dependem de Foundational completo
  - Sprints podem prosseguir em paralelo (se houver equipe)
  - Ou sequencialmente por prioridade (S1 → S2 → S3 → S4 → S5)
- **Polish (Phase 8)**: Depende de todos sprints desejados estarem completos

### Sprint Dependencies

- **Sprint 1 (Infraestrutura)**: Pode começar após Foundational - Sem dependências de outros sprints
- **Sprint 2 (Interação)**: Pode começar após Foundational - Independente de S1 mas recomendado após
- **Sprint 3 (Acessibilidade)**: Pode começar após Foundational - Pode rodar em paralelo com S2
- **Sprint 4 (Visual)**: Depende de S1 (addon visual instalado) - Pode rodar em paralelo com S2/S3
- **Sprint 5 (CI/CD)**: Recomendado após S2/S3/S4 para ter testes para automatizar

### Dentro de Cada Sprint

- Tasks marcadas [P] podem rodar em paralelo (arquivos diferentes)
- Testes devem FALHAR antes da implementação (TDD)
- Play functions são independentes entre componentes
- Correções de a11y são independentes por componente
- Testes visuais são independentes por componente

### Oportunidades de Paralelização

**Sprint 2 (Interação)** - Todas as play functions podem ser criadas em paralelo:
```bash
# 10 desenvolvedores, 1 componente cada
T020-T029: Paralelo total
```

**Sprint 3 (Acessibilidade)** - Todas as correções por componente em paralelo:
```bash
# Equipe pode dividir 10 componentes críticos
T041-T050: Paralelo por componente
```

**Sprint 4 (Visual)** - Todos os testes visuais em paralelo:
```bash
# 5 desenvolvedores, 2 componentes cada
T061-T065: Paralelo total
```

---

## Implementation Strategy

### MVP First (Sprints 1-3 Apenas)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T009) ⚠️ CRÍTICO
3. Complete Phase 3: Sprint 1 - Infraestrutura (T010-T017)
4. Complete Phase 4: Sprint 2 - Interação (T020-T032)
5. Complete Phase 5: Sprint 3 - Acessibilidade (T035-T053)
6. **STOP e VALIDAR**: Executar `pnpm test:storybook` e verificar coverage
7. **MVP PRONTO**: Testes de interação + acessibilidade funcionando

### Entrega Incremental

1. Setup + Foundational → Fundação pronta
2. Adicionar Sprint 1 → Infraestrutura visual configurada
3. Adicionar Sprint 2 → 10 componentes com testes de interação
4. Adicionar Sprint 3 → 0 violações de a11y → **MVP**
5. Adicionar Sprint 4 → Testes visuais detectando regressões
6. Adicionar Sprint 5 → CI/CD automatizado → **PRODUÇÃO**

### Estratégia de Time em Paralelo

Com 3 desenvolvedores:

1. Time completa Setup + Foundational juntos (T001-T009)
2. Após Foundational:
   - **Dev A**: Sprint 1 (Infraestrutura) T010-T017
   - **Dev B**: Sprint 2 (Interação) T020-T032 (requer T005-T008 apenas)
   - **Dev C**: Sprint 3 (Acessibilidade) T035-T053 (pode começar em paralelo)
3. Depois:
   - **Dev A**: Sprint 4 (Visual) T060-T073 (depende de S1 T010)
   - **Dev B**: Sprint 5 (CI/CD) T080-T093 (depende de S2/S3 terem testes)
   - **Dev C**: Ajudar em S4 ou S5

---

## Progress Tracking

| Phase | Total Tasks | Completed | Status |
|-------|-------------|-----------|--------|
| Phase 1: Setup | 4 | 0 | ⏳ Not Started |
| Phase 2: Foundational | 5 | 0 | ⏳ Not Started |
| Phase 3: Sprint 1 | 8 | 0 | ⏳ Not Started |
| Phase 4: Sprint 2 | 13 | 0 | ⏳ Not Started |
| Phase 5: Sprint 3 | 19 | 0 | ⏳ Not Started |
| Phase 6: Sprint 4 | 14 | 0 | ⏳ Not Started |
| Phase 7: Sprint 5 | 14 | 0 | ⏳ Not Started |
| Phase 8: Polish | 11 | 0 | ⏳ Not Started |
| **TOTAL** | **88** | **0** | **0%** |

### Current Sprint: Phase 1 (Setup)

**Next 3 Tasks**:
1. T001: Criar estrutura de diretórios
2. T002: Criar vitest.config.ts
3. T003: Adicionar scripts no package.json

---

## Notes

- [P] = Pode executar em paralelo (arquivos diferentes, sem dependências)
- [SX] = Sprint label para rastreabilidade
- Cada sprint deve ser independentemente completável e testável
- Verificar testes FALHAM antes de implementar (TDD)
- Commit após cada task ou grupo lógico
- Parar em qualquer checkpoint para validar sprint independentemente
- Evitar: tasks vagas, conflitos no mesmo arquivo, dependências cross-sprint que quebram independência

---

**Próximos Passos**:
1. ✅ Plano aprovado
2. ✅ Tasks geradas
3. ⏳ Iniciar Phase 1 (Setup)
4. ⏳ Completar Phase 2 (Foundational) - CRÍTICO
5. ⏳ Escolher estratégia: MVP First (S1-S3) ou Entrega Incremental (S1-S5)

**Última atualização**: 26/01/2026 - Criação inicial
