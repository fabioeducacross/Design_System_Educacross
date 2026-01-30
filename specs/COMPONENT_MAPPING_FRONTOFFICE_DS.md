# 📦 Mapeamento Completo: Componentes Frontoffice → Design System

> **Data:** 29 de janeiro de 2026  
> **Objetivo:** Mapear todos os componentes Vue do Frontoffice e verificar equivalência no Design System React

---

## 📊 Resumo Executivo

| Categoria | Total | Com Story | Sem Story | Cobertura |
|-----------|-------|-----------|-----------|-----------|
| **Componentes Vue** | 107 | 35 | 72 | **33%** |
| **Stories DS** | 45 | - | - | - |

---

## ✅ Componentes COM Equivalente no Design System

### Formulários e Inputs

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `EFormCheck.vue` | `Checkbox.stories.tsx` | ⚠️ Verificar | Props diferentes? |
| `ESelect.vue` | `Select.stories.tsx` | ⚠️ Verificar | Multi-select? |
| `SelectInfinityScroll.vue` | `Select.stories.tsx` | ❌ Parcial | Falta infinite scroll |
| `SelectLocale.vue` | ❌ Sem story | ❌ Falta | Seletor de idioma |
| `MultipleDropdown.vue` | `DropdownMenu.stories.tsx` | ⚠️ Verificar | Comportamento diferente? |

### Cards e Containers

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `Card.vue` | `Card.stories.tsx` | ⚠️ Verificar | CSS diferente? |
| `CardsList.vue` | ❌ Sem story | ❌ Falta | Lista de cards |
| `MediaCard.vue` | `MediaCard.stories.tsx` | ⚠️ Verificar | |
| `MediaCardIcon.vue` | `MediaCard.stories.tsx` | ⚠️ Verificar | Variante? |
| `DynamicMediaCard.vue` | `MediaCard.stories.tsx` | ⚠️ Verificar | Dinâmico? |

### Badges e Status

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `BadgeStatus.vue` | `Badge.stories.tsx` | ⚠️ Verificar | Cores? |
| `CellStatus.vue` | ❌ Sem story | ❌ Falta | Status de célula |
| `QuestionStatus.vue` | ❌ Sem story | ❌ Falta | Status de questão |
| `PerformanceCell.vue` | ❌ Sem story | ❌ Falta | Célula de desempenho |

### Charts e Gráficos

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `BarChart.vue` | `ChartBar.stories.tsx` | ⚠️ Verificar | ApexCharts? |
| `DefaultChart.vue` | `ChartDefault.stories.tsx` | ⚠️ Verificar | |
| `PieChart.vue` | `ChartPie.stories.tsx` | ⚠️ Verificar | |
| `RadialBar.vue` | `ChartRadialBar.stories.tsx` | ⚠️ Verificar | |
| `RadialBarChart.vue` | `ChartRadialBar.stories.tsx` | ⚠️ Verificar | Duplicado? |

### Progress e Indicadores

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `ProgressBarHorizontal.vue` | `Progress.stories.tsx` | ⚠️ Verificar | |
| `ProgressBarHorizontalV2.vue` | `Progress.stories.tsx` | ⚠️ Verificar | V2 = novo design? |
| `ProgressBarVertical.vue` | ❌ Sem story | ❌ Falta | Vertical não existe |
| `ProgressBarTopInfo.vue` | `ProgressStat.stories.tsx` | ⚠️ Verificar | |
| `RainbowProgressBar.vue` | `RainbowProgressBar.stories.tsx` | ⚠️ Verificar | |

### Legends e Proficiência

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `LegendCard.vue` | `LegendCard.stories.tsx` | ⚠️ Verificar | Cores legend-basic! |
| `LegendEnum.vue` | `LegendEnum.stories.tsx` | ⚠️ Verificar | |
| `LegendEnumPDF.vue` | ❌ Sem story | ❌ Falta | Versão PDF |
| `LegendBadgesReadingMeter.vue` | ❌ Sem story | ❌ Falta | Específico leitura |
| `SidebarProficiencyInfo.vue` | ❌ Sem story | ❌ Falta | Info proficiência |
| `ChangeProficiency.vue` | ❌ Sem story | ❌ Falta | Modal mudança |

### Tabelas

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `ListTable.vue` | `Table.stories.tsx` | ⚠️ Verificar | Base table |
| `ListTableAccess.vue` | ❌ Sem story | ❌ Falta | Variante acesso |
| `ListTableLocalSorting.vue` | ❌ Sem story | ❌ Falta | Sorting local |
| `ListTablePagination.vue` | `Pagination.stories.tsx` | ⚠️ Verificar | |
| `ListTableRanking.vue` | ❌ Sem story | ❌ Falta | Ranking table |
| `ListTableSelect.vue` | ❌ Sem story | ❌ Falta | Seleção em tabela |
| `ListTableSelectLocal.vue` | ❌ Sem story | ❌ Falta | Seleção local |

### Tabs e Navegação

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `Tab.vue` | `Tabs.stories.tsx` | ⚠️ Verificar | |
| `TabCards.vue` | `Tabs.stories.tsx` | ⚠️ Verificar | Variante cards |
| `TabRouter.vue` | `TabRouter.stories.tsx` | ⚠️ Verificar | Router tabs |
| `SimpleTab.vue` | `Tabs.stories.tsx` | ⚠️ Verificar | Simples |

### Player e Mídia

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `Player.vue` | `Player.stories.tsx` | ⚠️ Verificar | |
| `AlbumCover.vue` | ❌ Sem story | ❌ Falta | Capa de álbum |
| `LyricsDisplay.vue` | ❌ Sem story | ❌ Falta | Exibição de letras |
| `BackgroundSpace.vue` | ❌ Sem story | ❌ Falta | Background animado |

### Layout e Estrutura

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `Divider.vue` | `Divider.stories.tsx` | ⚠️ Verificar | |
| `VerticalDivider.vue` | `Divider.stories.tsx` | ⚠️ Verificar | Variante vertical? |
| `FixedStickyFooter.vue` | ❌ Sem story | ❌ Falta | Footer fixo |
| `ExpandableFilterArea.vue` | `FilterPanel.stories.tsx` | ⚠️ Verificar | |

### Modais e Dialogs

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `DefaultFAQModal.vue` | `Dialog.stories.tsx` | ⚠️ Verificar | FAQ modal |
| `GameDetailsModal.vue` | `Dialog.stories.tsx` | ⚠️ Verificar | Game details |
| `StudentGameDetailsModal.vue` | ❌ Sem story | ❌ Falta | Student game |
| `ModalStudentActivityDetails.vue` | ❌ Sem story | ❌ Falta | Activity details |
| `ModalStudentRoundDetails.vue` | ❌ Sem story | ❌ Falta | Round details |

### Collapse e Accordion

| Componente Vue | Story DS | Status | Notas |
|----------------|----------|--------|-------|
| `AppCollapse.vue` | `Accordion.stories.tsx` | ⚠️ Verificar | |
| `AppCollapseItem.vue` | `Accordion.stories.tsx` | ⚠️ Verificar | Item |

---

## ❌ Componentes SEM Equivalente no Design System

### Questões e Avaliações (Alta Prioridade)

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `QuestionAlternative.vue` | Alternativa de questão | 🔴 Alta |
| `QuestionContent.vue` | Conteúdo da questão | 🔴 Alta |
| `QuestionDetail.vue` | Detalhe da questão | 🔴 Alta |
| `QuestionsListDetail.vue` | Lista de questões | 🔴 Alta |
| `EvaluationsHtmlContentRenderer.vue` | Renderizador HTML | 🔴 Alta |

### Missões (Alta Prioridade)

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `MissionDetails.vue` | Detalhes de missão | 🔴 Alta |
| `MissionDetailsPlus.vue` | Detalhes Plus | 🔴 Alta |
| `MissionVisualization.vue` | Visualização | 🔴 Alta |
| `MissionAndQuestionItem.vue` | Item missão/questão | 🔴 Alta |
| `MissionBookDetails.vue` | Detalhes do livro | 🟡 Média |
| `CancelMission.vue` | Cancelar missão | 🟡 Média |
| `ExpiredMission.vue` | Missão expirada | 🟡 Média |

### PDFs e Relatórios

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `PDFRoot.vue` | Root PDF | 🟡 Média |
| `PerformancePDF.vue` | PDF desempenho | 🟡 Média |
| `PerformancePDFList.vue` | Lista PDF | 🟡 Média |
| `StudentEvidenceReportPDF.vue` | Relatório evidência | 🟡 Média |
| `Template1-11.vue` | Templates PDF | 🟡 Média |
| `TemplateDefault.vue` | Template padrão | 🟡 Média |

### Certificados

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `Certificate.vue` | Certificado | 🟡 Média |
| `CertificateList.vue` | Lista certificados | 🟡 Média |

### Professores

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `listInitialsTeacher.vue` | Lista iniciais | 🟡 Média |
| `DeleteGuide.vue` | Deletar guia | 🟡 Média |
| `ShareGuide.vue` | Compartilhar guia | 🟡 Média |
| `GuidesLimitAlert.vue` | Alerta limite | 🟡 Média |

### Deep Links

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `CopyLink.vue` | Copiar link | 🟢 Baixa |
| `NewDeepLink.vue` | Novo deep link | 🟢 Baixa |
| `IntermediateRedirectLoginDeepLink.vue` | Redirect | 🟢 Baixa |

### Feedback e NPS

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `NPS.vue` | Net Promoter Score | 🟢 Baixa |
| `FeedbackAndSend.vue` | Feedback | 🟢 Baixa |
| `HelpChat.vue` | Chat de ajuda | 🟢 Baixa |

### Utilitários

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `AppLanguageSelector.vue` | Seletor idioma | 🟡 Média |
| `ButtonWaitAction.vue` | Botão com loading | 🟡 Média |
| `ConditionalValueDisplay.vue` | Exibição condicional | 🟢 Baixa |
| `InfinityScroll.vue` | Scroll infinito | 🟡 Média |
| `ZipLoading.vue` | Loading ZIP | 🟢 Baixa |

### Disciplinas e Assuntos

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `SubjectBand.vue` | Faixa de disciplina | 🟡 Média |
| `subjects.vue` | Disciplinas | 🟡 Média |
| `subjectSelect.vue` | Seletor disciplina | 🟡 Média |
| `DescriptorTag.vue` | Tag descritor | 🟡 Média |
| `ExerciseType.vue` | Tipo exercício | 🟡 Média |

### Estudantes

| Componente Vue | Descrição | Prioridade |
|----------------|-----------|------------|
| `StudentActivityDetail.vue` | Detalhe atividade | 🔴 Alta |
| `StudentsDetail.vue` | Detalhe estudante | 🔴 Alta |

---

## 🔄 Análise de Divergências CSS

### Problemas Identificados

#### 1. **Cores de Legenda** (`legend-basic`)

```scss
// Frontoffice
$legend-basic: #ff9f43;  // Laranja

// Design System
--color-warning-500: #FFD643;  // Amarelo
```

**Impacto:** LegendCard.vue e LegendEnum.vue usam cores diferentes.

#### 2. **Cores de Warning**

O Bootstrap no Frontoffice define:
```scss
// bootstrap-extended/_variables.scss
$warning: $orange !default;  // #ff9f43

// assets/scss/variables/_variables.scss  
$warning: #ffd643 !default;  // Amarelo
```

A ordem de import determina qual valor prevalece. **O Bootstrap pode sobrescrever.**

#### 3. **Escalas de Cinza**

```scss
// Frontoffice (Bootstrap)
$gray-100: #babfc7;
$gray-200: #ededed;
$gray-600: #b8c2cc;

// Design System
--color-secondary-100: #F0F1F2;
--color-secondary-200: #E1E2E5;
--color-secondary-600: #A2A5AA;
```

**Divergência significativa nas escalas de cinza!**

#### 4. **Espaçamentos**

```scss
// Frontoffice
$grid-gutter-width: 0.625rem;  // 10px
$content-padding: 0.625rem;

// Design System
--padding-2: 8px;
--padding-3: 12px;
```

**Espaçamentos não alinhados ao sistema de 4px/8px.**

---

## 🎯 Plano de Ação

### Fase 1: Cores (Imediato)

1. [ ] Decidir sobre `legend-basic`: usar `#ff9f43` ou `#ffd643`?
2. [ ] Alinhar escalas de cinza/secondary
3. [ ] Criar token `--color-orange` para manter compatibilidade
4. [ ] Verificar ordem de import SCSS no Frontoffice

### Fase 2: Componentes Core (Curto prazo)

1. [ ] Auditar CSS de cada componente ⚠️ marcado acima
2. [ ] Criar stories para componentes de Questão
3. [ ] Criar stories para componentes de Missão
4. [ ] Criar stories para componentes de Estudante

### Fase 3: Componentes Secundários (Médio prazo)

1. [ ] PDFs e Templates
2. [ ] Certificados
3. [ ] Professores

---

## 📋 Checklist de Verificação por Componente

Para cada componente marcado como ⚠️ Verificar:

- [ ] Comparar CSS/SCSS do Vue com Tailwind do React
- [ ] Verificar cores usadas (hex, variáveis SCSS)
- [ ] Verificar espaçamentos (padding, margin, gap)
- [ ] Verificar tipografia (font-family, font-size, font-weight)
- [ ] Verificar bordas e border-radius
- [ ] Verificar sombras (box-shadow)
- [ ] Verificar estados (hover, active, disabled, focus)
- [ ] Verificar responsividade
- [ ] Verificar acessibilidade

---

## 📎 Arquivos de Referência

### Frontoffice SCSS

- `src/assets/scss/variables/_variables.scss` - Variáveis principais
- `src/@core/scss/base/bootstrap-extended/_variables.scss` - Bootstrap overrides
- `src/@core/scss/base/components/_variables.scss` - Variáveis de componentes

### Design System CSS

- `packages/ui/src/styles.css` - Tokens CSS
- `packages/ui/src/tailwind-preset.ts` - Preset Tailwind

---

*Última atualização: 29/01/2026*
