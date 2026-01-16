# Recomendação Técnica: Publicação do Design System em npm Registry

**Data**: 16 de janeiro de 2026  
**Contexto**: Migração do Design System de monorepo local para pacote distribuível  
**Status**: ⚠️ **BLOQUEADO** - Requer decisão estratégica

---

## 📋 Sumário Executivo

O Design System foi configurado corretamente no GitHub (package.json com exports, dist/ buildado e commitado na tag v0.1.0), mas **não pode ser consumido via GitHub URL** devido a uma limitação técnica dos package managers (pnpm/npm/yarn).

**Recomendação**: Publicar o pacote `@educacross/ui` no **GitHub Packages** (registry npm privado e gratuito) para desbloquear o consumo correto do Design System em projetos consumidores.

---

## 🔍 Problema Identificado

### Comportamento Observado

Ao instalar o Design System via GitHub URL:

```json
{
  "dependencies": {
    "@educacross/ui": "github:fabioeducacross/Design_System_Educacross#v0.1.0"
  }
}
```

**Resultado**: O pnpm clona o **repositório inteiro** (monorepo completo) em vez de instalar apenas o conteúdo declarado no campo `"files": ["dist"]"` do package.json.

**Estrutura instalada**:
```
node_modules/@educacross/ui/
├── .github/
├── .specify/
├── apps/
├── docs/
├── examples/
├── packages/
│   └── ui/
│       ├── dist/          ← O dist EXISTE mas está no lugar errado
│       ├── src/
│       └── package.json
├── specs/
└── package.json           ← Este package.json aponta para ./dist/index.js
```

**Erro resultante**:
```
Failed to resolve entry for package "@educacross/ui". 
The package may have incorrect main/module/exports specified in its package.json.
```

### Causa Raiz

**Limitação técnica documentada dos package managers**: Quando instalando via GitHub URL (`github:owner/repo`), os package managers (pnpm, npm, yarn) fazem um `git clone` completo do repositório, **ignorando** o campo `"files"` do package.json que especifica quais arquivos devem ser incluídos na distribuição.

**Isso é por design**: O campo `"files"` só é respeitado quando o pacote é:
1. Publicado em um registry npm (público ou privado)
2. Empacotado via `npm pack`
3. Instalado via tarball

**Referências**:
- [npm docs - package.json files field](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files)
- [pnpm issue #2974 - Files field ignored with Git URLs](https://github.com/pnpm/pnpm/issues/2974)
- [npm RFC - Git dependencies don't respect files field](https://github.com/npm/rfcs/issues/182)

---

## ✅ Validações Realizadas

Para garantir que o problema não está no Design System, foram feitas as seguintes validações:

### 1. Verificação do package.json no GitHub
```bash
curl -H "Accept: application/vnd.github.v3.raw" \
  https://api.github.com/repos/fabioeducacross/Design_System_Educacross/contents/packages/ui/package.json
```

**Resultado**: ✅ PERFEITO
```json
{
  "name": "@educacross/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.mjs" },
      "require": { "types": "./dist/index.d.ts", "default": "./dist/index.js" }
    },
    "./styles.css": "./dist/styles.css",
    "./tailwind-preset": {
      "import": { "types": "./dist/tailwind-preset.d.ts", "default": "./dist/tailwind-preset.mjs" },
      "require": { "types": "./dist/tailwind-preset.d.ts", "default": "./dist/tailwind-preset.js" }
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup"
  }
}
```

### 2. Verificação do dist/ na tag v0.1.0
```bash
curl -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/fabioeducacross/Design_System_Educacross/git/trees/v0.1.0?recursive=1"
```

**Resultado**: ✅ 147 ARQUIVOS NO dist/ COMMITADOS
- `packages/ui/dist/index.js` ✅
- `packages/ui/dist/index.mjs` ✅
- `packages/ui/dist/index.d.ts` ✅
- `packages/ui/dist/styles.css` ✅
- `packages/ui/dist/assets/Icons/` (todos os SVGs) ✅
- `packages/ui/dist/tailwind-preset.js` ✅
- `packages/ui/dist/tailwind-preset.mjs` ✅
- `packages/ui/dist/tailwind-preset.d.ts` ✅

### 3. Testes de Instalação
```bash
# Teste 1: Instalação via GitHub URL
pnpm install github:fabioeducacross/Design_System_Educacross#v0.1.0
# Resultado: ❌ Instala monorepo completo

# Verificação da estrutura instalada
ls node_modules/@educacross/ui/
# Resultado: .github/ apps/ packages/ specs/ (monorepo inteiro)

# Teste 2: Tentativa de rodar dev server
pnpm dev
# Resultado: ❌ "Failed to resolve entry for package '@educacross/ui'"
```

**Conclusão das Validações**: O Design System está **100% correto** no GitHub. O problema é a **limitação técnica de GitHub URLs não respeitarem o campo "files"**.

---

## 🎯 Opções de Solução

### Opção 1: GitHub Packages (Recomendado) ⭐

**Descrição**: Publicar o pacote no registry npm privado do GitHub (GitHub Packages).

**Prós**:
- ✅ **Gratuito** para repositórios públicos e privados
- ✅ **Privado por padrão** - código não fica exposto publicamente
- ✅ **Integrado com GitHub** - usa mesmas permissões e autenticação
- ✅ **Versionamento semântico** - suporta ranges (`^0.1.0`, `~0.1.0`)
- ✅ **Profissional** - solução padrão para monorepos empresariais
- ✅ **CI/CD fácil** - GitHub Actions tem autenticação automática
- ✅ **Auditoria** - logs de downloads e uso
- ✅ **Respeita campo "files"** - instala apenas dist/

**Contras**:
- 🟡 Requer configuração inicial (uma vez apenas)
- 🟡 Consumidores precisam de `.npmrc` com autenticação
- 🟡 Token de acesso necessário (pode usar GitHub Token existente)

**Esforço**: ~30 minutos de configuração inicial

**Complexidade**: Baixa (processo documentado e automável)

---

### Opção 2: npm Registry Público

**Descrição**: Publicar o pacote no registry público do npmjs.com.

**Prós**:
- ✅ **Instalação simples** - sem configuração de autenticação
- ✅ **Versionamento semântico** - suporta ranges
- ✅ **Descobribilidade** - aparece em pesquisas do npm
- ✅ **CDN global** - performance otimizada
- ✅ **Respeita campo "files"** - instala apenas dist/

**Contras**:
- ❌ **Código exposto publicamente** - qualquer um pode ver e usar
- ❌ **Não reversível** - pacote publicado é permanente
- 🟡 Requer conta no npmjs.com
- 🟡 Nome `@educacross/ui` precisa estar disponível

**Esforço**: ~15 minutos

**Complexidade**: Muito baixa

**⚠️ Consideração estratégica**: Código do Design System ficará público e acessível globalmente.

---

### Opção 3: Workaround com Script de Pós-Instalação

**Descrição**: Manter GitHub URL e criar script que copia dist/ para o lugar correto após instalação.

**Prós**:
- ✅ **Não requer publicação** - mantém GitHub URL
- ✅ **Privado** - código não exposto
- ✅ **Rápido de implementar** - script simples

**Contras**:
- ❌ **Gambiarra técnica** - solução não profissional
- ❌ **Frágil** - pode quebrar em diferentes ambientes (Windows/Linux/Mac)
- ❌ **Lento** - cópia de arquivos a cada `pnpm install`
- ❌ **Não escalável** - cada consumidor precisa do script
- ❌ **Versionamento limitado** - só funciona com tags específicas (`#v0.1.0`)
- ❌ **Cache problemático** - pnpm pode cachear versão errada
- ❌ **CI/CD complexo** - script precisa rodar em pipelines
- ❌ **Manutenção contínua** - quebra a cada mudança de estrutura

**Esforço**: ~1 hora de implementação + testes em diferentes ambientes

**Complexidade**: Média (precisa lidar com edge cases)

**⚠️ Debt técnico**: Solução temporária que aumenta complexidade e fragilidade.

---

## 📊 Comparação de Opções

| Critério | GitHub Packages | npm Público | Workaround Script |
|----------|----------------|-------------|-------------------|
| **Privacidade** | ✅ Privado | ❌ Público | ✅ Privado |
| **Profissionalismo** | ✅ Excelente | ✅ Excelente | ❌ Gambiarra |
| **Facilidade Inicial** | 🟡 Média | ✅ Fácil | 🟡 Média |
| **Manutenção** | ✅ Baixa | ✅ Baixa | ❌ Alta |
| **Performance** | ✅ Ótima | ✅ Ótima | 🟡 Regular |
| **Escalabilidade** | ✅ Sim | ✅ Sim | ❌ Não |
| **Versionamento** | ✅ Completo | ✅ Completo | 🟡 Limitado |
| **CI/CD** | ✅ Simples | ✅ Simples | ❌ Complexo |
| **Debt Técnico** | ✅ Zero | ✅ Zero | ❌ Alto |
| **Custo** | ✅ Grátis | ✅ Grátis | ✅ Grátis |

---

## 🎯 Recomendação Final

### **OPÇÃO 1: GitHub Packages** ⭐

**Justificativa**:

1. **Privacidade Garantida**: Código permanece privado e controlado pelas permissões do GitHub
2. **Solução Profissional**: É a solução padrão da indústria para monorepos empresariais
3. **Escalável**: Suporta múltiplos consumidores sem modificações
4. **Manutenível**: Zero debt técnico, processo documentado e automável
5. **Integrado**: Usa mesma autenticação e permissões do GitHub
6. **CI/CD Simples**: GitHub Actions tem autenticação automática via `GITHUB_TOKEN`
7. **Sem Custo**: Completamente gratuito para repositórios públicos e privados
8. **Reversível**: Pode despublicar versões se necessário
9. **Versionamento Completo**: Suporta semver ranges (`^`, `~`, etc.)
10. **Performance**: CDN do GitHub para distribuição otimizada

**Riscos Mitigados**:
- ❌ Evita gambiarra técnica (Opção 3)
- ❌ Evita exposição pública de código proprietário (Opção 2)
- ✅ Mantém controle de acesso e auditoria
- ✅ Processo padrão da indústria (Microsoft, Google, Facebook usam)

---

## 📝 Implementação Recomendada

### Passo 1: Configurar GitHub Packages no DS

**Arquivo**: `packages/ui/package.json`

```json
{
  "name": "@educacross/ui",
  "version": "0.1.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@fabioeducacross"
  }
}
```

### Passo 2: Criar GitHub Personal Access Token

1. Ir em: https://github.com/settings/tokens
2. Clicar em **"Generate new token (classic)"**
3. Dar um nome: `NPM_PUBLISH_TOKEN`
4. Selecionar scopes:
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `delete:packages` (opcional - para despublicar se necessário)
5. Copiar o token gerado

### Passo 3: Autenticar Localmente

```bash
# Criar .npmrc no DS repo (não commitar!)
echo "@fabioeducacross:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=SEU_TOKEN_AQUI" >> .npmrc

# Ou autenticar globalmente
npm login --registry=https://npm.pkg.github.com
```

### Passo 4: Publicar Primeira Versão

```bash
cd packages/ui

# Garantir que dist/ está atualizado
pnpm build

# Publicar
npm publish
```

**Saída esperada**:
```
+ @educacross/ui@0.1.0
```

### Passo 5: Configurar CI/CD (GitHub Actions)

**Arquivo**: `.github/workflows/publish.yml`

```yaml
name: Publish to GitHub Packages

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 9.15.0
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@fabioeducacross'
      
      - run: pnpm install
      
      - run: pnpm build
        working-directory: packages/ui
      
      - run: npm publish
        working-directory: packages/ui
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Passo 6: Configurar Consumidor (educacross-prototipos)

**Arquivo**: `.npmrc` (criar na raiz do projeto consumidor)

```ini
@fabioeducacross:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

**Arquivo**: `package.json`

```json
{
  "dependencies": {
    "@educacross/ui": "^0.1.0"
  }
}
```

**Variável de Ambiente** (local e CI):
```bash
# .env (não commitar!)
NPM_TOKEN=seu_github_token_aqui
```

**GitHub Actions do consumidor**:
```yaml
- name: Install dependencies
  env:
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: pnpm install
```

---

## 📅 Próximos Passos

### Imediato (Decisão Estratégica)
1. **Decidir**: GitHub Packages (privado) ou npm público?
2. **Aprovar**: Recomendação de publicação
3. **Criar**: Personal Access Token no GitHub

### Implementação (DS Agent)
1. Adicionar `publishConfig` ao package.json
2. Autenticar com GitHub Packages
3. Publicar versão 0.1.0
4. Configurar CI/CD para publicação automática

### Consumidor (Este Projeto)
1. Criar `.npmrc` com registry do GitHub Packages
2. Atualizar `package.json` para usar versão publicada
3. Adicionar `NPM_TOKEN` às variáveis de ambiente
4. Rodar `pnpm install`
5. Validar que servidor inicia sem erros

### Validação Final
1. Verificar estrutura instalada: `ls node_modules/@educacross/ui/`
   - **Esperado**: Apenas `dist/` e `package.json`
2. Rodar dev server: `pnpm dev`
   - **Esperado**: Servidor inicia sem erros
3. Acessar http://localhost:5175
   - **Esperado**: Dashboard renderiza com componentes do DS

---

## 🔄 Alternativa: Workaround Temporário

Se a decisão de publicar no registry demorar, posso implementar o **workaround com script de pós-instalação** para desbloquear o desenvolvimento imediatamente:

**Prós**: Desbloqueia hoje  
**Contras**: Debt técnico, não escalável, frágil

**Duração do workaround**: Máximo 1 sprint (até publicação definitiva)

---

## 📚 Referências Técnicas

1. **GitHub Packages Documentation**  
   https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

2. **npm Documentation - package.json files**  
   https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files

3. **pnpm Issue #2974 - Files field ignored with Git URLs**  
   https://github.com/pnpm/pnpm/issues/2974

4. **npm RFC #182 - Git dependencies don't respect files field**  
   https://github.com/npm/rfcs/issues/182

5. **Monorepo Best Practices - Lerna + GitHub Packages**  
   https://lerna.js.org/docs/features/publish-and-package-management

---

## 🎯 Conclusão

A migração do Design System de monorepo local para pacote distribuível **está tecnicamente completa** no repositório do DS (package.json perfeito, dist/ buildado e commitado). O bloqueio atual é uma **limitação conhecida dos package managers** com GitHub URLs.

A **solução profissional e recomendada** é publicar no **GitHub Packages** por manter privacidade, ser gratuita, integrada com GitHub, e ser a solução padrão da indústria para monorepos empresariais.

**Tempo estimado para desbloqueio completo**: 1-2 horas (configuração + primeira publicação + validação)

---

**Status**: ⏳ **Aguardando Decisão**  
**Bloqueador**: Decisão estratégica sobre privacidade vs. facilidade de acesso  
**Impacto**: Alto - Bloqueia consumo do Design System em todos os projetos  
**Urgência**: Alta - Dashboard professor depende desta decisão
