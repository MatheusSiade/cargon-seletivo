## Para começarmos:

Primeiramente, insira as variáveis de ambiente em um arquivo .env.local:

    NEXT_PUBLIC_TOKEN=1a1d645d9bd7957c19e20a3adebb2adc9116a1cc5afbbc67c5b377acda318e14

O token será usado na validação dos requests para a API dos contatos.

Agora,inicie o servidor:

```bash
npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para fazer login você pode usar a conta de teste:

    Email: teste@teste.com
    Senha: senha1

Este projeto usa NextJs, MUI como biblioteca visual, Firebase para controle de autenticação, Axios para requisições
entre outros pacotes. 
A paginação foi feita com scroll infinito na lista de usuários.