# Task Breakdown — Atomic Design Implementation

**Date**: 2026-01-22 | **Phase**: 2 (Task Breakdown)  
**Total Estimate**: 46 horas (~6 dias úteis)  
**Complexity**: Alta (TanStack Table, RHF integration, Layout patterns)

---

## 📊 Visão Geral

Este documento detalha as **20 tarefas granulares** para implementar os 3 componentes prioritários do Atomic Design:

- **FormField** (Molécula): 8h — Tasks T1-T5
- **DataTable** (Organismo): 16h — Tasks T6-T11
- **DashboardLayout** (Template): 14h — Tasks T12-T17
- **Integration & Polish**: 6h — Tasks T18-T20

Cada task tem:
- **Estimativa**: Tempo em horas
- **Dependências**: Tasks que devem ser completadas antes
- **Entregáveis**: Arquivos criados/modificados
- **Critérios de aceite**: Checklist de validação
- **Riscos**: Possíveis bloqueios e mitigações

---

## 🎯 Phase 3: Implementation Tasks

---

### T1: Setup & Dependencies (2h)

**Objetivo**: Instalar todas as dependências e configurar ambiente para os 3 componentes.

**Dependências**: Nenhuma (primeira task)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/package.json           (atualizado com novas deps)
packages/ui/pnpm-lock.yaml         (atualizado)
packages/ui/src/hooks/             (pasta criada)
packages/ui/src/types/common.ts    (types compartilhados)
packages/ui/src/types/utils.ts     (utility types)
```

**Passos detalhados**:

1. **Instalar dependências principais** (30min)
   ```bash
   cd packages/ui
   pnpm add @tanstack/react-table@^8.20.0
   pnpm add react-hook-form@^7.52.0
   pnpm add zod@^3.23.0
   pnpm add @hookform/resolvers@^3.9.0
   ```

2. **Instalar dev dependencies** (15min)
   ```bash
   pnpm add -D @tanstack/react-virtual@^3.10.0
   pnpm add -D @testing-library/user-event@^14.5.0
   ```

3. **Criar types compartilhados** (45min)
   - Copiar interfaces de [data-model.md](./data-model.md#4-shared-types)
   - Criar `src/types/common.ts` com Size, Variant, Alignment, etc.
   - Criar `src/types/utils.ts` com RequiredKeys, OptionalKeys, etc.

4. **Criar pasta hooks** (15min)
   ```bash
   mkdir -p src/hooks
   touch src/hooks/useLocalStorage.ts
   ```

5. **Validar build** (15min)
   ```bash
   pnpm typecheck  # Sem erros
   pnpm build      # Build bem-sucedido
   ```

**Critérios de aceite**:
- [ ] Todas as dependências instaladas sem conflitos
- [ ] `pnpm list` mostra versões corretas
- [ ] Types compartilhados compilam sem erros
- [ ] `pnpm build` executa sem falhas
- [ ] Storybook ainda funciona (`pnpm storybook`)

**Riscos**:
- **Conflito de versões**: React 18.3.1 vs deps que requerem React 19
  - *Mitigação*: Usar `--legacy-peer-deps` ou atualizar React se necessário
- **Build quebrado**: Tipos genéricos complexos causam erros TS
  - *Mitigação*: Usar `// @ts-expect-error` temporariamente, corrigir depois

---

### T2: FormField — Estrutura e Types (2h)

**Objetivo**: Criar estrutura base do FormField com todas as interfaces TypeScript.

**Dependências**: T1 (types compartilhados criados)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/FormField/
├── FormField.tsx              (implementação)
├── FormField.types.ts         (interfaces)
├── index.ts                   (exports)
└── FormField.test.tsx         (testes básicos)
```

**Passos detalhados**:

1. **Criar pasta e arquivos** (15min)
   ```bash
   cd packages/ui/src/components
   mkdir FormField
   cd FormField
   touch FormField.tsx FormField.types.ts index.ts FormField.test.tsx
   ```

2. **Definir interfaces** (30min)
   - Copiar de [data-model.md#1-formfield](./data-model.md#11-props-interface)
   - `FormFieldProps`, `FieldState`, `FormFieldContextValue`
   - Adicionar JSDoc completo

3. **Implementar componente base** (1h)
   - `React.forwardRef` com div container
   - Gerar IDs com `React.useId()`
   - Renderizar label + children + helper/error
   - **SEM** variantes CVA ainda (próxima task)

4. **Criar exports** (5min)
   ```typescript
   // index.ts
   export { FormField } from "./FormField";
   export type { FormFieldProps, FieldState, FormFieldContextValue } from "./FormField.types";
   ```

5. **Testes básicos** (10min)
   - Renderização simples
   - Label associado ao input
   - Props injetadas via cloneElement

**Critérios de aceite**:
- [ ] Componente renderiza sem erros
- [ ] TypeScript não tem erros de tipo
- [ ] Label tem `htmlFor` correto
- [ ] Children recebe props injetadas (id, aria-*)
- [ ] 3 testes básicos passam

**Riscos**:
- **cloneElement quebra com Fragment**: Validar children com `React.isValidElement`
- **IDs duplicados**: Usar `React.useId()` (React 18+) para IDs únicos

---

### T3: FormField — Variantes e Acessibilidade (2h)

**Objetivo**: Adicionar variantes CVA, estados visuais e props de acessibilidade completas.

**Dependências**: T2 (estrutura base criada)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/FormField/FormField.tsx  (atualizado com CVA)
packages/ui/src/components/FormField/FormField.test.tsx  (testes a11y)
```

**Passos detalhados**:

1. **Criar variantes CVA** (45min)
   ```typescript
   import { cva, type VariantProps } from "class-variance-authority";
   
   const formFieldVariants = cva(["form-field"], {
     variants: {
       size: {
         sm: "form-field-sm",
         md: "form-field-md",
         lg: "form-field-lg",
       },
       layout: {
         vertical: "flex flex-col gap-2",
         horizontal: "grid grid-cols-[120px_1fr] gap-4 items-center",
       },
     },
     defaultVariants: {
       size: "md",
       layout: "vertical",
     },
   });
   ```

2. **Aplicar classes CSS** (30min)
   - Usar `cn()` para merge de classes
   - Aplicar estados: disabled, loading, error
   - Adicionar classes Tailwind para spacing

3. **Acessibilidade completa** (30min)
   - `aria-required` quando `required=true`
   - `aria-invalid` quando `error` presente
   - `aria-describedby` apontando para helper/error
   - `role="alert"` no erro
   - Spinner com `aria-live="polite"` quando loading

4. **Testes de acessibilidade** (15min)
   - aria-required presente
   - aria-invalid correto
   - aria-describedby aponta para IDs corretos
   - role="alert" no erro

**Critérios de aceite**:
- [ ] Variantes size (sm, md, lg) aplicam classes corretas
- [ ] Layout horizontal usa grid CSS
- [ ] aria-required presente quando required=true
- [ ] aria-invalid presente quando há erro
- [ ] aria-describedby aponta para helper ou error
- [ ] Erro tem role="alert"
- [ ] 5 testes de acessibilidade passam

**Riscos**:
- **Classes Tailwind não aplicadas**: Verificar tailwind.config.ts inclui components/
- **CVA não funciona**: Verificar importação correta de `cn()` utility

---

### T4: FormField — Integração React Hook Form (1h)

**Objetivo**: Validar integração com React Hook Form + Zod, criar exemplo no Storybook.

**Dependências**: T3 (componente completo)

**Estimativa**: 1h

**Entregáveis**:
```
apps/storybook/stories/components/FormField.stories.tsx  (criado)
packages/ui/src/components/FormField/FormField.test.tsx  (teste RHF)
```

**Passos detalhados**:

1. **Criar stories básicas** (30min)
   - Default, Required, WithError, Loading
   - Horizontal layout, Small size
   - Tags: `["autodocs"]` para docs automáticos

2. **Story com React Hook Form** (20min)
   ```tsx
   export const WithReactHookForm: Story = {
     render: () => {
       const schema = z.object({
         email: z.string().email("E-mail inválido"),
       });
       
       const { register, formState: { errors } } = useForm({
         resolver: zodResolver(schema),
       });
       
       return (
         <FormField label="E-mail" required error={errors.email?.message}>
           <Input {...register("email")} />
         </FormField>
       );
     },
   };
   ```

3. **Teste de integração RHF** (10min)
   - Validação de campo obrigatório
   - Mensagem de erro aparece

**Critérios de aceite**:
- [ ] 7 stories aparecem no Storybook
- [ ] Story com RHF funciona (erro aparece ao submeter)
- [ ] Docs gerados automaticamente
- [ ] Teste de integração RHF passa

**Riscos**:
- **RHF não funciona no Storybook**: Envolver em `<form>` completo

---

### T5: FormField — Testes Completos e Docs (1h)

**Objetivo**: Cobertura de testes >80%, documentação JSDoc completa, validar contra contrato.

**Dependências**: T4 (stories criadas)

**Estimativa**: 1h

**Entregáveis**:
```
packages/ui/src/components/FormField/FormField.test.tsx  (completo)
packages/ui/src/components/FormField/FormField.tsx  (JSDoc atualizado)
packages/ui/src/index.ts  (export adicionado)
```

**Passos detalhados**:

1. **Testes de renderização** (15min)
   - Todas as variantes de size
   - Layouts vertical e horizontal
   - Estados: default, error, loading, disabled

2. **Testes de interação** (15min)
   - cloneElement injeta props corretamente
   - disabled propaga para children
   - loading desabilita input

3. **Testes de validação contra contrato** (20min)
   - Revisar [FormField.contract.ts](./contracts/FormField.contract.ts)
   - Validar todas as regras MUST/MUST NOT
   - Exemplo: label não vazio, asterisco via prop, etc.

4. **JSDoc e exports** (10min)
   - Adicionar JSDoc completo em todas as props
   - Exportar em `packages/ui/src/index.ts`

**Critérios de aceite**:
- [ ] Cobertura de testes >80%
- [ ] Todas as regras do contrato validadas
- [ ] JSDoc completo em FormFieldProps
- [ ] Componente exportado no barrel export
- [ ] `pnpm test FormField` passa 100%

**Riscos**:
- **Cobertura baixa**: Adicionar testes de edge cases (children null, etc.)

---

### T6: DataTable — Estrutura e TanStack Setup (3h)

**Objetivo**: Criar estrutura base do DataTable, integrar TanStack Table core.

**Dependências**: T1 (deps instaladas)

**Estimativa**: 3h

**Entregáveis**:
```
packages/ui/src/components/DataTable/
├── DataTable.tsx
├── DataTable.types.ts
├── index.ts
└── DataTable.test.tsx
```

**Passos detalhados**:

1. **Criar pasta e arquivos** (15min)
   ```bash
   mkdir -p packages/ui/src/components/DataTable
   cd DataTable
   touch DataTable.tsx DataTable.types.ts index.ts DataTable.test.tsx
   ```

2. **Definir interfaces genéricas** (1h)
   - Copiar de [data-model.md#2-datatable](./data-model.md#21-core-interfaces)
   - `DataTableProps<T>`, `DataTableColumn<T>`, filters, actions
   - Garantir type safety com genéricos

3. **Integrar TanStack Table** (1h 30min)
   ```typescript
   import {
     useReactTable,
     getCoreRowModel,
     flexRender,
   } from "@tanstack/react-table";
   
   function DataTable<T>({ data, columns }: DataTableProps<T>) {
     const table = useReactTable({
       data,
       columns,
       getCoreRowModel: getCoreRowModel(),
     });
     
     return (
       <table>
         <thead>
           {table.getHeaderGroups().map((headerGroup) => (
             <tr key={headerGroup.id}>
               {headerGroup.headers.map((header) => (
                 <th key={header.id}>
                   {flexRender(header.column.columnDef.header, header.getContext())}
                 </th>
               ))}
             </tr>
           ))}
         </thead>
         <tbody>
           {table.getRowModel().rows.map((row) => (
             <tr key={row.id}>
               {row.getVisibleCells().map((cell) => (
                 <td key={cell.id}>
                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     );
   }
   ```

4. **Teste básico** (15min)
   - Renderiza headers
   - Renderiza dados

**Critérios de aceite**:
- [ ] TanStack Table importado sem erros
- [ ] Table renderiza headers e dados básicos
- [ ] Genérico `<T>` funciona corretamente
- [ ] TypeScript infere tipos de row corretamente
- [ ] 2 testes básicos passam

**Riscos**:
- **Generics complexos**: Usar `any` temporariamente, refinar depois
- **TanStack API mudou**: Consultar docs v8 oficial

---

### T7: DataTable — Sorting e Pagination (3h)

**Objetivo**: Adicionar ordenação de colunas e paginação client-side.

**Dependências**: T6 (estrutura base criada)

**Estimativa**: 3h

**Entregáveis**:
```
packages/ui/src/components/DataTable/DataTable.tsx  (atualizado)
packages/ui/src/components/DataTable/DataTablePagination.tsx  (novo)
packages/ui/src/components/DataTable/DataTable.test.tsx  (testes sorting/pagination)
```

**Passos detalhados**:

1. **Adicionar sorting** (1h 30min)
   ```typescript
   import { getSortedRowModel } from "@tanstack/react-table";
   
   const table = useReactTable({
     data,
     columns,
     getCoreRowModel: getCoreRowModel(),
     getSortedRowModel: getSortedRowModel(),
     onSortingChange: setSorting,
     state: { sorting },
   });
   ```
   - Ícone de sort no header (↑↓)
   - aria-sort="ascending|descending|none"
   - Callback onSort para controlled state

2. **Criar componente Pagination** (1h)
   - Botões: First, Previous, Next, Last
   - Select de pageSize (10, 20, 50, 100)
   - Texto: "Mostrando 1-20 de 100 itens"
   - Acessibilidade: aria-label nos botões

3. **Integrar pagination** (30min)
   ```typescript
   import { getPaginationRowModel } from "@tanstack/react-table";
   
   const table = useReactTable({
     // ...outros,
     getPaginationRowModel: getPaginationRowModel(),
     onPaginationChange: setPagination,
     state: { pagination },
   });
   ```

**Critérios de aceite**:
- [ ] Clique em header ordena coluna
- [ ] Ícone de sort muda (↑ asc, ↓ desc, ↕ none)
- [ ] aria-sort presente nos headers
- [ ] Paginação muda dados exibidos
- [ ] Botões de paginação desabilitados quando apropriado
- [ ] 5 testes passam (sorting + pagination)

**Riscos**:
- **Performance com 1000+ rows**: Adicionar aviso na doc, sugerir pagination server-side

---

### T8: DataTable — Toolbar e Filtros (3h)

**Objetivo**: Criar toolbar com busca, filtros e bulk actions.

**Dependências**: T7 (sorting/pagination funcionando)

**Estimativa**: 3h

**Entregáveis**:
```
packages/ui/src/components/DataTable/DataTableToolbar.tsx  (novo)
packages/ui/src/components/DataTable/DataTableFilter.tsx  (novo)
packages/ui/src/components/DataTable/DataTable.test.tsx  (testes toolbar)
```

**Passos detalhados**:

1. **Criar componente Toolbar** (1h)
   - Layout: Search à esquerda, Filters no centro, Actions à direita
   - Search input com ícone de lupa
   - Debounce de 300ms no onChange

2. **Implementar filtros** (1h 30min)
   - Tipos: select, multi-select, date-range, number-range
   - Popover para cada filtro (Radix Popover)
   - Badge mostrando filtros ativos
   - Botão "Limpar filtros"

3. **Bulk actions** (30min)
   - Aparecem apenas quando selectedRows.size > 0
   - Contador: "3 itens selecionados"
   - Botões de ação com confirmação (destructive)

**Critérios de aceite**:
- [ ] Search filtra dados em tempo real (debounced)
- [ ] Filtros aplicam lógica corretamente
- [ ] Bulk actions aparecem apenas com seleção
- [ ] Confirmation dialog funciona para ações destrutivas
- [ ] 4 testes passam (search, filters, bulk actions)

**Riscos**:
- **Filtros complexos**: Deixar lógica de filtro para o consumidor (apenas UI)

---

### T9: DataTable — Seleção e Row Actions (2h)

**Objetivo**: Adicionar checkboxes de seleção e menu de ações por linha.

**Dependências**: T8 (toolbar criado)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/DataTable/DataTable.tsx  (atualizado)
packages/ui/src/components/DataTable/DataTableRowActions.tsx  (novo)
packages/ui/src/components/DataTable/DataTable.test.tsx  (testes seleção)
```

**Passos detalhados**:

1. **Adicionar coluna de seleção** (1h)
   ```typescript
   const selectionColumn: DataTableColumn<T> = {
     id: "select",
     header: ({ table }) => (
       <Checkbox
         checked={table.getIsAllRowsSelected()}
         onChange={table.getToggleAllRowsSelectedHandler()}
       />
     ),
     cell: ({ row }) => (
       <Checkbox
         checked={row.getIsSelected()}
         onChange={row.getToggleSelectedHandler()}
       />
     ),
   };
   ```
   - Checkbox no header para "select all"
   - aria-selected nas rows
   - Callback onSelectionChange

2. **Menu de row actions** (1h)
   - Botão de 3 pontos (⋮) no final de cada linha
   - DropdownMenu com ações (Radix)
   - hidden e disabled condicionais por row

**Critérios de aceite**:
- [ ] Checkbox no header seleciona todas as linhas
- [ ] Checkbox individual seleciona linha específica
- [ ] aria-selected presente nas rows
- [ ] Row actions menu abre corretamente
- [ ] Ações condicionais (hidden/disabled) funcionam
- [ ] 3 testes passam

**Riscos**:
- **Performance com 1000+ checkboxes**: Usar memoização em callbacks

---

### T10: DataTable — Estados e Loading (2h)

**Objetivo**: Implementar estados de loading, error, empty e emptyFiltered.

**Dependências**: T9 (features principais prontas)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/DataTable/DataTableEmpty.tsx  (novo)
packages/ui/src/components/DataTable/DataTableSkeleton.tsx  (novo)
packages/ui/src/components/DataTable/DataTable.test.tsx  (testes estados)
```

**Passos detalhados**:

1. **Skeleton loading** (45min)
   - 5 rows de skeleton (Skeleton component)
   - Larguras variadas para simular conteúdo
   - aria-busy="true" no container

2. **Estado de erro** (30min)
   - Ilustração ou ícone de erro
   - Mensagem customizável
   - Botão "Tentar novamente" (onRetry callback)

3. **Estados vazios** (45min)
   - Empty: Nenhum dado (ilustração + CTA)
   - EmptyFiltered: Filtros sem resultado (botão "Limpar filtros")
   - Mensagens customizáveis via props

**Critérios de aceite**:
- [ ] Skeleton aparece quando loading=true
- [ ] Error state mostra mensagem + botão retry
- [ ] Empty state aparece quando data.length === 0
- [ ] EmptyFiltered aparece quando filtros ativos e sem dados
- [ ] 4 testes passam (1 por estado)

**Riscos**:
- **Ilustrações pesadas**: Usar ícones SVG inline, não imagens

---

### T11: DataTable — Stories e Testes Completos (3h)

**Objetivo**: Criar todas as stories, testes de integração e validar contra contrato.

**Dependências**: T10 (todos os estados prontos)

**Estimativa**: 3h

**Entregáveis**:
```
apps/storybook/stories/components/DataTable.stories.tsx  (criado)
packages/ui/src/components/DataTable/DataTable.test.tsx  (completo)
packages/ui/src/index.ts  (export adicionado)
```

**Passos detalhados**:

1. **Stories principais** (1h 30min)
   - Default (dados simples)
   - With Sorting
   - With Pagination
   - With Filters
   - With Selection
   - With Row Actions
   - With Bulk Actions
   - Loading State
   - Error State
   - Empty State

2. **Story complexa (exemplo real)** (30min)
   ```tsx
   export const StudentTable: Story = {
     render: () => {
       const [students, setStudents] = useState(mockStudents);
       const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
       
       return (
         <DataTable
           data={students}
           columns={studentColumns}
           sortable
           pagination
           selectable
           selectedRows={selectedIds}
           onSelectionChange={setSelectedIds}
           bulkActions={studentBulkActions}
           rowActions={studentRowActions}
         />
       );
     },
   };
   ```

3. **Testes de integração** (1h)
   - User flow completo: filtrar → ordenar → selecionar → ação em massa
   - Validar todas as regras do [DataTable.contract.ts](./contracts/DataTable.contract.ts)

**Critérios de aceite**:
- [ ] 10+ stories no Storybook
- [ ] Story de exemplo real funciona completamente
- [ ] Cobertura de testes >80%
- [ ] Todas as regras do contrato validadas
- [ ] Componente exportado no barrel export

**Riscos**:
- **Stories muito complexas**: Quebrar em sub-stories menores

---

### T12: DashboardLayout — Estrutura e Sidebar (3h)

**Objetivo**: Criar estrutura HTML semântica, implementar sidebar básica.

**Dependências**: T1 (deps instaladas)

**Estimativa**: 3h

**Entregáveis**:
```
packages/ui/src/components/DashboardLayout/
├── DashboardLayout.tsx
├── DashboardLayout.types.ts
├── DashboardSidebar.tsx
├── index.ts
└── DashboardLayout.test.tsx
```

**Passos detalhados**:

1. **Criar estrutura semântica** (1h)
   ```tsx
   <div className="dashboard-layout">
     <a href="#main-content" className="skip-link">
       Pular para conteúdo principal
     </a>
     
     <aside aria-label="Navegação principal">
       <nav>{/* Sidebar items */}</nav>
     </aside>
     
     <div className="main-container">
       <header>{/* Header */}</header>
       <main id="main-content">{children}</main>
       <footer>{footer}</footer>
     </div>
   </div>
   ```
   - Landmarks corretos (aside, nav, main, header, footer)
   - Skip link (sr-only + focus:visible)

2. **Implementar Sidebar** (1h 30min)
   - Logo no topo
   - User info (avatar + nome + role)
   - Lista de items de navegação
   - Footer customizável
   - Highlight de item ativo

3. **Testes básicos** (30min)
   - Renderiza landmarks
   - Items de navegação aparecem
   - Skip link funciona

**Critérios de aceite**:
- [ ] Estrutura HTML tem landmarks corretos
- [ ] Skip link funciona ao pressionar Tab
- [ ] Sidebar renderiza logo, user e items
- [ ] Item ativo tem aria-current="page"
- [ ] 3 testes básicos passam

**Riscos**:
- **Skip link não funciona em SSR**: Usar `useEffect` para client-only

---

### T13: DashboardLayout — Submenu e Accordion (2h)

**Objetivo**: Adicionar suporte a submenu expandível (accordion) na sidebar.

**Dependências**: T12 (sidebar básica criada)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/DashboardLayout/DashboardSidebar.tsx  (atualizado)
packages/ui/src/components/DashboardLayout/DashboardLayout.test.tsx  (testes submenu)
```

**Passos detalhados**:

1. **Implementar accordion** (1h 30min)
   - Usar Radix Accordion
   - Apenas 1 item expandido por vez
   - Ícone de chevron rotaciona ao expandir
   - Subitems indentados (pl-8)

2. **Estado de expansão** (30min)
   - useState para controlar item expandido
   - Expandir automaticamente se filho está ativo
   - Persistir em localStorage (próxima task)

**Critérios de aceite**:
- [ ] Clique no item pai expande/colapsa submenu
- [ ] Apenas 1 item expandido por vez
- [ ] Subitems têm indentação visual
- [ ] Item expandido automaticamente se filho ativo
- [ ] 2 testes passam

**Riscos**:
- **Accordion quebra acessibilidade**: Verificar aria-expanded e role="region"

---

### T14: DashboardLayout — Collapse e Mobile (3h)

**Objetivo**: Adicionar toggle collapse (ícones only) e drawer mobile.

**Dependências**: T13 (accordion funcionando)

**Estimativa**: 3h

**Entregáveis**:
```
packages/ui/src/components/DashboardLayout/DashboardLayout.tsx  (atualizado)
packages/ui/src/components/DashboardLayout/DashboardMobileDrawer.tsx  (novo)
packages/ui/src/hooks/useLocalStorage.ts  (criado)
```

**Passos detalhados**:

1. **Implementar collapse** (1h)
   - Botão de toggle (hamburguer ou chevron)
   - Largura muda: 240px → 60px
   - Labels ocultos, apenas ícones visíveis
   - Transição suave (300ms)
   - Tooltip nos ícones quando colapsado

2. **Criar hook useLocalStorage** (30min)
   ```typescript
   function useLocalStorage<T>(key: string, initialValue: T) {
     const [storedValue, setStoredValue] = useState<T>(initialValue);
     
     useEffect(() => {
       const item = localStorage.getItem(key);
       if (item) setStoredValue(JSON.parse(item));
     }, []);
     
     const setValue = (value: T) => {
       setStoredValue(value);
       localStorage.setItem(key, JSON.stringify(value));
     };
     
     return [storedValue, setValue];
   }
   ```
   - SSR-safe (usa useEffect)
   - Type-safe com genérico

3. **Mobile drawer** (1h 30min)
   - Usar Radix Dialog adaptado
   - Abre com hamburger menu no header
   - Sidebar overlay (z-50) com backdrop
   - Fecha ao clicar em item
   - Esc fecha drawer

**Critérios de aceite**:
- [ ] Toggle colapsa sidebar para 60px (ícones only)
- [ ] Estado persiste em localStorage
- [ ] Mobile (<640px) mostra hamburger menu
- [ ] Drawer abre/fecha corretamente
- [ ] Esc fecha drawer
- [ ] 4 testes passam (collapse + mobile)

**Riscos**:
- **Transição quebra layout**: Usar `transition-all` apenas em width

---

### T15: DashboardLayout — Header e Breadcrumbs (2h)

**Objetivo**: Implementar header fixo com breadcrumbs e user menu.

**Dependências**: T14 (sidebar completa)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/DashboardLayout/DashboardHeader.tsx  (novo)
packages/ui/src/components/DashboardLayout/DashboardBreadcrumbs.tsx  (novo)
packages/ui/src/components/DashboardLayout/DashboardUserMenu.tsx  (novo)
```

**Passos detalhados**:

1. **Criar header fixo** (30min)
   - Position sticky top-0
   - Z-index: 30 (abaixo de sidebar mobile)
   - Altura customizável (compact, comfortable, spacious)
   - Sombra sutil (shadow-sm)

2. **Implementar breadcrumbs** (45min)
   - Separador: `/` ou `>`
   - Último item não é link (página atual)
   - aria-label="Breadcrumbs"
   - Truncate em mobile se muito longo

3. **User menu dropdown** (45min)
   - Avatar + nome + email
   - DropdownMenu (Radix)
   - Itens: Perfil, Configurações, Ajuda, Sair
   - Separadores opcionais
   - Variant destructive para "Sair"

**Critérios de aceite**:
- [ ] Header fica fixo ao scrollar
- [ ] Breadcrumbs renderizam corretamente
- [ ] Último breadcrumb não é clicável
- [ ] User menu abre/fecha
- [ ] Ações do menu executam callbacks
- [ ] 3 testes passam

**Riscos**:
- **Z-index conflicts**: Documentar hierarquia de z-index

---

### T16: DashboardLayout — Keyboard Shortcuts (2h)

**Objetivo**: Adicionar atalhos de teclado (Ctrl+B, Esc, navegação).

**Dependências**: T15 (header criado)

**Estimativa**: 2h

**Entregáveis**:
```
packages/ui/src/components/DashboardLayout/DashboardLayout.tsx  (atualizado)
packages/ui/src/hooks/useKeyboardShortcut.ts  (criado)
```

**Passos detalhados**:

1. **Criar hook useKeyboardShortcut** (1h)
   ```typescript
   function useKeyboardShortcut(
     keys: string[],
     callback: () => void,
     options?: { enabled?: boolean; preventDefault?: boolean }
   ) {
     useEffect(() => {
       const handler = (e: KeyboardEvent) => {
         if (!options?.enabled) return;
         
         const key = e.key.toLowerCase();
         const ctrl = e.ctrlKey || e.metaKey;
         
         if (keys.includes(key) && ctrl) {
           if (options?.preventDefault) e.preventDefault();
           callback();
         }
       };
       
       window.addEventListener("keydown", handler);
       return () => window.removeEventListener("keydown", handler);
     }, [keys, callback, options]);
   }
   ```

2. **Implementar atalhos** (1h)
   - `Ctrl+B` / `Cmd+B`: Toggle sidebar
   - `Esc`: Fecha drawer mobile
   - `Tab`: Navegação por items
   - `↑/↓`: Move foco entre items (quando sidebar focada)
   - `Enter/Space`: Ativa item focado

**Critérios de aceite**:
- [ ] Ctrl+B (Cmd+B no Mac) colapsa sidebar
- [ ] Esc fecha drawer mobile
- [ ] Tab navega por items da sidebar
- [ ] ↑/↓ move foco quando sidebar focada
- [ ] Enter ativa item focado
- [ ] 5 testes de keyboard passam

**Riscos**:
- **Conflito com inputs**: Desabilitar shortcuts quando input está focado

---

### T17: DashboardLayout — Stories e Testes Completos (2h)

**Objetivo**: Criar todas as stories, testes de integração e validar contra contrato.

**Dependências**: T16 (keyboard shortcuts prontos)

**Estimativa**: 2h

**Entregáveis**:
```
apps/storybook/stories/components/DashboardLayout.stories.tsx  (criado)
packages/ui/src/components/DashboardLayout/DashboardLayout.test.tsx  (completo)
packages/ui/src/index.ts  (export adicionado)
```

**Passos detalhados**:

1. **Stories principais** (1h)
   - Default (sidebar + header + content)
   - With Submenu
   - Collapsed Sidebar
   - Mobile Drawer
   - With Breadcrumbs
   - With User Menu
   - With Notifications
   - Right Sidebar
   - Custom Footer

2. **Testes de integração** (1h)
   - User flow: clique em item → submenu expande → navegação
   - Keyboard shortcuts funcionam
   - Mobile responsivo (resize viewport)
   - Validar todas as regras do [DashboardLayout.contract.ts](./contracts/DashboardLayout.contract.ts)

**Critérios de aceite**:
- [ ] 9+ stories no Storybook
- [ ] Story de exemplo real (professor dashboard) funciona
- [ ] Cobertura de testes >80%
- [ ] Todas as regras do contrato validadas
- [ ] Componente exportado no barrel export
- [ ] Mobile responsivo testado

**Riscos**:
- **Testes de viewport complicados**: Usar `window.matchMedia` mock

---

### T18: Integration — Patterns e Best Practices (2h)

**Objetivo**: Criar exemplos de integração entre os 3 componentes, documentar padrões.

**Dependências**: T5, T11, T17 (todos os componentes prontos)

**Estimativa**: 2h

**Entregáveis**:
```
apps/storybook/stories/patterns/
├── LoginForm.stories.tsx           (FormField + RHF)
├── StudentsDataTable.stories.tsx   (DataTable real)
├── TeacherDashboard.stories.tsx    (DashboardLayout completo)
└── FormInDashboard.stories.tsx     (integração completa)
```

**Passos detalhados**:

1. **Story: Formulário de Login** (30min)
   - 3 FormFields (email, password, remember me)
   - React Hook Form + Zod
   - Button de submit
   - Estados: loading, error

2. **Story: Tabela de Alunos** (30min)
   - DataTable com dados reais (mock)
   - Colunas: avatar, nome, email, turma, pontuação
   - Filtros: status, turma
   - Bulk actions: exportar, arquivar
   - Row actions: ver, editar, deletar

3. **Story: Dashboard Completo** (1h)
   - DashboardLayout com sidebar de professor
   - Header com breadcrumbs + user menu
   - Main: DataTable de alunos
   - Footer com versão do sistema
   - Totalmente funcional

**Critérios de aceite**:
- [ ] 4 stories de integração no Storybook
- [ ] Todas funcionam completamente (sem mocks)
- [ ] Documentação inline explica padrões
- [ ] Screenshots no Storybook

**Riscos**:
- **Stories muito complexas**: Manter foco em demonstrar integração, não features

---

### T19: Performance — Benchmarks e Otimizações (2h)

**Objetivo**: Medir performance, identificar gargalos, otimizar componentes críticos.

**Dependências**: T18 (integração pronta)

**Estimativa**: 2h

**Entregáveis**:
```
specs/atomic-design-implementation/performance.md  (relatório)
packages/ui/src/components/DataTable/DataTable.tsx  (otimizado)
```

**Passos detalhados**:

1. **Benchmarks de DataTable** (1h)
   - Medir render time com 100, 500, 1000, 5000 rows
   - Usar React DevTools Profiler
   - Identificar re-renders desnecessários
   - Aplicar memoização: useMemo, useCallback, React.memo

2. **Otimizações** (1h)
   - DataTable: memoizar columns, callbacks
   - FormField: memoizar cloneElement se children não mudar
   - DashboardLayout: memoizar sidebar items
   - Bundle size: verificar tree-shaking

**Critérios de aceite**:
- [ ] Relatório de performance criado
- [ ] DataTable com 1000 rows roda <40ms render
- [ ] FormField não re-renderiza quando parent re-renderiza
- [ ] Bundle size dentro do limite (300 KB)
- [ ] Lighthouse score >90 (Storybook)

**Riscos**:
- **Otimização prematura**: Focar apenas em gargalos reais identificados

---

### T20: Release — Documentação e Checklist (2h)

**Objetivo**: Finalizar documentação, validar todos os componentes, preparar release notes.

**Dependências**: T19 (performance validada)

**Estimativa**: 2h

**Entregáveis**:
```
specs/atomic-design-implementation/RELEASE_NOTES.md  (criado)
CHANGELOG.md  (atualizado)
README.md  (atualizado com novos componentes)
packages/ui/package.json  (versão bumped: 0.6.0)
```

**Passos detalhados**:

1. **Validar checklist de qualidade** (30min)
   - Passar por [plan.md#success-criteria](./plan.md)
   - Verificar cobertura de testes >80%
   - Validar WCAG 2.1 AA com axe-core
   - Verificar bundle size

2. **Criar Release Notes** (30min)
   ```markdown
   # Release v0.6.0 — Atomic Design Components
   
   ## 🎉 Novos Componentes
   
   ### FormField (Molécula)
   - Campos de formulário completos com validação
   - Integração React Hook Form + Zod
   - Acessibilidade WCAG 2.1 AA
   
   ### DataTable (Organismo)
   - Tabelas avançadas com TanStack Table
   - Sorting, pagination, filters, bulk actions
   - Performance otimizada para 1000+ rows
   
   ### DashboardLayout (Template)
   - Layout admin com sidebar + header
   - Submenu, collapse, mobile drawer
   - Keyboard shortcuts (Ctrl+B)
   
   ## 📦 Novas Dependências
   
   - @tanstack/react-table: ^8.20.0
   - react-hook-form: ^7.52.0
   - zod: ^3.23.0
   
   ## 🐛 Breaking Changes
   
   Nenhuma (100% backward compatible)
   
   ## 📚 Documentação
   
   - 30+ stories no Storybook
   - Contratos de API completos
   - Guias de integração
   ```

3. **Atualizar CHANGELOG.md** (30min)
   - Formato Keep a Changelog
   - Links para issues/PRs

4. **Atualizar README.md** (30min)
   - Adicionar seção dos 3 novos componentes
   - Exemplos de uso rápido
   - Links para Storybook

**Critérios de aceite**:
- [ ] Todos os testes passam (pnpm test)
- [ ] Cobertura >80%
- [ ] Build executa sem warnings
- [ ] Storybook builda sem erros
- [ ] CHANGELOG.md atualizado
- [ ] README.md atualizado
- [ ] Release notes criadas
- [ ] Versão bumped (0.5.x → 0.6.0)

**Riscos**:
- **Esquecimento de algum detalhe**: Usar checklist de PR template

---

## 📈 Resumo de Estimativas

| Componente | Tasks | Tempo Total |
|------------|-------|-------------|
| **Setup** | T1 | 2h |
| **FormField** | T2-T5 | 8h |
| **DataTable** | T6-T11 | 16h |
| **DashboardLayout** | T12-T17 | 14h |
| **Integration & Release** | T18-T20 | 6h |
| **TOTAL** | 20 tasks | **46h** |

---

## 🎯 Milestones

| Milestone | Tasks | Quando |
|-----------|-------|--------|
| **M1: FormField completo** | T1-T5 | Dia 1 (~10h) |
| **M2: DataTable completo** | T6-T11 | Dias 2-3 (~16h) |
| **M3: DashboardLayout completo** | T12-T17 | Dias 4-5 (~14h) |
| **M4: Release** | T18-T20 | Dia 6 (~6h) |

---

## 🚦 Indicadores de Progresso

Acompanhe progresso via:

1. **Testes**: `pnpm test --coverage` → Target >80%
2. **Storybook**: `pnpm storybook` → Target 30+ stories
3. **Build**: `pnpm build` → 0 errors, 0 warnings
4. **Bundle**: `pnpm analyze` → <300 KB total

---

## 🔄 Fluxo de Trabalho Sugerido

Para cada task:

1. **Criar branch**: `git checkout -b feat/T1-setup-deps`
2. **Implementar**: Seguir passos da task
3. **Testar**: `pnpm test ComponentName`
4. **Validar**: Checar critérios de aceite
5. **Commit**: `git commit -m "feat(ui): T1 - Setup dependencies"`
6. **PR**: Criar pull request com checklist
7. **Review**: Validar contra contrato
8. **Merge**: Só após todos os critérios passarem

---

## 📚 Referências Rápidas

- **Specs**: [specs/components/](../../specs/components/)
- **Contratos**: [contracts/](./contracts/)
- **Plan**: [plan.md](./plan.md)
- **Research**: [research.md](./research.md)
- **Data Models**: [data-model.md](./data-model.md)
- **Quickstart**: [quickstart.md](./quickstart.md)

---

**Próximo passo**: Commitar toda a documentação (Phase 0-2) e começar T1 (Setup & Dependencies).

**Commit message sugerido**:
```
docs(specs): complete Phase 0-2 documentation for Atomic Design implementation

- Phase 0: Research with 5 technical decisions and alternatives
- Phase 1: Data models (24 interfaces + 12 utility types)
- Phase 1: API contracts (FormField, DataTable, DashboardLayout)
- Phase 1: Quickstart guide (25min setup)
- Phase 2: Task breakdown (20 granular tasks, 46h total)

Refs: #atomic-design-implementation
```
