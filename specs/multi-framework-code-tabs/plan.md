# Implementation Plan: Multi-Framework Code Tabs no Storybook

**Branch**: `multi-framework-code-tabs` | **Date**: 23/01/2026 | **Spec**: specs/multi-framework-code-tabs/spec.md
**Input**: Necessidade de exibir código React, Vue 2 e Vue 3 em abas clicáveis para cada componente do Design System

## Summary

Implementar um sistema de abas de código multi-framework no Storybook 10.1.11 que permita aos desenvolvedores visualizar e copiar exemplos de uso de componentes em 3 frameworks diferentes (React, Vue 2 + Bootstrap, Vue 3) através de abas clicáveis interativas na documentação de cada componente.

**Problema atual**: 
- Tentativas com MDX customizado falharam (erro: "Failed to resolve import @storybook/blocks")
- Arquivos MDX causam problemas de build no Vite
- CodeTabs component criado não é reconhecido pelo Storybook

**Solução técnica proposta**: 
Implementar addon customizado do Storybook que adiciona painel de abas de código usando a API nativa do Storybook 10, evitando MDX e funcionando como painel adicional na interface.

## Technical Context

**Language/Version**: TypeScript 5.7.2, React 18.3.1, Node.js LTS  
**Primary Dependencies**: 
- Storybook 10.1.11 (react-vite)
- @storybook/addon-docs 10.1.11
- @storybook/manager-api 10.1.11
- @storybook/components 10.1.11
- react-syntax-highlighter (para highlighting de código)

**Storage**: N/A (apenas renderização de UI)  
**Testing**: Validação manual no Storybook dev server  
**Target Platform**: Browser (Storybook UI)  
**Project Type**: Web (monorepo Turborepo)  
**Performance Goals**: Renderização instantânea de abas (<50ms troca de tab)  
**Constraints**: 
- Compatível com Storybook 10.1.11
- Não quebrar autodocs existente
- Zero impacto em build time
- Funcionar com Vite 6.4.1

**Scale/Scope**: 21 componentes React que precisam de código multi-framework

## Constitution Check

✅ **Simplicidade**: Solução usa API nativa do Storybook, sem frameworks adicionais  
✅ **Manutenibilidade**: Código centralizado em addon, fácil de atualizar  
✅ **Documentação**: Código inline nas stories, auto-documentado  
⚠️ **Complexidade**: Requer conhecimento da API de addons do Storybook (justificado abaixo)

## Project Structure

### Documentation (this feature)

```text
specs/multi-framework-code-tabs/
├── plan.md              # Este arquivo
├── research.md          # Pesquisa de soluções de addons Storybook 10
├── quickstart.md        # Guia de uso para desenvolvedores
└── tasks.md             # Tasks detalhadas de implementação
```

### Source Code (repository root)

```text
apps/storybook/
├── .storybook/
│   ├── main.ts                              # Registrar addon
│   ├── preview.tsx                          # Configurar decorator global
│   └── addons/
│       └── multi-framework-code/
│           ├── register.tsx                 # Registrar painel no manager
│           ├── Panel.tsx                    # Componente do painel de abas
│           ├── CodeTab.tsx                  # Componente de aba individual
│           └── types.ts                     # TypeScript types
│
└── stories/
    └── components/
        ├── Button.stories.tsx               # Adicionar parâmetro multiFrameworkCode
        ├── Input.stories.tsx                # Adicionar parâmetro multiFrameworkCode
        └── [outros componentes].stories.tsx # Atualizar gradualmente

package.json                                 # Adicionar react-syntax-highlighter
```

**Structure Decision**: 
- Addon customizado local (não NPM) para máxima flexibilidade
- Estrutura de addon padrão do Storybook com `register.tsx` + componentes
- Parâmetro `multiFrameworkCode` nas stories para passar código
- Syntax highlighter para melhor UX de código

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Custom Storybook Addon | Única forma de adicionar painel interativo de abas na UI do Storybook sem quebrar o build | MDX customizado falha no Vite, blocos de código inline não têm abas, documentação externa perde contexto do componente |
| react-syntax-highlighter | Highlighting de código com suporte a múltiplas linguagens (tsx, vue, html) | Blocos de código nativos do Storybook não suportam troca dinâmica de linguagem nas abas |

## Implementation Phases

### Phase 0: Research & Validation ✅ DONE
- [x] Tentar MDX customizado → FALHOU (erro de build)
- [x] Tentar CodeTabs component → FALHOU (não reconhecido)
- [x] Pesquisar API de addons do Storybook 10
- [x] Validar compatibilidade com Vite

**Resultado**: API de addons é a única solução viável para abas interativas

### Phase 1: Addon Infrastructure (2h)
**Goal**: Criar estrutura básica do addon funcionando

**Tasks**:
1. Criar estrutura de diretórios `apps/storybook/.storybook/addons/multi-framework-code/`
2. Instalar `react-syntax-highlighter` e types
3. Criar `types.ts` com interface `MultiFrameworkCode`
4. Criar `register.tsx` com registro básico do addon
5. Atualizar `main.ts` para carregar addon local
6. Validar que addon aparece na lista de addons do Storybook

**Validation**: 
- `pnpm storybook` roda sem erros
- Addon aparece em Storybook > Settings > Addons

### Phase 2: Panel Component (3h)
**Goal**: Implementar painel de abas com syntax highlighting

**Tasks**:
1. Criar `Panel.tsx` com estrutura básica de abas (React, Vue 2, Vue 3)
2. Implementar estado de aba ativa com `useState`
3. Integrar `react-syntax-highlighter` com tema dark
4. Adicionar botão "Copy" para copiar código
5. Ler parâmetro `multiFrameworkCode` via `useParameter` hook
6. Adicionar fallback quando parâmetro não existe

**Validation**: 
- Painel renderiza com 3 abas
- Troca de abas funciona
- Syntax highlighting correto para tsx/vue/html
- Botão copy funciona

### Phase 3: Integration with Stories (2h)
**Goal**: Adicionar código multi-framework em componentes prioritários

**Tasks**:
1. Atualizar Button.stories.tsx com parâmetro `multiFrameworkCode`
2. Atualizar Input.stories.tsx
3. Atualizar Select.stories.tsx
4. Atualizar Checkbox.stories.tsx
5. Criar template comment no código para fácil replicação

**Validation**: 
- 4 componentes mostram abas de código
- Código está correto e testado
- Copy/paste funciona

### Phase 4: Documentation & Rollout (1h)
**Goal**: Documentar uso e preparar para rollout nos 17 componentes restantes

**Tasks**:
1. Criar `quickstart.md` com instruções de uso
2. Documentar mapeamento React → Vue 2 → Vue 3
3. Criar script helper para gerar código boilerplate
4. Adicionar seção no README sobre multi-framework

**Validation**: 
- Outro dev consegue adicionar código multi-framework seguindo o guia
- Zero dúvidas sobre nomenclatura de props

## Deliverables

1. ✅ **Addon funcional** em `apps/storybook/.storybook/addons/multi-framework-code/`
2. ✅ **4 componentes com abas** (Button, Input, Select, Checkbox)
3. ✅ **Documentação de uso** em `specs/multi-framework-code-tabs/quickstart.md`
4. ✅ **Template** para replicar em 17 componentes restantes

## Success Metrics

- ✅ Desenvolvedores conseguem ver código dos 3 frameworks
- ✅ Abas trocam instantaneamente (<50ms)
- ✅ Botão copy funciona 100% das vezes
- ✅ Zero erros de build
- ✅ Compatível com Chromatic (visual regression)

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API de addons muda no Storybook 11 | Alto | Média | Fixar versão 10.1.11, documentar breaking changes |
| Performance com 21 componentes | Médio | Baixa | Lazy load de syntax highlighter |
| Código desatualizado nos exemplos | Alto | Alta | CI check que valida sintaxe dos códigos |

## Timeline

- **Phase 1**: 2h (hoje 23/01)
- **Phase 2**: 3h (hoje 23/01)
- **Phase 3**: 2h (amanhã 24/01)
- **Phase 4**: 1h (amanhã 24/01)

**Total**: 8h (~1 dia de trabalho)

## Next Steps

1. **AGORA**: Começar Phase 1 - Criar estrutura do addon
2. Instalar `react-syntax-highlighter`
3. Criar arquivos base (`register.tsx`, `Panel.tsx`, `types.ts`)
4. Validar que addon carrega sem erros
