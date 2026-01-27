# Implementation Plan: Storybook Testing & Quality

**Branch**: `002-storybook-testing` | **Date**: 26/01/2026 | **Spec**: [storybook-best-practices.md](../../docs/storybook-best-practices.md)  
**Input**: Guia de boas práticas do Storybook + checklist oficial

## Summary

Implementar infraestrutura completa de testes no Storybook para garantir qualidade, acessibilidade e prevenção de regressões visuais nos 37 componentes do Design System Educacross. Inclui testes de interação, acessibilidade, visuais e automação em CI/CD.

**Motivação**: Atualmente temos 37 componentes documentados mas sem cobertura de testes automatizados. O addon Vitest foi instalado mas não configurado. Precisamos garantir que mudanças futuras não quebrem componentes existentes.

**Resultado esperado**: 
- 80%+ de cobertura de testes
- 0 violações críticas de acessibilidade
- Pipeline de CI/CD executando testes automaticamente
- Testes visuais configurados

## Technical Context

**Language/Version**: TypeScript 5.7+, React 18+  
**Primary Dependencies**: 
- Storybook 10.1.11
- Vitest (instalado via addon)
- @vitest/browser-playwright
- @storybook/test (interactions)
- @storybook/addon-a11y
- @storybook/addon-coverage

**Storage**: N/A (componentes client-side)  

**Testing**: 
- Unit/Integration: Vitest + Playwright
- Accessibility: @storybook/addon-a11y + axe-core
- Visual: @storybook/addon-visual-tests (a instalar)
- Interactions: @storybook/test

**Target Platform**: Navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+)  

**Project Type**: Web (monorepo com Turborepo)  

**Performance Goals**: 
- Testes executam em <5min no CI
- Coverage report gerado em <30s
- Stories carregam em <2s
- Build do Storybook em <2min

**Constraints**: 
- Manter compatibilidade com Storybook 10.x
- Não aumentar bundle size dos componentes
- Testes devem rodar em ambiente headless (CI)
- Coverage mínimo 80% (lines, functions, branches)

**Scale/Scope**: 
- 37 componentes base
- ~180 stories existentes
- 5-10 play functions prioritárias
- 20+ testes de integração
- 100% dos componentes validados para a11y

## Constitution Check

*GATE: Verificar se implementação segue arquitetura do monorepo*

✅ **Passes:**
- Testes isolados no escopo do Storybook (apps/storybook)
- Não adiciona dependências aos componentes (packages/ui)
- Usa infraestrutura existente (Turborepo, pnpm)
- Documentação centralizada (specs/, docs/)

⚠️ **Requires Justification:**
- Adicionar 4 devDependencies (~15MB) no apps/storybook
  - **Why Needed**: Testes visuais e coverage essenciais para qualidade
  - **Simpler Alternative Rejected**: Testes manuais não escalam, propensos a erro humano

## Project Structure

### Documentation (this feature)

```text
specs/002-storybook-testing/
├── plan.md              # Este arquivo
├── research.md          # Análise de addons e estratégias de teste
├── data-model.md        # Estrutura de testes e configurações
├── quickstart.md        # Guia rápido para executar testes
├── contracts/
│   ├── test-config.ts   # Interface de configuração Vitest
│   ├── play-functions.ts # Contratos para testes de interação
│   └── ci-workflow.yml  # Contrato do pipeline CI/CD
└── tasks.md             # Breakdown detalhado de tarefas

docs/
└── storybook-best-practices.md  # ✅ Criado (26/01/2026)
```

### Source Code (repository root)

```text
apps/storybook/
├── .storybook/
│   ├── main.ts                    # ✅ Configurado
│   ├── preview.ts                 # ✅ Configurado
│   ├── vitest.setup.ts            # ✅ Criado pelo addon
│   ├── test/                      # 🆕 A criar
│   │   ├── setup.ts               # Helpers globais de teste
│   │   ├── a11y-rules.ts          # Regras customizadas axe-core
│   │   └── visual-config.ts       # Configuração testes visuais
│   └── addons/
│       └── multi-framework-code/  # ✅ Existente
│
├── stories/
│   ├── components/                # ✅ 37 stories existentes
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.ts         # 🆕 Testes unitários
│   │   ├── Input.stories.tsx
│   │   └── ...
│   ├── patterns/
│   │   ├── FormField.stories.tsx
│   │   └── FormField.test.ts      # 🆕 Testes de integração
│   └── guidelines/
│
├── tests/                         # 🆕 A criar
│   ├── integration/
│   │   ├── form-submission.test.ts
│   │   ├── navigation.test.ts
│   │   └── data-table-filtering.test.ts
│   ├── accessibility/
│   │   ├── keyboard-navigation.test.ts
│   │   ├── screen-reader.test.ts
│   │   └── color-contrast.test.ts
│   └── visual/
│       ├── baseline/              # Screenshots de referência
│       └── snapshots.test.ts
│
├── package.json                   # Adicionar scripts de teste
├── vite.config.ts                 # ✅ Atualizado pelo addon
└── vitest.config.ts               # 🆕 A criar (coverage config)

.github/
└── workflows/
    ├── storybook-tests.yml        # 🆕 CI/CD para testes
    └── visual-regression.yml      # 🆕 Testes visuais no PR

packages/ui/                       # ✅ Não modificar
├── src/components/                # Componentes permanecem sem testes internos
└── vitest.config.ts               # ✅ Já existe (testes unitários separados)
```

**Structure Decision**: 
- **Testes no Storybook** (apps/storybook/tests/): Testes de integração, a11y e visuais
- **Testes no pacote UI** (packages/ui/src/test/): Apenas testes unitários de lógica interna
- **Separação clara**: Storybook testa comportamento + UI, pacote testa lógica de negócio

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 4 tipos de teste | Garantir qualidade em múltiplas dimensões | Apenas testes unitários não validam interação real do usuário nem acessibilidade |
| 2 runners de teste | Vitest (unit) + Playwright (browser) | Vitest sozinho não roda em browser real; Playwright sozinho não tem DX do Vitest |
| Testes visuais com screenshots | Prevenir regressões de CSS/layout | Code review manual não detecta mudanças sutis de 1-2px ou cores |
| CI com matriz de navegadores | Garantir cross-browser compatibility | Testar apenas Chrome local não garante Safari/Firefox funcionem |

## Phases

### Phase 0: Research ✅ PARCIAL
**Status**: Iniciado (26/01/2026)  
**Output**: 
- ✅ docs/storybook-best-practices.md criado
- ⏳ Pesquisar estratégias de teste para componentes React
- ⏳ Avaliar ferramentas de teste visual (Chromatic vs Playwright)
- ⏳ Analisar regras de acessibilidade WCAG 2.1 AA

### Phase 1: Design & Contracts
**Deliverables**:
1. **data-model.md**: Estrutura de configuração de testes
2. **quickstart.md**: Guia para executar testes localmente
3. **contracts/**:
   - `test-config.ts`: Tipos para configuração Vitest/Playwright
   - `play-functions.ts`: Interface padrão para testes de interação
   - `ci-workflow.yml`: Template do workflow GitHub Actions

### Phase 2: Implementation (Breakdown em tasks.md)
**Sprints sugeridos**:

#### Sprint 1: Infraestrutura Base (T001-T020)
- Configurar vitest.config.ts com coverage
- Adicionar scripts no package.json
- Criar helpers de teste (setup.ts)
- Configurar viewports responsivos
- Instalar @storybook/addon-visual-tests

#### Sprint 2: Testes de Interação (T021-T040)
- Play functions em 10 componentes críticos:
  - Button (click, loading, disabled)
  - Input (typing, validation, clear)
  - Dialog (open, close, esc key, click outside)
  - Select (dropdown, keyboard, selection)
  - Tabs (navigation, keyboard arrows)
  - Pagination (next, prev, jump)
  - Toast (show, dismiss, timeout)
  - Tooltip (hover, focus)
  - DropdownMenu (open, select, close)
  - Accordion (expand, collapse, multiple)

#### Sprint 3: Acessibilidade (T041-T060)
- Configurar regras axe-core customizadas
- Auditar 37 componentes via addon a11y
- Corrigir violações críticas (labels, contrast, aria)
- Testes de navegação por teclado (Tab, Enter, Esc, Arrows)
- Testes de leitores de tela (ARIA attributes)

#### Sprint 4: Testes Visuais (T061-T080)
- Gerar baseline screenshots
- Configurar thresholds de diferença (5% tolerance)
- Testes de responsividade (mobile, tablet, desktop)
- Testes de temas (light, dark)
- Configurar Chromatic ou Playwright visual comparison

#### Sprint 5: CI/CD & Automação (T081-T100)
- Workflow GitHub Actions (build + test)
- Matriz de navegadores (Chrome, Firefox, Safari)
- Upload de coverage para Codecov
- Comentários automáticos em PRs (coverage diff)
- Badge de coverage no README

### Phase 3: Testing & Refinement
- Executar suite completa de testes
- Atingir 80%+ coverage
- Corrigir flaky tests
- Documentar padrões de teste no Storybook
- Treinar time para escrever testes

### Phase 4: Documentation & Handoff
- Atualizar docs/storybook-best-practices.md com resultados
- Criar guia de contribuição (TESTING.md)
- Gravar vídeo de walkthrough (Loom/YouTube)
- Apresentar resultados para time

## Success Criteria

**Must Have**:
- ✅ 80%+ coverage (lines, functions, branches, statements)
- ✅ 0 violações críticas de acessibilidade (WCAG A)
- ✅ CI/CD executando testes em todos os PRs
- ✅ 10 componentes com play functions
- ✅ Testes visuais configurados

**Should Have**:
- 90%+ coverage
- 0 violações de WCAG AA
- 20 componentes com play functions
- Testes de responsividade em 3 breakpoints

**Nice to Have**:
- Integração com Chromatic Cloud
- Testes de performance (Lighthouse)
- Testes E2E de jornadas completas
- Mutation testing com Stryker

## Risks & Mitigations

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Testes flaky (timeout, race conditions) | Alto | Média | Usar waitFor, aumentar timeouts, retry automático |
| Coverage difícil de atingir 80% | Médio | Alta | Priorizar componentes críticos, excluir código gerado |
| CI/CD lento (>10min) | Médio | Média | Paralelizar testes, cache de node_modules, sharding |
| Testes visuais com falsos positivos | Alto | Alta | Ajustar threshold, ignorar antialiasing, usar máscaras |
| Quebra de testes em mudanças legítimas | Baixo | Alta | Documentar como atualizar baselines, code review |

## Dependencies

**Bloqueadores**:
- Nenhum (addon Vitest já instalado)

**Paralelos**:
- Desenvolvimento de novos componentes continua normalmente
- Testes podem ser adicionados incrementalmente

**Downstream**:
- Sprint 2+ (componentes educacionais) se beneficiará dos padrões de teste estabelecidos

## Resources

**Time Estimate**: 4 sprints (8 semanas)  
**Team**: 1 desenvolvedor full-time + code review de 1 senior

**External Resources**:
- [Storybook Testing Guide](https://storybook.js.org/docs/writing-tests)
- [Vitest Browser Mode](https://vitest.dev/guide/browser.html)
- [WCAG 2.1 Checklist](https://www.wuhcag.com/wcag-checklist/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

---

**Next Steps**:
1. Revisar e aprovar este plano
2. Executar `/speckit.tasks` para gerar breakdown detalhado
3. Iniciar Phase 1 (Design & Contracts)
4. Agendar kick-off meeting com time

**Última atualização**: 26/01/2026 - Criação inicial
