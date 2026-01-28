# Spec: Node Standardization and Build Fixes

**Status**: ✅ **Fases 1, 3-6 COMPLETAS** | ⏳ **Fase 2 aguarda Node 20 local**  
**Data**: 28/01/2026  
**Branch**: `master`

---

## Executive Summary

Projeto de padronização de ambiente Node.js 20 LTS e otimizações de performance do Storybook. Descoberta e correção de bug crítico bloqueador de build durante diagnóstico.

### Resultado Geral

- ✅ **Build funcional** após fix de import crítico
- ✅ **Node 20 padronizado** em CI/CD e documentação
- ✅ **Storybook otimizado** para Windows (watcher + HMR)
- ✅ **Addon custom validado** (compatível Storybook 10)
- ✅ **CI/CD funcionais** (Chromatic + GitHub Actions)
- ⏳ **Build optimization** aguarda Node 20 local (Fase 2)

---

## Problemas Críticos Resolvidos

### 1. Build Bloqueador (P0 - CRÍTICO)

**Problema**: Todos os builds de produção falhando  
**Erro**: `Cannot find module '@educacross/ui/tailwind-preset'`  
**Root Cause**: Import incorreto no `apps/storybook/tailwind.config.ts`  
**Fix**: Changed `@educacross/ui` → `@fabioeducacross/ui`  
**Status**: ✅ RESOLVIDO

**Impact**: Build agora completa em 103.7s (antes: FAIL)

### 2. Node Version Mismatch (P0 - MITIGADO)

**Problema**: Local usando Node 22.x, CI usando Node 20.x  
**Risk**: Inconsistências de comportamento entre ambientes  
**Fix Aplicado**:
- Criado `.nvmrc` com `20.18.0`
- Adicionado `engines.node: "^20.0.0"` em 3 package.json
- Documentado no README.md

**Status**: ⏳ AGUARDA AÇÃO DO USUÁRIO (instalar Node 20)

### 3. Watcher Performance no Windows (P2 - OTIMIZADO)

**Problema**: HMR lento ou não detectando mudanças  
**Fix**:
- Polling habilitado (`usePolling: true`)
- Interval otimizado (100ms)
- Paths ignorados (node_modules, .git, dist, .vite)
- HMR timeout aumentado (60s)

**Status**: ✅ RESOLVIDO

---

## Fases Executadas

### ✅ Fase 0: Research & Diagnostics

**Duração**: ~1 hora  
**Deliverables**:
- [research.md](./research.md) - Diagnóstico completo
- Baseline metrics capturados
- 20 dependências desatualizadas identificadas
- Build crítico consertado

**Key Findings**:
- Node 22.x local vs 20.x CI
- Build time: 103.7s (meta: < 30s)
- Dev startup: 12.2s (meta: < 10s)
- 3 major updates pendentes (React 19, Vite 7, Tailwind 4)

### ✅ Fase 1: Node 20 Standardization

**Duração**: 15 minutos  
**Deliverables**:
- `.nvmrc` criado
- `engines.node` adicionado (3 package.json)
- README.md atualizado com requisitos
- [quickstart.md](./quickstart.md) criado

**Arquivos modificados**:
- `.nvmrc`
- `package.json`
- `packages/ui/package.json`
- `apps/storybook/package.json`
- `README.md`

### ⏸️ Fase 2: Build Optimization (PAUSADA)

**Status**: Aguardando Node 20 local  
**Razão**: Precisa validar com Node 20 para garantir consistência com CI  
**Pendências**:
- Re-ativar minificação (`minify: 'esbuild'`)
- Testar build performance
- Otimizar Rollup/Vite config

**Ação necessária**: Usuário instalar Node 20 primeiro

### ✅ Fase 3: Watcher/HMR Optimization

**Duração**: 10 minutos  
**Deliverables**:
- Polling configurado para Windows
- HMR timeout otimizado
- Paths ignorados para performance

**Arquivos modificados**:
- `apps/storybook/.storybook/main.ts`

**Configurações aplicadas**:
```typescript
config.server.watch = {
  usePolling: true,
  interval: 100,
  ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', /*...*/],
};

config.server.hmr = {
  timeout: 60000,
  overlay: true,
  clientPort: 6006,
};
```

### ✅ Fase 4: Addon Validation

**Duração**: 5 minutos  
**Deliverables**:
- Addon custom validado
- APIs Storybook 10 confirmadas compatíveis

**Resultado**: Addon `multi-framework-code` funcional
- `addons.register()` ✅
- `types.PANEL` ✅
- `useStorybookApi()` ✅
- `useParameter()` ✅

### ✅ Fase 5: Chromatic Validation

**Duração**: 5 minutos  
**Deliverables**:
- CI workflows validados
- Secrets confirmados

**Status CI/CD**:
- ✅ chromatic.yml: Node 20, pnpm 9.15.0
- ✅ ci.yml: Node 20 (lint + typecheck)
- ✅ CHROMATIC_PROJECT_TOKEN configurado
- ✅ Auto-accept em master
- ✅ onlyChanged habilitado

### ✅ Fase 6: Documentation & Cleanup

**Duração**: 20 minutos  
**Deliverables**:
- CHANGELOG.md atualizado
- quickstart.md criado
- spec.md criado (este arquivo)
- research.md completo

---

## Performance Metrics

### Baseline (Node 22.x - Atual)

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Dev startup (manager) | 4.54s | < 5s | ✅ OK |
| Dev startup (preview) | 7.67s | < 5s | ⚠️ 53% acima |
| Dev startup (total) | 12.2s | < 10s | ⚠️ 22% acima |
| Build (prod) | 103.7s | < 30s | 🔴 346% acima |
| HMR | ? | < 500ms | ❓ Não medido |

### Expectativa (Node 20.x + Fase 2)

Após completar Fase 2 com Node 20:
- Dev startup: **< 10s** (com watcher otimizado)
- Build (prod): **< 40s** (com minificação)
- HMR: **< 500ms** (com polling otimizado)

---

## Dependências Identificadas

### Outdated Packages (20 total)

**Major Updates (BREAKING - não recomendado agora)**:
- react: 18.3.1 → 19.2.4
- vite: 6.4.1 → 7.3.1
- tailwindcss: 3.4.19 → 4.1.18
- zod: 3.25.76 → 4.3.5
- @hookform/resolvers: 3.10.0 → 5.2.2
- @types/react: 18.3.27 → 19.2.9
- @types/react-dom: 18.3.7 → 19.2.3

**Safe Updates (patches/minors)**:
- @testing-library/react: 16.3.1 → 16.3.2
- @vitest/coverage-v8: 4.0.17 → 4.0.18
- prettier: 3.8.0 → 3.8.1
- vitest: 4.0.17 → 4.0.18

**Recomendação**: Atualizar apenas patches após Fase 2 completa

---

## Architecture Decisions

### ADR-001: Node 20 LTS como Padrão

**Contexto**: Local usando Node 22, CI usando Node 20  
**Decisão**: Padronizar Node 20 LTS (20.18.0) em todos ambientes  
**Rationale**:
- Node 20 é LTS até Outubro 2026
- CI já usa Node 20
- Evita "works on my machine"

**Consequências**:
- ✅ Consistência entre ambientes
- ✅ Maior estabilidade (LTS)
- ⚠️ Requer downgrade local

### ADR-002: Polling para Windows

**Contexto**: Watcher pode não detectar mudanças no Windows  
**Decisão**: Habilitar `usePolling: true` com `interval: 100ms`  
**Rationale**:
- Windows filesystem events menos confiáveis
- Polling é mais consistente
- 100ms é trade-off entre responsividade e CPU

**Consequências**:
- ✅ HMR mais confiável
- ⚠️ Leve aumento no uso de CPU

### ADR-003: Postpone Dependency Updates

**Contexto**: 20 packages desatualizados, incluindo React 19  
**Decisão**: NÃO atualizar majors agora, apenas patches depois  
**Rationale**:
- React 19 tem breaking changes
- Tailwind 4 requer migração
- Vite 7 pode ter incompatibilidades
- Foco é Node 20 e build fixes

**Consequências**:
- ✅ Menor risco de quebra
- ✅ Foco em estabilização
- ⚠️ Tech debt acumula (mas controlado)

---

## Rollback Plan

Se algo der errado após Node 20:

### 1. Reverter Node Version
```bash
nvm use 22.20.0
# ou reinstalar Node 22 manualmente
```

### 2. Reverter .nvmrc e engines
```bash
git checkout HEAD~1 .nvmrc
git checkout HEAD~1 package.json packages/ui/package.json apps/storybook/package.json
```

### 3. Reinstalar dependências
```bash
pnpm install
```

### 4. Validar build
```bash
pnpm build
```

---

## Next Steps

### Immediate (Usuário)

1. **Instalar Node 20 LTS**
   ```bash
   nvm install 20.18.0
   nvm use 20.18.0
   ```

2. **Reinstalar dependências**
   ```bash
   pnpm install
   ```

3. **Validar build**
   ```bash
   pnpm build
   ```

### After Node 20 (Fase 2)

1. Re-ativar minificação no main.ts
2. Testar build performance
3. Otimizar Rollup config se necessário
4. Medir e documentar melhorias

### Optional (Future)

1. Atualizar patches seguros (prettier, vitest)
2. Avaliar React 19 migration (separar em ADR)
3. Avaliar Tailwind 4 migration (separar em ADR)
4. Bundle size analysis com stats-json

---

## Success Criteria

- [x] CI/CD configurado para Node 20 ✅
- [x] Build de produção completa sem erros ✅
- [ ] Dev server < 10s (aguarda Fase 2 + Node 20)
- [ ] HMR < 500ms (precisa teste manual)
- [x] Addon multi-framework funciona ✅
- [x] Chromatic CI passa ✅ (já funcionava)
- [x] Zero regressões ✅
- [x] Documentação atualizada ✅

---

## References

- [plan.md](./plan.md) - Plano original de 5 fases
- [tasks.md](./tasks.md) - 100 tasks detalhadas
- [research.md](./research.md) - Diagnóstico completo
- [quickstart.md](./quickstart.md) - Setup guide
- [CHANGELOG.md](../../CHANGELOG.md) - User-facing changes

---

## Timeline

| Fase | Status | Duração | Data |
|------|--------|---------|------|
| Fase 0 (Research) | ✅ | 1h | 28/01/2026 |
| Fase 1 (Node 20) | ✅ | 15min | 28/01/2026 |
| **Fase 2 (Build)** | ⏸️ | - | Pausado |
| Fase 3 (Watcher) | ✅ | 10min | 28/01/2026 |
| Fase 4 (Addon) | ✅ | 5min | 28/01/2026 |
| Fase 5 (Chromatic) | ✅ | 5min | 28/01/2026 |
| Fase 6 (Docs) | ✅ | 20min | 28/01/2026 |

**Total time spent**: ~2 horas (de 5-7h estimadas)  
**Remaining**: Fase 2 (1-2h) quando Node 20 estiver instalado

---

## Contributors

- **Agent**: fullstack_programmer mode (GitHub Copilot)
- **Human**: Code review e decisões de arquitetura

---

**Last updated**: 28/01/2026  
**Version**: 1.0  
**Status**: ✅ 5 de 6 fases completas (83% progresso)
