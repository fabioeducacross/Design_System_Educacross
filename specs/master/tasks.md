# Tasks: Correção de Pendências - Design System Educacross

**Input**: [plan.md](./plan.md) v1.1  
**Generated**: 2026-01-05  
**Total Tasks**: 41 | **Estimated Time**: ~5h

---

## Format: `- [ ] [ID] [P?] Description with file path`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- Caminhos exatos incluídos nas descrições

## Path Conventions

- **Components**: `packages/ui/src/components/<Name>/<Name>.tsx`
- **Tests**: `packages/ui/src/components/<Name>/<Name>.test.tsx`
- **Stories**: `apps/storybook/stories/components/<Name>.stories.tsx`
- **Config**: `.github/`, `eslint.config.js`, `package.json`

---

## Phase 1: Correção de Erros de Lint (P0 - BLOQUEANTE)

**Goal**: CI lint job passa sem erros (15 erros → 0)  
**Checkpoint**: `pnpm lint` passa sem errors

### 1.1 Erros `no-empty-object-type` (9 erros)

- [X] T001 [P] Corrigir interface vazia AccordionItemProps linha 207 em packages/ui/src/components/Accordion/Accordion.tsx
- [X] T002 [P] Corrigir interface vazia AccordionContentProps linha 251 em packages/ui/src/components/Accordion/Accordion.tsx
- [X] T003 [P] Corrigir interface vazia AvatarImageProps linha 56 em packages/ui/src/components/Avatar/Avatar.tsx
- [X] T004 [P] Corrigir interface vazia AvatarFallbackProps linha 86 em packages/ui/src/components/Avatar/Avatar.tsx
- [X] T005 [P] Corrigir interface vazia PaginationItemProps linha 107 em packages/ui/src/components/Pagination/Pagination.tsx
- [X] T006 [P] Corrigir interface vazia PaginationPreviousProps linha 223 em packages/ui/src/components/Pagination/Pagination.tsx
- [X] T007 [P] Corrigir interface vazia PaginationNextProps linha 249 em packages/ui/src/components/Pagination/Pagination.tsx
- [X] T008 [P] Corrigir interface vazia TableRowProps linha 102 em packages/ui/src/components/Table/Table.tsx
- [X] T009 [P] Corrigir interface vazia TableCellProps linha 123 em packages/ui/src/components/Table/Table.tsx

### 1.2 Erros `no-unused-vars` (4 erros)

- [X] T010 [P] Renomear ref para _ref linha 130 em packages/ui/src/components/DropdownMenu/DropdownMenu.tsx
- [X] T011 [P] Renomear ref para _ref linha 118 em packages/ui/src/components/Popover/Popover.tsx
- [X] T012 [P] Remover ou usar delayDuration linha 56 em packages/ui/src/components/Tooltip/Tooltip.tsx
- [X] T013 [P] Renomear side para _side linha 201 em packages/ui/src/components/Tooltip/Tooltip.tsx

### 1.3 Erros `no-constant-binary-expression` (2 erros)

- [X] T014 Corrigir testes com expressão constante linhas 16 e 21 em packages/ui/src/utils/cn.test.ts

### 1.4 Configuração Storybook Lint

- [X] T015 Corrigir script lint path de src para stories em apps/storybook/package.json
- [X] T015a Remover extensão .mdx do lint script (ESLint não parseia MDX sem plugin)
- [X] T015b Adicionar regra no eslint.config.js para permitir hooks em stories (padrão Storybook)

**Checkpoint Phase 1**: ✅ `pnpm lint` executa sem errors (35 warnings OK)

---

## Phase 2: Redução de Warnings (P1)

**Goal**: Reduzir warnings de 34 para < 10  
**Checkpoint**: `pnpm lint` mostra menos de 10 warnings

### 2.1 Warnings `react-hooks/exhaustive-deps` (4 warnings)

- [X] T016 [P] Adicionar eslint-disable com comentário explicativo linha 261 em packages/ui/src/components/Dialog/Dialog.tsx
- [X] T017 [P] Adicionar eslint-disable com comentário explicativo linha 358 em packages/ui/src/components/Dialog/Dialog.tsx
- [X] T018 [P] Adicionar eslint-disable com comentário explicativo linha 387 em packages/ui/src/components/Dialog/Dialog.tsx

### 2.2 Warnings `no-explicit-any` (5 warnings)

- [X] T019 [P] Tipar handler corretamente linha 178 em packages/ui/src/components/Dialog/Dialog.tsx
- [X] T020 [P] Tipar handler corretamente linha 139 em packages/ui/src/components/DropdownMenu/DropdownMenu.tsx
- [X] T021 [P] Tipar handlers corretamente linhas 127 e 217 em packages/ui/src/components/Popover/Popover.tsx
- [X] T022 [P] Tipar handler corretamente linha 162 em packages/ui/src/components/Tooltip/Tooltip.tsx
- [X] T022a [P] Tipar variant no Toast.stories.tsx linha 186

**Checkpoint Phase 2**: ✅ Warnings 34 → 26 (apenas react-refresh/only-export-components restantes)

---

## Phase 3: Preparação NPM Publish (P1)

**Goal**: Pacote pronto para publicação  
**Checkpoint**: Tag v0.1.0 criada e workflow publish pronto

- [ ] T023 [MANUAL] Criar NPM token em npmjs.com (Settings → Access Tokens → Automation)
- [ ] T024 [MANUAL] Adicionar secret NPM_TOKEN em GitHub (Settings → Secrets → Actions)
- [ ] T025 Criar tag v0.1.0 e push para trigger workflow publish

**Checkpoint Phase 3**: Workflow publish executa (pode falhar se token não configurado)

---

## Phase 4: Completar Testes (P2)

**Goal**: Adicionar testes para componentes sem cobertura  
**Checkpoint**: `pnpm test` passa com mais cobertura

### 4.1 Testes Unitários para Componentes (Prioridade Alta)

- [ ] T026 [P] Criar teste para Tabs em packages/ui/src/components/Tabs/Tabs.test.tsx
- [ ] T027 [P] Criar teste para Accordion em packages/ui/src/components/Accordion/Accordion.test.tsx
- [ ] T028 [P] Criar teste para Pagination em packages/ui/src/components/Pagination/Pagination.test.tsx

### 4.2 Testes Unitários para Componentes (Prioridade Média)

- [ ] T029 [P] Criar teste para Avatar em packages/ui/src/components/Avatar/Avatar.test.tsx
- [ ] T030 [P] Criar teste para Icon em packages/ui/src/components/Icon/Icon.test.tsx
- [ ] T031 [P] Criar teste para Popover em packages/ui/src/components/Popover/Popover.test.tsx
- [ ] T032 [P] Criar teste para DropdownMenu em packages/ui/src/components/DropdownMenu/DropdownMenu.test.tsx
- [ ] T033 [P] Criar teste para Tooltip em packages/ui/src/components/Tooltip/Tooltip.test.tsx

### 4.3 Play Functions para Stories

- [ ] T034 [P] Adicionar play function em apps/storybook/stories/components/Dialog.stories.tsx
- [ ] T035 [P] Adicionar play function em apps/storybook/stories/components/Toast.stories.tsx
- [ ] T036 [P] Adicionar play function em apps/storybook/stories/components/Select.stories.tsx
- [ ] T037 [P] Adicionar play function em apps/storybook/stories/components/Accordion.stories.tsx
- [ ] T038 [P] Adicionar play function em apps/storybook/stories/components/Tabs.stories.tsx
- [ ] T039 [P] Adicionar play function em apps/storybook/stories/components/DropdownMenu.stories.tsx

**Checkpoint Phase 4**: `pnpm test` passa, stories têm play functions

---

## Phase 5: Documentação e Manutenção (P3)

**Goal**: Projeto pronto para release  
**Checkpoint**: Docs atualizados, Dependabot configurado

- [X] T040 Atualizar CHANGELOG.md com todas as features da v0.1.0
- [X] T041 Criar arquivo .github/dependabot.yml para atualizações automáticas

**Checkpoint Phase 5**: ✅ Docs completos, Dependabot configurado

---

## Dependencies & Execution Order

```
Phase 1 (T001-T015) ─────────────────────────────────────────────────┐
    │ BLOQUEANTE: CI deve passar                                      │
    ▼                                                                 │
Phase 2 (T016-T022) ◄─────────────────────────────────────────────────┘
    │ Opcional mas recomendado
    ▼
Phase 3 (T023-T025) ─────► Requer ação manual (NPM_TOKEN)
    │
    ▼
Phase 4 (T026-T039) ──────────────────────────────────────────────────┐
    │ Pode rodar em paralelo                                          │
    ▼                                                                 │
Phase 5 (T040-T041) ◄─────────────────────────────────────────────────┘
```

### Parallel Opportunities

```bash
# Phase 1 - Todas as correções [P] podem rodar em paralelo:
T001-T013 (arquivos diferentes)

# Phase 2 - Warnings podem ser corrigidos em paralelo:
T016-T022 (arquivos diferentes)

# Phase 4 - Testes podem ser criados em paralelo:
T026-T039 (arquivos diferentes)
```

---

## Implementation Strategy

### MVP (CI Verde) - Phase 1 only
1. Complete T001-T015 (corrigir erros de lint)
2. Commit e push
3. **VALIDATE**: CI lint job passa
4. ~45 min de trabalho

### Full Release - All Phases
1. Phase 1 → CI verde
2. Phase 2 → Warnings reduzidos
3. Phase 3 → NPM pronto (manual)
4. Phase 4 → Constitution compliance
5. Phase 5 → Docs finalizados
6. **VALIDATE**: Tag v0.1.0 criada
7. ~5h de trabalho

---

## Estimated Time

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 1 | T001-T015 | 45 min |
| Phase 2 | T016-T022 | 30 min |
| Phase 3 | T023-T025 | 15 min (manual) |
| Phase 4 | T026-T039 | 3h |
| Phase 5 | T040-T041 | 30 min |
| **Total** | **41 tasks** | **~5h** |

---

**Generated**: 2026-01-05 | **Tasks Version**: 2.0

