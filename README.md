# SCRIPT

ATENÇÃO:

- As variáveis de ambiente com as conexões de banco deverão estar contidas num .env 

##### COMO RODAR?

`npm run start`

# API

A API foi implementada utilizando o framework NestJS aliado ao ODM Mongoose
O processo de rodar a API está dockerizado

ATENÇÃO:

- As variáveis de ambiente com as conexões de banco deverão estar contidas num .env 
- É necessário o docker instalado na máquina

##### COMO RODAR?

`docker-compose up`

## OBSERVAÇÕES

- Existe um arquivo de variáveis de ambiente de exemplo (.env.example) com o conteúdo esperado das variáveis
- Como nada foi citado no enunciado, implementei a aplicação esperando um DBMS externo (e não que precisaria de um container MongoDB)
- Os nomes de alguns países estavam errados (brasil/paraguai ao invés de brazil/paraguay), fiz a correção acreditando que o esperado seria trazer também os dados desses países
