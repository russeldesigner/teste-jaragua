# Plataforma AD — Projeto React + Firebase

Projeto estruturado a partir do PDF `VS 05.11_CODIGO.pdf`.

Este pacote foi reorganizado para funcionar como um projeto React/Vite com pastas, componentes, Firebase isolado, utilitários, hooks e documentação de deploy.

## Login inicial

```txt
Usuário: admin
Senha: admin
```

## Rodar localmente

```bash
npm install
npm run dev
```

Abra no navegador:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

## Estrutura

```txt
src/
├── components/
│   ├── base/
│   ├── checkin/
│   ├── dashboard/
│   ├── layout/
│   ├── obreiros/
│   ├── secretaria/
│   └── ui/
├── config/
├── data/
├── hooks/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## Importante

O PDF original está salvo em:

```txt
docs/VS_05.11_CODIGO_ORIGINAL.pdf
```

O código do PDF original era um bloco grande em React/Firebase. Como PDF quebra linhas dentro do JSX, a versão deste ZIP foi reestruturada manualmente para um projeto real e mais seguro para GitHub/deploy.
