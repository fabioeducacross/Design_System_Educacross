# Report: Configuração do Design System para Distribuição via GitHub

**Data**: 16/01/2026  
**Repositório DS**: `fabioeducacross/Design_System_Educacross`  
**Repositório Consumidor**: `fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V3`  
**Status**: ❌ **DS do GitHub não está configurado para distribuição via npm/pnpm**

---

## 1. Problema Identificado

### 1.1 Erro ao Instalar DS do GitHub

Ao tentar instalar o DS diretamente do GitHub:

```bash
pnpm add github:fabioeducacross/Design_System_Educacross
```

O Vite retorna erro de resolução de módulo:

```
X [ERROR] Failed to resolve entry for package "@educacross/ui". 
The package may have incorrect main/module/exports specified in its package.json.
```

**Causa raiz**: O `package.json` do DS no GitHub não tem os campos `exports`, `main` ou `module` configurados corretamente para permitir importações ESM.

---

## 2. Configuração Atual (Funciona Localmente)

### 2.1 Setup Local com Vendor

**Estrutura atual que FUNCIONA**:

```
educacross-prototipos/
├── vendor/
│   └── design-system/
│       └── packages/
│           └── ui/
│               ├── src/
│               │   ├── index.ts           # Barrel exports
│               │   ├── components/
│               │   └── styles.css
│               └── package.json
├── package.json                          # "@educacross/ui": "workspace:*"
└── tailwind.config.js                    # content: ["./vendor/design-system/..."]
```

**package.json (consumidor)**:
```json
{
  "dependencies": {
    "@educacross/ui": "workspace:*"
  }
}
```

**tailwind.config.js**:
```javascript
export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./vendor/design-system/packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ]
}
```

**src/index.css**:
```css
@import './ds-theme.css';  /* Variáveis locais */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Imports no código** (funcionam):
```typescript
import { Button, Card, CustomIcon, Table, Avatar, Badge, Tabs } from '@educacross/ui';
```

✅ **Funciona** porque pnpm resolve `workspace:*` para o diretório local `vendor/design-system/packages/ui/`.

---

## 3. Configuração Esperada (GitHub Package)

### 3.1 Setup Desejado

**package.json (consumidor)**:
```json
{
  "dependencies": {
    "@educacross/ui": "github:fabioeducacross/Design_System_Educacross"
  }
}
```

**tailwind.config.js**:
```javascript
export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@educacross/ui/dist/**/*.{js,mjs}"  // Arquivos BUILT
  ]
}
```

**src/index.css**:
```css
@import "@educacross/ui/styles.css";  // CSS do pacote npm
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Imports no código** (devem funcionar):
```typescript
import { Button, Card, CustomIcon } from '@educacross/ui';
import { educacrossPreset } from '@educacross/ui/tailwind-preset';
```

---

## 4. O Que Precisa Ser Corrigido no DS

### 4.1 package.json do DS (CRÍTICO)

**Arquivo**: `packages/ui/package.json` no repositório `fabioeducacross/Design_System_Educacross`

**Problema atual**: Falta configuração de `exports` e entry points.

**Solução**:

```json
{
  "name": "@educacross/ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css",
    "./tailwind-preset": {
      "import": "./dist/tailwind-preset.mjs",
      "require": "./dist/tailwind-preset.js"
    }
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --clean",
    "build:css": "postcss src/styles.css -o dist/styles.css",
    "prepublishOnly": "pnpm build && pnpm build:css"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "postcss": "^8.4.35",
    "postcss-cli": "^11.0.0"
  }
}
```

### 4.2 Estrutura de Build Necessária

**Antes de publicar**, o DS deve buildar os arquivos:

```
Design_System_Educacross/
└── packages/
    └── ui/
        ├── src/
        │   ├── index.ts              # Source code
        │   ├── components/           # React components
        │   ├── styles.css            # CSS source
        │   └── tailwind-preset.ts    # Preset source
        └── dist/                     # ⚠️ DEVE SER GERADO NO BUILD
            ├── index.js              # CJS bundle
            ├── index.mjs             # ESM bundle
            ├── index.d.ts            # TypeScript definitions
            ├── styles.css            # Processed CSS
            └── tailwind-preset.js    # Preset bundle
```

**Comando de build** (adicionar ao DS):
```bash
pnpm build       # Gera dist/ com tsup + postcss
```

### 4.3 .gitignore do DS

**Adicionar** ao `.gitignore` do DS:

```gitignore
# Build output (será gerado no CI/CD ou localmente antes de publicar)
dist/
*.tsbuildinfo

# Dependencies
node_modules/
```

### 4.4 GitHub Actions (CI/CD)

**Criar** `.github/workflows/publish.yml` no DS:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build package
        run: |
          cd packages/ui
          pnpm build
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: packages/ui/dist/**
```

---

## 5. Workflow de Publicação

### 5.1 Processo Recomendado

1. **Desenvolver no DS** (local):
   ```bash
   cd Design_System_Educacross/packages/ui
   pnpm dev        # Hot reload com Storybook
   ```

2. **Buildar antes de commit**:
   ```bash
   pnpm build      # Gera dist/
   git add dist/   # Commitar build (ou deixar pro CI)
   ```

3. **Criar tag de versão**:
   ```bash
   git tag v0.1.1
   git push origin v0.1.1
   ```

4. **GitHub Actions builda automaticamente** (se configurado)

5. **Consumidor instala**:
   ```bash
   pnpm add github:fabioeducacross/Design_System_Educacross#v0.1.1
   ```

### 5.2 Alternativa: Committar dist/

Se não quiser CI/CD, **commitar `dist/` diretamente**:

```bash
# No DS
pnpm build
git add dist/
git commit -m "build: gerar dist/ para v0.1.1"
git tag v0.1.1
git push origin main --tags
```

Isso permite instalação via GitHub sem CI/CD, mas aumenta o tamanho do repositório.

---

## 6. Validação da Configuração

### 6.1 Checklist de Validação

No repositório **Design_System_Educacross**:

- [ ] `packages/ui/package.json` tem `exports` configurado
- [ ] `packages/ui/package.json` tem `main`, `module`, `types` apontando para `dist/`
- [ ] Script `pnpm build` gera `dist/` corretamente
- [ ] `dist/index.mjs` exporta todos componentes
- [ ] `dist/styles.css` contém CSS processado
- [ ] `dist/tailwind-preset.js` exporta preset
- [ ] `.gitignore` exclui `node_modules` mas **não** exclui `dist/` (se commitando)
- [ ] Tag de versão criada (ex: `v0.1.1`)

### 6.2 Teste de Instalação

No repositório **Ambiente-de-prototipa-o-EDUCACROSS-V3**:

```bash
cd educacross-prototipos

# Remover vendor local
rm -rf vendor/

# Instalar do GitHub
pnpm remove @educacross/ui
pnpm add github:fabioeducacross/Design_System_Educacross#v0.1.1

# Validar instalação
ls -la node_modules/@educacross/ui/dist/

# Deve listar:
# - index.js
# - index.mjs
# - index.d.ts
# - styles.css
# - tailwind-preset.js

# Testar servidor
pnpm dev
# Não deve dar erro de "Failed to resolve entry"
```

### 6.3 Imports Esperados (Devem Funcionar)

```typescript
// Root exports
import { Button, Card, CustomIcon, Table, Avatar, Badge, Tabs } from '@educacross/ui';

// CSS
import '@educacross/ui/styles.css';  // No index.css

// Tailwind preset
import { educacrossPreset } from '@educacross/ui/tailwind-preset';
```

---

## 7. Ferramentas Recomendadas

### 7.1 tsup (Bundler)

**Por que**: Simples, rápido, suporta ESM+CJS+DTS em um comando.

**Instalação**:
```bash
pnpm add -D tsup
```

**Config** (`packages/ui/tsup.config.ts`):
```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/tailwind-preset.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: true,
});
```

### 7.2 PostCSS (CSS Processing)

**Config** (`packages/ui/postcss.config.js`):
```javascript
export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**Build CSS**:
```bash
postcss src/styles.css -o dist/styles.css
```

---

## 8. Comparação: Local vs GitHub

| Aspecto | Local (Atual) | GitHub (Desejado) |
|---------|---------------|-------------------|
| **Instalação** | `workspace:*` | `github:fabioeducacross/...` |
| **Source** | `vendor/design-system/packages/ui/src/` | `node_modules/@educacross/ui/dist/` |
| **CSS Import** | `@import './ds-theme.css';` | `@import "@educacross/ui/styles.css";` |
| **Tailwind Content** | `./vendor/.../src/**/*.tsx` | `./node_modules/@educacross/ui/dist/**/*.mjs` |
| **Build DS** | Não necessário (source direto) | **Obrigatório** (dist/ deve existir) |
| **Versionamento** | Manual (git pull) | Semântico (tags `v0.1.x`) |
| **Atualização** | `git pull` no vendor/ | `pnpm update @educacross/ui` |

---

## 9. Problemas Conhecidos e Soluções

### 9.1 "Cannot find module '@educacross/ui/styles.css'"

**Causa**: CSS não está em `dist/` ou `exports` não está configurado.

**Solução**:
```json
{
  "exports": {
    "./styles.css": "./dist/styles.css"
  }
}
```

### 9.2 "Failed to resolve entry for package"

**Causa**: `main` ou `exports` ausente/incorreto no package.json.

**Solução**:
```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
}
```

### 9.3 "Module not found: Can't resolve '@educacross/ui/tailwind-preset'"

**Causa**: Subpath export não configurado.

**Solução**:
```json
{
  "exports": {
    "./tailwind-preset": {
      "import": "./dist/tailwind-preset.mjs",
      "require": "./dist/tailwind-preset.js"
    }
  }
}
```

---

## 10. Próximos Passos (Ações Requeridas)

### 10.1 No Repositório DS (fabioeducacross/Design_System_Educacross)

1. **Atualizar package.json** com `exports`, `main`, `module` conforme seção 4.1
2. **Adicionar script de build** com tsup + postcss
3. **Buildar dist/** e commitar (ou configurar CI/CD)
4. **Criar tag** `v0.1.0` ou `v0.1.1`
5. **Pushear tag** para GitHub

### 10.2 No Repositório Consumidor (fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V3)

1. **Aguardar DS estar pronto** (dist/ commitado + tag criada)
2. **Remover vendor/** local
3. **Atualizar package.json**:
   ```json
   {
     "dependencies": {
       "@educacross/ui": "github:fabioeducacross/Design_System_Educacross#v0.1.1"
     }
   }
   ```
4. **Atualizar tailwind.config.js** para `node_modules/@educacross/ui/dist/`
5. **Atualizar index.css** para `@import "@educacross/ui/styles.css";`
6. **Executar** `pnpm install`
7. **Testar** `pnpm dev`

---

## 11. Evidências do Problema

### 11.1 Erro Completo do Vite

```
X [ERROR] Failed to resolve entry for package "@educacross/ui". 
The package may have incorrect main/module/exports specified in its package.json. 
[plugin vite:dep-scan]

at packageEntryFailure (file:///.../vite/dist/node/chunks/dep-BK3b2jBa.js:46638:15)
at resolvePackageEntry (file:///.../vite/dist/node/chunks/dep-BK3b2jBa.js:46635:3)
```

### 11.2 Package Instalado (Incompleto)

```bash
$ ls node_modules/@educacross/ui/
packages/  # ❌ Source code, não dist/
README.md
```

**Esperado**:
```bash
$ ls node_modules/@educacross/ui/
dist/       # ✅ Built files
README.md
package.json
```

---

## 12. Referências

- **tsup**: https://tsup.egoist.dev/
- **PostCSS**: https://postcss.org/
- **npm package.json exports**: https://nodejs.org/api/packages.html#exports
- **GitHub Packages**: https://docs.github.com/en/packages

---

## 13. Resumo Executivo (TL;DR)

**Problema**: DS do GitHub não pode ser instalado porque falta `dist/` com arquivos buildados.

**Solução**:
1. Adicionar `exports` no package.json do DS
2. Configurar build com tsup + postcss
3. Buildar e commitar `dist/` (ou via CI/CD)
4. Criar tag de versão
5. Instalar no consumidor via `github:fabioeducacross/Design_System_Educacross#v0.1.1`

**Status Atual**: ✅ DS **funciona localmente** com `workspace:*` mas ❌ **não funciona via GitHub**.

**Ação Imediata**: Agente de IA deve configurar build system no DS conforme seção 4.

---

**Documentado por**: Agente FullStack_Programmer  
**Para**: Agente de IA responsável pelo Design System  
**Prioridade**: Alta (bloqueando distribuição do DS)
