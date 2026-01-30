# Especificação: Catálogo de Componentes do Frontoffice

**Versão**: 1.0.0  
**Data**: 2026-01-29  
**Status**: Ativo

---

## 1. Objetivo

O Design System deve replicar **exatamente** os componentes do Frontoffice Vue, e **não** seguir padrões do shadcn/ui. Este documento cataloga todos os componentes do Frontoffice que devem ser recriados em React.

---

## 2. Sistema de Cores - Legend Colors

O Frontoffice usa um sistema de cores próprio para legendas de proficiência e performance que **não existe** no shadcn/ui:

### 2.1 Variáveis SCSS (Fonte da Verdade)

```scss
// educacross-frontoffice/src/assets/scss/variables/_variables.scss

$legend-advanced: #6e63e8;       // Roxo - Avançado
$legend-proficient: #28c76f;     // Verde - Proficiente
$legend-basic: #ff9f43;          // LARANJA - Básico (≠ warning amarelo!)
$legend-below-basic: #ea5455;    // Vermelho - Abaixo do Básico
$legend-not-completed: #b4b7bd;  // Cinza - Não Concluído
$legend-in-progress: #00cfe8;    // Ciano - Em Andamento
```

### 2.2 Classes Bootstrap Geradas

O Frontoffice gera automaticamente classes como:
- `.text-legend-basic`, `.text-legend-advanced`, etc.
- `.bg-legend-basic`, `.bg-light-legend-basic`, etc.
- `.border-legend-basic`, etc.
- `.shadow-legend-basic`, etc.

### 2.3 Mapeamento Conceitual (NÃO é equivalência!)

| Legend Color      | Hex       | Conceito Semântico | ATENÇÃO                           |
| ----------------- | --------- | ------------------ | --------------------------------- |
| legend-advanced   | #6e63e8   | ≈ primary          | Mesmo valor                       |
| legend-proficient | #28c76f   | ≈ success          | Mesmo valor                       |
| legend-basic      | #ff9f43   | ≠ warning          | **LARANJA, não amarelo!**         |
| legend-below-basic| #ea5455   | ≈ danger           | Mesmo valor                       |
| legend-not-completed | #b4b7bd | ≈ secondary        | Cinza neutro                     |
| legend-in-progress| #00cfe8   | ≈ info             | Ciano                             |

---

## 3. Enums de Legenda (Domínio do Negócio)

O Frontoffice define enums que mapeiam valores para variantes visuais:

### 3.1 Proficiency Enum

```javascript
// Usado em: LegendCard, LegendEnum, BadgeStatus, PerformanceCell, etc.

const proficiency = [
  { id: 1, label: 'Abaixo do Básico', variant: 'legend-below-basic', icon: 'sentiment_dissatisfied' },
  { id: 2, label: 'Básico',           variant: 'legend-basic',       icon: 'sentiment_neutral' },
  { id: 3, label: 'Proficiente',      variant: 'legend-proficient',  icon: 'sentiment_satisfied' },
  { id: 4, label: 'Avançado',         variant: 'legend-advanced',    icon: 'sentiment_very_satisfied' },
]

const proficiencyWithNotCompleted = [
  { id: 0, label: 'Não fizeram', variant: 'legend-not-completed', icon: 'no_accounts' },
  ...proficiency,
]

const proficiencyWithInProgress = [
  { id: 0, label: 'Em Andamento', variant: 'legend-in-progress', icon: 'directions_walk' },
  ...proficiency,
]
```

### 3.2 Performance Enum

```javascript
// Regras baseadas em porcentagem

const learningPerformance = [
  { label: 'Avançado: ≥70%',         variant: 'legend-advanced',    rule: v => v >= 70 },
  { label: 'Proficiente: ≥50%',      variant: 'legend-proficient',  rule: v => v >= 50 },
  { label: 'Básico: ≥25%',           variant: 'legend-basic',       rule: v => v >= 25 },
  { label: 'Abaixo do Básico: <25%', variant: 'legend-below-basic', rule: v => v < 25 },
]
```

---

## 4. Catálogo Completo de Componentes Vue

### 4.1 Componentes Atômicos (Átomos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 1 | BadgeStatus             | `badge/BadgeStatus.vue`                      | value, enum, pill, badgeClass            | P0         |
| 2 | CellStatus              | `badge/CellStatus.vue`                       | value, enum                              | P0         |
| 3 | ConditionalValueDisplay | `badge/ConditionalValueDisplay.vue`          | value, condition                         | P1         |
| 4 | Divider                 | `divider/Divider.vue`                        | text, variant                            | P0         |
| 5 | VerticalDivider         | `divider/VerticalDivider.vue`                | -                                        | P1         |
| 6 | DescriptorTag           | `descriptors/DescriptorTag.vue`              | text, variant                            | P1         |
| 7 | FeatherIcon             | `@core/feather-icon/FeatherIcon.vue`         | icon, size                               | P0         |
| 8 | MediaCardIcon           | `card/MediaCardIcon.vue`                     | icon, variant                            | P0         |
| 9 | ButtonWaitAction        | `form/button/ButtonWaitAction.vue`           | loading, disabled, variant               | P0         |
| 10| AppButton               | `@core/app-button/AppButton.vue`             | variant, size                            | P0         |
| 11| EFormCheck              | `form/EFormCheck.vue`                        | modelValue, label, disabled              | P0         |
| 12| ScrollToTop             | `@core/scroll-to-top/ScrollToTop.vue`        | -                                        | P2         |

### 4.2 Componentes de Cards (Moléculas)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 13| LegendCard              | `legends/LegendCard.vue`                     | items[], active, tooltipActiveText       | P0         |
| 14| LegendEnum              | `legends/LegendEnum.vue`                     | enum, selected                           | P0         |
| 15| LegendEnumPDF           | `legends/LegendEnumPDF.vue`                  | enum (para exportação PDF)               | P1         |
| 16| LegendBadgesReadingMeter| `legends/LegendBadgesReadingMeter.vue`       | items                                    | P1         |
| 17| MediaCard               | `card/MediaCard.vue`                         | title, subtitle, image, variant          | P0         |
| 18| DynamicMediaCard        | `card/DynamicMediaCard.vue`                  | dynamic props                            | P1         |
| 19| StatisticCardHorizontal | `@core/statistics-cards/StatisticCardHorizontal.vue` | icon, title, statistic, color    | P0         |
| 20| StatisticCardVertical   | `@core/statistics-cards/StatisticCardVertical.vue`   | icon, title, statistic, color    | P0         |
| 21| StatisticCardWithAreaChart | `@core/statistics-cards/.../AreaChart.vue`        | series, chartOptions             | P1         |
| 22| StatisticCardWithLineChart | `@core/statistics-cards/.../LineChart.vue`        | series, chartOptions             | P1         |
| 23| BCardActions            | `@core/b-card-actions/BCardActions.vue`      | title, actionCollapse, actionRefresh     | P0         |
| 24| BCardActionsContainer   | `@core/b-card-actions/BCardActionsContainer.vue` | -                                    | P1         |

### 4.3 Componentes de Gráficos (Moléculas)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 25| BarChart                | `chart/BarChart.vue`                         | data, options, colors                    | P0         |
| 26| PieChart                | `chart/PieChart.vue`                         | data, options, colors                    | P0         |
| 27| RadialBar               | `chart/RadialBar.vue`                        | value, color, label                      | P0         |
| 28| RadialBarChart          | `chart/RadialBarChart.vue`                   | data, options                            | P0         |
| 29| DefaultChart            | `chart/DefaultChart.vue`                     | type, data, options                      | P1         |
| 30| AppEchartBar            | `@core/charts/echart/AppEchartBar.vue`       | series, xAxis                            | P1         |
| 31| AppEchartDoughnut       | `@core/charts/echart/AppEchartDoughnut.vue`  | data, colors                             | P1         |
| 32| AppEchartLine           | `@core/charts/echart/AppEchartLine.vue`      | series, xAxis                            | P1         |
| 33| AppEchartRadar          | `@core/charts/echart/AppEchartRadar.vue`     | data, indicators                         | P1         |
| 34| AppEchartScatter        | `@core/charts/echart/AppEchartScatter.vue`   | data                                     | P2         |
| 35| AppEchartStackedArea    | `@core/charts/echart/AppEchartStackedArea.vue` | series                                 | P2         |

### 4.4 Componentes de Tabelas (Organismos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 36| ListTable               | `table/ListTable.vue`                        | items, fields, pagination                | P0         |
| 37| ListTableAccess         | `table/ListTableAccess.vue`                  | items, fields, accessControl             | P1         |
| 38| ListTableLocalSorting   | `table/ListTableLocalSorting.vue`            | items, fields, sortBy                    | P0         |
| 39| ListTablePagination     | `table/ListTablePagination.vue`              | items, perPage, currentPage              | P0         |
| 40| ListTableRanking        | `table/ListTableRanking.vue`                 | items, rankField                         | P1         |
| 41| ListTableSelect         | `table/ListTableSelect.vue`                  | items, selectable, selectedItems         | P0         |
| 42| ListTableSelectLocal    | `table/ListTableSelectLocal.vue`             | items, selectable                        | P1         |
| 43| PerformanceCell         | `cells/PerformanceCell.vue`                  | value, enum, showIcon                    | P0         |

### 4.5 Componentes de Formulário (Moléculas)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 44| ESelect                 | `selects/ESelect.vue`                        | options, modelValue, label, multiple     | P0         |
| 45| SelectInfinityScroll    | `selects/SelectInfinityScroll.vue`           | options, fetchMore, loading              | P1         |
| 46| SelectInfinityScrollModelo | `selects/SelectInfinityScrollModelo.vue`  | options, modelo                          | P2         |
| 47| InfinityScroll          | `selects/InfinityScroll.vue`                 | fetchMore, loading                       | P1         |
| 48| MultipleDropdown        | `selects/MultipleDropdown.vue`               | options, selected                        | P1         |
| 49| AppAutoSuggest          | `@core/app-auto-suggest/AppAutoSuggest.vue`  | data, filterKey, onSelected              | P1         |

### 4.6 Componentes de Navegação (Organismos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 50| Tab                     | `tab/Tab.vue`                                | tabs, active                             | P0         |
| 51| SimpleTab               | `tab/SimpleTab.vue`                          | tabs                                     | P0         |
| 52| TabCards                | `tab/TabCards.vue`                           | tabs, cardVariant                        | P1         |
| 53| TabRouter               | `tab/TabRouter.vue`                          | tabs, routerLinks                        | P0         |
| 54| AppCollapse             | `app-collapse/AppCollapse.vue`               | accordion, type                          | P0         |
| 55| AppCollapseItem         | `app-collapse/AppCollapseItem.vue`           | title, isVisible                         | P0         |
| 56| AppTimeline             | `@core/app-timeline/AppTimeline.vue`         | items                                    | P1         |
| 57| AppTimelineItem         | `@core/app-timeline/AppTimelineItem.vue`     | variant, icon, title                     | P1         |

### 4.7 Componentes de Progresso (Átomos/Moléculas)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 58| ProgressBarHorizontal   | `progessBar/ProgressBarHorizontal.vue`       | value, max, variant, showLabel           | P0         |
| 59| ProgressBarHorizontalV2 | `progessBar/ProgressBarHorizontalV2.vue`     | value, segments                          | P1         |
| 60| ProgressBarVertical     | `progessBar/ProgressBarVertical.vue`         | value, max, variant                      | P1         |
| 61| ProgressBarTopInfo      | `progessBar/ProgressBarTopInfo.vue`          | value, label, icon                       | P1         |
| 62| RainbowProgressBar      | `progessBar/RainbowProgressBar.vue`          | segments[]                               | P0         |

### 4.8 Componentes de Modal (Organismos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 63| DefaultFAQModal         | `modal/DefaultFAQModal.vue`                  | title, content                           | P1         |
| 64| GameDetailsModal        | `modal/GameDetailsModal.vue`                 | game, visible                            | P1         |
| 65| StudentGameDetailsModal | `modal/StudentGameDetailsModal.vue`          | student, game                            | P1         |
| 66| ZipLoading              | `modal/ZipLoading.vue`                       | progress, message                        | P2         |

### 4.9 Componentes de Avaliação/Questões (Organismos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 67| QuestionDetail          | `evaluations/questionDetail/QuestionDetail.vue` | question, showAnswer                  | P0         |
| 68| QuestionAlternative     | `evaluations/questionDetail/.../QuestionAlternative.vue` | alternative, selected        | P0         |
| 69| QuestionContent         | `evaluations/questionDetail/.../QuestionContent.vue` | content, type                    | P0         |
| 70| Template1-11            | `evaluations/questionDetail/templates/*.vue` | question                                 | P1         |
| 71| TemplateDefault         | `evaluations/questionDetailV2/templates/TemplateDefault.vue` | question                  | P1         |
| 72| QuestionDetailV2        | `evaluations/questionDetailV2/QuestionDetail.vue` | question                            | P1         |
| 73| QuestionsListDetail     | `evaluations/questionsListDetail/QuestionsListDetail.vue` | questions                   | P1         |
| 74| EvaluationsHtmlContentRenderer | `evaluations/shared/EvaluationsHtmlContentRenderer.vue` | html          | P0         |
| 75| QuestionStatus          | `question/QuestionStatus.vue`                | status, showLabel                        | P0         |

### 4.10 Componentes de Missões (Organismos - Domínio Específico)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 76| MissionDetails          | `missions/MissionDetails.vue`                | mission                                  | P1         |
| 77| MissionVisualization    | `missions/MissionVisualization.vue`          | mission, mode                            | P1         |
| 78| GuidesLimitAlert        | `missions/GuidesLimitAlert.vue`              | limit, current                           | P2         |
| 79| MissionDetailsPlus      | `mission-plus/MissionDetailsPlus.vue`        | mission                                  | P1         |
| 80| MissionBookDetails      | `mission-plus/MissionBookDetails.vue`        | book                                     | P2         |
| 81| MissionAndQuestionItem  | `mission-plus/MissionAndQuestionItem.vue`    | item                                     | P2         |
| 82| CancelMission           | `mission-plus/CancelMission.vue`             | missionId                                | P2         |
| 83| ExpiredMission          | `mission-plus/ExpiredMission.vue`            | mission                                  | P2         |
| 84| CopyLink                | `mission-plus/CopyLink.vue`                  | link                                     | P2         |
| 85| DeleteGuide             | `mission-plus/DeleteGuide.vue`               | guideId                                  | P2         |
| 86| ShareGuide              | `mission-plus/ShareGuide.vue`                | guide                                    | P2         |
| 87| FeedbackAndSend         | `mission-plus/FeedbackAndSend.vue`           | feedback                                 | P2         |
| 88| StudentsDetail          | `mission-plus/StudentsDetail.vue`            | students                                 | P2         |
| 89| StudentActivityDetail   | `mission-plus/StudentActivityDetail.vue`     | activity                                 | P2         |
| 90| ModalStudentActivityDetails | `mission-plus/ModalStudentActivityDetails.vue` | activity                          | P2         |
| 91| ModalStudentRoundDetails | `mission-plus/ModalStudentRoundDetails.vue` | round                                    | P2         |

### 4.11 Componentes de PDF (Organismos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 92| PDFRoot                 | `PDFs/PDFRoot.vue`                           | children                                 | P1         |
| 93| Card (PDF)              | `PDFs/Card.vue`                              | title, content                           | P1         |
| 94| CardsList (PDF)         | `PDFs/CardsList.vue`                         | cards                                    | P1         |
| 95| Certificate             | `PDFs/certificate/Certificate.vue`           | student, course                          | P1         |
| 96| CertificateList         | `PDFs/certificate/CertificateList.vue`       | certificates                             | P1         |
| 97| PerformancePDF          | `PDFs/event/performance/PerformancePDF.vue`  | performance                              | P1         |
| 98| PerformancePDFList      | `PDFs/event/performance/PerformancePDFList.vue` | performances[]                        | P1         |
| 99| StudentEvidenceReportPDF | `student-evidence-report/StudentEvidenceReportPDF.vue` | student, report          | P1         |

### 4.12 Componentes de Player/Mídia (Organismos)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 100| Player                  | `player/Player.vue`                          | src, type, controls                      | P1         |
| 101| AlbumCover              | `player/AlbumCover.vue`                      | src, alt                                 | P2         |
| 102| LyricsDisplay          | `player/LyricsDisplay.vue`                   | lyrics, currentTime                      | P2         |

### 4.13 Componentes de Layout (Templates)

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 103| ExpandableFilterArea   | `filter/ExpandableFilterArea.vue`            | expanded, filters                        | P0         |
| 104| FixedStickyFooter      | `FixedStickyFooter.vue`                      | visible                                  | P1         |
| 105| HelpChat               | `global/HelpChat.vue`                        | -                                        | P2         |
| 106| NPS                    | `NPS/NPS.vue`                                | visible, onSubmit                        | P2         |

### 4.14 Componentes Específicos de Domínio

| # | Componente Vue          | Arquivo                                      | Props Principais                         | Prioridade |
|---|-------------------------|----------------------------------------------|------------------------------------------|------------|
| 107| SubjectBand            | `subjects/SubjectBand.vue`                   | subject, color                           | P1         |
| 108| SubjectSelect          | `subjects/subjectSelect.vue`                 | subjects, selected                       | P1         |
| 109| Subjects               | `subjects/subjects.vue`                      | subjects                                 | P1         |
| 110| ChangeProficiency      | `proficiency/ChangeProficiency.vue`          | currentLevel, onLevelChange              | P1         |
| 111| SidebarProficiencyInfo | `reading-meter/SidebarProficiencyInfo.vue`   | proficiency                              | P1         |
| 112| ExerciseType           | `exercise-type/reading-meter/ExerciseType.vue` | type                                   | P2         |
| 113| ToastificationContent  | `@core/toastification/ToastificationContent.vue` | title, text, variant               | P0         |
| 114| SelectLocale           | `locale/SelectLocale.vue`                    | locales, current                         | P1         |
| 115| SelectLocaleNavbar     | `locale/SelectLocaleNavbar.vue`              | locales                                  | P1         |
| 116| AppLanguageSelector    | `app-language-selector/AppLanguageSelector.vue` | languages                             | P1         |
| 117| ListInitialsTeacher    | `teacher/listInitialsTeacher.vue`            | teachers                                 | P2         |
| 118| BackgroundSpace        | `deeplink/BackgroundSpace.vue`               | -                                        | P2         |
| 119| NewDeepLink            | `deeplink/NewDeepLink.vue`                   | link                                     | P2         |
| 120| IntermediateRedirectLoginDeepLink | `deeplink/IntermediateRedirectLoginDeepLink.vue` | redirect             | P2         |

---

## 5. Priorização de Implementação

### P0 - Fundação (Sprint 1-2)
Componentes base usados em toda a aplicação:
- Cores Legend (tokens CSS)
- BadgeStatus, CellStatus
- MediaCardIcon
- LegendCard, LegendEnum
- ProgressBarHorizontal, RainbowProgressBar
- ListTable, ListTablePagination
- Tab, TabRouter
- ESelect
- ToastificationContent

### P1 - Core Features (Sprint 3-4)
Componentes de domínio importantes:
- StatisticCards
- Charts (Radial, Bar, Pie)
- QuestionDetail, QuestionAlternative
- Timeline
- PDF Components

### P2 - Nice-to-have (Sprint 5+)
Componentes específicos ou raramente usados:
- DeepLink components
- Modais específicos
- Player components

---

## 6. Ações Requeridas

### 6.1 Constitution Atualizada

A constitution deve ser atualizada para:
1. **Remover** qualquer referência ao shadcn/ui
2. **Adicionar** o sistema de cores Legend como obrigatório
3. **Referenciar** este catálogo como fonte da verdade

### 6.2 Tokens CSS a Adicionar

```css
/* packages/ui/src/styles.css - Legend Colors */

:root {
  --color-legend-advanced: 110 82 232;      /* #6e63e8 */
  --color-legend-proficient: 40 199 111;    /* #28c76f */
  --color-legend-basic: 255 159 67;         /* #ff9f43 - LARANJA! */
  --color-legend-below-basic: 234 84 85;    /* #ea5455 */
  --color-legend-not-completed: 180 183 189;/* #b4b7bd */
  --color-legend-in-progress: 0 207 232;    /* #00cfe8 */
}
```

### 6.3 Tailwind Preset a Atualizar

```typescript
// packages/ui/src/tailwind-preset.ts

colors: {
  'legend-advanced': 'rgb(var(--color-legend-advanced) / <alpha-value>)',
  'legend-proficient': 'rgb(var(--color-legend-proficient) / <alpha-value>)',
  'legend-basic': 'rgb(var(--color-legend-basic) / <alpha-value>)',
  'legend-below-basic': 'rgb(var(--color-legend-below-basic) / <alpha-value>)',
  'legend-not-completed': 'rgb(var(--color-legend-not-completed) / <alpha-value>)',
  'legend-in-progress': 'rgb(var(--color-legend-in-progress) / <alpha-value>)',
}
```

---

## 7. Resumo

| Categoria              | Quantidade |
| ---------------------- | ---------- |
| Componentes Vue Total  | **120**    |
| Prioridade P0          | 25         |
| Prioridade P1          | 52         |
| Prioridade P2          | 43         |

---

**Próximo Passo**: Atualizar constitution.md e plan.md conforme este catálogo.
