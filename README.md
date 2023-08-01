# Interface de Login - Projeto

Este projeto consiste em uma interface de login, onde o frontend foi desenvolvido utilizando HTML, CSS e JavaScript, e o backend foi construído utilizando Node.js, Express e MongoDB Atlas.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado o [Node.js](https://nodejs.org/) e o [MongoDB](https://www.mongodb.com/) em sua máquina. Além disso, é necessário ter uma conta no MongoDB Atlas ou um servidor MongoDB configurado localmente.

## Configuração do Backend

Para configurar o backend e rodar o servidor, siga os passos abaixo:

1. Clone o repositório do projeto para o seu ambiente local.

2. Navegue até a pasta "server" do projeto:

3. Instale as dependências do backend utilizando o gerenciador de pacotes npm ou yarn. Digite o seguinte comando no terminal:
`npm install`
ou
`yarn intsall`

5. Agora, é necessário configurar as variáveis de ambiente para conexão com o banco de dados MongoDB e para o envio de e-mails. Crie um arquivo chamado ".env" na pasta "server" e adicione as seguintes linhas:

Substitua as configurações pelas suas informações específicas.

- `PORT`: A porta em que o servidor será executado localmente (por exemplo, 3000).
- `MONGO_URI`: A URL de conexão fornecida pelo MongoDB Atlas ou pelo seu servidor MongoDB local.
- `SECRET`: Uma chave secreta para a geração do JSON Web Token (JWT) para autenticação.
- `MAILER_HOST`: O host do seu provedor de e-mail (por exemplo, smtp.gmail.com).
- `MAILER_PORT`: A porta do host do seu provedor de e-mail (por exemplo, 587 para TLS/STARTTLS no Gmail).
- `MAILER_USER`: Seu usuário de e-mail para autenticação.
- `MAILER_PASS`: Sua senha de e-mail para autenticação.

5. Com as dependências instaladas e as variáveis de ambiente configuradas, você está pronto para rodar o servidor. Utilize o seguinte comando:
`npm run dev`
ou
`yarn run dev`

O servidor backend será executado e estará pronto para receber as requisições do frontend, além de permitir o envio de e-mails para o recurso de resetar senhas.

## Executando o Frontend

O frontend já está configurado e não requer instalação de dependências. Para executá-lo, siga os passos abaixo:

1. Navegue até a pasta "client" do projeto:

2. Abra o arquivo "index.html" no seu navegador web.

Agora, você deve ver a interface de login do projeto e poderá interagir com ela, incluindo a funcionalidade de resetar senhas por meio do envio de e-mails.

## Contribuição

Se você quiser contribuir para este projeto, sinta-se à vontade para enviar pull requests ou relatar problemas na página do repositório no GitHub.

Esperamos que este projeto seja útil e que possa ajudá-lo a compreender melhor o desenvolvimento de interfaces de login com frontend, backend e recursos adicionais de resetar senhas com envio de e-mail.








