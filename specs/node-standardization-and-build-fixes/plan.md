# Implementation Plan: Node Standardization and Build Fixes

**Branch**: `fix/node-20-standardization` | **Date**: 28/01/2026 | **Spec**: specs/node-standardization-and-build-fixes/spec.md  
**Input**: Resolver problemas de build, minificação e performance do Storybook

## Summary

Padronizar o ambiente Node.js para versão 20.x em todo o projeto (local e CI), resolver erros de minificação no build de produção, otimizar watcher/HMR do Vite para melhor performance, validar compatibilidade de addons customizados com Storybook 10, e reproduzir/corrigir erros do pipeline Chromatic.

## Technical Context

**Language/Version**: Node.js 20.x LTS, TypeScript 5.7+  
**Primary Dependencies**: Storybook 10.2.0, Vite 6.0.6, pnpm 9.15.0, Turborepo 2.7.4  
**Storage**: N/A (design system, sem backend)  
**Testing**: Vitest 4.0.18, @storybook/addon-vitest, Playwright (Chromatic)  
**Target Platform**: Navegadores modernos (Chrome 120+, Firefox 120+, Safari 17+)  
**Project Type**: Monorepo (workspace) - 2 packages (ui, storybook)  
**Performance Goals**: 
- Build de produção < 30s
- Dev server startup < 10s
- HMR < 500ms
- Storybook carregamento < 5s

**Constraints**:
- Compatibilidade com Windows (WSL2 opcional)
- CI/CD no GitHub Actions
- Deploy via Chromatic
- Sem breaking changes em componentes existentes

**Scale/Scope**: 37 componentes, ~100 stories, ~200 arquivos TypeScript/TSX

## Constitution Check

✅ **Aprovado** - Este plano não introduz complexidade desnecessária:
- Usa ferramentas padrão do ecossistema (nvm, .nvmrc, engines)
- Segue boas práticas de monorepo
- Otimizações são incrementais e reversíveis
- Não adiciona novas dependências críticas

## Project Structure

### Documentation (this feature)

```text
specs/node-standardization-and-build-fixes/
├── plan.md              # Este arquivo
├── research.md          # Análise de erros e benchmarks
├── data-model.md        # N/A (não aplicável para esta feature)
├── quickstart.md        # Guia de migração para Node 20
├── contracts/           # N/A
└── tasks.md             # Lista de tarefas detalhadas
```

### Source Code (repository root)

```text
Design_System_Educacross/
├── .nvmrc                        # [NOVO] Versão Node 20.x
├── .github/
│   └── workflows/
│       ├── chromatic.yml         # [MODIFICADO] Node 20
│       └── ci.yml                # [MODIFICADO] Node 20
├── apps/
│   └── storybook/
│       ├── .storybook/
│       │   ├── main.ts           # [MODIFICADO] Otimizações Vite
│       │   ├── preview.ts        # [VALIDAR] Configurações
│       │   └── addons/
│       │       └── multi-framework-code/  # [VALIDAR] Compatibilidade
│       ├── package.json          # [MODIFICADO] engines.node
│       └── vite.config.ts        # [MODIFICADO] Watcher/HMR
├── packages/
│   └── ui/
│       └── package.json          # [MODIFICADO] engines.node
├── package.json                  # [MODIFICADO] engines.node (root)
└── docs/
    └── troubleshooting.md        # [NOVO] Guia de problemas comuns
```

**Structure Decision**: Monorepo existente com 2 workspaces (ui, storybook). As modificações são concentradas em configurações de build e CI, sem alteração na estrutura de componentes.

## Fases de Implementação

### Fase 0: Research & Diagnóstico (1-2 horas)

**Objetivo**: Documentar estado atual, erros conhecidos e benchmarks

**Entregas**:
- `research.md` com:
  - Versões Node atuais (local vs CI)
  - Stack traces completos de erros de minificação
  - Tempos de build baseline (dev + prod)
  - Logs do Chromatic
  - Lista de dependências desatualizadas

**Comandos de diagnóstico**:
```bash
# Versões atuais
node --version
pnpm --version
pnpm ls storybook vite

# Build de produção com logs
pnpm storybook build 2>&1 | tee build-errors.log

# Análise de bundle
pnpm storybook build --stats-json
npx vite-bundle-visualizer storybook-static

# Tempo de dev server
time pnpm storybook dev --ci
```

### Fase 1: Padronização Node 20 (30 min)

**Objetivo**: Garantir Node 20.x em todos os ambientes

**Tasks**:
1. Criar `.nvmrc` na raiz:
   ```
   20.18.0
   ```

2. Atualizar `package.json` (root):
   ```json
   {
     "engines": {
       "node": "^20.0.0",
       "pnpm": "^9.0.0"
     }
   }
   ```

3. Atualizar `apps/storybook/package.json`:
   ```json
   {
     "engines": {
       "node": "^20.0.0"
     }
   }
   ```

4. Atualizar `packages/ui/package.json`:
   ```json
   {
     "engines": {
       "node": "^20.0.0"
     }
   }
   ```

5. Atualizar `.github/workflows/chromatic.yml`:
   ```yaml
   - uses: actions/setup-node@v4
     with:
       node-version: '20'
       cache: 'pnpm'
   ```

6. Atualizar `.github/workflows/ci.yml` (se existir):
   ```yaml
   - uses: actions/setup-node@v4
     with:
       node-version: '20'
       cache: 'pnpm'
   ```

**Validação**:
```bash
nvm use
node --version  # deve retornar v20.x.x
pnpm install
pnpm build
```

### Fase 2: Resolver Erro de Minificação (1-2 horas)

**Objetivo**: Identificar e corrigir dependência problemática no build de produção

**Tasks**:
1. Criar branch de teste: `git checkout -b test/minification`

2. Reativar minificação em `apps/storybook/.storybook/main.ts`:
   ```ts
   viteFinal: async (config) => {
     config.build = config.build || {};
     config.build.minify = 'esbuild'; // ou 'terser' para melhor debug
     config.build.sourcemap = true;   // temporário para debug
     // ...resto da config
   }
   ```

3. Executar build e capturar erro:
   ```bash
   pnpm storybook build 2>&1 | tee minify-error.log
   ```

4. Analisar stack trace e identificar módulo problemático (provavelmente em `node_modules`)

5. **Solução A - Atualizar dependência**:
   ```bash
   pnpm up [dependencia-problema]@latest
   pnpm build  # re-testar
   ```

6. **Solução B - Transpilar módulo específico**:
   ```ts
   // apps/storybook/.storybook/main.ts
   viteFinal: async (config) => {
     config.optimizeDeps = config.optimizeDeps || {};
     config.optimizeDeps.esbuildOptions = {
       target: 'es2020',
     };
     
     // Forçar transpilação de módulos legados
     config.build = config.build || {};
     config.build.target = 'es2020';
     
     return config;
   }
   ```

7. **Solução C - Excluir do bundle**:
   ```ts
   viteFinal: async (config) => {
     config.build.rollupOptions = {
       external: ['modulo-problematico'],
     };
   }
   ```

**Validação**:
```bash
pnpm storybook build
pnpm dlx serve storybook-static  # testar build
```

### Fase 3: Otimizar Watcher e HMR (30 min)

**Objetivo**: Melhorar performance de desenvolvimento em Windows

**Tasks**:
1. Criar variável de ambiente `.env.local` (apps/storybook):
   ```
   VITE_USE_POLLING=true
   ```

2. Modificar `apps/storybook/.storybook/main.ts`:
   ```ts
   viteFinal: async (config) => {
     // Watcher otimizado para Windows
     config.server = config.server || {};
     config.server.watch = {
       usePolling: process.env.VITE_USE_POLLING === 'true',
       interval: 2000,
       ignored: [
         '**/node_modules/**',
         '**/.git/**',
         '**/storybook-static/**',
         '**/.storybook-cache/**',
         '**/dist/**',
         '**/.turbo/**',
       ],
     };
     
     // HMR timeout aumentado
     config.server.hmr = {
       timeout: 60000,
       overlay: true,
     };
     
     // Cache agressivo
     config.cacheDir = '.vite-cache';
     
     return config;
   }
   ```

3. Adicionar `.vite-cache` ao `.gitignore`

4. Documentar em `docs/troubleshooting.md`:
   ```md
   ## HMR lento no Windows
   
   Se o hot reload estiver lento, habilite polling:
   
   1. Criar `apps/storybook/.env.local`:
      ```
      VITE_USE_POLLING=true
      ```
   
   2. Reiniciar Storybook
   
   **Trade-off**: Consome mais CPU, mas é mais confiável no Windows.
   ```

**Validação**:
```bash
# Testar HMR
pnpm storybook dev
# Em outro terminal:
echo "// test" >> packages/ui/src/components/Button/Button.tsx
# Verificar se reload ocorre < 1s
```

### Fase 4: Validar Addons Customizados (1 hora)

**Objetivo**: Garantir compatibilidade do addon multi-framework-code com Storybook 10

**Tasks**:
1. Revisar documentação do addon:
   ```bash
   cat apps/storybook/.storybook/addons/multi-framework-code/README.md
   ```

2. Verificar APIs deprecadas:
   - `@storybook/manager-api` (v10+)
   - `@storybook/components` (v10+)
   - `@storybook/theming` (v10+)

3. Testar desativando temporariamente:
   ```ts
   // apps/storybook/.storybook/main.ts
   managerEntries: [
     // resolve(__dirname, "./addons/multi-framework-code/register.tsx"), // DESATIVADO
   ],
   ```

4. Executar Storybook e validar estabilidade:
   ```bash
   pnpm storybook dev
   # Testar navegação, docs, controles
   ```

5. **Se houver problemas**, atualizar implementação:
   - Migrar de `addons.register()` para `addons.add()` (se necessário)
   - Atualizar imports de componentes
   - Verificar lifecycle hooks

6. **Se estável**, reativar addon

7. Documentar em `apps/storybook/.storybook/addons/multi-framework-code/CHANGELOG.md`:
   ```md
   ## v2.0.0 - Compatibilidade Storybook 10
   
   - Migrado para APIs de v10
   - Testado com Node 20
   - Performance melhorada
   ```

**Validação**:
```bash
pnpm storybook dev
# Abrir qualquer story
# Verificar aba "Multi-Framework Code"
# Testar troca entre React/Vue 2/Vue 3
```

### Fase 5: Reproduzir Build Chromatic (1 hora)

**Objetivo**: Validar que o build funciona no ambiente Chromatic

**Tasks**:
1. Instalar Chromatic CLI:
   ```bash
   pnpm add -D chromatic
   ```

2. Executar build local (simulando CI):
   ```bash
   export CHROMATIC_PROJECT_TOKEN="seu-token"
   npx chromatic --build-script-name "storybook:build" --exit-zero-on-changes
   ```

3. Se o erro persistir, capturar logs completos:
   ```bash
   npx chromatic --debug 2>&1 | tee chromatic-debug.log
   ```

4. Comparar com build local normal:
   ```bash
   pnpm storybook build
   diff -r storybook-static chromatic-build-output
   ```

5. **Se erro for específico do Chromatic**:
   - Verificar versões de dependências no lockfile
   - Testar com `pnpm install --frozen-lockfile`
   - Abrir ticket no suporte Chromatic com logs

6. Atualizar `.github/workflows/chromatic.yml`:
   ```yaml
   - name: Publish to Chromatic
     uses: chromaui/action@latest
     with:
       projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
       buildScriptName: 'storybook:build'
       exitZeroOnChanges: true
       exitOnceUploaded: true
       # Flags adicionais para debug:
       # debug: true
       # logLevel: 'verbose'
   ```

**Validação**:
```bash
# Push para branch de teste
git push origin test/chromatic
# Verificar GitHub Actions
# Confirmar que build passa
```

## Rollout Plan

### Ordem de Implementação

1. **Fase 1** (crítico) → Bloqueia CI/CD
2. **Fase 2** (alto) → Bloqueia build de produção
3. **Fase 3** (médio) → Melhora DX local
4. **Fase 4** (baixo) → Validação de qualidade
5. **Fase 5** (médio) → Validação de deploy

### Critérios de Sucesso

- [ ] CI/CD passa com Node 20
- [ ] Build de produção completa sem erros de minificação
- [ ] Dev server inicia em < 10s
- [ ] HMR responde em < 500ms no Windows
- [ ] Addon multi-framework-code funciona corretamente
- [ ] Chromatic build passa sem erros
- [ ] Zero regressões em componentes existentes

### Rollback Plan

Se alguma fase falhar criticamente:

1. **Fase 1**: Reverter `.nvmrc` e `engines` nos package.json
2. **Fase 2**: `config.build.minify = false` temporariamente
3. **Fase 3**: Remover configurações de watcher
4. **Fase 4**: Desativar addon problemático
5. **Fase 5**: Usar versão anterior do Chromatic Action

Comando de rollback rápido:
```bash
git checkout master -- .nvmrc package.json apps/storybook/.storybook/main.ts
pnpm install
```

## Performance Benchmarks

### Antes (Node 18, sem otimizações)

- Dev server startup: **~15-20s**
- HMR: **1-3s** (Windows com polling manual)
- Build produção: **FALHA** (erro de minificação)
- Chromatic: **FALHA** (build error)

### Depois (Node 20, otimizado)

- Dev server startup: **< 10s** (meta)
- HMR: **< 500ms** (meta)
- Build produção: **< 30s** (meta)
- Chromatic: **SUCESSO** (meta)

## Complexity Tracking

> Este plano não introduz violações de complexidade. Todas as mudanças são configurações padrão do ecossistema Node.js/Vite/Storybook.

| Violação | Why Needed | Simpler Alternative Rejected Because |
|----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Next Steps

Após conclusão deste plano:

1. Criar `tasks.md` detalhado com checklist
2. Executar Fase 0 (research) e documentar em `research.md`
3. Criar `quickstart.md` com guia de migração
4. Abrir PR com título: `fix: standardize Node 20 and resolve build issues`
5. Executar full test suite antes de merge
6. Atualizar documentação principal do projeto

## References

- [Node.js 20 Release Notes](https://nodejs.org/en/blog/release/v20.0.0)
- [Vite 6 Migration Guide](https://vite.dev/guide/migration.html)
- [Storybook 10 Migration](https://storybook.js.org/docs/migration-guide)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Chromatic CI](https://www.chromatic.com/docs/ci)

---

**Status**: Draft  
**Responsável**: Time de Infra + Design System  
**Revisores**: Tech Lead, DevOps  
**Prazo Estimado**: 1-2 dias úteis
