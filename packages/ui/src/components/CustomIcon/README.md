# CustomIcon Component

Biblioteca de 150+ ícones customizados do Educacross organizados por categoria.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { CustomIcon } from "@fabioeducacross/ui";

export default function MyCustomIcon() {
  return <CustomIcon name="liga-corujinhas-enabled" category="conhecimento" />;
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `string` | - | Nome do ícone customizado |
| `category` | `IconCategory` | - | Categoria do ícone |
| `size` | `"xs" \| "sm" \| "default" \| "md" \| "lg" \| "xl" \| "2xl"` | `"default"` | Tamanho do ícone |
| `className` | `string` | - | Classes CSS adicionais |

## Categorias de Ícones

### 1. **Conhecimento** (Disciplinas)
```tsx
<CustomIcon name="liga-corujinhas-enabled" category="conhecimento" />
<CustomIcon name="lingua-portuguesa-enabled" category="conhecimento" />
<CustomIcon name="math-enabled" category="conhecimento" />
<CustomIcon name="matematica-sigla-enabled" category="conhecimento" />
<CustomIcon name="todas-disciplinas-enabled" category="conhecimento" />

// Versões desabilitadas (_disabled)
<CustomIcon name="liga-corujinhas-disabled" category="conhecimento" />
```

### 2. **Ação** (Operações)
```tsx
<CustomIcon name="badge" category="acao" />
<CustomIcon name="delete" category="acao" />
<CustomIcon name="edit" category="acao" />
<CustomIcon name="ios_share" category="acao" />
<CustomIcon name="link" category="acao" />
<CustomIcon name="mail_lock" category="acao" />
<CustomIcon name="missao-mista" category="acao" /> {/* NOVO: Missão coletiva + individual */}
<CustomIcon name="person_search" category="acao" />
<CustomIcon name="pie_chart" category="acao" />
<CustomIcon name="social_leaderboard" category="acao" />
<CustomIcon name="trophy" category="acao" />
<CustomIcon name="upload_file" category="acao" />
<CustomIcon name="visibility" category="acao" />
<CustomIcon name="workspace_premium" category="acao" />
```

### 3. **Menu** (Navegação)
```tsx
<CustomIcon name="auto_stories" category="menu" />
<CustomIcon name="Avaliação" category="menu" />
<CustomIcon name="camera" category="menu" />
<CustomIcon name="download" category="menu" />
<CustomIcon name="Eventos" category="menu" />
<CustomIcon name="grid_view" category="menu" />
<CustomIcon name="group" category="menu" />
<CustomIcon name="groups" category="menu" />
<CustomIcon name="search" category="menu" />
```

### 4. **Interface** (UI Elements)
```tsx
<CustomIcon name="Acesso" category="interface" />
<CustomIcon name="classroom" category="interface" /> {/* NOVO: Sala de aula/classroom */}
<CustomIcon name="Group 9555" category="interface" />
<CustomIcon name="open-book" category="interface" /> {/* NOVO: Livro aberto (eventos) */}
<CustomIcon name="videogame-asset" category="interface" /> {/* NOVO: Controle de jogo */}
```

### 5. **Métricas** (Indicadores)
```tsx
<CustomIcon name="Desafios" category="metricas" />
<CustomIcon name="Dificuldade" category="metricas" />
<CustomIcon name="Jogos" category="metricas" />
<CustomIcon name="Percentual de acertos" category="metricas" />
<CustomIcon name="Pontos" category="metricas" />
<CustomIcon name="Progresso" category="metricas" />
<CustomIcon name="Tempo de Aprendizagem" category="metricas" />
<CustomIcon name="Top" category="metricas" />
```

### 5. **Social** (Redes Sociais)
```tsx
<CustomIcon name="facebook" category="social" />
<CustomIcon name="instagram" category="social" />
<CustomIcon name="whatsapp" category="social" />
<CustomIcon name="youtube" category="social" />
```

### 6. **Usuários** (Papéis)
```tsx
<CustomIcon name="Administrador" category="usuarios" />
<CustomIcon name="Aluno" category="usuarios" />
<CustomIcon name="Coordenadores" category="usuarios" />
<CustomIcon name="Diretor" category="usuarios" />
<CustomIcon name="Gestor de rede" category="usuarios" />
<CustomIcon name="Professor" category="usuarios" />
```

### 7. **Agrupamentos** (Hierarquia)
```tsx
<CustomIcon name="Ano" category="agrupamentos" />
<CustomIcon name="Escola" category="agrupamentos" />
<CustomIcon name="Rede" category="agrupamentos" />
<CustomIcon name="Turmas" category="agrupamentos" />
```

### 8. **Gamificação** (Recompensas)
```tsx
<CustomIcon name="Estrelas" category="gamificacao" />
<CustomIcon name="Moedas" category="gamificacao" />
<CustomIcon name="Pontos-XP" category="gamificacao" />
<CustomIcon name="Pontos-Eventos" category="gamificacao" />

// Insígnias
<CustomIcon name="Insignia-Bronze" category="gamificacao" />
<CustomIcon name="Insignia-Prata" category="gamificacao" />
<CustomIcon name="Insignia-Ouro" category="gamificacao" />

// Troféus
<CustomIcon name="Trofeu-bronze" category="gamificacao" />
<CustomIcon name="Trofeu-Prata" category="gamificacao" />
<CustomIcon name="Troféu-Ouro" category="gamificacao" />
```

### 9. **Idioma** (Localização)
```tsx
<CustomIcon name="brasil" category="idioma" />
<CustomIcon name="eua" category="idioma" />
<CustomIcon name="espanha" category="idioma" />
```

### 10. **Proficiência** (Níveis)
```tsx
<CustomIcon name="abaixo do básico" category="proficiencia" />
<CustomIcon name="básico" category="proficiencia" />
<CustomIcon name="proficiente" category="proficiencia" />
<CustomIcon name="avançado" category="proficiencia" />
<CustomIcon name="não fizeram" category="proficiencia" />
```

### 11. **Educação Infantil** (BNCC)
```tsx
<CustomIcon name="Bncc-CorpoGestosMovimentos" category="educacao-infantil" />
<CustomIcon name="Bncc-EscutaFalaPensamentoImaginacao" category="educacao-infantil" />
<CustomIcon name="Bncc-EspacosTemposQuantidadesRelacoesTransformacoes" category="educacao-infantil" />
<CustomIcon name="Bncc-OEuOOutroONos" category="educacao-infantil" />
<CustomIcon name="Bncc-TracosSonsCoresFormas" category="educacao-infantil" />
<CustomIcon name="progress-classes" category="educacao-infantil" /> {/* NOVO: Progresso de aulas */}
<CustomIcon name="student-hat" category="educacao-infantil" /> {/* NOVO: Chapéu de formatura */}
```

### 12-17. **Avaliações Educacionais**

BNCC, SAEB, SARESP, Avalia (categorias específicas de campos e tópicos pedagógicos)

```tsx
// BNCC - Língua Portuguesa
<CustomIcon name="Bncc-CampoArtisticoLiterario" category="lingua-portuguesa-bncc" />

// SAEB - Língua Portuguesa
<CustomIcon name="Saeb-ProcedimentosLeitura" category="lingua-portuguesa-saeb" />

// Matemática
<CustomIcon name="Numeros" category="matematica-bncc" />
<CustomIcon name="Geometria" category="matematica-bncc" />
```

## Exemplos de Uso

### Card de Disciplina

```tsx
function DisciplinaCard({ disciplina }: { disciplina: string }) {
  const disciplinaConfig = {
    portugues: { icon: "lingua-portuguesa-enabled", label: "Português" },
    matematica: { icon: "math-enabled", label: "Matemática" },
    todas: { icon: "todas-disciplinas-enabled", label: "Todas" },
  };

  const config = disciplinaConfig[disciplina];

  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardContent className="p-6 flex flex-col items-center gap-3">
        <CustomIcon
          name={config.icon}
          category="conhecimento"
          size="xl"
        />
        <h3 className="font-semibold">{config.label}</h3>
      </CardContent>
    </Card>
  );
}
```

### Badge com Ícone de Proficiência

```tsx
function ProficienciaBadge({ nivel }) {
  const proficienciaConfig = {
    "abaixo do básico": { variant: "destructive", icon: "abaixo do básico" },
    básico: { variant: "warning", icon: "básico" },
    proficiente: { variant: "info", icon: "proficiente" },
    avançado: { variant: "success", icon: "avançado" },
  };

  const config = proficienciaConfig[nivel];

  return (
    <Badge variant={config.variant}>
      <CustomIcon
        name={config.icon}
        category="proficiencia"
        size="sm"
        className="mr-1"
      />
      {nivel}
    </Badge>
  );
}
```

### Menu de Navegação

```tsx
function NavigationMenu() {
  const menuItems = [
    { name: "Avaliação", icon: "Avaliação" },
    { name: "Eventos", icon: "Eventos" },
    { name: "Turmas", icon: "groups" },
    { name: "Buscar", icon: "search" },
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={`/${item.name.toLowerCase()}`}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent"
        >
          <CustomIcon name={item.icon} category="menu" size="sm" />
          <span>{item.name}</span>
        </a>
      ))}
    </nav>
  );
}
```

### Sistema de Gamificação

```tsx
function RewardDisplay({ tipo, quantidade }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-md">
      <CustomIcon
        name={tipo}
        category="gamificacao"
        size="lg"
      />
      <div>
        <p className="text-sm font-medium">{tipo}</p>
        <p className="text-2xl font-bold">{quantidade}</p>
      </div>
    </div>
  );
}

// Uso
<RewardDisplay tipo="Pontos-XP" quantidade={1250} />
<RewardDisplay tipo="Moedas" quantidade={50} />
<RewardDisplay tipo="Estrelas" quantidade={15} />
```

### Seletor de Usuário

```tsx
function UserRoleSelector() {
  const roles = [
    "Aluno",
    "Professor",
    "Coordenadores",
    "Diretor",
    "Gestor de rede",
    "Administrador",
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map((role) => (
        <Button
          key={role}
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <CustomIcon name={role} category="usuarios" size="lg" />
          <span className="text-xs">{role}</span>
        </Button>
      ))}
    </div>
  );
}
```

### Rodapé com Redes Sociais

```tsx
function SocialLinks() {
  const socials = [
    { name: "facebook", url: "https://facebook.com/educacross" },
    { name: "instagram", url: "https://instagram.com/educacross" },
    { name: "youtube", url: "https://youtube.com/educacross" },
    { name: "whatsapp", url: "https://wa.me/..." },
  ];

  return (
    <div className="flex gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <CustomIcon name={social.name} category="social" size="md" />
        </a>
      ))}
    </div>
  );
}
```

## Listar Ícones Disponíveis

```tsx
import { customIcons } from "@fabioeducacross/ui";

// Listar todas as categorias
console.log(Object.keys(customIcons));

// Listar ícones de uma categoria
console.log(customIcons.conhecimento);
// ["liga-corujinhas-enabled", "lingua-portuguesa-enabled", ...]
```

## Acessibilidade

O componente CustomIcon segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **aria-hidden**: Ícones decorativos devem ter `aria-hidden="true"`
- ✅ **aria-label**: Ícones funcionais (botões) precisam de label descritivo
- ✅ **Texto alternativo**: Sempre combine ícone com texto quando possível

### Exemplo Acessível

```tsx
// Ícone decorativo (com texto visível)
<Button>
  <CustomIcon name="edit" category="acao" className="mr-2" aria-hidden="true" />
  Editar
</Button>

// Ícone funcional (sem texto visível)
<Button variant="ghost" size="icon" aria-label="Deletar item">
  <CustomIcon name="delete" category="acao" />
</Button>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar ícone da categoria apropriada
<CustomIcon name="Aluno" category="usuarios" />

// Combinar com texto para clareza
<Badge>
  <CustomIcon name="Pontos-XP" category="gamificacao" className="mr-1" />
  1250 XP
</Badge>
```

### ❌ Incorreto

```tsx
// Categoria errada (erro em runtime)
<CustomIcon name="Aluno" category="conhecimento" />

// Ícone sem contexto (inacessível)
<Button>
  <CustomIcon name="delete" category="acao" />
</Button>
```

## Links

- [Storybook - CustomIcon Stories](../../../../apps/storybook/stories/foundations/Icons.stories.tsx)
- [Código Fonte](./CustomIcon.tsx)
- [Testes](./CustomIcon.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (gamificação, navegação, proficiência)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 150+ ícones customizados do Educacross
- 📁 17 categorias organizadas por domínio
- 📏 7 tamanhos (xs → 2xl)
- 🔍 Export `customIcons` para listar ícones por categoria
- ♿ Suporte a aria-hidden e aria-label
