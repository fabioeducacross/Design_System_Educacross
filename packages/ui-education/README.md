# @fabioeducacross/ui-education

Componentes educacionais especializados do Educacross Design System.

## 📦 Instalação

```bash
pnpm add @fabioeducacross/ui-education @fabioeducacross/ui
```

## 🎯 Componentes

### Sistema de Questões (40 componentes)
- **QuestionRenderer**: Renderizador universal de questões
- **QuestionContent**: Exibição de conteúdo HTML + LaTeX
- **QuestionAlternative**: Alternativas (radio, checkbox, etc)
- **QuestionStatus**: Estados (correto/incorreto/pendente)
- **EvaluationsHtmlContentRenderer**: Sanitização HTML segura
- **11 Templates**: MultipleChoice, TrueFalse, Matching, FillInTheBlank, Essay, Ordering, Matrix, Hotspot, Cloze, Composite, Interactive

### Sistema de Missões (30 componentes)
- **MissionCard**: Card de missão
- **MissionDetails**: Detalhes completos
- **MissionVisualization**: Visualização gráfica
- **MissionProgress**: Barra de progresso
- **FeedbackAndSend**: Interface de feedback
- **ShareGuide, DeleteGuide, CancelMission**: Ações
- E mais 22 componentes especializados

## 🚀 Uso

```tsx
import { QuestionRenderer, MissionCard } from "@fabioeducacross/ui-education";

function App() {
  return (
    <>
      <QuestionRenderer 
        type="multiple-choice"
        content="Qual é a capital do Brasil?"
        alternatives={[...]}
      />
      
      <MissionCard
        title="Missão de Matemática"
        progress={75}
        status="em-andamento"
      />
    </>
  );
}
```

## 📚 Documentação

Consulte o Storybook para exemplos interativos e documentação completa.

## 🔗 Dependências

Este pacote depende de:
- `@fabioeducacross/ui` (componentes base)
- `react` ^18.3.0
- `dompurify` (sanitização HTML)
- `katex` (renderização LaTeX)
- `marked` (parsing Markdown)

## 📝 Status

**Em desenvolvimento** - Phase 4/5 do plano de expansão 100% Coverage.

Tasks: T134-T280 (Sistema de Questões + Sistema de Missões)
