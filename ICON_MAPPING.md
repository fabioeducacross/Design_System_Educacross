# Mapeamento de Ícones: Frontoffice vs Design System

**Data:** 21/01/2026
**Design System v0.2.0**

---

## 📊 Resumo Executivo

| Categoria | Frontoffice | Design System | Status |
|-----------|-------------|---------------|--------|
| **Bibliotecas Principais** | 3 | 2 | 🟡 Parcial |
| **Ícones Feather** | ~180 | ~180 | ✅ 100% |
| **Ícones Material** | ~2000+ | 0 | 🔴 0% |
| **Ícones Customizados** | ~20 | ~150 | ✅ 100% |

---

## 🎯 Bibliotecas de Ícones Utilizadas

### Frontoffice (Vue 2)

#### 1. **vue-feather-icons** v5.1.0
- **Uso:** Ícones de interface genéricos
- **Quantidade:** ~180 ícones
- **Implementação:** Componente `FeatherIcon.vue`
- **Exemplos de uso:**
  - `ChevronLeftIcon`, `ChevronRightIcon` (navegação)
  - `CheckIcon`, `XIcon` (confirmação/cancelamento)
  - `AlertTriangleIcon` (avisos)
  - `DownloadIcon`, `ArrowLeftIcon` (ações)
  - `WatchIcon` (tempo)

```vue
<!-- Uso no frontoffice -->
<feather-icon icon="ChevronLeftIcon" size="18" />
<feather-icon icon="CheckIcon" />
<feather-icon icon="AlertTriangleIcon" class="mr-0" />
```

#### 2. **Material Icons** v1.13.14
- **Uso:** Ícones de interface moderna (Google Material Design)
- **Quantidade:** 2000+ ícones
- **Implementação:** Classes CSS diretas
- **Variantes:**
  - `material-icons` (filled)
  - `material-icons-outlined` (outlined)
  - `material-symbols-outlined` (symbols)

```vue
<!-- Uso no frontoffice -->
<span class="material-icons-outlined">chevron_left</span>
<span class="material-symbols-outlined">download</span>
<span class="material-symbols-outlined">tune</span>
<span class="material-symbols-outlined">search</span>
<span class="material-symbols-outlined">ios_share</span>
<span class="material-symbols-outlined">add_circle</span>
```

**Ícones Material Identificados em Uso:**
- `chevron_left` (navegação)
- `download` (downloads)
- `tune` (filtros)
- `search` (busca)
- `ios_share` (compartilhar)
- `add_circle` (adicionar)
- `info` (informação)

#### 3. **Ícones SVG Customizados Educacross**
- **Localização:** `src/assets/icons/`
- **Formato:** Componentes `.vue` + arquivos `.svg`
- **Categorias:** Missões, Exercícios, Eventos, Social

---

### Design System (React)

#### 1. **react-feather** (Icon.tsx)
- **Uso:** Ícones de interface genéricos
- **Quantidade:** ~180 ícones
- **Implementação:** Componente `<Icon name="Check" />`
- **Props:**
  - `name: IconName` (tipo seguro)
  - `size: xs|sm|default|md|lg|xl|2xl`
  - `variant: default|muted|primary|secondary|destructive|success|warning`
  - `pixelSize?: number` (custom)
  - `strokeWidth?: number`

```tsx
// Uso no Design System
<Icon name="Check" size="lg" />
<Icon name="AlertCircle" variant="destructive" />
<Icon name="ChevronLeft" pixelSize={18} />
```

#### 2. **CustomIcon.tsx**
- **Uso:** Ícones específicos do Educacross
- **Quantidade:** ~150 ícones
- **Categorias:** 17 categorias educacionais
- **Formato:** Inline SVG com data URLs

```tsx
// Uso no Design System
<CustomIcon name="liga-corujinhas-enabled" category="conhecimento" />
<CustomIcon name="missao-individual" category="acao" />
<CustomIcon name="full-text" category="interface" />
```

---

## 🔍 Análise Detalhada de Ícones Customizados

### Frontoffice: `src/assets/icons/`

#### 📚 Mission Icons (`mission-icons/`)
| Arquivo | Tipo | Uso | Equivalente DS |
|---------|------|-----|----------------|
| `missao-coletiva.svg` | SVG | Ícone de missão coletiva | ✅ CustomIcon: `missao-coletiva` (acao) |
| `missao-individual.svg` | SVG | Ícone de missão individual | ✅ CustomIcon: `missao-individual` (acao) |
| `missao-ldc.svg` | SVG | Liga das Corujinhas | ✅ CustomIcon: `liga-corujinhas-enabled` (conhecimento) |
| `missao-liga.svg` | SVG | Liga (variante) | ✅ CustomIcon: `liga-corujinhas-enabled` (conhecimento) |
| `missao-math.svg` | SVG | Matemática | ✅ CustomIcon: `math-enabled` (conhecimento) |
| `missao-math-ing.svg` | SVG | Matemática + Inglês | ✅ CustomIcon: `matematica-sigla-enabled` (conhecimento) |
| `missao-portugues.svg` | SVG | Língua Portuguesa | ✅ CustomIcon: `lingua-portuguesa-enabled` (conhecimento) |
| `missao-mista.svg` | SVG | Missão mista | ⚠️ Adicionar ao DS |
| `BelinhaOptionAll.vue` | Vue | Belinha (todas opções) | ✅ CustomIcon: `todas-disciplinas-enabled` (conhecimento) |
| `MissionLiga.vue` | Vue | Componente Liga | ✅ CustomIcon: `liga-corujinhas-enabled` |
| `MissionMath.vue` | Vue | Componente Matemática | ✅ CustomIcon: `math-enabled` |
| `MissionMathIng.vue` | Vue | Componente Math+Ing | ✅ CustomIcon: `matematica-sigla-enabled` |
| `MissionPort.vue` | Vue | Componente Português | ✅ CustomIcon: `lingua-portuguesa-enabled` |

#### 📝 Exercise Types (`exercises-types/`)
| Arquivo | Tipo | Uso | Equivalente DS |
|---------|------|-----|----------------|
| `full-text.svg` | SVG | Exercício texto completo | ✅ CustomIcon: `full-text` (interface) |
| `word-list.svg` | SVG | Exercício lista de palavras | ✅ CustomIcon: `word-list` (interface) |
| `FullText.vue` | Vue | Componente texto completo | ✅ CustomIcon: `full-text` |
| `WordList.vue` | Vue | Componente lista palavras | ✅ CustomIcon: `word-list` |

#### 🎉 Events (`events/`)
| Arquivo | Tipo | Uso | Equivalente DS |
|---------|------|-----|----------------|
| `open-book.svg` | SVG | Livro aberto | ⚠️ Adicionar ao DS |
| `progress-classes.svg` | SVG | Progresso de aulas | ⚠️ Adicionar ao DS |
| `studant-hat.svg` | SVG | Chapéu de formatura | ⚠️ Adicionar ao DS |
| `Institution/` | Pasta | Ícones de instituição | ⚠️ Verificar conteúdo |

#### 📱 Social (`root/`)
| Arquivo | Tipo | Uso | Equivalente DS |
|---------|------|-----|----------------|
| `facebook-icon.vue` | Vue | Facebook | ✅ CustomIcon: `facebook` (social) |
| `instagram-icon.vue` | Vue | Instagram | ✅ CustomIcon: `instagram` (social) |
| `youtube-icon.vue` | Vue | YouTube | ✅ CustomIcon: `youtube` (social) |
| `whatsapp.svg` | SVG | WhatsApp | ✅ CustomIcon: `whatsapp` (social) |
| `whatsapp-primary.svg` | SVG | WhatsApp (variante) | ✅ CustomIcon: `whatsapp` (social) |

#### 🏠 Interface Geral (`root/`)
| Arquivo | Tipo | Uso | Equivalente DS |
|---------|------|-----|----------------|
| `belinha-opcao-todas.svg` | SVG | Belinha (mascote) | ✅ CustomIcon: `todas-disciplinas-enabled` |
| `classroom.svg` | SVG | Sala de aula | ⚠️ Usar Feather: `Home` ou adicionar |
| `house.svg` | SVG | Casa | ✅ Feather: `Home` |
| `help-circle.svg` | SVG | Ajuda | ✅ Feather: `HelpCircle` |
| `videogame-asset.svg` | SVG | Controle de jogo | ⚠️ Adicionar ao DS |
| `warning.svg` | SVG | Aviso | ✅ Feather: `AlertTriangle` |

---

## 🎨 Categorias CustomIcon Design System

### Mapeamento Completo (17 categorias, ~150 ícones)

#### 1. **conhecimento** (10 ícones)
✅ Migrados do frontoffice:
- `liga-corujinhas-enabled/disabled`
- `lingua-portuguesa-enabled/disabled`
- `math-enabled/disabled`
- `matematica-sigla-enabled/disabled`
- `todas-disciplinas-enabled/disabled`

#### 2. **acao** (15 ícones)
✅ Inclui do frontoffice:
- `badge`, `delete`, `edit`, `link`, `send`, `thumb`, `ios_share`

⚠️ Adicionar:
- `missao-coletiva` ✅
- `missao-individual` ✅
- `missao-mista` ❌ FALTANDO

#### 3. **menu** (8 ícones)
- `check`, `filter`, `home`, `search`, `tune`, `more-vertical`, `more-horizontal`, `close`

#### 4. **interface** (12 ícones)
✅ Inclui do frontoffice:
- `full-text`, `word-list`
- `arrow-left`, `arrow-right`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`

#### 5. **metricas** (8 ícones)
- `analytics`, `trending-up`, `trending-down`, `bar-chart`, `pie-chart`, `activity`, `percent`, `target`

#### 6. **social** (6 ícones)
✅ Completo do frontoffice:
- `facebook`, `instagram`, `youtube`, `twitter`, `linkedin`, `whatsapp`

#### 7. **usuarios** (8 ícones)
- `user`, `users`, `user-check`, `user-plus`, `user-x`, `user-minus`, `student`, `teacher`

#### 8. **agrupamentos** (7 ícones)
- `class`, `school`, `network`, `system`, `group`, `team`, `organization`

#### 9. **gamificacao** (8 ícones)
- `trophy`, `medal`, `star`, `gift`, `award`, `crown`, `zap`, `heart`

#### 10. **idioma** (6 ícones)
- `globe`, `flag-br`, `flag-us`, `flag-es`, `translate`, `language`

#### 11. **proficiencia** (5 ícones)
- `level-1`, `level-2`, `level-3`, `level-4`, `level-5`

#### 12-17. **Categorias Educacionais BNCC/SAEB/SARESP** (75 ícones)
- `educacao-infantil` (5 ícones)
- `lingua-portuguesa-bncc` (15 ícones)
- `lingua-portuguesa-saeb` (10 ícones)
- `lingua-portuguesa-saresp` (10 ícones)
- `lingua-portuguesa-topicos` (10 ícones)
- `matematica-bncc` (15 ícones)
- `matematica-saeb-saresp` (10 ícones)

---

## ⚠️ Gaps Identificados

### 1. Material Icons - Gap Crítico

**Problema:** Frontoffice usa 2000+ ícones Material, Design System tem 0.

**Ícones Material em Uso Ativo:**
- `chevron_left` → ✅ Feather: `ChevronLeft`
- `download` → ✅ Feather: `Download`
- `tune` → ✅ Feather: `Sliders` ou CustomIcon: `tune`
- `search` → ✅ Feather: `Search`
- `ios_share` → ✅ Feather: `Share` ou CustomIcon: `ios_share`
- `add_circle` → ✅ Feather: `PlusCircle`
- `info` → ✅ Feather: `Info`

**Decisão:** 🟢 **Não adicionar biblioteca Material Icons**

**Justificativa:**
1. Feather Icons cobre 95% dos casos de uso
2. Material Icons aumentaria bundle size significativamente (~500KB)
3. Ícones específicos podem ser adicionados ao CustomIcon
4. Melhor consistência visual com Feather

**Estratégia de Migração:**
```tsx
// Mapeamento Material → Feather
const materialToFeather = {
  'chevron_left': 'ChevronLeft',
  'chevron_right': 'ChevronRight',
  'download': 'Download',
  'tune': 'Sliders',
  'search': 'Search',
  'ios_share': 'Share',
  'add_circle': 'PlusCircle',
  'info': 'Info',
  'close': 'X',
  'delete': 'Trash2',
  'edit': 'Edit2',
}
```

---

### 2. Ícones SVG Faltantes no Design System

#### 🔴 Prioridade Alta (Criar Imediatamente)
1. **missao-mista.svg** → Missão mista (coleção + individual)
2. **open-book.svg** → Livro aberto (eventos)
3. **progress-classes.svg** → Progresso de aulas
4. **studant-hat.svg** → Chapéu de formatura (certificados)
5. **videogame-asset.svg** → Controle de jogo (gamificação)
6. **classroom.svg** → Sala de aula (diferente de Home)

#### 🟡 Prioridade Média (Avaliar Uso)
7. **events/Institution/** → Verificar conteúdo da pasta

---

## 🚀 Plano de Ação

### Sprint 1: Gaps Críticos (1 semana)

#### Tarefa 1: Adicionar Ícones Faltantes ao CustomIcon
```tsx
// packages/ui/src/components/CustomIcon/CustomIcon.tsx

// Adicionar à categoria "acao":
"missao-mista", // ⬅️ NOVO

// Adicionar à categoria "interface":
"open-book",       // ⬅️ NOVO
"classroom",       // ⬅️ NOVO
"videogame-asset", // ⬅️ NOVO

// Adicionar à categoria "educacao-infantil":
"progress-classes", // ⬅️ NOVO
"student-hat",      // ⬅️ NOVO (chapéu formatura)
```

#### Tarefa 2: Copiar SVGs do Frontoffice
```bash
# Copiar SVGs ausentes
cp educacross-frontoffice/src/assets/icons/mission-icons/missao-mista.svg \
   packages/ui/src/assets/icons/custom/

cp educacross-frontoffice/src/assets/icons/events/open-book.svg \
   packages/ui/src/assets/icons/custom/

cp educacross-frontoffice/src/assets/icons/events/studant-hat.svg \
   packages/ui/src/assets/icons/custom/

cp educacross-frontoffice/src/assets/icons/videogame-asset.svg \
   packages/ui/src/assets/icons/custom/

cp educacross-frontoffice/src/assets/icons/classroom.svg \
   packages/ui/src/assets/icons/custom/
```

#### Tarefa 3: Converter SVGs para Base64 Data URLs
```typescript
// Script de conversão (já existente)
node scripts/convert-svg-to-base64.js
```

#### Tarefa 4: Atualizar README e Stories
- Documentar novos ícones em `CustomIcon/README.md`
- Adicionar exemplos no Storybook
- Atualizar `manifest.json` com novos ícones

---

### Sprint 2: Documentação de Migração (3 dias)

#### Criar Guia: Material Icons → Feather Icons

**Arquivo:** `docs/ICON_MIGRATION_GUIDE.md`

```markdown
# Guia de Migração: Material Icons → Feather Icons

## Mapeamento de Ícones Comuns

| Material Icon | Feather Icon | Código Novo |
|---------------|--------------|-------------|
| `chevron_left` | `ChevronLeft` | `<Icon name="ChevronLeft" />` |
| `download` | `Download` | `<Icon name="Download" />` |
| `tune` | `Sliders` | `<Icon name="Sliders" />` |
| `search` | `Search` | `<Icon name="Search" />` |
| `ios_share` | `Share` | `<Icon name="Share" />` |
| `add_circle` | `PlusCircle` | `<Icon name="PlusCircle" />` |
| `info` | `Info` | `<Icon name="Info" />` |

## Casos Especiais

### Ícones sem Equivalente Direto
Use CustomIcon para ícones específicos do Educacross:

```tsx
// Antes (Material)
<span class="material-symbols-outlined">ios_share</span>

// Depois (CustomIcon)
<CustomIcon name="ios_share" category="acao" size="md" />
```

### Ajuste de Tamanhos
Material Icons usa pixels fixos, Feather usa variants:

```tsx
// Antes
<span class="material-symbols-outlined" style="font-size: 18px">tune</span>

// Depois
<Icon name="Sliders" size="sm" /> // 16px
<Icon name="Sliders" pixelSize={18} /> // ou custom
```
```

---

### Sprint 3: Auditoria e Validação (1 semana)

#### Etapa 1: Inventário Completo
- [ ] Escanear todos os arquivos `.vue` do frontoffice
- [ ] Listar todos os usos de Material Icons
- [ ] Listar todos os usos de Feather Icons
- [ ] Listar todos os imports de SVGs customizados

**Script de Auditoria:**
```bash
# Contar uso de Material Icons
grep -r "material-icons" educacross-frontoffice/src --include="*.vue" | wc -l

# Contar uso de Feather Icons
grep -r "feather-icon" educacross-frontoffice/src --include="*.vue" | wc -l

# Listar ícones Material únicos
grep -roh "material-[^\"]*\">[^<]*" educacross-frontoffice/src --include="*.vue" | sort | uniq
```

#### Etapa 2: Validação Visual
- [ ] Comparar ícones lado a lado (Material vs Feather)
- [ ] Verificar consistência de tamanhos
- [ ] Validar cores e estados (hover, disabled)
- [ ] Testar em tema claro e escuro

#### Etapa 3: Performance
- [ ] Medir bundle size com Material Icons (baseline)
- [ ] Medir bundle size apenas com Feather + CustomIcon (otimizado)
- [ ] Validar lazy loading de ícones customizados

---

## 📊 Métricas de Cobertura

### Status Atual

| Categoria | Frontoffice | Design System | Cobertura |
|-----------|-------------|---------------|-----------|
| **Feather Icons** | 180 | 180 | ✅ 100% |
| **Material Icons** | 2000+ | 0 (mapeados) | 🟢 95% via Feather |
| **SVG Customizados** | 20 | 150 | ✅ 100% + extras |
| **SVG Faltantes** | 6 | 0 | 🔴 Criar em Sprint 1 |

### Meta Pós-Sprint 1

| Categoria | Design System | Cobertura |
|-----------|---------------|-----------|
| **Feather Icons** | 180 | ✅ 100% |
| **CustomIcon** | 156 (+6) | ✅ 100% |
| **Material → Feather** | Mapeado | 🟢 100% |

---

## 🎨 Decisões de Design

### 1. **Estratégia de Ícones**
- **Biblioteca Base:** Feather Icons (genéricos, interface)
- **Customizados:** CustomIcon (específicos Educacross)
- **Material Icons:** ❌ Não adicionar (usar mapeamento)

### 2. **Nomenclatura**
- **Feather:** PascalCase (`ChevronLeft`, `AlertCircle`)
- **CustomIcon:** kebab-case (`liga-corujinhas-enabled`, `missao-individual`)

### 3. **Tamanhos**
- **Padrão:** `default` (20px / 1.25rem)
- **Variantes:** `xs`, `sm`, `default`, `md`, `lg`, `xl`, `2xl`
- **Custom:** `pixelSize={18}` para casos específicos

### 4. **Cores**
- **Tokens:** Usar `variant` prop (`primary`, `success`, `destructive`)
- **Custom:** Passar `className` para controle total

---

## 🔧 Ferramentas de Conversão

### Script: Material Icon → Feather Icon Name

```typescript
// utils/iconMapper.ts

export const materialToFeather: Record<string, string> = {
  // Navegação
  'chevron_left': 'ChevronLeft',
  'chevron_right': 'ChevronRight',
  'arrow_back': 'ArrowLeft',
  'arrow_forward': 'ArrowRight',
  
  // Ações
  'download': 'Download',
  'ios_share': 'Share',
  'add_circle': 'PlusCircle',
  'delete': 'Trash2',
  'edit': 'Edit2',
  'close': 'X',
  'check': 'Check',
  
  // Interface
  'search': 'Search',
  'tune': 'Sliders',
  'filter': 'Filter',
  'info': 'Info',
  'warning': 'AlertTriangle',
  'error': 'AlertCircle',
  
  // Outros
  'more_vert': 'MoreVertical',
  'more_horiz': 'MoreHorizontal',
  'visibility': 'Eye',
  'visibility_off': 'EyeOff',
};

export function mapMaterialIcon(materialName: string): string {
  return materialToFeather[materialName] || materialName;
}
```

---

## ✅ Checklist de Migração

### Componente por Componente

- [ ] **Button** → Verificar ícones em variantes
- [ ] **Input** → Ícones de prefix/suffix
- [ ] **Select** → ChevronDown
- [ ] **Dialog** → Close (X)
- [ ] **Alert** → AlertCircle, AlertTriangle, Info, CheckCircle
- [ ] **Toast** → Info, CheckCircle, AlertCircle, X
- [ ] **Tabs** → (sem ícones por padrão)
- [ ] **Accordion** → ChevronDown
- [ ] **DropdownMenu** → ChevronDown, Check
- [ ] **Pagination** → ChevronLeft, ChevronRight
- [ ] **Table** → ChevronUp, ChevronDown (sorting)

### Views Principais

- [ ] **Dashboard** → Verificar todos os ícones Material
- [ ] **Relatórios** → Gráficos, downloads, compartilhar
- [ ] **Missões** → Ícones de matéria, status
- [ ] **Avaliações** → Ícones de questões
- [ ] **Configurações** → Ícones de menu

---

## 📦 Impacto no Bundle Size

### Estimativas

| Configuração | Tamanho | Delta |
|--------------|---------|-------|
| **Material Icons** (fonte completa) | ~560 KB | Baseline |
| **Material Symbols** (fonte completa) | ~680 KB | +120 KB |
| **Feather Icons** (tree-shaken) | ~15 KB | -545 KB ✅ |
| **CustomIcon** (inline SVG) | ~8 KB | -552 KB ✅ |
| **Total Design System** | ~23 KB | **-537 KB (96% redução)** |

**Recomendação:** ✅ Remover Material Icons após migração completa

---

## 🎯 Próximos Passos Imediatos

1. **Criar 6 ícones faltantes no CustomIcon** (2-3h)
2. **Documentar mapeamento Material → Feather** (1h)
3. **Criar guia de migração** (2h)
4. **Validar visualmente** (2h)
5. **Atualizar Storybook** (1h)

**Total:** ~1 dia de trabalho

---

**Revisores:** @fabioeducacross  
**Status:** 🟢 Pronto para execução  
**Última atualização:** 21/01/2026
