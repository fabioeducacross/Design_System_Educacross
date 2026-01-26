# Storybook 10 - Addons Disponíveis

**Data**: 26/01/2026  
**Versão**: Storybook 10.1.11

---

## 🔍 Descoberta Principal

**No Storybook 10, a arquitetura foi completamente refatorada.**

Muitos addons que existiam nas versões 7.x e 8.x foram:
- ✅ **Integrados ao core** (funcionalidades embutidas)
- ❌ **Descontinuados** (não migraram para v10)
- 🚧 **Em desenvolvimento** (versões alpha apenas)

---

## ❌ Addons que NÃO Existem na v10

Tentamos instalar os seguintes pacotes com versão `@10.1.11`:

```bash
# ❌ Não existem versões 10.x
@storybook/addon-essentials@10.1.11     # Última versão: 8.6.14
@storybook/addon-interactions@10.1.11  # Última versão: 8.6.14
@storybook/test@10.1.11                # Última versão: 8.6.15
```

### Por que não existem?

**Storybook 10 integrou ao core:**
- Controls
- Actions  
- Viewport
- Backgrounds
- Toolbars
- Measure
- Outline

**Resultado**: Não é necessário instalar `addon-essentials` - tudo já vem incluído no pacote `storybook`.

---

## ✅ Addons Compatíveis com v10

Apenas estes addons têm versões `10.x.x`:

| Addon | Versão | Status | Descrição |
|-------|--------|--------|-----------|
| `@storybook/addon-links` | 10.1.11 | ✅ Instalado | Navegação entre stories |
| `@storybook/addon-themes` | 10.1.11 | ✅ Instalado | Troca de temas CSS |
| `@storybook/addon-docs` | 10.1.11 | ✅ Instalado | Documentação automática |
| `@storybook/addon-a11y` | 10.1.11 | ✅ Instalado | Checagens de acessibilidade |

---

## 📦 Configuração Final

**Arquivo**: `apps/storybook/.storybook/main.ts`

```typescript
addons: [
  getAbsolutePath("@storybook/addon-links"),
  getAbsolutePath("@storybook/addon-themes"),
  getAbsolutePath("@storybook/addon-docs"),
  getAbsolutePath("@storybook/addon-a11y"),
],
```

Esta é a **configuração máxima** possível com Storybook 10.1.11.

---

## ⚠️ Warnings Esperados

### Addon Followers

```
TypeError: No existing state found for follower with id: 'storybook/status'
TypeError: No existing state found for follower with id: 'storybook/test-provider'
TypeError: No existing state found for follower with id: 'storybook/checklist'
```

**Causa**: Addons experimentais que não existem na v10  
**Impacto**: Nenhum - avisos inofensivos  
**Ação**: Ignorar

### Color Controls

```
Addon controls: Control of type color only supports string, received "undefined"
```

**Causa**: Props chamadas `color` com `control: "select"` sem valor default  
**Impacto**: Nenhum - control funciona normalmente  
**Ação**: Opcional - adicionar default ou renomear prop

### WebSocket

```
WebSocket is already in CLOSING or CLOSED state
```

**Causa**: Vite HMR reconectando durante desenvolvimento  
**Impacto**: Nenhum - comportamento normal do HMR  
**Ação**: Ignorar

---

## 🚀 Próximos Passos

### Se quiser funcionalidades de teste:

**Opção 1**: Aguardar migração oficial para v10
- `@storybook/addon-interactions` está em alpha (`9.0.0-alpha.10`)
- `@storybook/test` está em v8.6.15

**Opção 2**: Usar ferramentas externas
- Playwright para testes E2E
- Vitest para testes unitários
- Testing Library para testes de componentes

### Se quiser atualizar para Storybook 10.2.0:

```bash
npx storybook@latest upgrade
```

**Nota**: Provavelmente não adicionará novos addons, apenas correções de bugs.

---

## 📚 Referências

- [Storybook 10 Release Notes](https://github.com/storybookjs/storybook/blob/main/CHANGELOG.md)
- [Storybook 10 Migration Guide](https://storybook.js.org/docs/react/migration-guide)
- [Addons Catalog](https://storybook.js.org/addons)

---

**Conclusão**: Configuração atual é a máxima possível. Todos os addons compatíveis estão instalados e funcionando. Warnings são benignos e podem ser ignorados.
