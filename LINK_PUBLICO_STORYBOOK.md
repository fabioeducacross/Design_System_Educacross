# 🌐 Como Criar Link Público para o Storybook

## 📊 Informações do Último Startup

Quando o Storybook foi iniciado, ele mostrou:

```
┌  storybook v10.2.0
│
●  Starting...
│ ╭──────────────────────────────────────────────────╮
│ │   Storybook ready!                               │
│ │                                                  │
│ │   - Local:             http://localhost:6006/    │
│ │   - On your network:   http://10.1.0.175:6006/   │
│ ╰──────────────────────────────────────────────────╯
```

### 🔗 Links Disponíveis

- **Local:** `http://localhost:6006/`
- **Rede interna:** `http://10.1.0.175:6006/`

---

## 🛠️ Método 1: Usar Serviço de Tunneling (Recomendado)

### Opção A: LocalTunnel (Mais Simples)

```bash
# 1. Instalar localtunnel
npm install -g localtunnel

# 2. Iniciar Storybook
cd Design_System_Educacross
pnpm storybook

# 3. Em outro terminal, criar túnel
lt --port 6006

# Você verá algo como:
# your url is: https://random-name-123.loca.lt
```

### Opção B: Cloudflared (Mais Confiável)

```bash
# 1. Baixar cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# 2. Iniciar Storybook
cd Design_System_Educacross
pnpm storybook

# 3. Em outro terminal, criar túnel
cloudflared tunnel --url http://localhost:6006

# Você verá algo como:
# https://random-name.trycloudflare.com
```

### Opção C: ngrok (Profissional)

```bash
# 1. Criar conta em https://ngrok.com (free)

# 2. Instalar ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xvzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin/

# 3. Autenticar (pegar authtoken do site)
ngrok authtoken YOUR_AUTH_TOKEN

# 4. Iniciar Storybook
cd Design_System_Educacross
pnpm storybook

# 5. Em outro terminal, criar túnel
ngrok http 6006

# Interface web em: http://localhost:4040
# Link público: https://random.ngrok.io
```

---

## 🛠️ Método 2: Script Automatizado

Criamos um script para você (`link-publico-storybook.sh`):

```bash
cd Design_System_Educacross
./link-publico-storybook.sh
```

Este script:
- ✅ Verifica dependências
- ✅ Builda o projeto
- ✅ Inicia o Storybook
- ✅ Cria túnel público
- ✅ Exibe o link

**Nota:** Requer que os serviços de tunneling tenham acesso à internet.

---

## 🛠️ Método 3: GitHub Codespaces (Se Aplicável)

Se você estiver usando GitHub Codespaces:

```bash
# 1. Iniciar Storybook
pnpm storybook

# 2. Ir para aba "PORTS" no VS Code
# 3. Encontrar porta 6006
# 4. Clicar com botão direito → "Port Visibility" → "Public"
# 5. Copiar o link fornecido
```

O link será algo como:
```
https://username-reponame-random.github.dev
```

---

## 🛠️ Método 4: Acesso via IP da Rede

Se você e a pessoa que quer acessar estão na **mesma rede local**:

```bash
# 1. Iniciar Storybook
pnpm storybook

# 2. Usar o IP da rede mostrado no console
# Exemplo: http://10.1.0.175:6006/

# 3. Compartilhar esse link com quem está na mesma rede
```

⚠️ **Importante:** A porta 6006 precisa estar aberta no firewall.

---

## 🛠️ Método 5: Deploy Temporário (Mais Profissional)

### Usar Vercel/Netlify

```bash
# 1. Build do Storybook
pnpm --filter=@educacross/storybook build

# 2. Deploy com Vercel
npm install -g vercel
cd apps/storybook
vercel --prod storybook-static

# OU com Netlify
npm install -g netlify-cli
cd apps/storybook
netlify deploy --prod --dir=storybook-static
```

Você receberá uma URL permanente como:
- Vercel: `https://design-system-educacross.vercel.app`
- Netlify: `https://design-system-educacross.netlify.app`

---

## 🎯 Qual Método Escolher?

| Método | Velocidade | Permanência | Facilidade |
|--------|------------|-------------|------------|
| LocalTunnel | ⚡ Rápido | ⏱️ Sessão | ⭐⭐⭐ Fácil |
| Cloudflared | ⚡ Rápido | ⏱️ Sessão | ⭐⭐⭐ Fácil |
| ngrok | ⚡ Rápido | ⏱️ Sessão | ⭐⭐ Médio |
| Codespaces | ⚡ Rápido | ⏱️ Sessão | ⭐⭐⭐ Fácil |
| Vercel/Netlify | 🐌 Lento (deploy) | ✅ Permanente | ⭐ Complexo |

**Recomendação:** Use **LocalTunnel** para testes rápidos ou **Vercel** para links permanentes.

---

## 📝 Exemplo Completo: LocalTunnel

```bash
# Terminal 1: Storybook
cd /caminho/para/Design_System_Educacross
pnpm storybook
# Aguarde até ver: "Storybook ready!"

# Terminal 2: Túnel
npm install -g localtunnel
lt --port 6006

# Output:
# your url is: https://funny-panda-42.loca.lt

# ✅ Compartilhe este link!
```

---

## 🔒 Notas de Segurança

⚠️ **Cuidado:**
- Links públicos expõem seu Storybook na internet
- Qualquer pessoa com o link pode acessar
- Não use para conteúdo sensível/confidencial
- Túneis temporários (localtunnel, cloudflared, ngrok) expiram quando fechados
- Para produção, use autenticação e HTTPS

---

## 🐛 Troubleshooting

### LocalTunnel não conecta
```bash
# Verificar se porta está livre
lsof -i :6006

# Reiniciar túnel
pkill -f localtunnel
lt --port 6006
```

### Storybook não inicia
```bash
# Limpar cache
pnpm --filter=@educacross/storybook clean

# Rebuildar pacotes
pnpm --filter=@fabioeducacross/ui build
pnpm --filter=@fabioeducacross/ui-education build

# Tentar novamente
pnpm storybook
```

### "Connection refused" no navegador
- Aguarde 30-60s após iniciar o Storybook
- Verifique se Storybook está realmente rodando: `curl http://localhost:6006`
- Veja logs: `pnpm storybook --loglevel silly`

---

## ✅ Checklist Rápido

- [ ] Storybook rodando localmente (`pnpm storybook`)
- [ ] Serviço de tunneling instalado (localtunnel/cloudflared/ngrok)
- [ ] Túnel criado apontando para porta 6006
- [ ] Link público gerado e copiado
- [ ] Link testado em navegador externo
- [ ] Link compartilhado com a equipe

---

## 🎉 Pronto!

Agora você tem várias opções para criar um link público do seu Storybook!

**Link preferido:** LocalTunnel por ser o mais rápido e simples:
```bash
npm install -g localtunnel && lt --port 6006
```

---

## 📚 Links Úteis

- [LocalTunnel](https://theboroer.github.io/localtunnel-www/)
- [Cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [ngrok](https://ngrok.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
