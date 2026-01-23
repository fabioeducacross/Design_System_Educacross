# 📚 Índice de Documentação - Educacross Design System

Guia completo de toda documentação disponível no projeto.

## 🚀 Início Rápido

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[README.md](../README.md)** | Visão geral do projeto | Primeira leitura, setup inicial |
| **[USAGE.md](../USAGE.md)** | Como usar o DS em projetos | Integração em apps |
| **[INSTALLATION.md](../INSTALLATION.md)** | Guia de instalação | Setup desenvolvimento local |

## 🛠️ Desenvolvimento

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[CONTRIBUTING.md](../CONTRIBUTING.md)** | Guidelines de contribuição | Antes de contribuir |
| **[COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md)** | Checklist para novos componentes | Criar/modificar componentes |
| **[COMPONENT_MAPPING.md](../COMPONENT_MAPPING.md)** | Mapa de componentes e prioridades | Planejar roadmap |

## 🎨 Visual Testing

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[CHROMATIC_QUICKSTART.md](./CHROMATIC_QUICKSTART.md)** | Guia rápido Chromatic | Uso diário, PRs |
| **[CHROMATIC.md](./CHROMATIC.md)** | Setup técnico completo | Troubleshooting, CI/CD |
| **[CHROMATIC_SUMMARY.md](./CHROMATIC_SUMMARY.md)** | Resumo executivo | Overview rápido |
| **[MIGRATION.md](./MIGRATION.md)** | Migração entre repositórios | Mover DS para novo repo |

## 🏗️ Arquitetura & Setup

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[.github/SECRETS.md](../.github/SECRETS.md)** | Setup de secrets GitHub | Configurar CI/CD |
| **[.github/workflows/chromatic.yml](../.github/workflows/chromatic.yml)** | Workflow CI/CD | Entender automação |
| **[turbo.json](../turbo.json)** | Config Turborepo | Otimizar builds |

## 📖 Referências

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[CHANGELOG.md](../CHANGELOG.md)** | Histórico de mudanças | Ver o que mudou |
| **[ICON_MAPPING.md](../ICON_MAPPING.md)** | Inventário de ícones | Escolher ícones |
| **[IMAGE_INVENTORY.md](../IMAGE_INVENTORY.md)** | Inventário de imagens | Assets disponíveis |

## 🎓 Storybook & Figma

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[docs/STORYBOOK_V10_MIGRATION.md](./STORYBOOK_V10_MIGRATION.md)** | Migração Storybook v10 | Referência histórica |
| **[docs/FIGMA_QUICKSTART.md](./FIGMA_QUICKSTART.md)** | Integração Figma | Sincronizar design |
| **[docs/FIGMA_MCP_SETUP.md](./FIGMA_MCP_SETUP.md)** | MCP Figma setup | Config avançada |

## 🔍 Specs & ADRs

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[specs/001-ds-v2-melhorias/](../specs/001-ds-v2-melhorias/)** | Melhorias v2 planejadas | Roadmap futuro |
| **[specs/components/](../specs/components/)** | Specs de componentes | Design detalhado |

## 🌐 Links Externos

| Recurso | URL |
|---------|-----|
| **Storybook Publicado** | https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/ |
| **Painel Chromatic** | https://www.chromatic.com/builds?appId=69727df0ab06437ceb56a008 |
| **Repositório GitHub** | https://github.com/fabioeducacross/Design_System_Educacross |

## 🎯 Mapas Rápidos

### Por Persona

#### 👨‍💻 Desenvolvedor Frontend
1. [README.md](../README.md) - Overview
2. [USAGE.md](../USAGE.md) - Instalação
3. [CHROMATIC_QUICKSTART.md](./CHROMATIC_QUICKSTART.md) - Visual testing
4. [COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md) - Criar componentes

#### 🎨 Designer
1. [Storybook](https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/) - Ver componentes
2. [COMPONENT_MAPPING.md](../COMPONENT_MAPPING.md) - Roadmap
3. [FIGMA_QUICKSTART.md](./FIGMA_QUICKSTART.md) - Integração

#### 🔧 DevOps/Infra
1. [.github/SECRETS.md](../.github/SECRETS.md) - Secrets
2. [.github/workflows/chromatic.yml](../.github/workflows/chromatic.yml) - CI/CD
3. [CHROMATIC.md](./CHROMATIC.md) - Setup técnico

#### 📝 Tech Lead/Arquiteto
1. [README.md](../README.md) - Visão geral
2. [CONTRIBUTING.md](../CONTRIBUTING.md) - Guidelines
3. [CHROMATIC_SUMMARY.md](./CHROMATIC_SUMMARY.md) - Status
4. [COMPONENT_MAPPING.md](../COMPONENT_MAPPING.md) - Roadmap

### Por Tarefa

#### ➕ Adicionar Novo Componente
1. [COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md) - Checklist completo
2. [CONTRIBUTING.md](../CONTRIBUTING.md) - Padrões de código
3. [CHROMATIC_QUICKSTART.md](./CHROMATIC_QUICKSTART.md) - Testar visualmente

#### 🐛 Corrigir Bug Visual
1. [CHROMATIC_QUICKSTART.md](./CHROMATIC_QUICKSTART.md) - Workflow
2. [Chromatic](https://www.chromatic.com/builds?appId=69727df0ab06437ceb56a008) - Ver diff

#### 🔧 Configurar CI/CD
1. [.github/SECRETS.md](../.github/SECRETS.md) - Setup secrets
2. [CHROMATIC.md](./CHROMATIC.md) - Workflow completo

#### � Migrar Repositório
1. [MIGRATION.md](./MIGRATION.md) - Guia completo de migração
2. [.github/SECRETS.md](../.github/SECRETS.md) - Reconfigurar secrets
3. [CHROMATIC.md](./CHROMATIC.md) - Validação pós-migração

#### �📦 Fazer Release
1. [CONTRIBUTING.md](../CONTRIBUTING.md) - Versionamento
2. [CHANGELOG.md](../CHANGELOG.md) - Atualizar histórico

#### 🎨 Integrar com Figma
1. [FIGMA_QUICKSTART.md](./FIGMA_QUICKSTART.md) - Início rápido
2. [FIGMA_MCP_SETUP.md](./FIGMA_MCP_SETUP.md) - Setup avançado

## 📊 Estatísticas do Projeto

**Última Atualização**: 23/01/2026

| Métrica | Valor |
|---------|-------|
| **Componentes** | 37 |
| **Stories** | 270 |
| **Testes Unitários** | 480+ |
| **Cobertura** | ~85% |
| **Documentos** | 20+ |
| **Visual Snapshots** | 270 |

## 🆘 Precisa de Ajuda?

1. **Procure na documentação** usando Ctrl+F no GitHub
2. **Veja o Storybook** para exemplos visuais
3. **Abra uma issue** descrevendo o problema
4. **Pergunte ao time** no canal do projeto

---

**Mantenedores**: Time Educacross  
**Última Revisão**: 23/01/2026  
**Versão do Índice**: 1.0
