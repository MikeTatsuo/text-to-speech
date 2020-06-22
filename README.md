# text-to-speech

Projeto para conversão de texto para voz. Utilizando o recurso *Text To Speech* do *Watson* da *IBM*.

Api desenvolvido com Node.js e Express.js
Front desenvolvido em React.js

Ambos utilizando Typescript.

## Requisitos

- MySql
- Node

## Criando o banco dados

Para a execução do API deve ser criado um usuário com permissão para pelo menos fazer um `SELECT` e um `INSERT`, um banco de dados no MySql com uma tabela com os campos `id` e `text`

*obs.: um exemplo pode ser encontrado no arquivo `install.sh`, o script ainda não está finalizado, mas futuramente ele será responsável por criar o banco, usuário e a tabela, e também criar as variáveis de ambiente*

## Instalação

Após baixar o repositório, entrar na pasta `/api` e executar o comando abaixo.
```bash
npm install
```

Depois entrar na pasta `/frontend` e executar o mesmo comando.
```bash
npm install
```

## Configuração

Inserir as informações de acesso ao banco no arquivo `/api/ormconfig.json`

```json
{
  "type": "mysql",
  "host": "", // localhost ou a url para o banco
  "port": 3306, // alterar a porta se necessário
  "username": "", // usuário do MySql
  "password": "", // senha do usuário do MySql
  "database": "", // nome do banco de dados
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity"
  }
}
```

## Execução

Executar primeiro a API entrando na pasta `/api` e executando o comando abaixo.
```bash
npm start
```

e depois executar o frontend a partir da pasta `/frontend` e executar o comando
```bash
npm start
```

## Problemas

O Projeto no momento não está integrando com o *Watson* por problemas de *CORS*, talvez mover essa integração para a *API*.

## Futuro

Projeto interessante, continuarei a desenvolver ele para deixar ele funcional e também para incluir mais funcionalidades.

Possibilidade para fazer uma versão mobile (**ReactNative**, **Ionic**, **Nativescript**, **Flutter** ou em nativo mesmo para android)

O mesmo para a versão *WEB*, criar uma versão em **Angular** e em **Vue**

Melhorar o *API*, talvez separar ele e deixar em um projeto separado.

Por enquanto é só. :grimacing:.
