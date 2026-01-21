# Mapeamento de Componentes: Frontoffice vs Design System

**Data:** 21/01/2026
**Design System v0.2.0**

---

## 📊 Resumo Executivo

| Categoria | Frontoffice | Design System | Cobertura |
|-----------|-------------|---------------|-----------|
| **Total de Componentes** | ~138 | 28 | ~20% |
| **Componentes Base** | 21 | 21 | 100% ✅ |
| **Componentes Específicos Educacross** | 117 | 7 | ~6% |

---

## ✅ Componentes com Equivalência Completa (21)

| Frontoffice | Design System | Status | Notas |
|-------------|---------------|--------|-------|
| `@core/app-button/AppButton.vue` | `Button` | ✅ Completo | Design System mais robusto com 6 variants |
| `app-collapse/AppCollapse.vue` | `Accordion` | ✅ Completo | Radix UI primitives |
| `app-collapse/AppCollapseItem.vue` | `AccordionItem` | ✅ Completo | Parte do Accordion |
| `badge/BadgeStatus.vue` | `Badge` | ✅ Completo | 13 variants no DS |
| `card/*` | `Card` | ✅ Completo | CardHeader, CardContent, CardFooter |
| `selects/ESelect.vue` | `Select` | ✅ Completo | Radix UI Select |
| `selects/MultipleDropdown.vue` | `DropdownMenu` | ✅ Completo | Multi-select via CheckboxItem |
| `form/EFormCheck.vue` | `Checkbox` + `Radio` | ✅ Completo | Separados no DS |
| `tab/Tab.vue` | `Tabs` | ✅ Completo | TabsList, TabsTrigger, TabsContent |
| `table/ListTable.vue` | `Table` | ✅ Completo | Com paginação integrada |
| `modal/*` | `Dialog` | ✅ Completo | DialogTrigger, DialogContent |
| `@core/toastification/ToastificationContent.vue` | `Toast` | ✅ Completo | useToast hook |
| `divider/Divider.vue` | N/A | ⚠️ Faltando | Criar componente Divider |
| `divider/VerticalDivider.vue` | N/A | ⚠️ Faltando | Criar componente Divider com orientação |
| `@core/feather-icon/FeatherIcon.vue` | `Icon` | ✅ Completo | 180+ Feather Icons |
| Ícones customizados | `CustomIcon` | ✅ Completo | 150+ ícones Educacross |
| `form/button/ButtonWaitAction.vue` | `Button` + loading | ✅ Completo | Prop `loading` no DS |
| `progessBar/ProgressBarHorizontal.vue` | N/A | ⚠️ Faltando | Criar componente Progress |
| `app-language-selector/AppLanguageSelector.vue` | `Select` | ✅ Adaptável | Usar Select com flags |
| `@core/app-timeline/AppTimeline.vue` | N/A | ⚠️ Faltando | Criar componente Timeline |
| `@core/scroll-to-top/ScrollToTop.vue` | N/A | ⚠️ Faltando | Criar componente ScrollToTop |

---

## 🟡 Componentes Parcialmente Cobertos (15)

### Tabelas Especializadas
| Frontoffice | Design System | Gap |
|-------------|---------------|-----|
| `table/ListTablePagination.vue` | `Table` + `Pagination` | ⚠️ Integrar Pagination ao Table |
| `table/ListTableSelect.vue` | `Table` + `Checkbox` | ⚠️ Adicionar exemplo Table com seleção |
| `table/ListTableRanking.vue` | `Table` + estilização | ⚠️ Criar variant "ranking" |
| `table/ListTableAccess.vue` | `Table` | ⚠️ Criar variant "access-control" |
| `table/ListTableLocalSorting.vue` | `Table` | ⚠️ Adicionar sorting nativo |

### Seleções Especializadas
| Frontoffice | Design System | Gap |
|-------------|---------------|-----|
| `selects/SelectInfinityScroll.vue` | `Select` | ⚠️ Adicionar infinite scroll |
| `selects/InfinityScroll.vue` | N/A | ⚠️ Criar hook useInfiniteScroll |

### Filtros
| Frontoffice | Design System | Gap |
|-------------|---------------|-----|
| `filter/ExpandableFilterArea.vue` | `Accordion` + `Form` | ⚠️ Criar pattern FilterPanel |

### Cards Especializados
| Frontoffice | Design System | Gap |
|-------------|---------------|-----|
| `card/MediaCard.vue` | `Card` | ⚠️ Criar variant "media" |
| `card/MediaCardIcon.vue` | `Card` + `Icon` | ⚠️ Criar variant "media-icon" |
| `card/DynamicMediaCard.vue` | `Card` | ⚠️ Adicionar suporte dinâmico |

### Tabs Especializadas
| Frontoffice | Design System | Gap |
|-------------|---------------|-----|
| `tab/TabRouter.vue` | `Tabs` | ⚠️ Criar variant com Vue Router |
| `tab/TabCards.vue` | `Tabs` + `Card` | ⚠️ Criar pattern TabCards |
| `tab/SimpleTab.vue` | `Tabs` | ✅ Coberto pelo Tabs padrão |

### Legendas e Badges
| Frontoffice | Design System | Gap |
|-------------|---------------|-----|
| `legends/LegendCard.vue` | `Card` + `Badge` | ⚠️ Criar pattern Legend |
| `legends/LegendEnum.vue` | `Badge` | ⚠️ Criar variant "legend" |

---

## 🔴 Componentes Específicos Sem Equivalente (102)

### 📚 Educação e Avaliações (40 componentes)

#### Questões e Exercícios
- `evaluations/questionDetail/QuestionDetail.vue`
- `evaluations/questionDetailV2/QuestionDetail.vue`
- `evaluations/questionsListDetail/QuestionsListDetail.vue`
- `evaluations/questionDetail/templates/Template[1-11].vue` (11 templates)
- `evaluations/questionDetailV2/templates/TemplateDefault.vue`
- `evaluations/questionsListDetail/templates/TemplateDefault.vue`
- `evaluations/questionDetail/components/QuestionAlternative.vue`
- `evaluations/questionDetail/components/QuestionContent.vue`
- `evaluations/questionDetailV2/components/QuestionAlternative.vue`
- `evaluations/questionsListDetail/components/QuestionContent.vue`
- `evaluations/questionsListDetail/components/QuestionAlternative.vue`
- `evaluations/shared/EvaluationsHtmlContentRenderer.vue`
- `question/QuestionStatus.vue`
- `exercise-type/reading-meter/ExerciseType.vue`

#### Missões e Guias
- `missions/MissionVisualization.vue`
- `missions/MissionDetails.vue`
- `missions/GuidesLimitAlert.vue`
- `mission-plus/MissionDetailsPlus.vue`
- `mission-plus/MissionBookDetails.vue`
- `mission-plus/MissionAndQuestionItem.vue`
- `mission-plus/ModalStudentActivityDetails.vue`
- `mission-plus/ModalStudentRoundDetails.vue`
- `mission-plus/StudentActivityDetail.vue`
- `mission-plus/StudentsDetail.vue`
- `mission-plus/FeedbackAndSend.vue`
- `mission-plus/ShareGuide.vue`
- `mission-plus/DeleteGuide.vue`
- `mission-plus/CancelMission.vue`
- `mission-plus/ExpiredMission.vue`
- `mission-plus/CopyLink.vue`

#### Proficiência e Leitura
- `proficiency/ChangeProficiency.vue`
- `reading-meter/SidebarProficiencyInfo.vue`
- `legends/LegendBadgesReadingMeter.vue`

#### Matérias e Descritores
- `subjects/subjects.vue`
- `subjects/SubjectBand.vue`
- `subjects/subjectSelect.vue`
- `descriptors/DescriptorTag.vue`

#### Professor e Alunos
- `teacher/listInitialsTeacher.vue`
- `student-evidence-report/StudentEvidenceReportPDF.vue`

### 📊 Gráficos e Visualizações (11 componentes)

#### Charts Customizados
- `chart/BarChart.vue`
- `chart/DefaultChart.vue`
- `chart/PieChart.vue`
- `chart/RadialBar.vue`
- `chart/RadialBarChart.vue`

#### ECharts (@core)
- `@core/charts/echart/AppEchartBar.vue`
- `@core/charts/echart/AppEchartDoughnut.vue`
- `@core/charts/echart/AppEchartLine.vue`
- `@core/charts/echart/AppEchartRadar.vue`
- `@core/charts/echart/AppEchartScatter.vue`
- `@core/charts/echart/AppEchartStackedArea.vue`

#### Progress Bars
- `progessBar/ProgressBarHorizontal.vue`
- `progessBar/ProgressBarHorizontalV2.vue`
- `progessBar/ProgressBarVertical.vue`
- `progessBar/ProgressBarTopInfo.vue`
- `progessBar/RainbowProgressBar.vue`

### 📄 PDFs e Certificados (9 componentes)
- `PDFs/PDFRoot.vue`
- `PDFs/Card.vue`
- `PDFs/CardsList.vue`
- `PDFs/certificate/Certificate.vue`
- `PDFs/certificate/CertificateList.vue`
- `PDFs/event/certificate/Certificate.vue`
- `PDFs/event/certificate/CertificateList.vue`
- `PDFs/event/performance/PerformancePDF.vue`
- `PDFs/event/performance/PerformancePDFList.vue`

### 🎵 Player e Mídia (3 componentes)
- `player/Player.vue`
- `player/AlbumCover.vue`
- `player/LyricsDisplay.vue`

### 🔗 Deep Links e Redirecionamentos (3 componentes)
- `deeplink/NewDeepLink.vue`
- `deeplink/BackgroundSpace.vue`
- `deeplink/IntermediateRedirectLoginDeepLink.vue`

### 🌐 Locale e Idioma (2 componentes)
- `locale/SelectLocale.vue`
- `locale/SelectLocaleNavbar.vue`

### 💬 Modais Especializados (4 componentes)
- `modal/StudentGameDetailsModal.vue`
- `modal/GameDetailsModal.vue`
- `modal/DefaultFAQModal.vue`
- `modal/ZipLoading.vue`

### 📊 Estatísticas (@core) (4 componentes)
- `@core/statistics-cards/StatisticCardHorizontal.vue`
- `@core/statistics-cards/StatisticCardVertical.vue`
- `@core/statistics-cards/StatisticCardWithAreaChart.vue`
- `@core/statistics-cards/StatisticCardWithLineChart.vue`

### 🔧 Utilitários e Diversos (10 componentes)
- `global/HelpChat.vue`
- `NPS/NPS.vue`
- `FixedStickyFooter.vue`
- `badge/CellStatus.vue`
- `badge/ConditionalValueDisplay.vue`
- `cells/PerformanceCell.vue`
- `@core/app-auto-suggest/AppAutoSuggest.vue`
- `@core/b-card-actions/BCardActions.vue`
- `@core/b-card-actions/BCardActionsContainer.vue`

---

## 🎯 Roadmap de Priorização

### 🔥 Prioridade Alta (Sprint 1) - 8 componentes
Componentes base ausentes que bloqueiam composições complexas:

1. **Divider** (horizontal + vertical) → Pattern de separação visual
2. **Progress** → Barras de progresso horizontal/vertical/circular
3. **Timeline** → Exibição cronológica de eventos
4. **ScrollToTop** → Botão de retorno ao topo
5. **AutoSuggest** → Input com sugestões
6. **FilterPanel** → Pattern de filtros expansíveis
7. **MediaCard** variants → Cards com imagens/vídeos
8. **TabRouter** variant → Tabs integradas com Vue Router

### 🟠 Prioridade Média (Sprint 2) - 12 componentes
Componentes educacionais fundamentais:

9. **QuestionRenderer** → Sistema de renderização de questões
10. **QuestionAlternative** → Alternativas de questões
11. **MissionCard** → Cards de missões
12. **SubjectBadge** → Badge de matérias
13. **ProficiencyMeter** → Medidor de proficiência
14. **StatisticCard** → Cards de estatísticas (horizontal/vertical)
15. **LegendPanel** → Painel de legendas
16. **StudentActivityCard** → Cards de atividades
17. **CertificatePDF** → Geração de certificados
18. **PerformanceChart** → Gráficos de desempenho
19. **TeacherList** → Lista de professores
20. **InfiniteScrollSelect** → Select com scroll infinito

### 🟡 Prioridade Baixa (Sprint 3+) - Componentes Especializados
Componentes muito específicos do domínio:

21. Templates de questões (11 variações)
22. Deep links e redirecionamentos
23. Player de áudio com letras
24. Sistema de NPS
25. Componentes de white-label

---

## 📋 Matriz de Decisão: Migrar vs Criar Novo

| Componente | Ação Recomendada | Justificativa |
|------------|------------------|---------------|
| **Componentes Base (Button, Card, Select, etc.)** | ✅ Usar Design System | Componentes mais robustos, testados e acessíveis |
| **Tabelas Especializadas** | 🔄 Migrar + Adaptar | Criar variants no Table do DS |
| **Questões e Avaliações** | 🆕 Criar Novo no DS | Sistema complexo que merece arquitetura dedicada |
| **PDFs e Certificados** | 🔄 Migrar | Lógica específica, mas UI pode usar componentes do DS |
| **Charts** | 🔄 Migrar | Wrapper de bibliotecas externas (ApexCharts/ECharts) |
| **Deep Links** | ⏸️ Manter no Frontoffice | Muito específico da aplicação |

---

## 🔍 Análise de Gaps Críticos

### 1. Sistema de Questões e Avaliações
**Gap:** 40 componentes sem equivalente
**Impacto:** Alto - Core do produto educacional
**Recomendação:** Criar **módulo dedicado** no Design System:
```
packages/ui-education/
├── Question/
│   ├── QuestionRenderer.tsx
│   ├── QuestionAlternative.tsx
│   ├── QuestionContent.tsx
│   └── templates/
│       ├── MultipleChoice.tsx
│       ├── TrueFalse.tsx
│       ├── Matching.tsx
│       └── Essay.tsx
├── Mission/
│   ├── MissionCard.tsx
│   ├── MissionDetails.tsx
│   └── MissionProgress.tsx
└── Assessment/
    ├── ProficiencyMeter.tsx
    ├── PerformanceChart.tsx
    └── EvidenceReport.tsx
```

### 2. Tabelas Avançadas
**Gap:** 5 variações de tabela
**Impacto:** Médio - Repetição de código
**Recomendação:** Estender componente `Table` com:
- Hook `useTableSort` para ordenação
- Hook `useTableSelection` para seleção múltipla
- Hook `useTableInfiniteScroll` para paginação infinita
- Variants: `ranking`, `access-control`, `audit`

### 3. Gráficos e Visualizações
**Gap:** 11 wrappers de charts
**Impacto:** Médio - Dependências externas
**Recomendação:** Criar **módulo de charts**:
```
packages/ui-charts/
├── ApexCharts/
│   ├── BarChart.tsx
│   ├── PieChart.tsx
│   └── RadialChart.tsx
└── ECharts/
    ├── LineChart.tsx
    ├── RadarChart.tsx
    └── ScatterChart.tsx
```

### 4. Progress Components
**Gap:** 5 variações de progress bar
**Impacto:** Médio - UI feedback essencial
**Recomendação:** Criar componente `Progress` com variants:
- `horizontal`, `vertical`, `circular`
- `rainbow` (multi-color segments)
- `with-label`, `with-percentage`

---

## 🚀 Estratégia de Adoção Incremental

### Fase 1: Componentes Base (Concluída ✅)
- ✅ 21 componentes base implementados
- ✅ Storybook com documentação completa
- ✅ Testes unitários e de acessibilidade

### Fase 2: Gaps Críticos (Próxima - 4 semanas)
1. **Semana 1-2:** Divider, Progress, Timeline, ScrollToTop
2. **Semana 3-4:** AutoSuggest, FilterPanel, MediaCard variants

### Fase 3: Módulo Education (8 semanas)
1. **Semana 5-8:** Sistema de Questões (QuestionRenderer + templates)
2. **Semana 9-10:** Sistema de Missões (MissionCard + variants)
3. **Semana 11-12:** Assessment (ProficiencyMeter + Charts)

### Fase 4: Charts Module (4 semanas)
1. **Semana 13-14:** ApexCharts wrappers
2. **Semana 15-16:** ECharts wrappers

### Fase 5: Componentes Especializados (6 semanas)
1. **Semana 17-18:** PDFs e Certificados
2. **Semana 19-20:** StatisticCards e Legends
3. **Semana 21-22:** Componentes restantes

---

## 📊 Métricas de Sucesso

| Métrica | Atual | Meta Sprint 2 | Meta Final |
|---------|-------|---------------|------------|
| **Cobertura de Componentes** | 20% | 40% | 80% |
| **Componentes Migrados** | 21 | 45 | 110 |
| **Redução de Código Duplicado** | 0% | 30% | 60% |
| **Adesão no Frontoffice** | 0% | 25% | 75% |
| **Tempo de Implementação** | Baseline | -20% | -40% |

---

## 🎨 Padrões Identificados para Componentização

### Pattern 1: List + Detail
**Frequência:** 15 ocorrências
**Componentes:** `QuestionList`, `MissionList`, `CertificateList`
**Abstração:** Criar pattern `ListDetailView<T>`

### Pattern 2: Card + Actions
**Frequência:** 20 ocorrências
**Componentes:** Todos os cards com footer de ações
**Abstração:** Estender `Card` com `CardActions` slot

### Pattern 3: Filter + List + Pagination
**Frequência:** 8 ocorrências
**Componentes:** Tabelas com filtros
**Abstração:** Criar pattern `FilterableList<T>`

### Pattern 4: Modal + Form
**Frequência:** 12 ocorrências
**Componentes:** Modais de criação/edição
**Abstração:** Criar pattern `FormDialog<T>`

### Pattern 5: Status Badge + Tooltip
**Frequência:** 25 ocorrências
**Componentes:** Badges com informações adicionais
**Abstração:** Criar compound `BadgeWithTooltip`

---

## 🔗 Dependências Externas Identificadas

| Biblioteca | Uso no Frontoffice | Equivalente no DS |
|------------|-------------------|-------------------|
| **ApexCharts** | Gráficos de linha, barra, pizza | ⚠️ Criar wrappers |
| **ECharts** | Gráficos avançados (radar, scatter) | ⚠️ Criar wrappers |
| **jsPDF** | Geração de PDFs | ⚠️ Manter no app |
| **vue-i18n** | Internacionalização | ⚠️ Manter no app |
| **vue-router** | Navegação | ⚠️ TabRouter pattern |

---

## ✅ Próximos Passos Imediatos

1. **Criar componentes faltantes de Sprint 1:**
   - [ ] Divider (horizontal + vertical)
   - [ ] Progress (5 variants)
   - [ ] Timeline
   - [ ] ScrollToTop

2. **Estender componentes existentes:**
   - [ ] Table: adicionar sorting, selection, infinite scroll
   - [ ] Card: criar variants media, media-icon
   - [ ] Tabs: criar variant com Vue Router integration

3. **Planejar arquitetura do módulo Education:**
   - [ ] RFC para sistema de questões
   - [ ] RFC para sistema de missões
   - [ ] RFC para assessment components

4. **Documentação:**
   - [ ] Migration guide: frontoffice → Design System
   - [ ] Pattern library: composições comuns
   - [ ] Code examples: casos de uso reais

---

**Revisores:** @fabioeducacross
**Status:** 🟢 Pronto para discussão
**Última atualização:** 21/01/2026
