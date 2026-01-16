# 📖 Como Usar o Educacross Design System

Guia completo para instalar e usar o **@fabioaap/ui** em seus projetos.

---

## 🎯 Instalação Rápida

### Via GitHub Packages (Recomendado)

**Passo 1**: Crie um arquivo `.npmrc` na raiz do seu projeto:

```ini
@fabioaap:registry=https://npm.pkg.github.com
```

**Passo 2**: Instale o pacote:

```bash
pnpm add @fabioaap/ui@0.1.0
```

> **💡 Dica**: O arquivo `.npmrc` configura o npm/pnpm para buscar pacotes com escopo `@fabioaap` no GitHub Packages.

> **🔐 Autenticação CI/CD**: Para ambientes de integração contínua, adicione no `.npmrc`:
> ```ini
> //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
> ```
> E configure a variável de ambiente `NPM_TOKEN` com um GitHub Personal Access Token que tenha permissão `read:packages`.

---

## ⚙️ Configuração

### 1️⃣ **Instale as dependências peer**

```bash
npm install react react-dom tailwindcss
```

### 2️⃣ **Configure o Tailwind CSS**

Crie ou edite `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import { educacrossPreset } from "@fabioaap/ui/tailwind-preset";

const config: Config = {
  presets: [educacrossPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@fabioaap/ui/dist/**/*.{js,mjs}",
  ],
};

export default config;
```

### 3️⃣ **Importe os estilos base**

No seu CSS principal (ex: `src/app/globals.css` ou `src/index.css`):

```css
@import "@fabioaap/ui/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🚀 Uso Básico

### Importar componentes

```tsx
import { Button, Input, Label } from "@fabioaap/ui";

export function LoginForm() {
  return (
    <form className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="seu@email.com" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" required>
          Senha
        </Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
        />
      </div>
      
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
```

---

## 📚 Exemplos Práticos

### 1. **Botões com Variantes**

```tsx
import { Button } from "@fabioaap/ui";

export function ButtonExamples() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Padrão</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="destructive">Deletar</Button>
      <Button variant="outline">Contorno</Button>
      <Button variant="ghost">Fantasma</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### 2. **Card com Informações**

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@fabioaap/ui";

export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Usuário</CardTitle>
        <CardDescription>
          Suas informações pessoais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Nome</p>
            <p className="text-sm text-muted-foreground">João Silva</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">joao@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3. **Dialog (Modal)**

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from "@fabioaap/ui";

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Deletar Conta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Esta ação não pode ser desfeita. Sua conta será permanentemente deletada.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 4. **Toast (Notificações)**

```tsx
import { useToast, Button } from "@fabioaap/ui";

export function ToastExample() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Operação realizada!",
          description: "Seu perfil foi atualizado com sucesso.",
        });
      }}
    >
      Mostrar Toast
    </Button>
  );
}
```

### 5. **Select (Dropdown)**

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fabioaap/ui";

export function SelectExample() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecione um país" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="br">Brasil</SelectItem>
        <SelectItem value="us">Estados Unidos</SelectItem>
        <SelectItem value="uk">Reino Unido</SelectItem>
        <SelectItem value="de">Alemanha</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

---

## 🎨 Customização

### Sobrescrever cores

Você pode estender o preset ou sobrescrever tokens CSS:

```css
/* src/globals.css */
:root {
  --primary: 220 90% 56%; /* Mude a cor primária */
  --radius: 0.75rem; /* Mude o border-radius padrão */
}
```

### Adicionar classes personalizadas

```tsx
import { Button } from "@fabioaap/ui";

export function CustomButton() {
  return (
    <Button 
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    >
      Botão Customizado
    </Button>
  );
}
```

---

## 🌙 Tema Claro/Escuro

O Design System suporta dark mode automaticamente:

```tsx
// Adicione a classe "dark" no elemento root
// Exemplo com Next.js 14+
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark">
      <body>{children}</body>
    </html>
  );
}
```

**Toggle de tema:**

```tsx
"use client";

import { Button } from "@fabioaap/ui";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-5 w-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## 📋 Componentes Disponíveis

### Formulários
- `Button` - Botões com 6 variantes
- `Input` - Campos de texto
- `Label` - Labels acessíveis
- `Checkbox` - Caixas de seleção
- `Radio` - Botões de rádio
- `Select` - Dropdowns
- `Textarea` - Áreas de texto

### Layout
- `Card` - Cards com header/content/footer
- `Separator` - Divisores
- `Skeleton` - Loading states

### Navegação
- `Tabs` - Abas
- `Accordion` - Acordeões
- `DropdownMenu` - Menus dropdown
- `Popover` - Popovers

### Feedback
- `Alert` - Alertas contextuais
- `Toast` - Notificações
- `Dialog` - Modais
- `Tooltip` - Tooltips

### Data Display
- `Table` - Tabelas
- `Badge` - Badges
- `Avatar` - Avatares
- `Pagination` - Paginação

---

## 🔗 Links Úteis

- **Storybook**: http://localhost:6006 (quando rodando localmente)
- **GitHub**: https://github.com/fabioeducacross/Design_System_Educacross
- **Documentação**: Acesse o Storybook para exemplos interativos

---

## 🆘 Troubleshooting

### Estilos não aparecem

**Problema**: Componentes não têm estilos aplicados.

**Solução**:
1. Verifique se importou `@fabioaap/ui/styles.css` no CSS principal
2. Confirme que o `content` do Tailwind inclui o caminho do pacote:
   ```js
   content: [
     "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@fabioaap/ui/dist/**/*.{js,mjs}"
   ]
   ```

### Erro de TypeScript

**Problema**: `Cannot find module '@fabioaap/ui'`

**Solução**:
1. Reinstale as dependências: `pnpm install`
2. Reinicie o servidor de desenvolvimento
3. Limpe o cache: `rm -rf node_modules/.vite` ou `rm -rf .next`

### Dark mode não funciona

**Problema**: Cores não mudam no tema escuro.

**Solução**:
Adicione a classe `dark` no elemento `<html>`:
```html
<html className="dark">
```

---

## 💡 Dicas

1. **IntelliSense**: Use TypeScript para autocomplete de props
2. **Variantes**: Explore todas as variantes no Storybook
3. **Acessibilidade**: Todos os componentes seguem WCAG 2.1 AA
4. **Performance**: Tree-shaking automático - apenas componentes usados são incluídos no bundle

---

## 📞 Suporte

Problemas ou dúvidas? Abra uma issue no GitHub:
https://github.com/fabioeducacross/Design_System_Educacross/issues

---

**Feito com ❤️ pela equipe Educacross**

