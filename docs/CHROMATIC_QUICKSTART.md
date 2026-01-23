# 🚀 Chromatic - Guia Rápido do Desenvolvedor

## ⚡ TL;DR (Uso Rápido)

```bash
# Publicar Storybook no Chromatic (local)
pnpm chromatic

# Ver resultado
# https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/
```

## 🔄 Workflow Automático

### Push para `master`
✅ Chromatic roda automaticamente via GitHub Actions  
✅ Mudanças visuais são auto-aprovadas  
✅ Storybook é publicado  

### Pull Request
✅ Chromatic roda automaticamente  
✅ Status check é adicionado no PR  
✅ Não bloqueia merge mesmo com mudanças visuais  
✅ Testa apenas stories modificadas (rápido)  

## 📊 Quando Usar Chromatic

### ✅ USE quando:
- Criar ou modificar componentes UI
- Mudar tokens CSS (cores, espaçamentos)
- Atualizar stories do Storybook
- Antes de fazer merge na master
- Revisar mudanças visuais em PRs

### ❌ NÃO USE quando:
- Mudanças apenas em testes unitários
- Refatoração sem impacto visual
- Mudanças em documentação `.md`
- Build/config que não afeta componentes

## 🎯 Fluxo de Desenvolvimento

### 1. Desenvolver Componente
```bash
# Rodar Storybook localmente
pnpm storybook

# Fazer mudanças nos componentes/stories
# Verificar visualmente em http://localhost:6006
```

### 2. Testar Localmente (Opcional)
```bash
# Rodar testes unitários
pnpm test

# Publicar no Chromatic para review visual
pnpm chromatic
```

### 3. Criar Pull Request
```bash
git add .
git commit -m "feat: novo componente X"
git push origin minha-branch
```

✅ **Chromatic roda automaticamente!**  
O status aparecerá no PR com link para comparação visual.

### 4. Review Visual
1. Abra o PR no GitHub
2. Veja o status check do Chromatic
3. Clique no link "View on Chromatic"
4. Compare mudanças visuais lado a lado
5. Aprove ou solicite ajustes

### 5. Merge
```bash
# Após aprovação, merge normalmente
git checkout master
git merge minha-branch
git push
```

✅ **Build master auto-aprovado!**

## 🔍 Interpretar Resultados

### ✅ Build Passou
- Nenhuma mudança visual detectada
- OU mudanças foram aprovadas
- Pode fazer merge com confiança

### ⚠️ Mudanças Detectadas (Amarelo)
- Chromatic encontrou diferenças visuais
- Review no painel do Chromatic
- Aceite ou rejeite cada snapshot
- CI não falha automaticamente

### ❌ Build Falhou (Raro)
- Erro de build do Storybook
- Erro de sintaxe nas stories
- Problema de configuração
- Verifique logs do GitHub Actions

## 📱 Atalhos Úteis

```bash
# Ver último build
https://www.chromatic.com/builds?appId=69727df0ab06437ceb56a008

# Storybook publicado (sempre atualizado)
https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/

# Painel do projeto
https://www.chromatic.com/setup?appId=69727df0ab06437ceb56a008
```

## 🆘 Problemas Comuns

### "JavaScript failed to load"
❌ **Problema**: Chromatic não carrega assets  
✅ **Solução**: Já corrigido! Base path relativo configurado.

### Build muito lento
❌ **Problema**: Testando todas as 270 stories  
✅ **Solução**: Use `onlyChanged: true` no workflow (já configurado)

### Mudanças não detectadas
❌ **Problema**: Chromatic não vê diferenças visuais  
✅ **Solução**: Verifique se as mudanças afetam o render

## 🎓 Boas Práticas

### ✅ FAÇA:
- Rode Chromatic antes de abrir PR crítico
- Aceite mudanças intencionais no painel
- Rejeite mudanças acidentais (regressions)
- Use stories para documentar estados visuais
- Teste dark mode e variantes

### ❌ NÃO FAÇA:
- Aprovar mudanças sem revisar
- Ignorar builds com muitas mudanças
- Modificar snapshots manualmente
- Desabilitar Chromatic em PRs importantes
- Commitar com erros visuais conhecidos

## 📞 Suporte

**Documentação Completa:**  
→ [docs/CHROMATIC.md](./CHROMATIC.md)

**Resumo Executivo:**  
→ [docs/CHROMATIC_SUMMARY.md](./CHROMATIC_SUMMARY.md)

**Dúvidas ou Problemas:**  
→ Abra uma issue no repositório ou pergunte ao time

---

**Última Atualização**: 23/01/2026  
**Versão do Guia**: 1.0
