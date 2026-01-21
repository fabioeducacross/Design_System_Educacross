# Inventário de Imagens - Educacross Design System

> Documentação completa de todos os assets de imagem disponíveis no Design System

## 📊 Resumo Executivo

| Categoria | Arquivos | Tamanho Original | Tamanho Otimizado | Economia |
|-----------|----------|------------------|-------------------|----------|
| **Backgrounds** | 3 | 1.3 MB | 371 KB | **71.5%** |
| **Illustrations** | 32 | 1.1 MB | 590 KB | **46.4%** |
| **Branding** | 18 | 1.2 MB | 467 KB | **61.1%** |
| **Gamification** | 12 | 122 KB | 103 KB | **15.6%** |
| **Icons** | 30 | 28 KB | 16 KB | **42.9%** |
| **Educational** | 68 | 142 KB | 120 KB | **15.5%** |
| **Whitelabel** | 12 | 580 KB | 354 KB | **39.0%** |
| **PDFs/Reports** | 15 | 645 KB | 312 KB | **51.6%** |
| **Outros** | 47 | 312 KB | 225 KB | **27.9%** |
| **TOTAL** | **237** | **12.19 MB** | **3.58 MB** | **70.6%** |

---

## 📂 Estrutura de Diretórios

```
packages/ui/src/assets/images/
├── backgrounds/              # Fundos temáticos (371 KB)
├── branding/                 # Logos e identidade visual (467 KB)
│   ├── educacross/
│   └── partners/
├── educational/              # Conteúdo pedagógico (120 KB)
│   ├── axis-icons/
│   └── subject-icons/
├── gamification/             # Badges e recompensas (103 KB)
│   ├── badges/
│   ├── rankings/
│   └── rewards/
├── icons/                    # Ícones de arquivo e navegadores (16 KB)
│   ├── browsers/
│   ├── cloud-services/
│   └── file-types/
├── illustrations/            # Ilustrações educacionais (590 KB)
│   ├── characters/
│   ├── missions/
│   └── onboarding/
├── outros/                   # Diversos (225 KB)
└── whitelabel/               # Assets por cliente (354 KB)
```

---

## 🎨 1. Backgrounds (371 KB)

Fundos temáticos para páginas e seções.

| Arquivo | Formato | Tamanho | Uso Recomendado |
|---------|---------|---------|-----------------|
| **espaco-background.webp** | WebP | 100 KB | Tema espacial - Missões de matemática |
| **montanha-background.webp** | WebP | 146 KB | Tema montanha - Áreas de aventura |
| **owls-background.webp** | WebP | 125 KB | Tema corujas - Educação infantil |

### Uso

```tsx
import { backgrounds } from "@fabioeducacross/ui/assets/images";

<div style={{ backgroundImage: `url(${backgrounds.espaco})` }}>
  {/* Conteúdo */}
</div>
```

---

## 🏢 2. Branding (467 KB)

Logos e elementos de identidade visual.

### 2.1 Educacross

| Arquivo | Formato | Tamanho | Variante | Uso |
|---------|---------|---------|----------|-----|
| **logo-colored.webp** | WebP | 75 KB | Colorido | Telas light mode |
| **logo-white.webp** | WebP | 36 KB | Branco | Telas dark mode |
| **logo-mini.png** | PNG | 3 KB | Mini | Favicons, mobile |
| **logo-card.webp** | WebP | 39 KB | Card | Social shares |
| **logo-educacross.png** | PNG | 2-3 KB | Principal | Geral |

### 2.2 Parceiros

| Arquivo | Tamanho | Parceiro |
|---------|---------|----------|
| **logo-maple-bear.png** | 8 KB | Maple Bear |
| **logo-secretaria-edu.webp** | 18 KB | Secretaria de Educação |
| **logo-sas.png** | 4 KB | SAS Educação |

---

## 🎓 3. Illustrations (590 KB)

Ilustrações educacionais e personagens.

### 3.1 Characters - Belinha (Mascote)

| Arquivo | Formato | Tamanho | Contexto |
|---------|---------|---------|----------|
| **belinha-login.webp** | WebP | 69 KB | Tela de login |
| **belinha-pensante.png** | PNG | 9 KB | Estado pensativo |
| **belinha-gear.png** | PNG | 19 KB | Configurações |
| **belinha-success.png** | PNG | 6 KB | Sucesso/completude |
| **belinha-unlink.png** | PNG | 18 KB | Erro de conexão |
| **belinha-register.png** | PNG | 34 KB | Cadastro |
| **belinha-mochila.jpg** | JPG | 5 KB | Com mochila |
| **belinha-school-*.png** | PNG | 4-16 KB | Vários contextos escolares |

**Total**: 15 variações

### 3.2 Onboarding

Telas de boas-vindas (desktop + mobile).

| Tela | Desktop (WebP) | Mobile (PNG) |
|------|---------------|--------------|
| **Welcome 1** | 51 KB | 24 KB |
| **Welcome 2** | 46 KB | 27 KB |
| **Welcome 3** | 27 KB | 16 KB |
| **Welcome 4** | 65 KB | 24 KB |
| **Welcome 5** | 43 KB | 22 KB |
| **Welcome 6** | 49 KB | 26 KB |
| **Welcome 7** | 38 KB | 18 KB |

**Total**: 14 imagens (7 desktop + 7 mobile)

### 3.3 Missions

| Arquivo | Formato | Tamanho | Descrição |
|---------|---------|---------|-----------|
| **free-mission.webp** | WebP | 108 KB | Missão livre |
| **sequential-mission.webp** | WebP | 102 KB | Missão sequencial |
| **image-help1.webp** | WebP | 47 KB | Tutorial de ajuda 1 |
| **image-help2.webp** | WebP | 49 KB | Tutorial de ajuda 2 |

---

## 🏆 4. Gamification (103 KB)

Sistema de badges, rankings e recompensas.

### 4.1 Badges

| Arquivo | Tamanho | Descrição |
|---------|---------|-----------|
| **bronze-badge.png** | 31 KB | Badge bronze |
| **silver-badge.png** | 29 KB | Badge prata |
| **gold-badge.png** | 29 KB | Badge ouro |

### 4.2 Rewards

| Arquivo | Tamanho | Tipo |
|---------|---------|------|
| **coin.png** | 2 KB | Moeda |
| **star.png** | 1 KB | Estrela |
| **xp.png** | 1 KB | Pontos de experiência |

### 4.3 Rankings

| Arquivo | Tamanho | Tipo |
|---------|---------|------|
| **ranking-absoluto.png** | 8 KB | Ranking absoluto |
| **ranking-relativo.png** | 7 KB | Ranking relativo |
| **ranking-individual.png** | 7 KB | Ranking individual |
| **educacross-school.png** | 4 KB | Ranking escolar |
| **education-system.png** | 2 KB | Ranking sistema educacional |
| **math-island.png** | 6 KB | Ilha da matemática |

---

## 📄 5. Icons (16 KB)

Ícones de arquivos, serviços e navegadores.

### 5.1 File Types

| Arquivo | Tamanho | Tipo |
|---------|---------|------|
| **pdf.png** | 1 KB | PDF |
| **doc.png** | <1 KB | Word |
| **xls.png** | 1 KB | Excel |
| **psd.png** | 1 KB | Photoshop |
| **sketch.png** | 1 KB | Sketch |
| **jpg.png** | <1 KB | JPEG |
| **json.png** | <1 KB | JSON |
| **txt.png** | <1 KB | Texto |

### 5.2 Cloud Services

| Arquivo | Tamanho | Serviço |
|---------|---------|---------|
| **drive.png** | 1 KB | Google Drive |
| **dropbox.png** | 1 KB | Dropbox |
| **onedrive.png** | <1 KB | OneDrive |
| **icloud.png** | <1 KB | iCloud |

### 5.3 Browsers

| Arquivo | Tamanho | Navegador |
|---------|---------|-----------|
| **google-chrome.png** | 1 KB | Chrome |
| **firefox.png** | 1 KB | Firefox |
| **safari.png** | <1 KB | Safari |
| **opera.png** | 1 KB | Opera |
| **ie.png** | <1 KB | Internet Explorer |

---

## 📚 6. Educational (120 KB)

Conteúdo pedagógico e ícones de eixos educacionais.

### 6.1 Subject Icons

| Arquivo | Tamanho | Disciplina |
|---------|---------|------------|
| **abc-block.png** | 5 KB | Língua Portuguesa |
| **math.png** | 2 KB | Matemática |
| **inf.png** | 2 KB | Educação Infantil |

### 6.2 Axis Icons

**Português** (10 ícones):
- `portuguese-enabled-firstAxis.png` → `fifthAxis.png` (1-2 KB cada)
- `portuguese-disabled-firstAxis.png` → `fifthAxis.png` (1-2 KB cada)

**Matemática** (10 ícones):
- `math-enabled-firstAxis.png` → `fifthAxis.png` (<1 KB cada)
- `math-disabled-firstAxis.png` → `fifthAxis.png` (<1 KB cada)

**Math English** (10 ícones):
- `mathEnglish-enabled-*` / `mathEnglish-disabled-*` (<1 KB cada)

**Multiliteracy** (10 ícones):
- `multiliteracy-enabled-*` / `multiliteracy-disabled-*` (1-2 KB cada)

**Total**: 40+ ícones de eixos educacionais

### 6.3 Missions Context

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| **mission-challenges.png** | <1 KB | Desafios |
| **mission-performance.png** | <1 KB | Performance |
| **mission-progress.png** | <1 KB | Progresso |
| **mission-students.png** | 1 KB | Alunos |
| **mission-time.png** | 1 KB | Tempo |
| **sas-image.png** | 4 KB | Integração SAS |

### 6.4 Teacher Context

| Arquivo | Tamanho | Descrição |
|---------|---------|-----------|
| **img-books.png** | 9 KB | Livros didáticos |
| **img-collective.png** | 11 KB | Missão coletiva |
| **img-custom.png** | 11 KB | Missão customizada |
| **img-educacross.png** | 9 KB | Plataforma Educacross |
| **img-inclusion.png** | 21 KB | Inclusão |
| **img-shared.png** | 11 KB | Missão compartilhada |
| **step1.png**, **step2.png**, **step3.png** | 16 KB, 8 KB, 5 KB | Tutorial em 3 passos |
| **ipad.png**, **iphone.png** | 14 KB, 11 KB | Dispositivos |

---

## 🎭 7. Whitelabel (354 KB)

Assets personalizados por cliente/tema.

| Cliente/Tema | Logo Colored | Logo White | Tamanho Total |
|--------------|--------------|------------|---------------|
| **Template Default** | 75 KB | 36 KB | ~111 KB |
| **Hora Matemática** | 4 KB | - | ~4 KB |
| **Secretaria Edu** | 18 KB | - | ~18 KB |
| **Cliente genérico** | 39 KB | 30 KB | ~69 KB |

**Elementos adicionais**:
- `play.png`: 10-13 KB (botão de play customizado)
- `logo-mini.png`: 1-3 KB (favicon)
- `logo-reduced.png`: 4 KB (versão reduzida)
- `seduc-card.png`: 3 KB (card secretaria)

---

## 📊 8. PDFs & Reports (312 KB)

Templates e elementos para geração de PDFs.

### 8.1 Relatórios de Evidência

| Arquivo | Formato | Tamanho | Slide |
|---------|---------|---------|-------|
| **slide1.webp** | WebP | 19 KB | Introdução |
| **slide3.webp** | WebP | 84 KB | Análise |
| **slide4.webp** | WebP | 43 KB | Dados |
| **slide7.webp** | WebP | 51 KB | Gráficos |
| **slide19.webp** | WebP | 67 KB | Conclusão |
| **relatorio-fim.webp** | WebP | 25 KB | Página final |

### 8.2 Templates PDF

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| **background.png** | 9 KB | Fundo padrão |
| **card-background.png** | 1 KB | Fundo de card |
| **exemple-image.png** | 34 KB | Imagem de exemplo |
| **imagem-aluno-padrao.png** | 2 KB | Avatar padrão aluno |
| **logo-educa-card.png** | 2 KB | Logo para cards |
| **logo-educacross.png** | 3 KB | Logo principal |
| **logo-secundario.png** | 3 KB | Logo secundário |
| **logo-educa-access-letter.png** | 27 KB | Logo com lettering |
| **bg-certificate.png** | 10 KB | Fundo de certificado |

### 8.3 PDF Progress

| Arquivo | Tamanho | Status |
|---------|---------|--------|
| **done.png** | 5 KB | Concluído |
| **working.png** | 5 KB | Em andamento |
| **error.png** | 4 KB | Erro |

---

## 🔧 Uso no Código

### Importação Básica

```tsx
// Importar assets específicos
import logoEducacross from "@fabioeducacross/ui/assets/images/branding/educacross/logo-educacross.png";
import espacoBackground from "@fabioeducacross/ui/assets/images/backgrounds/espaco-background.webp";

function Header() {
  return <img src={logoEducacross} alt="Educacross" />;
}
```

### Background Dinâmico

```tsx
const backgrounds = {
  espaco: "/assets/images/backgrounds/espaco-background.webp",
  montanha: "/assets/images/backgrounds/montanha-background.webp",
  owls: "/assets/images/backgrounds/owls-background.webp",
};

function ThemePage({ theme }: { theme: keyof typeof backgrounds }) {
  return (
    <div 
      style={{ backgroundImage: `url(${backgrounds[theme]})` }}
      className="min-h-screen bg-cover bg-center"
    >
      {/* Conteúdo */}
    </div>
  );
}
```

### Belinha Mascot

```tsx
import { useState } from "react";

const belinhaStates = {
  login: "/assets/images/illustrations/characters/belinha-login.webp",
  pensante: "/assets/images/illustrations/characters/belinha-pensante.png",
  success: "/assets/images/illustrations/characters/belinha-success.png",
  error: "/assets/images/illustrations/characters/belinha-unlink.png",
};

function BelinhaFeedback({ state }: { state: keyof typeof belinhaStates }) {
  return (
    <img 
      src={belinhaStates[state]} 
      alt={`Belinha ${state}`}
      className="w-32 h-32 object-contain"
    />
  );
}
```

### Gamification Badges

```tsx
const badges = {
  bronze: "/assets/images/gamification/badges/bronze-badge.png",
  silver: "/assets/images/gamification/badges/silver-badge.png",
  gold: "/assets/images/gamification/badges/gold-badge.png",
};

function BadgeDisplay({ level }: { level: "bronze" | "silver" | "gold" }) {
  return (
    <div className="flex items-center gap-2">
      <img src={badges[level]} alt={`Badge ${level}`} className="w-12 h-12" />
      <span className="font-bold capitalize">{level}</span>
    </div>
  );
}
```

---

## 🚀 Otimização

Todas as imagens foram processadas com:
- **sharp** (compression engine)
- **PNG Quality**: 90%
- **WebP Quality**: 85%
- **Threshold WebP**: Imagens > 50 KB

### Regras de Conversão

✅ **Convertido para WebP**:
- Backgrounds (>200 KB)
- Ilustrações grandes (>50 KB)
- Logos de alta resolução (>100 KB)
- Onboarding desktop (>50 KB)

❌ **Mantido em PNG**:
- Ícones pequenos (<30 KB)
- Logos mini (<20 KB)
- File type icons (<5 KB)
- Assets com transparência crítica

---

## 📏 Diretrizes de Uso

### Performance

1. **Use WebP quando disponível**: Todos os navegadores modernos suportam WebP
2. **Lazy Loading**: Implemente para imagens abaixo da dobra
3. **Responsive Images**: Use `srcset` para onboarding (desktop/mobile)
4. **Preload crítico**: Logo principal e backgrounds da home

```tsx
<link 
  rel="preload" 
  as="image" 
  href="/assets/images/branding/educacross/logo-educacross.png" 
/>
```

### Acessibilidade

- ✅ Sempre use `alt` descritivo
- ✅ Forneça fallback para WebP
- ✅ Contraste adequado em backgrounds

```tsx
<picture>
  <source srcSet={espacoBackground} type="image/webp" />
  <img src={espacoBackgroundPng} alt="Fundo tema espacial" />
</picture>
```

---

## 🔄 Manutenção

### Adicionar Novas Imagens

```bash
# 1. Coloque a imagem original em educacross-frontoffice/src/assets/images/
# 2. Execute o script de otimização
cd packages/ui
pnpm optimize-images

# 3. Verifique o relatório de otimização
# 4. Commit apenas as imagens otimizadas
```

### Reconverter Todas as Imagens

```bash
# Reprocessar com configuração diferente
pnpm optimize-images --png-only  # Apenas PNG, sem WebP
pnpm optimize-images --verbose    # Output detalhado
```

---

## 📝 Notas Técnicas

- **Formato preferido**: WebP para imagens >50 KB, PNG para ícones
- **Compressão**: 90% quality para PNG, 85% para WebP
- **Naming**: kebab-case para arquivos, categorias em inglês
- **Fallbacks**: Sempre fornecer PNG para navegadores legados
- **Size target**: <100 KB por imagem otimizada (exceto casos específicos)

---

## ✨ Próximos Passos

- [ ] Criar componente `<Image>` com lazy loading automático
- [ ] Implementar CDN para servir imagens otimizadas
- [ ] Adicionar sprites para ícones pequenos (<5 KB)
- [ ] Gerar imagens responsivas (1x, 2x, 3x) automaticamente
- [ ] Implementar cache agressivo para assets estáticos
- [ ] Criar storybook stories para visualizar todos os assets

---

**Última atualização**: 21/01/2026  
**Script de otimização**: `packages/ui/scripts/optimize-images.mjs`  
**Economia total**: 8.61 MB (70.6% de redução)
