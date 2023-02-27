# API

- A API foi implementada utilizando o framework NestJS aliado ao ODM Mongoose
- O processo de rodar a API está dockerizado
- Nesse momento a api está hospedada sob o host público de IP: "18.230.21.123" e Porta: "3000"
- Swagger acessível em "18.230.21.123:3000/api"

ATENÇÃO:

- As variáveis de ambiente com as conexões de banco deverão estar contidas num .env 
- É necessário ter o docker e o docker-compose instalado na máquina

##### COMO RODAR?

`docker compose up`

## OBSERVAÇÕES & COMENTÁRIOS

- Originalmente me foi passado o teste para Júnior, aproveitei o mesmo repositório fazendo algumas mudanças para o teste de Pleno
- Existe um arquivo de variáveis de ambiente de exemplo (.env.example) com o conteúdo esperado das variáveis
- Como nada foi citado no enunciado, implementei a aplicação esperando um DBMS externo (e não que precisaria de um container MongoDB)
- Os nomes de alguns países estavam errados (brasil/paraguai ao invés de brazil/paraguay), fiz a correção acreditando que o esperado seria trazer também os dados desses países
- O esquema de autenticação é o JWT Bearer Token
- Rotas de criação de usuário, login e troca de senha são públicos
- O módulo de University (e futuros outros módulos) foi modelado se baseando/herdando de um Base CRUD com operações abstratas, muito útil para escalar de forma rápida com a adição de novos schemas
- A importação periódica de universidades se tornou uma task agendada para ser executada meia-noite de todos os dias
- A inserção/atualização de universidades é feita usando operação de update com upsert
- Implementei uma troca de senha bem simples já que não tinha idéia se deveria ser uma troca com fluxo completo (com token recebido via email)