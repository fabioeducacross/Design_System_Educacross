# 🌐 Link Público do Storybook - Instruções Rápidas

## 🚀 Método Mais Rápido (Recomendado)

Execute estes comandos no seu terminal local (no seu computador):

```bash
# 1. Navegar até o projeto
cd /caminho/para/Design_System_Educacross

# 2. Instalar localtunnel (só precisa fazer uma vez)
npm install -g localtunnel

# 3. Iniciar Storybook (Terminal 1)
pnpm storybook

# 4. Aguardar aparecer "Storybook ready!" (uns 30-60 segundos)

# 5. Em OUTRO terminal (Terminal 2), criar o túnel:
lt --port 6006
```

### 📋 O que você verá:

```
your url is: https://random-words-123.loca.lt
```

**🎉 Pronto!** Copie e compartilhe esse link. Ele funciona em qualquer navegador, qualquer lugar do mundo.

---

## ⚡ Método Ainda Mais Rápido (Script Automatizado)

Se você já clonou o repositório:

```bash
cd Design_System_Educacross
./link-publico-storybook.sh
```

O script faz TUDO automaticamente:
- ✅ Verifica dependências
- ✅ Builda o projeto
- ✅ Inicia o Storybook
- ✅ Cria o túnel
- ✅ Mostra o link público

---

## 🎯 Link Já Disponível

Baseado na última execução do Storybook, se você estiver na mesma rede, pode usar:

```
http://10.1.0.175:6006/
```

⚠️ **Nota:** Isso só funciona se você e quem vai acessar estiverem na mesma rede Wi-Fi/LAN.

---

## 💡 Dicas

### Primeira vez usando o link público?
- O LocalTunnel pode pedir para clicar em "Continue" na primeira vez
- Isso é normal, é uma medida de segurança deles
- Depois disso, funciona direto

### Link expira?
- Sim, quando você fechar o túnel (Ctrl+C)
- Para manter ativo, deixe o terminal rodando

### Quer link permanente?
- Use Vercel (veja `LINK_PUBLICO_STORYBOOK.md` para instruções completas)

---

## 🐛 Problemas?

### LocalTunnel não funciona
Tente ngrok (precisa criar conta free):

```bash
# 1. Criar conta em https://ngrok.com
# 2. Instalar ngrok (no Linux/Mac)
curl -sSL https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz | tar -xz
sudo mv ngrok /usr/local/bin/

# 3. Autenticar (pegar token do site)
ngrok authtoken SEU_TOKEN_AQUI

# 4. Criar túnel
ngrok http 6006
```

### Storybook não inicia
```bash
# Limpar e rebuildar
pnpm --filter=@educacross/storybook clean
pnpm --filter=@fabioeducacross/ui build
pnpm storybook
```

---

## ✅ Checklist Rápido

1. [ ] Storybook rodando (`pnpm storybook`)
2. [ ] LocalTunnel instalado (`npm install -g localtunnel`)
3. [ ] Túnel criado (`lt --port 6006`)
4. [ ] Link copiado (ex: `https://abc-123.loca.lt`)
5. [ ] Link testado no navegador
6. [ ] Link compartilhado! 🎉

---

## 📚 Mais Informações

Para métodos alternativos e troubleshooting completo, veja:
- `LINK_PUBLICO_STORYBOOK.md` - Documentação completa
- `link-publico-storybook.sh` - Script automatizado

---

**🎊 Agora você pode compartilhar seu Storybook com qualquer pessoa, em qualquer lugar!**
