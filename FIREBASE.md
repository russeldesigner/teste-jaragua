# Configuração Firebase

1. Crie um projeto no Firebase Console.
2. Ative Authentication.
3. Ative o método de login Anônimo.
4. Crie o Firestore Database.
5. Copie as credenciais do app web para as variáveis de ambiente.

## Estrutura usada no Firestore

O sistema salva dados no caminho:

```txt
artifacts/{VITE_APP_ID}/public/data/{colecao}
```

Coleções principais:

```txt
setores
congregacoes
ministerios
departamentos
cargos
situacoes
tipos_pessoa
funcoes
estados_civil
escolaridades
necessidades
tipos_visita
membros
visitantes
reunioes
presencas
aprovacoes
```

## Regras simples para teste

Use apenas para teste inicial:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Depois endureça as regras antes de usar com dados reais.
