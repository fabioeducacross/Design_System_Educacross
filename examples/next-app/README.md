# Exemplo: Educacross Design System + Next.js 15

Este é um exemplo completo de como usar o **@educacross/ui** em um projeto Next.js com App Router.

## 🚀 Quick Start

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev
```

Abra http://localhost:3000 no navegador.

## 📦 O que está incluído

### Configuração

- ✅ Next.js 15 com App Router
- ✅ TypeScript
- ✅ Tailwind CSS configurado com `educacrossPreset`
- ✅ @educacross/ui como workspace dependency

### Componentes demonstrados

- `Button` - Variantes default e outline
- `Card` - Layout de cards
- `Input` + `Label` - Formulário de login
- `Badge` - Status badges
- `Separator` - Divisores
- Ícones do `lucide-react`

### Estrutura

```
src/
├── app/
│   ├── layout.tsx          # Layout root com metadata
│   ├── page.tsx            # Homepage com exemplos
│   └── globals.css         # Importa @educacross/ui/styles.css
├── tailwind.config.ts      # Configuração Tailwind + preset
└── next.config.mjs         # transpilePackages para @educacross/ui
```

## 🎨 Customização

### Mudar cores

Edite `src/app/globals.css`:

```css
:root {
  --primary: 220 90% 56%; /* Nova cor primária */
}

.dark {
  --primary: 220 90% 65%;
}
```

### Adicionar dark mode

Instale `next-themes`:

```bash
pnpm add next-themes
```

Atualize `layout.tsx`:

```tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 📚 Próximos passos

1. Explore mais componentes no [Storybook](http://localhost:6006)
2. Leia a [documentação completa](../../USAGE.md)
3. Veja exemplos de cada componente em `apps/storybook/stories/`

## 🐛 Troubleshooting

### Estilos não carregam

Verifique se:
1. `@educacross/ui/styles.css` está importado em `globals.css`
2. O `content` do `tailwind.config.ts` inclui o caminho correto do pacote

### Erro "Cannot find module"

```bash
# Limpe node_modules e reinstale
rm -rf node_modules .next
pnpm install
```

## 🔗 Recursos

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Tailwind](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
