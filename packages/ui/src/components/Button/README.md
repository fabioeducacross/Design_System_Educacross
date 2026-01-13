# Button Component

Componente de botão com variantes do Design System Educacross.

## Uso Básico

```tsx
import { Button } from "@educacross/ui";

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Variantes

### Variantes do Design System Figma

#### `variant="default"` - Botão Primário
Botão roxo preenchido para ações principais.

```tsx
<Button variant="default">Salvar</Button>
```

#### `variant="secondary"` - Botão Secundário
Botão outline roxo para ações secundárias.

```tsx
<Button variant="secondary">Acessar aplicativo</Button>
```

#### `variant="attention"` - Botão de Atenção
Botão amarelo preenchido para alertas e sugestões importantes.

```tsx
<Button variant="attention">
  <LightbulbIcon />
  Sugerir missão
</Button>
```

#### `variant="negative"` - Botão Negativo
Botão outline para ações neutras ou de saída.

```tsx
<Button variant="negative">
  <WhatsAppIcon />
  WhatsApp
</Button>
```

### Variantes Utilitárias

#### `variant="destructive"` - Ação Destrutiva
Para deletar ou remover.

```tsx
<Button variant="destructive">Deletar</Button>
```

#### `variant="success"` - Sucesso
Para confirmações positivas.

```tsx
<Button variant="success">Confirmar</Button>
```

#### `variant="outline"` - Outline Neutro
Borda neutra para ações secundárias genéricas.

```tsx
<Button variant="outline">Cancelar</Button>
```

#### `variant="ghost"` - Fantasma
Sem borda, background apenas no hover.

```tsx
<Button variant="ghost">Mais opções</Button>
```

#### `variant="link"` - Link
Aparência de link, com underline no hover.

```tsx
<Button variant="link">Saiba mais</Button>
```

## Tamanhos

```tsx
<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
<Button size="icon"><PlusIcon /></Button>
```

## Estados

### Loading

```tsx
<Button loading>Salvando...</Button>
```

### Disabled

```tsx
<Button disabled>Desabilitado</Button>
```

## Composição com Ícones

### Ícone à esquerda

```tsx
<Button>
  <DownloadIcon />
  Exportar
</Button>
```

### Ícone à direita

```tsx
<Button>
  Próximo
  <ArrowRightIcon />
</Button>
```

## Composição com Links

Use `asChild` para renderizar como link:

```tsx
<Button asChild>
  <a href="/dashboard">Ir para Dashboard</a>
</Button>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "secondary" \| "attention" \| "negative" \| "destructive" \| "success" \| "outline" \| "ghost" \| "link" \| "warning" \| "info"` | `"default"` | Variante visual |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Tamanho do botão |
| `loading` | `boolean` | `false` | Mostra spinner e desabilita |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `asChild` | `boolean` | `false` | Renderiza como elemento filho |
| `className` | `string` | - | Classes CSS adicionais |

## Acessibilidade

- ✅ Navegação por teclado (Tab, Enter, Space)
- ✅ Estados de foco visíveis
- ✅ `aria-disabled` quando desabilitado
- ✅ `aria-busy` quando em loading
- ⚠️ Para botões com apenas ícone, sempre adicione `aria-label`:

```tsx
<Button size="icon" aria-label="Adicionar item">
  <PlusIcon />
</Button>
```

## Tokens CSS Utilizados

O componente utiliza exclusivamente tokens do Design System:

- Cores: `--color-primary-*`, `--color-warning-*`, `--color-error-*`
- Opacidades: `--color-primary-8`, `--color-primary-16`
- Raio: `--radius-md`
- Espaçamento: `--padding-*`, `--gap-*`
- Estados: `--action-hover`, `--action-disabled-bg`, `--text-disabled`
