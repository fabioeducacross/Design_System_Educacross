# Lições Aprendidas: Componente Tabs (Rounded)

> **Data:** 30 de janeiro de 2026  
> **Contexto:** Replicação do componente TabRouter.vue do Frontoffice Vue para o Design System React

---

## 1. Problema Identificado

O componente `Tabs` com variante `rounded` no Design System **não estava idêntico** ao componente original `TabRouter.vue` do Frontoffice. As diferenças visuais eram perceptíveis e precisavam ser corrigidas para manter a consistência entre as plataformas.

---

## 2. Análise Comparativa

### 2.1 Arquivo de Referência (Fonte da Verdade)

```
educacross-frontoffice/src/components/tab/TabRouter.vue
```

### 2.2 Diferenças Encontradas

| Propriedade | Design System (Antes) | Frontoffice Original |
|---|---|---|
| **padding** | `px-6 pt-[14px] pb-[10px]` | `padding: 14px 24px 10px 24px` |
| **transform** | ❌ Não tinha | `translateX(calc(var(--index) * -10px))` |
| **z-index** | Estático `z-[3]` | Dinâmico: `isActive ? totalTabs : totalTabs - index` |
| **hover** | ❌ Não tinha | `&:hover { color: white; background: $primary }` |
| **scrollbar** | ❌ Não tinha | `scrollbar-width: thin` |
| **linha separadora** | ❌ Não existia | `.tab-line { border: 1px solid $primary }` |

---

## 3. CSS Original do Frontoffice

```scss
// TabRouter.vue - Estilo das abas arredondadas
.tabs-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;

  .tab-link {
    display: inline-block;
    position: relative;

    padding: 14px 24px 10px 24px;

    border-radius: 15px 15px 0 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);

    cursor: pointer;
    color: $color-gray-themeBodyText;
    text-decoration: none;
    background: $white;

    // Sobreposição das abas com translateX negativo
    transform: translateX(calc(var(--index) * var(--offset)));
    // --offset: -10px

    white-space: nowrap;

    &:hover {
      color: $white !important;
      background-color: $primary;
    }

    &.active {
      background: $primary;
      color: $white;
      z-index: 1; // Fica na frente das outras
    }
  }
}

.tab-line {
  border: 1px solid $primary;
  height: 1px;
  width: 100%;
  margin-bottom: 1rem;
}
```

---

## 4. Solução Implementada

### 4.1 Novo `tabsListVariants` (rounded)

```tsx
rounded: [
    "bg-transparent p-0 h-auto relative justify-start",
    "flex-nowrap overflow-x-auto",
    "[scrollbar-width:thin]",
].join(" "),
```

### 4.2 Novo `tabsTriggerVariants` (rounded)

```tsx
rounded: [
    // Layout base
    "inline-flex items-center gap-1",
    // Padding exato: 14px 24px 10px 24px
    "pt-[14px] pr-[24px] pb-[10px] pl-[24px]",
    // Border radius: 15px 15px 0 0
    "rounded-t-[15px] rounded-b-none",
    // Box shadow
    "shadow-[0_0_8px_rgba(0,0,0,0.14)]",
    // Cor de texto padrão (gray)
    "text-[#6e6b7b]",
    // Background branco por padrão
    "bg-white",
    // Sem decoração de texto
    "no-underline",
    // Hover: fundo primário, texto branco
    "hover:bg-primary hover:text-white",
    // Estado ativo: fundo primário (#6E63E8), texto branco
    "data-[state=active]:bg-[#6E63E8] data-[state=active]:text-white",
].join(" "),
```

### 4.3 TranslateX e Z-Index Dinâmicos

Como Tailwind não suporta valores dinâmicos baseados em índice, foi necessário usar `style` inline:

```tsx
// No TabsTrigger
const roundedStyles: React.CSSProperties = effectiveVariant === "rounded" ? {
    transform: `translateX(${tabIndex * -10}px)`,
    zIndex: isActive ? (context?.totalTabs ?? 1) : (context?.totalTabs ?? 1) - tabIndex,
} : {};
```

### 4.4 Novo Contexto com Registro de Tabs

Para calcular o índice de cada tab dinamicamente:

```tsx
interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
    variant?: "default" | "outline" | "pills" | "rounded";
    totalTabs: number;
    registerTab: () => number;
}
```

### 4.5 Novo Componente `TabsLine`

Linha separadora abaixo das abas (opcional):

```tsx
const TabsLine = React.forwardRef<HTMLDivElement, TabsLineProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("h-px w-full bg-primary mb-4", className)}
                {...props}
            />
        );
    }
);
```

---

## 5. Uso Recomendado

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsLine } from "@educacross/ui";

<Tabs defaultValue="redes" variant="rounded">
  <TabsList>
    <TabsTrigger value="redes">Redes</TabsTrigger>
    <TabsTrigger value="escolas">Escolas</TabsTrigger>
    <TabsTrigger value="professores">Professores</TabsTrigger>
  </TabsList>
  <TabsLine /> {/* Linha separadora opcional */}
  <TabsContent value="redes">Conteúdo de Redes</TabsContent>
  <TabsContent value="escolas">Conteúdo de Escolas</TabsContent>
  <TabsContent value="professores">Conteúdo de Professores</TabsContent>
</Tabs>
```

---

## 6. Lições Aprendidas

### 6.1 Sempre Consultar a Fonte da Verdade

O Frontoffice Vue é a **referência canônica**. Antes de implementar qualquer componente visual, deve-se:

1. Localizar o componente original no Frontoffice
2. Analisar o CSS/SCSS completo
3. Identificar todas as propriedades visuais
4. Testar hover, active, disabled e outros estados

### 6.2 Limitações do Tailwind para Valores Dinâmicos

Tailwind CSS não suporta nativamente valores que dependem de:
- Índice do elemento (1º, 2º, 3º...)
- Contagem total de elementos
- CSS Custom Properties dinâmicas por elemento

**Solução:** Usar `style` inline para propriedades que precisam de cálculo dinâmico.

### 6.3 Sobreposição de Elementos

O efeito de "abas empilhadas" do Frontoffice usa:
- `translateX` negativo para mover cada aba para a esquerda
- `z-index` decrescente para que as primeiras abas fiquem "por baixo"
- Aba ativa recebe o maior `z-index` para ficar na frente

### 6.4 Cores Hardcoded vs Tokens

O Frontoffice usa variáveis SCSS:
- `$primary: #6e63e8`
- `$color-gray-themeBodyText: #6e6b7b`

No Design System, optamos por:
- Usar valores hardcoded onde necessário para exatidão (`#6E63E8`, `#6e6b7b`)
- Usar tokens do Tailwind onde possível (`bg-primary`, `hover:bg-primary`)

### 6.5 Componentes Opcionais

Nem todos os projetos precisam da linha separadora (`TabsLine`). Por isso, ela foi criada como componente separado e opcional, permitindo flexibilidade de uso.

---

## 7. Arquivos Modificados

| Arquivo | Alteração |
|---|---|
| `packages/ui/src/components/Tabs/Tabs.tsx` | Reescrito com novos variants e lógica de índice |
| `packages/ui/src/components/Tabs/index.ts` | Adicionado export do `TabsLine` |
| `packages/ui/src/index.ts` | Adicionado export do `TabsLine` e tipo |

---

## 8. Referências

- **Frontoffice Original:** `educacross-frontoffice/src/components/tab/TabRouter.vue`
- **Variáveis SCSS:** `educacross-frontoffice/src/assets/scss/variables/_variables.scss`
- **Bootstrap-Vue Tabs:** Usado como base no Frontoffice (`b-tabs`, `b-tab`)
- **Copilot Instructions:** `.github/copilot-instructions.md` - Define o Frontoffice como fonte da verdade

---

## 9. Checklist de Verificação

- [x] Padding exatamente igual ao original
- [x] Border-radius 15px no topo
- [x] Box-shadow 0 0 8px rgba(0,0,0,0.14)
- [x] TranslateX negativo para sobreposição
- [x] Z-index dinâmico baseado em índice e estado ativo
- [x] Hover com fundo primário e texto branco
- [x] Estado ativo com fundo #6E63E8 e texto branco
- [x] Scrollbar fina para overflow horizontal
- [x] Componente TabsLine para linha separadora opcional
- [x] Exportações atualizadas no index.ts

---

*Documento criado para referência futura e onboarding de novos desenvolvedores.*
