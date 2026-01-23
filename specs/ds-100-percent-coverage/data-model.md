# Data Model: 100% Component Coverage

## 1. Component Taxonomy

### 1.1. Overview - 119 Componentes Totais

```
@fabioeducacross/
├── ui (36)                    # Base components + gaps
├── ui-education (53)          # Educational domain
├── ui-charts (16)             # Visualization
└── ui-pdf (9)                 # Document generation
```

---

## 2. Package: @fabioeducacross/ui (36 componentes)

### 2.1. Existentes (28)

**Forms & Inputs (7):**
- Input (text, email, password, number, search)
- Checkbox
- Radio
- Select
- Label
- Textarea (imported from Input variants)
- Switch (Radix UI primitive)

**Actions (3):**
- Button
- DropdownMenu
- Dialog

**Display (8):**
- Card (+ CardHeader, CardContent, CardFooter)
- Badge
- Avatar
- Alert
- Toast
- Tooltip
- Popover
- Skeleton

**Navigation (4):**
- Tabs (+ TabsList, TabsTrigger, TabsContent)
- Pagination
- Accordion (+ AccordionItem, AccordionTrigger, AccordionContent)
- Breadcrumb (future)

**Data Display (4):**
- Table (+ TableHeader, TableBody, TableRow, TableCell)
- DataTable (enhanced Table with sorting, filtering)
- Typography
- Icon (180+ Feather + 150+ Custom)

**Composition (2):**
- FormField (Label + Input + error message)
- Container (layout wrapper)

---

### 2.2. Gaps (8)

**Visual Separators (2):**
- **Divider**
  - Variants: horizontal, vertical
  - Props: `orientation`, `thickness`, `color`, `withText`
  - Use Cases: Section separation, menu dividers

- **Timeline**
  - Variants: vertical, horizontal, alternating
  - Props: `items`, `orientation`, `iconPosition`
  - Use Cases: Activity feed, order tracking, history

**Progress Indicators (1):**
- **Progress**
  - Variants: linear, circular, stepped, radial, animated
  - Props: `value`, `max`, `variant`, `size`, `showLabel`, `color`
  - Use Cases: Loading states, upload progress, score visualization

**Navigation (1):**
- **ScrollToTop**
  - Variants: fixed, floating, inline
  - Props: `threshold`, `smooth`, `position`, `icon`
  - Use Cases: Long pages, documentation, articles

**Search & Filters (2):**
- **AutoSuggest**
  - Variants: default, async, multi-select
  - Props: `options`, `onSearch`, `loading`, `maxResults`
  - Use Cases: Search bars, command palette, filters

- **FilterPanel**
  - Variants: sidebar, dropdown, accordion
  - Props: `filters`, `onApply`, `collapsible`, `defaultOpen`
  - Use Cases: E-commerce, dashboards, data tables

**Media (1):**
- **MediaCard**
  - Variants: image, video, audio, dynamic
  - Props: `media`, `title`, `description`, `actions`, `aspectRatio`
  - Use Cases: Course cards, blog posts, portfolios

**Advanced Navigation (1):**
- **TabRouter**
  - Variants: default, pills, underline
  - Props: `routes`, `basePath`, `onChange`, `preserveScroll`
  - Use Cases: Settings pages, dashboards with deep links

---

### 2.3. Common Props Interface

**All components inherit from `BaseComponentProps`:**

```typescript
interface BaseComponentProps {
  className?: string;        // Tailwind classes (merged with cn)
  id?: string;              // HTML id attribute
  style?: React.CSSProperties; // Inline styles (use sparingly)
  
  // Radix Slot pattern (composition)
  asChild?: boolean;        // Render as child component
  
  // Accessibility
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  
  // Data attributes
  [key: `data-${string}`]: unknown;
}
```

**Interactive components add `InteractiveProps`:**

```typescript
interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;       // Disable interaction
  loading?: boolean;        // Show loading state
  onClick?: (e: MouseEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  
  // Focus management
  autoFocus?: boolean;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}
```

**Form components add `FormProps`:**

```typescript
interface FormProps extends InteractiveProps {
  name?: string;           // Form field name
  value?: unknown;         // Controlled value
  defaultValue?: unknown;  // Uncontrolled default
  onChange?: (value: unknown) => void;
  onValidate?: (value: unknown) => string | undefined;
  
  required?: boolean;
  error?: string;          // Error message
  helperText?: string;     // Help text below field
}
```

---

## 3. Package: @fabioeducacross/ui-education (53 componentes)

### 3.1. Question Templates (38 componentes)

**Structure:** 11 templates × ~3.5 variants avg = 38 components

#### 3.1.1. MultipleChoice (4 variants)
- **MultipleChoiceDefault**: Radio buttons vertical
- **MultipleChoiceWithImage**: Options with images
- **MultipleChoiceSingleColumn**: Compact layout
- **MultipleChoiceMultiColumn**: Grid layout (2-3 columns)

**Common Props:**
```typescript
interface MultipleChoiceProps {
  question: string;
  options: Array<{ id: string; text: string; image?: string }>;
  correctAnswer: string;
  userAnswer?: string;
  onSubmit: (answer: string) => void;
  feedback?: { correct: boolean; message: string };
  showHints?: boolean;
  hints?: string[];
}
```

---

#### 3.1.2. TrueFalse (3 variants)
- **TrueFalseDefault**: 2 buttons (Verdadeiro/Falso)
- **TrueFalseWithImage**: Question with image
- **TrueFalseWithExplanation**: Shows explanation after answer

**Common Props:**
```typescript
interface TrueFalseProps {
  question: string;
  image?: string;
  correctAnswer: boolean;
  userAnswer?: boolean;
  onSubmit: (answer: boolean) => void;
  feedback?: { correct: boolean; message: string };
  explanation?: string;
}
```

---

#### 3.1.3. FillBlanks (3 variants)
- **FillBlanksDefault**: Input fields inline
- **FillBlanksInline**: Text with blanks (`The ___ is blue`)
- **FillBlanksDropdown**: Dropdown per blank

**Common Props:**
```typescript
interface FillBlanksProps {
  text: string; // "The ___ is blue and the ___ is red"
  blanks: Array<{ id: string; correctAnswer: string | string[] }>;
  userAnswers?: Record<string, string>;
  onSubmit: (answers: Record<string, string>) => void;
  caseSensitive?: boolean;
  feedback?: Array<{ id: string; correct: boolean }>;
}
```

---

#### 3.1.4. Matching (3 variants)
- **MatchingDefault**: Two columns (drag from A to B)
- **MatchingDragDrop**: Visual drag & drop
- **MatchingGrid**: Grid layout (match pairs)

**Common Props:**
```typescript
interface MatchingProps {
  leftColumn: Array<{ id: string; text: string }>;
  rightColumn: Array<{ id: string; text: string }>;
  correctMatches: Record<string, string>; // { left_id: right_id }
  userMatches?: Record<string, string>;
  onSubmit: (matches: Record<string, string>) => void;
  feedback?: Record<string, boolean>;
}
```

---

#### 3.1.5. Ordering (3 variants)
- **OrderingDefault**: Drag list to reorder
- **OrderingDragDrop**: Visual drag handles
- **OrderingNumbered**: Number inputs (1, 2, 3...)

**Common Props:**
```typescript
interface OrderingProps {
  items: Array<{ id: string; text: string }>;
  correctOrder: string[]; // Array of ids in correct sequence
  userOrder?: string[];
  onSubmit: (order: string[]) => void;
  feedback?: { correct: boolean; correctOrder: string[] };
}
```

---

#### 3.1.6. Essay (4 variants)
- **EssayShortAnswer**: Single line input
- **EssayLongAnswer**: Textarea (3+ lines)
- **EssayRichText**: WYSIWYG editor (bold, italic, lists)
- **EssayWithWordCount**: Shows word count & limit

**Common Props:**
```typescript
interface EssayProps {
  question: string;
  placeholder?: string;
  userAnswer?: string;
  onSubmit: (answer: string) => void;
  minWords?: number;
  maxWords?: number;
  wordCount?: number;
  feedback?: { message: string }; // No auto-validation
}
```

---

#### 3.1.7. DragDrop (4 variants)
- **DragDropDefault**: Drag items to zones
- **DragDropGrid**: Grid-based drop zones
- **DragDropZones**: Multiple drop zones (categories)
- **DragDropSorting**: Reorder items in categories

**Common Props:**
```typescript
interface DragDropProps {
  items: Array<{ id: string; text: string; category?: string }>;
  zones: Array<{ id: string; label: string }>;
  correctPlacements: Record<string, string>; // { item_id: zone_id }
  userPlacements?: Record<string, string>;
  onSubmit: (placements: Record<string, string>) => void;
  feedback?: Record<string, boolean>;
}
```

---

#### 3.1.8. Canvas (3 variants)
- **CanvasFreeDrawing**: Free-form drawing with pen
- **CanvasShapeSelection**: Click to select regions
- **CanvasImageAnnotation**: Draw over image

**Common Props:**
```typescript
interface CanvasProps {
  backgroundImage?: string;
  width: number;
  height: number;
  tools: Array<'pen' | 'eraser' | 'highlight' | 'shapes'>;
  userDrawing?: string; // Base64 PNG
  onSubmit: (drawing: string) => void;
  correctRegions?: Array<{ x: number; y: number; width: number; height: number }>;
  feedback?: { correct: boolean; highlightCorrect?: boolean };
}
```

---

#### 3.1.9. Hotspot (3 variants)
- **HotspotImageClick**: Click specific regions
- **HotspotAreaSelection**: Select multiple areas
- **HotspotMultiple**: Multiple correct hotspots

**Common Props:**
```typescript
interface HotspotProps {
  image: string;
  hotspots: Array<{ id: string; x: number; y: number; radius: number }>;
  correctHotspots: string[]; // Array of hotspot ids
  userSelections?: string[];
  onSubmit: (selections: string[]) => void;
  feedback?: Record<string, boolean>;
  multipleSelections?: boolean;
}
```

---

#### 3.1.10. Audio (4 variants)
- **AudioSingleAudio**: Play 1 audio, answer question
- **AudioMultipleAudio**: Compare multiple audios
- **AudioDictation**: Type what you hear
- **AudioPronunciation**: Record pronunciation

**Common Props:**
```typescript
interface AudioProps {
  audioUrl: string | string[];
  question: string;
  transcription?: string; // For validation
  userAnswer?: string;
  userRecording?: Blob; // For pronunciation
  onSubmit: (answer: string | Blob) => void;
  feedback?: { correct: boolean; message: string };
  playbackRate?: number; // 0.5x, 1x, 1.5x, 2x
}
```

---

#### 3.1.11. Video (4 variants)
- **VideoSingleVideo**: Play 1 video, answer question
- **VideoMultipleVideo**: Compare multiple videos
- **VideoTimeline**: Answer based on timestamp
- **VideoInteractive**: Click annotations during playback

**Common Props:**
```typescript
interface VideoProps {
  videoUrl: string | string[];
  question: string;
  userAnswer?: string;
  onSubmit: (answer: string) => void;
  feedback?: { correct: boolean; message: string };
  annotations?: Array<{ timestamp: number; text: string }>;
  startTime?: number; // Start at specific second
  endTime?: number;   // End at specific second
}
```

---

### 3.2. Support Components (15)

**Question UI (6):**
- **QuestionHeader**: Title, timer, difficulty badge
- **QuestionContent**: Renders HTML/markdown safely
- **QuestionAlternative**: Single option/alternative
- **FeedbackPanel**: Shows correct/incorrect with explanation
- **HintButton**: Reveals hints (max 3)
- **TimerDisplay**: Countdown timer

**Mission UI (5):**
- **MissionCard**: Card with title, progress, status
- **MissionDetails**: Full mission info (description, questions, deadline)
- **MissionProgress**: Progress bar + stats (5/10 questions)
- **MissionStatus**: Badge (Not Started, In Progress, Completed, Expired)
- **GuidesLimitAlert**: Warning when guide limit reached

**Assessment UI (4):**
- **ProficiencyMeter**: Circular gauge (0-100%)
- **EvidenceReport**: PDF-style report with charts
- **DescriptorTag**: Pill-shaped tag for skill descriptors
- **SubjectBadge**: Badge with subject color

---

### 3.3. Props Patterns

**Question Wrapper Pattern:**

All question templates can be wrapped in `QuestionWrapper` for consistent UI:

```typescript
interface QuestionWrapperProps {
  header?: React.ReactNode; // QuestionHeader
  children: React.ReactNode; // Specific question template
  footer?: React.ReactNode; // FeedbackPanel, navigation buttons
  timer?: { duration: number; onExpire: () => void };
  hints?: string[];
  onSubmit: () => void;
}
```

**Validation Pattern:**

Questions support auto-validation or manual grading:

```typescript
interface ValidationResult {
  correct: boolean;
  score: number; // 0-100
  feedback: string;
  partialCredit?: number; // For multi-part questions
}

// Auto-validation (multiple choice, true/false)
const result = validateAnswer(userAnswer, correctAnswer);

// Manual grading (essay, canvas)
const result = await gradeManually(userAnswer, rubric);
```

---

## 4. Package: @fabioeducacross/ui-charts (16 componentes)

### 4.1. ApexCharts Wrappers (6)

**Line & Area (2):**
- **LineChart**: Time series, trends
- **AreaChart**: Filled area under line

**Bar & Column (2):**
- **BarChart**: Horizontal bars
- **ColumnChart**: Vertical bars (alias BarChart with orientation)

**Circular (2):**
- **PieChart**: Circular segments
- **DonutChart**: Circular with center hole

**Common Props (ApexCharts):**

```typescript
interface ApexChartProps {
  series: Array<{ name: string; data: number[] }>;
  categories: string[]; // X-axis labels
  config?: ApexCharts.ApexOptions; // Override defaults
  height?: number | string; // Default: 350
  width?: number | string;  // Default: "100%"
  loading?: boolean;
  error?: string;
  theme?: 'light' | 'dark';
  onDataPointSelection?: (event: any, chartContext: any, config: any) => void;
}
```

---

### 4.2. ECharts Wrappers (5)

**Advanced Visualizations:**
- **HeatMap**: 2D matrix with color intensity
- **TreeMap**: Hierarchical rectangles
- **Sankey**: Flow diagram
- **Funnel**: Conversion funnel
- **Gauge**: Speedometer-style meter

**Common Props (ECharts):**

```typescript
interface EChartProps {
  option: echarts.EChartsOption; // Full ECharts config
  height?: number | string;
  width?: number | string;
  loading?: boolean;
  error?: string;
  theme?: 'light' | 'dark';
  onEvents?: Record<string, (params: any) => void>; // click, mouseover, etc.
}
```

---

### 4.3. Progress Components (5)

**Linear Progress (2):**
- **LinearProgress**: Horizontal bar (determinate/indeterminate)
- **StepProgress**: Multi-step progress (1→2→3→4)

**Circular Progress (3):**
- **CircularProgress**: Spinning loader (indeterminate) OR percentage (determinate)
- **RadialProgress**: Radial bar (like Fitbit rings)
- **AnimatedProgress**: Number counts up to target

**Common Props (Progress):**

```typescript
interface ProgressProps {
  value?: number;          // 0-100 (determinate) or undefined (indeterminate)
  max?: number;           // Default: 100
  size?: 'sm' | 'md' | 'lg' | number; // Predefined or custom
  color?: string;         // CSS color or token (--primary)
  showLabel?: boolean;    // Show percentage text
  label?: string;         // Custom label
  animated?: boolean;     // Smooth animation
  duration?: number;      // Animation duration (ms)
}
```

---

## 5. Package: @fabioeducacross/ui-pdf (9 componentes)

### 5.1. Certificate Templates (3)

- **CertificateModern**: Minimalist design (sans-serif, gradients)
- **CertificateClassic**: Traditional design (serif fonts, borders)
- **CertificateMinimal**: Simple text-only

**Common Props:**

```typescript
interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: Date;
  instructorName?: string;
  signature?: string; // Base64 image
  logo?: string;      // Base64 image
  customText?: string;
  orientation?: 'portrait' | 'landscape'; // Default: landscape
  onExport?: (pdf: Blob) => void;
}
```

---

### 5.2. Report Templates (3)

- **ReportSimple**: 1-page summary
- **ReportDetailed**: Multi-page with sections
- **ReportExecutive**: Cover + executive summary + details

**Common Props:**

```typescript
interface ReportProps {
  title: string;
  author: string;
  date: Date;
  sections: Array<{
    id: string;
    title: string;
    content: React.ReactNode; // Can include charts, tables
  }>;
  coverPage?: {
    image?: string;
    subtitle?: string;
  };
  footer?: string; // Page footer text
  onExport?: (pdf: Blob) => void;
}
```

---

### 5.3. Report Components (3)

- **ReportCoverPage**: Title page with logo
- **ReportSection**: Section with heading & content
- **ReportChart**: Chart embedded in report (renders to image)

**Helper Function:**

```typescript
async function exportToPDF(
  element: HTMLElement,
  options: {
    fileName: string;
    orientation: 'portrait' | 'landscape';
    format: 'a4' | 'letter' | 'legal';
    quality: number; // 0-1 (html2canvas quality)
  }
): Promise<Blob> {
  // Uses jsPDF + html2canvas
  const canvas = await html2canvas(element, { scale: options.quality * 2 });
  const pdf = new jsPDF(options.orientation, 'mm', options.format);
  pdf.addImage(canvas, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
  return pdf.output('blob');
}
```

---

## 6. Dependency Graph

### 6.1. Package Dependencies

```mermaid
graph TD
    A[@fabioeducacross/ui] --> B[React 18+]
    A --> C[Radix UI]
    A --> D[Tailwind CSS]
    A --> E[CVA]
    
    F[@fabioeducacross/ui-education] --> A
    F --> G[react-dnd] %% Drag & drop
    F --> H[react-quill] %% Rich text editor
    
    I[@fabioeducacross/ui-charts] --> A
    I --> J[apexcharts - peer]
    I --> K[echarts - peer]
    
    L[@fabioeducacross/ui-pdf] --> A
    L --> M[jsPDF - peer]
    L --> N[html2canvas - peer]
```

**Peer Dependencies Rationale:**

- `apexcharts` (330KB): Too heavy to bundle directly
- `echarts` (900KB minified): Extremely heavy, must be peer dep
- `jsPDF` (200KB): Only needed for PDF export (not all projects)
- `html2canvas` (150KB): Only needed with jsPDF

---

### 6.2. Component Dependencies (Internal)

**Example: DataTable depends on:**
- Table (base component)
- Pagination (for page navigation)
- Input (for search)
- Select (for page size)
- Button (for actions)
- Checkbox (for row selection)

**Example: QuestionWrapper depends on:**
- Card (container)
- Badge (difficulty)
- Button (submit)
- Alert (feedback)
- Timer (countdown)

---

## 7. Multi-Framework Mapping

### 7.1. Props Translation Table

| Concept | React | Vue 2 (Bootstrap) | Vue 3 (Future API) |
|---------|-------|-------------------|---------------------|
| **Variant** | `variant="default"` | `class="btn-primary"` | `:variant="'primary'"` |
| **Size** | `size="sm"` | `class="btn-sm"` | `:size="'sm'"` |
| **Disabled** | `disabled={true}` | `:disabled="true"` | `:disabled="true"` |
| **Loading** | `loading={true}` | `v-if="loading"` (spinner) | `:loading="true"` |
| **Click Event** | `onClick={handler}` | `@click="handler"` | `@click="handler"` |
| **Children** | `<Button>Text</Button>` | `<button>Text</button>` | `<EdButton>Text</EdButton>` |
| **asChild** | `asChild={true}` | N/A (not supported) | `:as-child="true"` |
| **Class Merge** | `className={cn(...)}` | `:class="[...]"` | `:class="cn(...)"` |

---

### 7.2. Event Handlers

| Event | React | Vue 2/3 |
|-------|-------|---------|
| Click | `onClick` | `@click` |
| Change | `onChange` | `@input` (Vue 2) / `@update:modelValue` (Vue 3) |
| Focus | `onFocus` | `@focus` |
| Blur | `onBlur` | `@blur` |
| Submit | `onSubmit` | `@submit` |
| Key Down | `onKeyDown` | `@keydown` |

---

### 7.3. Composition Patterns

**React (Radix Slot):**

```tsx
<Button asChild>
  <Link to="/home">Go Home</Link>
</Button>
```

**Vue 2 (Slot):**

```vue
<template>
  <button class="btn btn-primary">
    <slot>Default Text</slot>
  </button>
</template>
```

**Vue 3 (Render Function):**

```vue
<script setup>
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>

<template>
  <EdButton :as-child="true">
    <RouterLink to="/home">Go Home</RouterLink>
  </EdButton>
</template>
```

---

## 8. State Management Patterns

### 8.1. Question State Machine

Questions follow this state flow:

```
IDLE → ANSWERING → VALIDATING → FEEDBACK → (RETRY or NEXT)
```

**State Interface:**

```typescript
type QuestionState = 
  | { status: 'idle' }
  | { status: 'answering'; userAnswer: unknown }
  | { status: 'validating' }
  | { status: 'feedback'; result: ValidationResult }
  | { status: 'completed'; finalScore: number };

interface QuestionContext {
  state: QuestionState;
  actions: {
    startAnswer: () => void;
    submitAnswer: (answer: unknown) => void;
    retry: () => void;
    next: () => void;
  };
}
```

---

### 8.2. Mission State

Missions track multiple questions:

```typescript
interface MissionState {
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';
  questionsCompleted: number;
  questionsTotal: number;
  score: number; // 0-100
  timeRemaining?: number; // Seconds
  currentQuestionIndex: number;
}
```

---

## 9. Validation Rules

### 9.1. Question Validation

**MultipleChoice:**
```typescript
validate(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer === correctAnswer;
}
```

**FillBlanks:**
```typescript
validate(userAnswers: Record<string, string>, blanks: Blank[]): Record<string, boolean> {
  return Object.fromEntries(
    blanks.map(blank => [
      blank.id,
      blank.correctAnswer.includes(userAnswers[blank.id]?.toLowerCase())
    ])
  );
}
```

**Essay (Manual):**
```typescript
// No auto-validation; requires instructor grading
gradeManually(answer: string, rubric: Rubric): ValidationResult {
  // Returns { score, feedback } from instructor
}
```

---

### 9.2. Form Validation

**Input:**
```typescript
interface InputValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined; // Error message
}
```

**Select:**
```typescript
interface SelectValidation {
  required?: boolean;
  validate?: (value: string) => boolean;
}
```

---

## 10. Metrics & Telemetry

### 10.1. Component Usage Tracking

Track which components are most used:

```typescript
interface ComponentMetrics {
  componentName: string;
  renders: number;
  interactions: number; // clicks, changes, submits
  errors: number;
  avgRenderTime: number; // ms
}
```

---

### 10.2. Question Performance

Track question difficulty:

```typescript
interface QuestionMetrics {
  questionId: string;
  attempts: number;
  correctFirstAttempt: number;
  avgTimeToAnswer: number; // seconds
  avgScore: number; // 0-100
  hintsUsed: number;
}
```

---

## 11. Type Exports

### 11.1. Package Exports

Each package exports types:

```typescript
// @fabioeducacross/ui
export type { ButtonProps, ButtonVariants } from "./components/Button";
export type { InputProps } from "./components/Input";
// ... all components

// @fabioeducacross/ui-education
export type { MultipleChoiceProps } from "./components/MultipleChoice";
export type { MissionState, QuestionState } from "./types";

// @fabioeducacross/ui-charts
export type { ApexChartProps, EChartProps } from "./types";

// @fabioeducacross/ui-pdf
export type { CertificateProps, ReportProps } from "./types";
```

---

## 12. Summary

**Total Components:** 119  
**Total Props Interfaces:** 50+  
**Total Variants:** 200+ (considering all variants of all components)  
**Package Dependencies:**
- `ui`: 5 peer deps (React, Radix, Tailwind, CVA, clsx)
- `ui-education`: 1 direct + 3 optional (react-dnd, react-quill, draft-js)
- `ui-charts`: 2 peer deps (apexcharts, echarts)
- `ui-pdf`: 2 peer deps (jsPDF, html2canvas)

**Complexity Metrics:**
- Average props per component: 8-12
- Most complex component: DataTable (25+ props)
- Simplest component: Divider (3 props)

---

**Status:** ✅ COMPLETA  
**Próximo Artefato:** quickstart.md  
**Revisão:** 23/01/2026
