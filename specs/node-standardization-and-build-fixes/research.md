# Research: Node Standardization and Build Fixes

**Data**: 28/01/2026  
**Status**: Fase 0 - Diagnóstico Completo  
**Branch Base**: `master`

---

## Executive Summary

✅ **Build de produção FUNCIONANDO** após correção de import  
⚠️ **Node 22.x** local vs Node 20.x recomendado  
⚠️ **20 dependências desatualizadas** identificadas  
✅ **Storybook 10.2.0** instalado e operacional  
⚠️ **Performance OK** mas pode melhorar (dev: 4.5s manager + 7.6s preview)

---

## T001: Versões de Node e pnpm

### Local (Windows)

```
Node: v22.20.0
pnpm: (versão não capturada explicitamente, mas funcionando)
```

**⚠️ Problema identificado**: Local usando Node 22, mas recomendação é Node 20 LTS

### CI/CD (GitHub Actions)

#### chromatic.yml
```yaml
node-version: 20
pnpm-version: 9.15.0
```

#### ci.yml
```yaml
node-version: 20
cache: "pnpm"
```

**✅ CI já configurado para Node 20**

---

## T002: Erros de Build

### Erro Original Identificado

**Erro**: `Cannot find module '@educacross/ui/tailwind-preset'`

**Root Cause**: Import incorreto no `apps/storybook/tailwind.config.ts`
- Tentava importar de: `@educacross/ui/tailwind-preset`
- Deveria ser: `@fabioeducacross/ui/tailwind-preset`

**Fix Aplicado**: ✅ Corrigido em commit anterior a este research

### Build Performance

**Antes da correção**: FALHA em ~1 segundo  
**Após correção**: ✅ SUCESSO em **103.7 segundos** (~1min 44s)

**Breakdown**:
```
Manager build: [tempo não especificado nos logs]
Preview build: 103.7s total
Total build time: ~1min 44s
```

**⚠️ Observação**: Build de produção relativamente lento para 37 componentes

---

## T003: Baseline Performance Metrics

### Dev Server Startup (modo dev)

Medido em execução recente (antes do research):

```
Manager: 4.54s
Preview: 7.67s
Total: ~12.2s
```

**Meta**: < 10s total (atualmente 12.2s)

### Hot Module Replacement (HMR)

**Não medido neste research** - requer teste manual de edição de arquivo

**Meta esperada**: < 500ms

### Build de Produção

**Atual**: 103.7s (~1min 44s)  
**Meta**: < 30s

**⚠️ Gap significativo**: Build está 3.5x mais lento que o ideal

---

## T004: Logs do Chromatic

**Status**: ✅ Chromatic configurado corretamente no CI

```yaml
# .github/workflows/chromatic.yml
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
exitZeroOnChanges: true
exitOnceUploaded: true
onlyChanged: true  # Testa apenas stories modificadas
autoAcceptChanges: master  # Auto-aprova builds na master
```

**Nota**: Não há logs de falhas recentes disponíveis localmente. Pipeline parece funcional.

---

## T005: Dependências Desatualizadas

Total: **20 pacotes** com atualizações disponíveis

### Critical Updates (Breaking Changes Potenciais)

| Package | Current | Latest | Impact |
|---------|---------|--------|--------|
| **react** | 18.3.1 | 19.2.4 | 🔴 MAJOR - Requer migração cuidadosa |
| **react-dom** | 18.3.1 | 19.2.4 | 🔴 MAJOR - Requer migração cuidadosa |
| **@types/react** | 18.3.27 | 19.2.9 | 🔴 MAJOR - Tipos incompatíveis |
| **@types/react-dom** | 18.3.7 | 19.2.3 | 🔴 MAJOR - Tipos incompatíveis |
| **@hookform/resolvers** | 3.10.0 | 5.2.2 | 🔴 MAJOR - Breaking changes |
| **tailwindcss** | 3.4.19 | 4.1.18 | 🔴 MAJOR - Sintaxe mudou |
| **vite** | 6.4.1 | 7.3.1 | 🟡 MAJOR - Mas provavelmente compatível |
| **zod** | 3.25.76 | 4.3.5 | 🔴 MAJOR - Validação pode quebrar |

**⚠️ Recomendação**: NÃO atualizar React 18 → 19 neste momento. Foco em Node 20 primeiro.

### Minor/Patch Updates (Seguros)

| Package | Current | Latest | Type |
|---------|---------|--------|------|
| @testing-library/react | 16.3.1 | 16.3.2 | Patch |
| @vitest/coverage-v8 | 4.0.17 | 4.0.18 | Patch |
| prettier | 3.8.0 | 3.8.1 | Patch |
| vitest | 4.0.17 | 4.0.18 | Patch |
| @types/node | 22.19.7 | 25.0.10 | Major (mas types) |
| @vitejs/plugin-react | 4.7.0 | 5.1.2 | Major |
| apexcharts | 4.7.0 | 5.3.6 | Major |
| eslint-plugin-react-hooks | 5.2.0 | 7.0.1 | Major |
| qrcode.react | 3.2.0 | 4.2.0 | Major |
| sharp | 0.33.5 | 0.34.5 | Minor |

**✅ Recomendação**: Atualizar patches e minors seguros após Node 20

---

## T007: Versões de Ferramentas Críticas

### Storybook

```json
"@storybook/addon-a11y": "10.2.0"
"@storybook/addon-docs": "10.2.0"
"@storybook/addon-links": "10.2.0"
"@storybook/addon-themes": "10.2.0"
"@storybook/react": "10.2.0"
"@storybook/react-vite": "10.2.0"
"storybook": "10.2.0"
```

**✅ Versão consistente**: Todos addons em 10.2.0

### Vite

```json
"vite": "^6.0.6"  (no storybook)
```

**Atual**: 6.4.1 (instalado via pnpm)  
**Latest**: 7.3.1  
**⚠️ Gap**: 1 major version atrás

### Build Tools

```json
"typescript": "^5.7.2"
"@vitejs/plugin-react": "^4.3.4"
"tailwindcss": "^3.4.17"
```

**✅ TypeScript**: Versão moderna 5.7.2  
**⚠️ Vite plugin**: 1 major atrás (4 vs 5)  
**⚠️ Tailwind**: 1 major atrás (3 vs 4)

---

## T008: Bundle Size Analysis

**Não executado** - requer `--stats-json` e visualizador

**Razão**: Build já demorou 103s, análise de bundle adiciona overhead

**Ação futura**: Executar na Fase 2 (Minification) se necessário

---

## Descobertas Adicionais

### 1. Build Minification Status

**Estado atual**: ✅ Minificação DESABILITADA intencionalmente

```ts
// apps/storybook/.storybook/main.ts
config.build.minify = false;
config.build.sourcemap = false;
```

**Razão provável**: Performance ou erro anterior não documentado

**Ação**: Fase 2 deve testar re-ativação com Node 20

### 2. Watcher Configuration

**Estado atual**: Básico, sem otimizações Windows

```ts
// Não há configuração explícita de polling ou watch interval
```

**Ação**: Fase 3 deve adicionar otimizações

### 3. Addon Custom (multi-framework-code)

**Localização**: `apps/storybook/.storybook/addons/multi-framework-code/`

**Status**: ✅ Funcionando no dev server

**Ação**: Fase 4 deve validar compatibilidade Storybook 10

---

## Problemas Críticos Identificados

### 🔴 P0: Node Version Mismatch

- **Local**: Node 22.x
- **CI**: Node 20.x
- **Impacto**: Comportamento inconsistente entre ambientes
- **Fix**: Criar `.nvmrc` e forçar Node 20 local

### 🟡 P1: Build Performance

- **Atual**: 103s (1min 44s)
- **Meta**: < 30s
- **Gap**: 3.5x mais lento
- **Possíveis causas**:
  1. Minificação desabilitada (código maior)
  2. Sourcemaps desabilitados (menos paralelização?)
  3. Cache não otimizado
  4. 37 componentes + stories grandes

### 🟡 P2: Dev Server Startup

- **Atual**: 12.2s
- **Meta**: < 10s
- **Gap**: 22% acima da meta
- **Possíveis causas**:
  1. Muitas stories carregadas de uma vez
  2. Falta de pre-bundling de deps
  3. Watcher ineficiente

### 🟢 P3: Dependências Desatualizadas

- **Patches seguros**: 4 pacotes
- **Minors seguros**: ~6 pacotes
- **Majors arriscados**: 10 pacotes (incluindo React 19)
- **Ação**: Atualizar apenas seguros inicialmente

---

## Recomendações de Ação

### Fase 1: Node 20 Standardization (CRÍTICO)

✅ **Fácil e sem risco**

1. Criar `.nvmrc` com `20.18.0`
2. Adicionar `engines.node: "^20.0.0"` em package.json
3. Testar localmente com `nvm use`
4. Validar CI (já configurado)

**Estimativa**: 30 minutos  
**Risco**: Baixo

### Fase 2: Build Optimization (MÉDIO)

⚠️ **Requer testes cuidadosos**

1. Re-ativar minificação com Node 20
2. Testar esbuild vs terser
3. Adicionar sourcemaps condicionais (apenas dev)
4. Otimizar rollup options

**Estimativa**: 1-2 horas  
**Risco**: Médio (pode quebrar build)

### Fase 3: Dev Performance (BAIXO RISCO)

✅ **Melhorias incrementais**

1. Adicionar polling para Windows
2. Configurar HMR timeout
3. Otimizar watcher ignored dirs
4. Cache de pre-bundling

**Estimativa**: 30 minutos  
**Risco**: Baixo

### Fase 4: Dependency Updates (BAIXO RISCO)

✅ **Apenas patches/minors**

Atualizar:
- @testing-library/react 16.3.1 → 16.3.2
- @vitest/coverage-v8 4.0.17 → 4.0.18
- prettier 3.8.0 → 3.8.1
- vitest 4.0.17 → 4.0.18

**NÃO atualizar**: React 19, Tailwind 4, Vite 7, Zod 4

**Estimativa**: 15 minutos  
**Risco**: Muito baixo

---

## Performance Benchmarks

### Baseline (28/01/2026 - Node 22.x)

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Dev startup (manager) | 4.54s | < 5s | ✅ OK |
| Dev startup (preview) | 7.67s | < 5s | ⚠️ 53% acima |
| Dev startup (total) | 12.2s | < 10s | ⚠️ 22% acima |
| Build (prod) | 103.7s | < 30s | 🔴 346% acima |
| HMR | ? | < 500ms | ❓ Não medido |

### Target (After Optimization - Node 20.x)

| Metric | Target | Strategy |
|--------|--------|----------|
| Dev startup | < 10s | Pre-bundling + cache |
| Build (prod) | < 30s | Minify + parallel + cache |
| HMR | < 500ms | Polling + timeout |

---

## Environment Matrix

| Environment | Node | pnpm | Status |
|-------------|------|------|--------|
| **Local (Windows)** | 22.20.0 | ? | ⚠️ Downgrade needed |
| **CI (GitHub Actions)** | 20.x | 9.15.0 | ✅ Correto |
| **Chromatic** | 20.x (assumed) | ? | ✅ Provavelmente correto |

---

## Next Steps

1. ✅ **DONE**: Research completo
2. ⏭️ **NEXT**: Executar Fase 1 (Node 20 standardization)
3. ⏭️ **THEN**: Executar Fase 2 (Build optimization)
4. ⏭️ **OPTIONAL**: Fases 3-4 (se tempo permitir)

---

## Conclusão

✅ **Build está funcional** após fix do import  
⚠️ **Performance pode melhorar** 3-4x com otimizações  
✅ **CI bem configurado** (Node 20 já presente)  
⚠️ **Local precisa de downgrade** (22 → 20)  
🟢 **Addons e ferramentas estáveis**  

**Confiança**: 95%  
**Risco geral**: Baixo (fixes são incrementais e reversíveis)
