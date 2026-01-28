# Tasks: Node Standardization and Build Fixes

**Input**: [specs/node-standardization-and-build-fixes/plan.md](plan.md)  
**Branch**: `fix/node-20-standardization`  
**Goal**: Resolver problemas de build, padronizar Node 20, otimizar performance

---

## Format: `[ID] [P?] [Phase] Description`

- **[P]**: Pode executar em paralelo (arquivos diferentes, sem dependências)
- **[Phase]**: Fase do plano (F0-F5)
- Caminhos exatos incluídos nas descrições

---

## Phase 0: Research & Diagnóstico (1-2 horas)

**Purpose**: Documentar estado atual, capturar erros, estabelecer baseline

- [ ] T001 [P] [F0] Verificar versões atuais de Node/pnpm em todos os ambientes (local, CI, Chromatic)
- [ ] T002 [P] [F0] Executar `pnpm storybook build 2>&1 | tee build-errors.log` e analisar erros de minificação
- [ ] T003 [P] [F0] Medir tempo de build baseline: dev server startup, HMR, build produção
- [ ] T004 [P] [F0] Capturar logs completos do Chromatic (último build que falhou)
- [ ] T005 [P] [F0] Listar dependências desatualizadas com `pnpm outdated --recursive`
- [ ] T006 [F0] Criar `specs/node-standardization-and-build-fixes/research.md` consolidando todos os dados coletados
- [ ] T007 [P] [F0] Executar `pnpm ls storybook vite esbuild terser` para verificar versões críticas
- [ ] T008 [P] [F0] Analisar bundle size com `pnpm storybook build --stats-json` e visualizador

**Checkpoint**: `research.md` completo com versões, erros documentados, e benchmarks baseline

---

## Phase 1: Padronização Node 20 (30 minutos)

**Purpose**: Garantir Node 20.x em todos os ambientes (local, CI, CD)

### Arquivos de Configuração

- [ ] T009 [P] [F1] Criar `.nvmrc` na raiz com conteúdo `20.18.0`
- [ ] T010 [P] [F1] Adicionar `engines.node: "^20.0.0"` e `engines.pnpm: "^9.0.0"` em `package.json` (root)
- [ ] T011 [P] [F1] Adicionar `engines.node: "^20.0.0"` em `apps/storybook/package.json`
- [ ] T012 [P] [F1] Adicionar `engines.node: "^20.0.0"` em `packages/ui/package.json`
- [ ] T013 [P] [F1] Adicionar `.vite-cache` ao `.gitignore`

### CI/CD Workflows

- [ ] T014 [P] [F1] Atualizar `.github/workflows/chromatic.yml` para usar `node-version: '20'`
- [ ] T015 [P] [F1] Atualizar `.github/workflows/ci.yml` (se existir) para usar `node-version: '20'`
- [ ] T016 [P] [F1] Verificar se há outros workflows em `.github/workflows/` e atualizar para Node 20

### Validação Local

- [ ] T017 [F1] Executar `nvm use` e validar que Node 20.x está ativo
- [ ] T018 [F1] Limpar `node_modules` e lockfile: `rm -rf node_modules pnpm-lock.yaml`
- [ ] T019 [F1] Reinstalar dependências: `pnpm install`
- [ ] T020 [F1] Testar build: `pnpm build`
- [ ] T021 [F1] Testar dev: `pnpm storybook` e verificar startup < 10s

**Checkpoint**: Node 20 ativo localmente, CI configurado, build básico funcionando

---

## Phase 2: Resolver Erro de Minificação (1-2 horas)

**Purpose**: Identificar e corrigir dependência que causa erro no build de produção

### Diagnóstico

- [ ] T022 [F2] Criar branch de teste: `git checkout -b test/minification`
- [ ] T023 [F2] Reativar minificação em `apps/storybook/.storybook/main.ts`: `config.build.minify = 'esbuild'` e `config.build.sourcemap = true`
- [ ] T024 [F2] Executar `pnpm storybook build 2>&1 | tee minify-error-detailed.log`
- [ ] T025 [F2] Analisar stack trace e identificar módulo/linha problemática

### Solução A: Atualizar Dependência

- [ ] T026 [F2] Se identificada dependência desatualizada, executar `pnpm up [dependencia]@latest`
- [ ] T027 [F2] Re-testar build: `pnpm storybook build`
- [ ] T028 [F2] Se sucesso, commitar mudanças e pular para T034

### Solução B: Transpilar Módulo Legado

- [ ] T029 [F2] Modificar `apps/storybook/.storybook/main.ts` adicionando:
  ```ts
  config.optimizeDeps.esbuildOptions = { target: 'es2020' };
  config.build.target = 'es2020';
  ```
- [ ] T030 [F2] Re-testar build: `pnpm storybook build`
- [ ] T031 [F2] Se sucesso, commitar mudanças e pular para T034

### Solução C: Excluir do Bundle (último recurso)

- [ ] T032 [F2] Adicionar módulo problemático em `config.build.rollupOptions.external`
- [ ] T033 [F2] Re-testar build e validar que funcionalidade não foi quebrada

### Validação

- [ ] T034 [F2] Build completo sem erros: `pnpm storybook build`
- [ ] T035 [F2] Servir build localmente: `pnpm dlx serve storybook-static`
- [ ] T036 [F2] Testar navegação em 5+ componentes diferentes
- [ ] T037 [F2] Verificar bundle size (não deve ter aumentado > 20%)
- [ ] T038 [F2] Documentar solução aplicada em `research.md` seção "Minification Fix"

**Checkpoint**: Build de produção funciona sem erros de minificação

---

## Phase 3: Otimizar Watcher e HMR (30 minutos)

**Purpose**: Melhorar performance de desenvolvimento no Windows

### Configuração de Ambiente

- [ ] T039 [F3] Criar `apps/storybook/.env.local` com `VITE_USE_POLLING=true`
- [ ] T040 [F3] Adicionar `.env.local` ao `.gitignore` (se ainda não estiver)

### Configuração do Vite

- [ ] T041 [F3] Modificar `apps/storybook/.storybook/main.ts` adicionando watcher otimizado:
  ```ts
  config.server.watch = {
    usePolling: process.env.VITE_USE_POLLING === 'true',
    interval: 2000,
    ignored: ['**/node_modules/**', '**/.git/**', '**/storybook-static/**', 
              '**/.storybook-cache/**', '**/dist/**', '**/.turbo/**']
  };
  ```
- [ ] T042 [F3] Adicionar configuração de HMR:
  ```ts
  config.server.hmr = {
    timeout: 60000,
    overlay: true,
  };
  ```
- [ ] T043 [F3] Configurar cache dir: `config.cacheDir = '.vite-cache';`

### Documentação

- [ ] T044 [F3] Criar `docs/troubleshooting.md` (se não existir)
- [ ] T045 [F3] Adicionar seção "HMR lento no Windows" com instruções de usar `VITE_USE_POLLING=true`
- [ ] T046 [F3] Documentar trade-off: mais CPU, mas mais confiável no Windows

### Validação

- [ ] T047 [F3] Reiniciar Storybook: `pnpm storybook`
- [ ] T048 [F3] Medir tempo de startup (deve ser < 10s)
- [ ] T049 [F3] Testar HMR: modificar `packages/ui/src/components/Button/Button.tsx` e cronometrar reload
- [ ] T050 [F3] Validar que reload ocorre em < 1s
- [ ] T051 [F3] Testar navegação entre 5+ stories diferentes

**Checkpoint**: Dev server inicia rápido, HMR responde em < 1s

---

## Phase 4: Validar Addons Customizados (1 hora)

**Purpose**: Garantir compatibilidade do addon multi-framework-code com Storybook 10

### Análise Inicial

- [ ] T052 [P] [F4] Revisar `apps/storybook/.storybook/addons/multi-framework-code/README.md` (se existir)
- [ ] T053 [P] [F4] Verificar imports em `apps/storybook/.storybook/addons/multi-framework-code/register.tsx`
- [ ] T054 [P] [F4] Verificar imports em `apps/storybook/.storybook/addons/multi-framework-code/Panel.tsx`
- [ ] T055 [F4] Pesquisar breaking changes de addons entre Storybook 9 → 10 na documentação oficial

### Teste de Estabilidade

- [ ] T056 [F4] Comentar linha do addon em `apps/storybook/.storybook/main.ts`:
  ```ts
  // managerEntries: [resolve(__dirname, "./addons/multi-framework-code/register.tsx")],
  ```
- [ ] T057 [F4] Reiniciar Storybook e testar navegação básica
- [ ] T058 [F4] Verificar se há erros no console do navegador
- [ ] T059 [F4] Verificar se Docs e Controls funcionam corretamente

### Atualização (se necessário)

- [ ] T060 [F4] Se addon estiver quebrado, atualizar imports para APIs de v10:
  - `@storybook/manager-api`
  - `@storybook/components`
  - `@storybook/theming`
- [ ] T061 [F4] Migrar de `addons.register()` para `addons.add()` (se necessário)
- [ ] T062 [F4] Atualizar lifecycle hooks conforme documentação v10

### Reativação e Teste

- [ ] T063 [F4] Descomentar linha do addon em `main.ts`
- [ ] T064 [F4] Reiniciar Storybook
- [ ] T065 [F4] Abrir qualquer story e verificar aba "Multi-Framework Code"
- [ ] T066 [F4] Testar troca entre React/Vue 2/Vue 3
- [ ] T067 [F4] Validar que código de exemplo está correto

### Documentação

- [ ] T068 [F4] Criar `apps/storybook/.storybook/addons/multi-framework-code/CHANGELOG.md` (se não existir)
- [ ] T069 [F4] Documentar compatibilidade com Storybook 10 e Node 20

**Checkpoint**: Addon multi-framework-code funciona 100% com Storybook 10

---

## Phase 5: Reproduzir Build Chromatic (1 hora)

**Purpose**: Validar que build funciona no ambiente Chromatic e CI

### Setup Local

- [ ] T070 [F5] Verificar se `chromatic` já está em devDependencies, caso contrário: `pnpm add -D chromatic`
- [ ] T071 [F5] Obter token do projeto Chromatic (variável `CHROMATIC_PROJECT_TOKEN`)

### Reprodução Local

- [ ] T072 [F5] Executar build local simulando Chromatic:
  ```bash
  export CHROMATIC_PROJECT_TOKEN="<token>"
  npx chromatic --build-script-name "build" --exit-zero-on-changes --dry-run
  ```
- [ ] T073 [F5] Se erro persistir, capturar logs completos: `npx chromatic --debug 2>&1 | tee chromatic-debug.log`
- [ ] T074 [F5] Comparar output com build normal: `pnpm storybook build`
- [ ] T075 [F5] Verificar diferenças em `storybook-static/` vs output do Chromatic

### Diagnóstico de Erro Específico

- [ ] T076 [F5] Se erro for específico do Chromatic, verificar versões no `pnpm-lock.yaml`
- [ ] T077 [F5] Testar com install limpo: `pnpm install --frozen-lockfile`
- [ ] T078 [F5] Verificar se há variáveis de ambiente faltando no CI
- [ ] T079 [F5] Se nada funcionar, abrir ticket no suporte Chromatic anexando `chromatic-debug.log`

### Atualização de Workflow

- [ ] T080 [F5] Atualizar `.github/workflows/chromatic.yml`:
  ```yaml
  - uses: chromaui/action@latest
    with:
      projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
      buildScriptName: 'build'
      exitZeroOnChanges: true
      exitOnceUploaded: true
  ```
- [ ] T081 [F5] Adicionar step de cache para node_modules no workflow
- [ ] T082 [F5] Garantir que workflow usa Node 20

### Validação

- [ ] T083 [F5] Commitar todas as mudanças
- [ ] T084 [F5] Push para branch: `git push origin fix/node-20-standardization`
- [ ] T085 [F5] Verificar GitHub Actions e confirmar que CI passa
- [ ] T086 [F5] Verificar Chromatic UI e confirmar que build foi publicado
- [ ] T087 [F5] Testar Storybook publicado no link do Chromatic

**Checkpoint**: CI completo passa, Chromatic build publicado com sucesso

---

## Phase 6: Documentação e Cleanup (30 minutos)

**Purpose**: Finalizar documentação e limpar código temporário

### Documentação

- [ ] T088 [P] [F6] Criar `specs/node-standardization-and-build-fixes/quickstart.md` com guia de migração
- [ ] T089 [P] [F6] Atualizar `README.md` principal com requisitos de Node 20
- [ ] T090 [P] [F6] Adicionar seção "Performance Improvements" no `CHANGELOG.md`
- [ ] T091 [P] [F6] Documentar configurações opcionais (polling, HMR timeout) em `docs/`

### Cleanup

- [ ] T092 [F6] Remover arquivos de log temporários: `rm -f *-error*.log chromatic-debug.log`
- [ ] T093 [F6] Remover comentários de debug em `main.ts`
- [ ] T094 [F6] Limpar branches de teste: `git branch -D test/minification test/chromatic`
- [ ] T095 [F6] Executar linter: `pnpm lint --fix`
- [ ] T096 [F6] Executar formatter: `pnpm format` (se existir)

### Validação Final

- [ ] T097 [F6] Build limpo do zero:
  ```bash
  rm -rf node_modules apps/*/node_modules packages/*/node_modules .turbo
  pnpm install
  pnpm build
  pnpm storybook build
  ```
- [ ] T098 [F6] Executar testes (se existirem): `pnpm test`
- [ ] T099 [F6] Validar typecheck: `pnpm typecheck`
- [ ] T100 [F6] Criar PR com título: `fix: standardize Node 20 and resolve build issues`

**Checkpoint**: Projeto limpo, documentado, pronto para merge

---

## Dependencies & Execution Order

### Phase Dependencies

```
F0 (Research) 
  ↓
F1 (Node 20 Standardization) → BLOCKS F2, F3, F4, F5
  ↓
F2 (Minification Fix) → CRITICAL
  ↓
F3 (Watcher/HMR) → Independent, can run parallel with F4/F5
  ↓
F4 (Addon Validation) → Independent, can run parallel with F3/F5
  ↓
F5 (Chromatic) → Depends on F2 (build must work)
  ↓
F6 (Documentation) → Depends on all phases complete
```

### Parallel Opportunities

**Phase 0 (Research)**: T001-T005, T007-T008 podem rodar em paralelo

**Phase 1 (Node 20)**: T009-T016 podem rodar em paralelo (diferentes arquivos)

**Phase 3-4-5**: Após F2 completo, F3/F4/F5 podem rodar em paralelo se tiver múltiplos desenvolvedores

**Phase 6 (Docs)**: T088-T091 podem rodar em paralelo

### Critical Path

```
T001-T008 → T009-T021 → T022-T038 → T083-T087 → T097-T100
   (F0)        (F1)        (F2)        (F5)        (F6)
```

F3 e F4 são melhorias opcionais (podem ser feitas depois se tempo curto)

---

## Execution Strategy

### MVP (Mínimo Viável)

Se tempo for curto, priorizar apenas:
- F0: Research (obrigatório)
- F1: Node 20 (obrigatório)
- F2: Minification Fix (obrigatório)
- F5: Chromatic (obrigatório)

F3 e F4 podem ser feitas em outro PR.

### Full Implementation (Recomendado)

Seguir ordem completa F0 → F1 → F2 → F3 → F4 → F5 → F6

### Time Estimate

- **F0**: 1-2 horas
- **F1**: 30 minutos
- **F2**: 1-2 horas (pode variar)
- **F3**: 30 minutos
- **F4**: 1 hora
- **F5**: 1 hora
- **F6**: 30 minutos

**Total**: 5-7 horas de trabalho efetivo

---

## Rollback Plan

Se algo der errado em qualquer fase:

```bash
# Reverter mudanças
git checkout master -- .nvmrc package.json apps/storybook/.storybook/main.ts

# Reinstalar dependências
pnpm install

# Testar estado anterior
pnpm storybook
```

---

## Success Criteria

- [x] CI/CD passa com Node 20
- [x] Build de produção completa sem erros (< 30s)
- [x] Dev server inicia em < 10s
- [x] HMR responde em < 1s
- [x] Addon multi-framework-code funciona
- [x] Chromatic build publica sem erros
- [x] Zero regressões visuais
- [x] Documentação atualizada

---

## Notes

- **Commitar frequentemente**: Após cada checkpoint ou grupo de 3-5 tasks
- **Testar sempre**: Nunca commitar sem validar que ainda funciona
- **Documentar decisões**: Atualizar `research.md` com descobertas importantes
- **Pedir ajuda**: Se F2 (minification) demorar > 3h, escalar para tech lead
