# Debug do Storybook - Ambiente de Desenvolvimento

> **Data:** 30 de janeiro de 2026  
> **Projeto:** Design System Educacross

---

## 1. Ambiente de Execução

### 1.1 Versões

| Ferramenta | Versão |
|---|---|
| **Node.js** | v22.22.0 |
| **pnpm** | 9.14.4 |
| **npm** | 10.9.4 |
| **Storybook** | 10.2.0 |
| **Sistema Operacional** | Windows |

### 1.2 Comando de Execução

**Comando recomendado (do monorepo root):**
```powershell
cd "c:\Users\Educacross\Documents\Educacross\Design_System_Educacross\Design_System_Educacross"
pnpm dev
```

**Alternativa (do diretório do storybook):**
```powershell
cd apps/storybook
npx storybook dev -p 6006
```

**⚠️ NÃO use estes comandos (causam erro de config):**
```powershell
# Estes comandos procuram .storybook na raiz do monorepo, não em apps/storybook
pnpm exec storybook dev -p 6006  # ❌ MainFileMissingError
storybook dev -p 6006            # ❌ MainFileMissingError
```

---

## 2. Estrutura de Diretórios Relevante

```
Design_System_Educacross/
├── apps/
│   └── storybook/
│       ├── .storybook/          # ✅ Configuração correta aqui
│       │   ├── main.ts
│       │   └── preview.ts
│       ├── package.json
│       └── stories/
├── packages/
│   └── ui/
│       └── src/
│           └── components/
│               └── Tabs/
└── package.json                 # Script "dev" que roda turbo
```

---

## 3. Erros Encontrados Durante Debug

### 3.1 MainFileMissingError

**Quando ocorre:** Ao usar `pnpm exec storybook` ou `storybook dev` diretamente.

**Mensagem de erro:**
```
MainFileMissingError: No configuration files have been found in your configDir: 
C:/Users/Educacross/Documents/Educacross/Design_System_Educacross/Design_System_Educacross/.storybook
```

**Causa:** O Storybook procura a pasta `.storybook` relativa ao diretório de execução do pnpm (raiz do monorepo), não relativa ao `cwd` atual.

**Solução:** Usar `pnpm dev` da raiz ou `npx storybook dev -p 6006` de dentro de `apps/storybook`.

---

### 3.2 WebSocket Timeout / Server Timed Out

**Quando ocorre:** No navegador, após o Storybook iniciar.

**Mensagem no Console do Browser:**
```
WebSocket connection to 'ws://localhost:6006/...' failed
Server timed out
```

**Possíveis causas:**
1. Processo Node anterior ainda segurando a porta
2. Build do Storybook não completou
3. Conflito de processos no Turbo

**Solução:**
```powershell
# Matar processos Node órfãos
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Limpar cache
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Reiniciar
pnpm dev
```

---

### 3.3 Porta 6006 em Uso / SYN_SENT

**Quando ocorre:** Ao tentar iniciar o Storybook com porta ocupada.

**Diagnóstico:**
```powershell
netstat -ano | Select-String ":6006"
```

**Output típico problemático:**
```
TCP    127.0.0.1:6006    127.0.0.1:XXXXX    SYN_SENT    12345
```

**Solução:**
```powershell
# Encontrar e matar o processo pelo PID
Get-Process -Id 12345 | Stop-Process -Force
```

---

## 4. Instruções para Captura de Debug (Manual)

### 4.1 Console do DevTools

1. Abra http://localhost:6006 no Chrome/Edge
2. Pressione `F12` para abrir DevTools
3. Vá para a aba **Console**
4. Procure por erros em vermelho
5. Tire screenshot ou copie os erros

### 4.2 Network Tab - CSS Carregado

1. Com DevTools aberto, vá para a aba **Network**
2. Recarregue a página (`Ctrl+R` ou `F5`)
3. Filtre por **CSS** ou **Stylesheet**
4. Verifique se todos os CSS carregaram com status 200
5. Clique em um CSS para ver o conteúdo

**CSS esperados no Storybook:**
- `preview-*.css` - Estilos do preview
- `sb-*.css` - Estilos internos do Storybook
- Estilos do Tailwind via `@educacross/ui`

### 4.3 Checklist de Verificação

- [ ] Console sem erros em vermelho
- [ ] Todos os CSS com status 200
- [ ] Componente renderizando corretamente
- [ ] Hover/Active funcionando nas tabs
- [ ] TranslateX aplicando sobreposição

---

## 5. Scripts Úteis

### 5.1 Limpar e Reiniciar

```powershell
# Script completo de reset
cd "c:\Users\Educacross\Documents\Educacross\Design_System_Educacross\Design_System_Educacross"

# 1. Matar processos
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Limpar caches
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/storybook/.storybook/.cache -ErrorAction SilentlyContinue

# 3. Aguardar
Start-Sleep -Seconds 3

# 4. Reiniciar
pnpm dev
```

### 5.2 Verificar Saúde do Ambiente

```powershell
# Versões
Write-Host "Node: $(node --version)"
Write-Host "pnpm: $(pnpm --version)"

# Porta 6006
$port = netstat -ano | Select-String ":6006"
if ($port) { Write-Host "⚠️ Porta 6006 em uso: $port" } 
else { Write-Host "✅ Porta 6006 livre" }

# Processos Node
$nodes = Get-Process -Name "node" -ErrorAction SilentlyContinue
Write-Host "Processos Node ativos: $($nodes.Count)"
```

---

## 6. Tempo de Build Típico

| Fase | Tempo Aproximado |
|---|---|
| Manager | ~5-10s |
| Preview | ~30-45s |
| **Total** | ~40-60s |

O Storybook mostra: `●  X.XX s for manager and YY s for preview`

---

## 7. URLs Importantes

| Página | URL |
|---|---|
| Home | http://localhost:6006 |
| Tabs Rounded | http://localhost:6006/?path=/story/components-tabs--rounded |
| Tabs Rounded Simple | http://localhost:6006/?path=/story/components-tabs--rounded-simple |
| BadgeStatus | http://localhost:6006/?path=/story/components-badgestatus--all-variants |

---

## 8. Turbo Dev - Pacotes Executados em Paralelo

Quando `pnpm dev` é executado, o Turbo roda estes pacotes em paralelo:

```
@fabioeducacross/ui#dev          → Build do pacote UI
@fabioeducacross/ui-charts#dev   → Build do pacote Charts
@fabioeducacross/ui-pdf#dev      → Build do pacote PDF
@fabioeducacross/ui-education#dev → Build do pacote Education
@educacross/storybook#dev        → Storybook dev server
```

---

*Documento criado para referência de debug e troubleshooting.*
