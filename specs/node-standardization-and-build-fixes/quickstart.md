# Quickstart: Educacross Design System

## 1. Pré-requisitos

### Node.js 20 LTS

Este projeto requer **Node.js 20.x** (LTS).

#### Verificar versão atual:
```bash
node --version
# Deve retornar v20.x.x
```

#### Instalar Node 20:

**Opção 1: Com nvm (recomendado)**
```bash
# Windows (nvm-windows)
nvm install 20.18.0
nvm use 20.18.0

# Linux/macOS (nvm)
nvm install 20.18.0
nvm use 20.18.0
```

**Opção 2: Download direto**
- Baixe em: https://nodejs.org/en/download/
- Escolha a versão **20.x LTS**

### pnpm 9+

```bash
# Instalar globalmente
npm install -g pnpm@9.15.0

# Verificar versão
pnpm --version
# Deve retornar 9.x.x
```

---

## 2. Setup Local

### Clone e Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/fabioeducacross/Design_System_Educacross.git
cd Design_System_Educacross

# 2. Use Node 20 (se nvm estiver instalado)
nvm use
# Ou manualmente: nvm use 20.18.0

# 3. Instale dependências
pnpm install
```

### Validar Ambiente

```bash
# Verificar tudo está OK
node --version    # Deve ser v20.x.x
pnpm --version    # Deve ser 9.x.x
```

---

## 3. Desenvolvimento

### Rodar Storybook (dev)

```bash
pnpm storybook
# Abre em http://localhost:6006
```

**Tempo de startup esperado**: ~7-10 segundos

### Build de Produção

```bash
# Build completo (Turborepo)
pnpm build

# Build apenas Storybook
pnpm build:storybook
```

### Testes

```bash
# Rodar testes do pacote @fabioeducacross/ui
pnpm test

# Modo watch
pnpm test:watch

# Com coverage
pnpm test:coverage
```

### Linting e Type Checking

```bash
# Lint (ESLint)
pnpm lint

# Type checking (TypeScript)
pnpm typecheck

# Formatação (Prettier)
pnpm format
pnpm format:check
```

---

## 4. Comandos Úteis

### Monorepo

```bash
# Limpar todos node_modules e builds
pnpm clean

# Build incremental (apenas o que mudou)
pnpm build

# Rodar comando em workspace específico
pnpm --filter @fabioeducacross/ui build
pnpm --filter @educacross/storybook dev
```

### Chromatic (Visual Regression)

```bash
# Deploy para Chromatic
pnpm chromatic

# Ver builds: https://www.chromatic.com/builds?appId=69727df0ab06437ceb56a008
```

---

## 5. Estrutura de Pastas

```
Design_System_Educacross/
├── .nvmrc                      # Node 20.18.0
├── package.json                # Workspace root
├── pnpm-workspace.yaml         # Definição do monorepo
├── turbo.json                  # Config do Turborepo
│
├── apps/
│   └── storybook/              # Documentação interativa
│       ├── stories/            # Stories dos componentes
│       └── .storybook/         # Config Storybook 10
│
├── packages/
│   └── ui/                     # @fabioeducacross/ui
│       ├── src/
│       │   ├── components/     # Button, Input, Card...
│       │   ├── utils/          # cn(), etc
│       │   ├── styles.css      # Tokens CSS
│       │   └── tailwind-preset.ts
│       └── dist/               # Build output (não commitar)
│
└── specs/                      # Documentação técnica
    └── node-standardization-and-build-fixes/
        ├── plan.md
        ├── tasks.md
        └── research.md
```

---

## 6. Troubleshooting

### Erro: "Cannot find module '@educacross/ui'"

✅ **Solução**: Use o nome correto do pacote:
```ts
// ❌ Errado
import { Button } from "@educacross/ui";

// ✅ Correto
import { Button } from "@fabioeducacross/ui";
```

### Storybook não inicia ou demora muito

```bash
# Limpar cache do Vite
rm -rf apps/storybook/.vite
rm -rf apps/storybook/storybook-static

# Reinstalar dependências
pnpm install --force

# Tentar novamente
pnpm storybook
```

### Build falhando

```bash
# 1. Verificar Node version
node --version  # Deve ser 20.x

# 2. Limpar tudo
pnpm clean

# 3. Reinstalar
pnpm install

# 4. Build
pnpm build
```

### Node version errada

```bash
# Com nvm
nvm use 20.18.0

# Sem nvm: baixe Node 20 LTS em nodejs.org
```

---

## 7. Próximos Passos

- 📖 **Documentação completa**: Veja [README.md](../README.md)
- 🎨 **Componentes**: Abra Storybook em http://localhost:6006
- 🧪 **Testes**: Explore `packages/ui/src/test/`
- 🚀 **Deploy**: Configure Chromatic com `pnpm chromatic`

---

## 8. Links Úteis

- **Storybook publicado**: https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/
- **Chromatic builds**: https://www.chromatic.com/builds?appId=69727df0ab06437ceb56a008
- **Repositório**: https://github.com/fabioeducacross/Design_System_Educacross
- **Node.js LTS**: https://nodejs.org/en/download/
- **pnpm docs**: https://pnpm.io/

---

**Tempo estimado de setup**: 5-10 minutos  
**Node requerido**: 20.18.0 LTS  
**Package manager**: pnpm 9.15.0
