# Q.A Challenge Luma Store 

Esse teste tem como objetivo automatizar algumas funcionalidades da página https://magento.softwaretestingboard.com, utilizado o Cypress. 

## Ferramenta

A escolha da ferramenta para testes foi o Cypress com JavaScript, devido à facilidade de utilização e configuração da ferramenta, sua rápida depuração e relatórios detalhados. Em contrapartida, ele não pode ser utilizado em alguns navegadores específicos e a execução de testes fora do navegador não é suportada, além de ter uma dependência do JavaScript.

## Setup

### Pré-requisitos:
- Instalar o NodeJS
- Instalar um editor de texto, como o Visual Studio Code
- Instalar o Git 

### Ferramentas Utilizadas
- Cypress @10.2.4
- Randomuser.me
- Cypress Cloud, para acessar necessario pegar o link de invite: https://cloud.cypress.io/invitation/6d1bce02-f8bf-4635-ae08-4d971e920c08 (Suportado para 2 membros)

### Execução

Para executar os testes em sua máquina, você pode baixar esse projeto usando o Github e seguir os passos abaixo:

1. Instalar as dependências configuradas do `package.json`, usando o comando: `npm install`
2. Executar o comando para abrir o teste no navegador: `npx cypress open`

### Git Actions

A cada novo PR a pipeline será executada, o comando para execução via terminal após instalação do projeto é `npm test`
