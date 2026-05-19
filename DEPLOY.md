# Deploy no Render

1.
Descompacte o ZIP

2.
Abra a pasta no VS Code

3.
Instale as dependências localmente

```bash
npm install
```

4.
Rode localmente para testar

```bash
npm run dev
```

5.
Crie um repositório vazio no GitHub

6.
No terminal dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeira versão"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```

7.
Entre no Render

```txt
https://render.com
```

8.
Clique em:

```txt
New + → Web Service
```

9.
Conecte seu GitHub e selecione o repositório

10.
Configure:

```txt
Build Command:
npm install && npm run build

Start Command:
npm start
```

11.
Configure as variáveis de ambiente

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_APP_ID=plataforma-ad
```

12.
Clique em:

```txt
Create Web Service
```

13.
URL pública gerada automaticamente

```txt
https://seu-projeto.onrender.com
```

Funciona em:

- PC
- Celular
- Tablet

## Caso dê erro

No Render:

```txt
Manual Deploy → Clear build cache & deploy
```

Se o erro for Firebase, revise as variáveis de ambiente e as regras do Firestore.
