# Guia de Migração — Chromatic entre Repositórios

## 📋 Visão Geral

Este documento detalha como migrar seu Design System com Chromatic para um novo repositório Git, mantendo histórico visual, baselines e configurações.

---

## 🎯 Cenários de Migração

### Cenário A: Mover para Novo Repositório (mesma conta Chromatic)

**Quando usar:**
- Fork do projeto para nova organização
- Renomeação de repositório
- Reorganização de estrutura git
- Novo remote origin

**Vantagens:**
✅ Preserva histórico de 270+ snapshots  
✅ Mantém baselines de todas stories  
✅ Zero retrabalho de configuração  
✅ Comparações visuais funcionam entre branches  

### Cenário B: Criar Novo Projeto Chromatic

**Quando usar:**
- Mudança de conta/organização Chromatic
- Isolamento total de ambientes (prod vs staging)
- Requisito de billing/faturamento separado
- Fork público de projeto privado

**Desvantagens:**
⚠️ Perde histórico visual acumulado  
⚠️ Precisa refazer baselines iniciais  
⚠️ Requer nova configuração completa  

---

## 🚀 Migração Rápida (Cenário A — Recomendado)

### Pré-requisitos

- [ ] Acesso ao novo repositório git
- [ ] Permissão de admin no GitHub/GitLab para adicionar secrets
- [ ] Token Chromatic atual: `chpt_84de3749269a39d`
- [ ] Project ID atual: `69727df0ab06437ceb56a008`

### Passo 1: Clone e Configuração Local

```bash
# Clone do novo repositório
git clone https://github.com/NOVO_OWNER/NOVO_REPO.git
cd NOVO_REPO

# Instalar dependências
pnpm install

# Verificar build local
pnpm build

# Testar Storybook localmente
pnpm storybook
```

**Validação:** Storybook abre em `localhost:6006` sem erros.

### Passo 2: Adicionar Secret no GitHub

**URL de acesso:**  
```
https://github.com/NOVO_OWNER/NOVO_REPO/settings/secrets/actions
```

**Configuração:**
1. Clique em **"New repository secret"**
2. Preencha:
   ```
   Nome: CHROMATIC_PROJECT_TOKEN
   Valor: chpt_84de3749269a39d
   ```
3. Salve ✅

**Importante:** Este é o **único passo manual obrigatório**. Secrets não são transferidos automaticamente por segurança.

### Passo 3: Testar Deploy Manual

```bash
# Deploy manual para validar conectividade
pnpm chromatic

# Ou com flags de otimização
pnpm exec chromatic --project-token=chpt_84de3749269a39d --exit-zero-on-changes
```

**Resultado esperado:**
```
✔ Build 14 published
✔ View it online: https://69727df0ab06437ceb56a008-xxxxxxxx.chromatic.com/
```

### Passo 4: Validar CI/CD

```bash
# Fazer commit de teste
git add .
git commit -m "test: valida integração Chromatic"
git push origin master
```

**Verificar:**
1. Acesse: `https://github.com/NOVO_OWNER/NOVO_REPO/actions`
2. Workflow "Chromatic Visual Testing" deve executar automaticamente
3. Status check aparece na lista de commits
4. Build publicado no Chromatic

---

## 🔄 Como Funciona a Preservação de Histórico

### Baselines e Git History

O Chromatic rastreia snapshots usando **commit SHA do git**, não URLs de repositório:

```
main
  x (Build N, commit: a1b2c3d)
  y (Build N+1, commit: e4f5g6h)  ← Baseline calculado por ancestralidade git
  z (Build N+2, commit: i7j8k9l)
```

**Como funciona:**
1. Chromatic lê o histórico git (`fetch-depth: 0` no workflow)
2. Identifica commit ancestral com build anterior
3. Compara snapshots usando SHAs, não URLs
4. Baselines persistem entre branches e merges

**Fonte:** [Chromatic Docs - Branches & Baselines](https://www.chromatic.com/docs/branching-and-baselines)

### Merge Base e Pull Requests

Quando você abre uma PR no novo repo:

```
base (master)        head (feature)
    x ───────┐
             │
    w        p
    │        q  ← Chromatic compara 'q' com merge-base 'x'
    y
    z
```

**Benefícios:**
- ✅ UI Review funciona imediatamente
- ✅ Detecta mudanças visuais em PRs
- ✅ Comparações precisas mesmo após rebase
- ✅ Auto-aceita mudanças no master (se configurado)

---

## 📦 Arquivos Portáveis

Estes arquivos **migram automaticamente** com o git clone:

### Configuração Chromatic
```json
// chromatic.config.json
{
  "projectId": "69727df0ab06437ceb56a008",  // ✅ Independente de repo
  "buildScriptName": "build:storybook",
  "storybookBaseDir": "apps/storybook"       // ✅ Path relativo
}
```

### Workflow CI/CD
```yaml
# .github/workflows/chromatic.yml
# ✅ Usa secret do novo repo automaticamente
# ✅ Paths relativos
# ✅ Configuração agnóstica de URL
```

### Scripts NPM
```json
// package.json
"scripts": {
  "chromatic": "chromatic --project-token=chpt_84de3749269a39d"
  // ⚠️ Token exposto no repo (OK para projetos públicos)
  // Para privados, use: "chromatic": "chromatic --exit-zero-on-changes"
}
```

### Storybook Config
```typescript
// apps/storybook/.storybook/main.ts
// ✅ Usa caminhos relativos via resolve(__dirname)
// ✅ Sem referências absolutas
// ✅ Base path removido (compatível com Chromatic)
```

---

## 🔐 Segurança: Token vs Secret

### Opção 1: Token no package.json (Atual)

```json
"scripts": {
  "chromatic": "chromatic --project-token=chpt_84de3749269a39d"
}
```

**Quando usar:**
- ✅ Repositório **público** (ex: design system open-source)
- ✅ Token de read-only (não permite alterações destrutivas)
- ✅ Conveniência para colaboradores externos

**Riscos:**
- ⚠️ Token visível no histórico git
- ⚠️ Qualquer pessoa pode fazer builds

### Opção 2: Apenas Secret (Recomendado para Privados)

```json
"scripts": {
  "chromatic": "chromatic --exit-zero-on-changes"
}
```

```yaml
# .github/workflows/chromatic.yml
with:
  projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

**Quando usar:**
- ✅ Repositório **privado** ou enterprise
- ✅ Requer controle de acesso estrito
- ✅ Conformidade com políticas de segurança

**Vantagens:**
- ✅ Token não exposto publicamente
- ✅ Rotação de token sem alterar código
- ✅ Auditoria via secrets do GitHub

---

## 🔄 Migração para Novo Projeto Chromatic (Cenário B)

Se precisar criar um **novo projeto** no Chromatic:

### Passo 1: Criar Projeto

1. Acesse: https://www.chromatic.com/start
2. Conecte o novo repositório git
3. Escolha "Storybook" como framework
4. Você receberá:
   ```
   Project ID: NOVO_ID_AQUI
   Project Token: chpt_NOVO_TOKEN_AQUI
   ```

### Passo 2: Atualizar Configuração

```bash
# 1. Atualizar chromatic.config.json
cat > chromatic.config.json << 'EOF'
{
  "$schema": "https://www.chromatic.com/config-file.schema.json",
  "projectId": "NOVO_ID_AQUI",
  "buildScriptName": "build:storybook",
  "storybookBaseDir": "apps/storybook"
}
EOF

# 2. Atualizar package.json (se estiver usando token inline)
# Substitua chpt_84de3749269a39d por chpt_NOVO_TOKEN_AQUI

# 3. Atualizar README badges (opcional)
# Substitua 69727df0ab06437ceb56a008 por NOVO_ID_AQUI
```

### Passo 3: Setup Inicial

```bash
# Primeiro build cria baselines do zero
pnpm exec chromatic --project-token=chpt_NOVO_TOKEN_AQUI

# Resultado: todas stories marcadas como "new" (esperado)
```

**Importante:** No primeiro build de um novo projeto:
- ✅ Todas 270 stories serão marcadas como **"new"**
- ⚠️ Você precisará **aceitar todas** manualmente como baselines
- ⏱️ Processo de aceitação: ~10-15 minutos via interface web

### Passo 4: Aceitar Baselines Iniciais

1. Acesse o build no Chromatic: `https://www.chromatic.com/build?appId=NOVO_ID_AQUI`
2. Clique em **"Accept all"** para aprovar todas stories
3. Este snapshot se torna o baseline para futuras comparações

---

## 🎯 Casos de Uso Reais

### Caso 1: Fork para Empresa Cliente

**Situação:** Seu DS precisa ser customizado para cliente com repo separado.

**Recomendação:** **Cenário A** (manter projeto Chromatic)

**Motivo:**
- Histórico visual útil para rastrear divergências
- Economia de tempo (não refaz baselines)
- Cliente pode ver evolução desde o fork

**Passos:**
1. Fork do repositório no GitHub
2. Adicionar `CHROMATIC_PROJECT_TOKEN` no novo repo
3. Primeiro push automaticamente vincula ao projeto existente

### Caso 2: Migração para Monorepo

**Situação:** DS atual vira pacote dentro de monorepo maior.

**Recomendação:** **Cenário A** (manter projeto)

**Ajustes:**
```json
// chromatic.config.json
{
  "projectId": "69727df0ab06437ceb56a008",
  "buildScriptName": "build:storybook",
  "storybookBaseDir": "packages/design-system/storybook"  // ← Path atualizado
}
```

**Workflow:**
```yaml
# .github/workflows/chromatic.yml
- name: Build pacotes
  run: pnpm build --filter=design-system  # ← Filtro de workspace
```

### Caso 3: Ambiente de Staging Separado

**Situação:** Criar réplica do DS para testes disruptivos.

**Recomendação:** **Cenário B** (novo projeto)

**Motivo:**
- Isolamento total de builds
- Evita poluir histórico de produção
- Permite experimentação sem riscos

**Configuração:**
```bash
# Crie projeto "DS Staging" no Chromatic
# Use token diferente
pnpm exec chromatic --project-token=chpt_STAGING_TOKEN
```

### Caso 4: Open-Source após Projeto Privado

**Situação:** Tornar DS privado em repositório público.

**Recomendação:** **Cenário B** (novo projeto público)

**Motivo:**
- Histórico privado não deve vazar
- Novo projeto começa com baselines "limpos"
- Token do projeto privado permanece seguro

**Checklist:**
1. Criar novo projeto Chromatic público
2. Limpar histórico git sensível (`git filter-repo`)
3. Usar token read-only no package.json
4. Documentar no README que é projeto open-source

---

## ⚠️ Problemas Comuns e Soluções

### Problema 1: Workflow não executa após migração

**Sintomas:**
- Actions tab mostra workflow desabilitado
- Commits não disparam builds

**Causa:**
- GitHub desabilita workflows em forks por padrão

**Solução:**
```bash
# 1. Vá para Actions tab do novo repo
# 2. Clique "Enable workflows"
# 3. Ou via settings:
gh repo edit --enable-workflows
```

### Problema 2: Builds não comparam com histórico

**Sintomas:**
- Todas stories aparecem como "new"
- Baselines não encontrados

**Causa:**
- `fetch-depth: 0` ausente no workflow
- Histórico git superficial

**Solução:**
```yaml
# .github/workflows/chromatic.yml
steps:
  - uses: actions/checkout@v4
    with:
      fetch-depth: 0  # ← OBRIGATÓRIO para histórico completo
```

### Problema 3: URLs 404 após migração

**Sintomas:**
- Storybook publicado, mas URLs retornam 404
- JavaScript failed to load

**Causa:**
- Base path absoluto no Storybook config

**Solução:**
```typescript
// apps/storybook/.storybook/main.ts
// ❌ REMOVER:
// config.base = '/Design_System_Educacross/'

// ✅ MANTER:
// (sem base path ou usar base: './')
```

### Problema 4: Secret não encontrado

**Sintomas:**
```
Error: CHROMATIC_PROJECT_TOKEN is not set
```

**Causa:**
- Secret não adicionado no novo repositório
- Nome do secret incorreto (case-sensitive)

**Solução:**
```bash
# 1. Verifique nome exato:
# Settings → Secrets → Actions

# 2. Nome deve ser EXATAMENTE:
CHROMATIC_PROJECT_TOKEN

# 3. Valor deve ser:
chpt_84de3749269a39d
```

### Problema 5: Baselines divergem após merge

**Sintomas:**
- Stories aprovadas voltam a mostrar mudanças
- Diffs inesperados após merge para master

**Causa:**
- Branch desatualizada com master
- Merge base muito antigo

**Solução:**
```bash
# Atualizar branch antes de abrir PR
git checkout feature-branch
git pull origin master
git push

# Chromatic recalcula merge-base automaticamente
```

---

## 📊 Checklist de Validação Pós-Migração

Após migrar, valide todos os pontos:

### ✅ Configuração Local
- [ ] `pnpm install` executa sem erros
- [ ] `pnpm build` compila todos pacotes
- [ ] `pnpm storybook` abre em localhost:6006
- [ ] Todas stories renderizam corretamente

### ✅ Chromatic Manual
- [ ] `pnpm chromatic` executa com sucesso
- [ ] Build publicado com 270+ stories
- [ ] URL do Storybook acessível
- [ ] Não há erros 404 em assets

### ✅ GitHub Actions
- [ ] Secret `CHROMATIC_PROJECT_TOKEN` adicionado
- [ ] Workflow aparece na tab "Actions"
- [ ] Push para master dispara workflow automaticamente
- [ ] Status checks aparecem em commits/PRs

### ✅ Integração Git
- [ ] PR checks aparecem com ✅ verde
- [ ] Badge no README atualizado e funcional
- [ ] Comparações visuais funcionam em PRs
- [ ] Baselines preservados do repo anterior

### ✅ Documentação
- [ ] README atualizado com novo repo/badges
- [ ] Links de documentação funcionam
- [ ] CHANGELOG menciona migração (se aplicável)
- [ ] Guia de contribuição reflete novo repo

---

## 🔗 Recursos e Referências

### Documentação Oficial Chromatic
- [Branching and Baselines](https://www.chromatic.com/docs/branching-and-baselines) — Como Chromatic rastreia histórico visual
- [CI Configuration](https://www.chromatic.com/docs/ci) — Setup de integração contínua
- [GitHub Actions](https://www.chromatic.com/docs/github-actions) — Workflow específico do GitHub

### Documentação Interna do Projeto
- [docs/CHROMATIC.md](./CHROMATIC.md) — Referência técnica completa
- [docs/CHROMATIC_QUICKSTART.md](./CHROMATIC_QUICKSTART.md) — Guia rápido diário
- [.github/SECRETS.md](../.github/SECRETS.md) — Setup de secrets detalhado
- [docs/INDEX.md](./INDEX.md) — Índice de toda documentação

### Comandos Úteis

```bash
# Verificar configuração Chromatic
cat chromatic.config.json

# Listar secrets do repositório (requer gh CLI)
gh secret list

# Verificar status do último workflow
gh run list --workflow=chromatic.yml --limit=1

# Forçar rebuild ignorando cache
pnpm exec chromatic --force-rebuild

# Deploy sem falhar em mudanças (útil para migração inicial)
pnpm exec chromatic --exit-zero-on-changes
```

---

## 💡 Boas Práticas

### Antes de Migrar
1. ✅ Documente o Project ID e Token atual
2. ✅ Faça backup do histórico de baselines (captura de tela)
3. ✅ Avise o time sobre a migração
4. ✅ Escolha horário de baixo impacto

### Durante a Migração
1. ✅ Teste manualmente antes de configurar CI/CD
2. ✅ Valide um build completo local
3. ✅ Verifique que todas stories renderizam
4. ✅ Documente mudanças no CHANGELOG

### Após a Migração
1. ✅ Monitore primeiro build no CI
2. ✅ Valide que PRs recebem status checks
3. ✅ Atualize badges e links no README
4. ✅ Compartilhe nova URL do Storybook com stakeholders

---

## 📞 Suporte

### Problemas Comuns
Consulte a seção [Problemas Comuns](#⚠️-problemas-comuns-e-soluções) acima.

### Suporte Chromatic
- **Documentação:** https://www.chromatic.com/docs
- **Discord:** https://discord.gg/storybook
- **Email:** support@chromatic.com

### Suporte Interno
- **Tech Lead:** Consulte [docs/INDEX.md](./INDEX.md#por-persona)
- **Issues GitHub:** Abra issue com tag `chromatic` ou `infra`
- **Slack:** Canal `#design-system` (se aplicável)

---

## 🎯 TL;DR — Resumo Executivo

**Pergunta:** Meu DS vai funcionar se mudar de repositório?  
**Resposta:** ✅ **SIM**, com 1 ajuste obrigatório.

**O que migra automaticamente:**
- ✅ Configuração Chromatic (projectId)
- ✅ Workflow GitHub Actions
- ✅ Histórico visual de 270 snapshots
- ✅ Baselines de todas stories
- ✅ Scripts e documentação

**O que você precisa fazer:**
1. ⚠️ Adicionar `CHROMATIC_PROJECT_TOKEN` secret no novo repo (1 minuto)
2. ✅ Testar deploy manual: `pnpm chromatic`
3. ✅ Validar CI/CD: fazer push para master

**Tempo total:** ~5-10 minutos  
**Complexidade:** ⭐ Baixa  
**Risco:** ⭐ Mínimo (configuração reversível)

---

**Última atualização:** 23/01/2026  
**Versão:** 1.0  
**Autor:** Design System Educacross Team
