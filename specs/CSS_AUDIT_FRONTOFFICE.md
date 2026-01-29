# 🔍 Auditoria CSS: Frontoffice vs Design System

> **Data:** 29 de janeiro de 2026  
> **Objetivo:** Validar sincronização de cores e estilos entre `educacross-frontoffice` e `@fabioeducacross/ui`

---

## 📊 Resumo Executivo

| Categoria | Frontoffice | Design System | Status |
|-----------|-------------|---------------|--------|
| Primary | `#6e63e8` | `#7367F0` | ⚠️ **Divergente** |
| Secondary | `#b4b7bd` | `#808390` | ⚠️ **Divergente** |
| Success | `#28c76f` | `#28C76F` | ✅ Sincronizado |
| Danger/Error | `#ea5455` | `#FF4B50` | ⚠️ **Divergente** |
| Warning | `#ffd643` | `#FF9F43` | ⚠️ **Divergente** |
| Info | N/A | `#00BAD1` | ⚠️ **Falta no Frontoffice** |

---

## 🎨 Cores Primárias - Comparação Detalhada

### Primary (Roxo Educacross)

| Escala | Frontoffice | Design System | Diferença |
|--------|-------------|---------------|-----------|
| 100 | N/A | `#E3E1FC` | ➕ Novo |
| 200 | N/A | `#C7C2F9` | ➕ Novo |
| 300 | N/A | `#ABA4F6` | ➕ Novo |
| 400 | N/A | `#8F85F3` | ➕ Novo |
| 500 | `#6e63e8` | `#7367F0` | ⚠️ **-8 Luminosidade** |
| 600 | N/A | `#675DD8` | ➕ Novo |
| 700 | N/A | `#6258CC` | ➕ Novo |
| 800 | N/A | `#5C52C0` | ➕ Novo |
| 900 | N/A | `#564DB4` | ➕ Novo |

**Recomendação:** Atualizar Frontoffice para usar `#7367F0` como primary-500.

---

### Secondary (Cinza Neutro)

| Escala | Frontoffice | Design System | Diferença |
|--------|-------------|---------------|-----------|
| 500 | `#b4b7bd` | `#808390` | ⚠️ **Muito diferente** |

**Impacto:** Botões secondary e textos mutados terão cores diferentes.

---

### Success (Verde)

| Escala | Frontoffice | Design System | Status |
|--------|-------------|---------------|--------|
| 500 | `#28c76f` | `#28C76F` | ✅ Idêntico |

---

### Danger/Error (Vermelho)

| Escala | Frontoffice | Design System | Diferença |
|--------|-------------|---------------|-----------|
| 500 | `#ea5455` | `#FF4B50` | ⚠️ **Tonalidade diferente** |

**Nota:** Frontoffice usa tom mais escuro, DS usa tom mais vibrante.

---

### Warning (Laranja/Amarelo)

| Escala | Frontoffice | Design System | Diferença |
|--------|-------------|---------------|-----------|
| 500 | `#ffd643` | `#FF9F43` | ⚠️ **Amarelo vs Laranja** |

**Impacto Crítico:** A cor de warning é completamente diferente!
- Frontoffice: Amarelo brilhante
- Design System: Laranja

---

## 📦 Mapeamento de Componentes

### Componentes com Cobertura no Design System

| Componente Frontoffice | Story DS | Status CSS | Prioridade |
|------------------------|----------|------------|------------|
| `badge/` | ✅ Badge.stories.tsx | 🔴 Verificar | Alta |
| `card/` | ✅ Card.stories.tsx | 🔴 Verificar | Alta |
| `chart/` | ✅ Chart*.stories.tsx | 🔴 Verificar | Média |
| `divider/` | ✅ Divider.stories.tsx | 🔴 Verificar | Baixa |
| `filter/` | ✅ FilterPanel.stories.tsx | 🔴 Verificar | Alta |
| `form/` | ✅ Input, Checkbox, Radio, Select | 🔴 Verificar | Crítica |
| `legends/` | ✅ LegendCard.stories.tsx | 🔴 Verificar | Alta |
| `modal/` | ✅ Dialog.stories.tsx | 🔴 Verificar | Alta |
| `player/` | ✅ Player.stories.tsx | 🔴 Verificar | Média |
| `progessBar/` | ✅ Progress*.stories.tsx | 🔴 Verificar | Alta |
| `question/` | ✅ Question.stories.tsx | 🔴 Verificar | Crítica |
| `selects/` | ✅ Select.stories.tsx | 🔴 Verificar | Crítica |
| `tab/` | ✅ Tabs.stories.tsx | 🔴 Verificar | Alta |
| `table/` | ✅ Table.stories.tsx | 🔴 Verificar | Crítica |

### Componentes SEM Cobertura no Design System

| Componente Frontoffice | Descrição | Ação Necessária |
|------------------------|-----------|-----------------|
| `app-collapse/` | Collapse/Accordion | Usar Accordion existente |
| `app-language-selector/` | Seletor de idioma | Criar story |
| `cells/` | Células de tabela | Incluir em Table |
| `deeplink/` | Deep links | Avaliar necessidade |
| `descriptors/` | Descritores | Criar story |
| `evaluations/` | Avaliações | Criar story |
| `exercise-type/` | Tipos de exercício | Criar story |
| `mission-plus/` | Missões Plus | Criar story |
| `missions/` | Missões | Criar story |
| `NPS/` | Net Promoter Score | Criar story |
| `PDFs/` | Geração de PDFs | Avaliar necessidade |
| `proficiency/` | Proficiência | Criar story |
| `reading-meter/` | Medidor de leitura | Criar story |
| `student-evidence-report/` | Relatório de evidências | Criar story |
| `subjects/` | Matérias | Criar story |
| `teacher/` | Componentes professor | Criar story |

---

## 🔴 Divergências Críticas Identificadas

### 1. Variáveis CSS vs SCSS

**Frontoffice:** Usa variáveis SCSS compiladas
```scss
$primary: #6e63e8;
$secondary: #b4b7bd;
```

**Design System:** Usa CSS Custom Properties
```css
--color-primary-500: #7367F0;
--color-secondary-500: #808390;
```

**Problema:** Não há compatibilidade automática.

---

### 2. Sistema de Cores de Legenda

**Frontoffice (_variables.scss):**
```scss
$legend-advanced: #6e63e8;      // Avançado
$legend-proficient: #28c76f;    // Proficiente
$legend-basic: #ff9f43;         // Básico
$legend-below-basic: #ea5455;   // Abaixo do Básico
$legend-not-completed: #b4b7bd; // Não fizeram
```

**Design System:**
- Usa classes semânticas: `bg-primary`, `bg-success`, `bg-warning`, `bg-error`

**Problema:** Cores de legenda não mapeiam diretamente.

---

### 3. Espaçamento e Border Radius

**Frontoffice:** Usa valores do Bootstrap
```scss
// Bootstrap defaults
$border-radius: 0.25rem;
$border-radius-lg: 0.3rem;
```

**Design System:** Usa tokens customizados
```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
```

---

## ✅ Checklist de Validação por Componente

### Badge
- [ ] Cor de fundo primary matches
- [ ] Cor de fundo secondary matches
- [ ] Cor de fundo success matches
- [ ] Cor de fundo danger matches
- [ ] Cor de fundo warning matches
- [ ] Border radius correto
- [ ] Padding correto
- [ ] Font size correto

### Button
- [ ] Primary variant cor matches
- [ ] Secondary variant cor matches
- [ ] Outline variant cor matches
- [ ] Disabled state matches
- [ ] Hover state matches
- [ ] Focus ring matches
- [ ] Border radius correto
- [ ] Altura e padding corretos

### Card
- [ ] Background color matches
- [ ] Border matches
- [ ] Shadow matches
- [ ] Border radius matches
- [ ] Padding interno matches
- [ ] Header styling matches
- [ ] Footer styling matches

### Input
- [ ] Border color default matches
- [ ] Border color focus matches
- [ ] Border color error matches
- [ ] Placeholder color matches
- [ ] Background color matches
- [ ] Height matches
- [ ] Padding matches
- [ ] Border radius matches

### Select
- [ ] Trigger styling matches
- [ ] Dropdown styling matches
- [ ] Option hover matches
- [ ] Selected option matches
- [ ] Disabled state matches

### Table
- [ ] Header background matches
- [ ] Row hover matches
- [ ] Border color matches
- [ ] Cell padding matches
- [ ] Alternating rows matches

### Modal/Dialog
- [ ] Overlay color matches
- [ ] Background color matches
- [ ] Border radius matches
- [ ] Shadow matches
- [ ] Header styling matches
- [ ] Close button matches

### Progress Bar
- [ ] Track background matches
- [ ] Fill color matches
- [ ] Height matches
- [ ] Border radius matches
- [ ] Animation matches

### Legend Components
- [ ] Avançado color matches (#6e63e8 vs #7367F0)
- [ ] Proficiente color matches (#28c76f)
- [ ] Básico color matches (#ff9f43)
- [ ] Abaixo do Básico color matches (#ea5455 vs #FF4B50)
- [ ] Não avaliado color matches (#b4b7bd vs #808390)

---

## 🛠️ Plano de Ação Recomendado

### Fase 1: Sincronização de Tokens (Prioridade Alta)

1. **Criar arquivo de mapeamento:**
   ```scss
   // _ds-compatibility.scss
   $primary: var(--color-primary-500);
   $secondary: var(--color-secondary-500);
   // ...
   ```

2. **Atualizar cores base no Frontoffice:**
   - `#6e63e8` → `#7367F0` (primary)
   - `#ea5455` → `#FF4B50` (error)
   - `#ffd643` → `#FF9F43` (warning)

### Fase 2: Validação Visual (Prioridade Média)

1. Criar página de comparação lado-a-lado
2. Screenshots automatizados com Playwright
3. Diff visual entre Frontoffice e Storybook

### Fase 3: Migração Gradual (Prioridade Normal)

1. Substituir componentes Frontoffice por DS
2. Começar por componentes de baixo acoplamento
3. Manter compatibilidade retroativa

---

## 📋 Próximos Passos Imediatos

1. [ ] Rodar Frontoffice e Storybook lado a lado
2. [ ] Capturar screenshots de cada componente
3. [ ] Documentar diferenças visuais específicas
4. [ ] Priorizar correções por impacto visual
5. [ ] Criar PRs de atualização de tokens
6. [ ] Validar com QA antes de merge

---

## 📎 Arquivos Relevantes

### Frontoffice
- `src/assets/scss/variables/_variables.scss` - Variáveis principais
- `src/assets/scss/variables/_variables-components.scss` - Variáveis de componentes
- `src/assets/scss/whitelabel/*.scss` - Temas whitelabel

### Design System
- `packages/ui/src/styles.css` - Tokens CSS
- `packages/ui/src/tailwind-preset.ts` - Preset Tailwind
- `apps/storybook/stories/components/*.stories.tsx` - Stories

---

**Autor:** GitHub Copilot  
**Status:** Draft - Aguardando validação visual
