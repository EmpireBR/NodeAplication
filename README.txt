Start with 'yarn dev'
Test with 'yarn test'



======================================
Anotações das aulas


GET => Buscar
POST => Salvar
PUT => Alterar
DELETE => Deletar
PATCH => Alteração Específica


1 param => Rota (Recurso API)
2 param => request, response
app.get("/", (request, response) => {
    return response.json({message: "hello"})
})

Testes Automatizados

1) Testes unitários = testa 1 funcionalidade específica

2) Testes de integração = testa a funciolidade completa
-> request -> routes -> controller -> repository
<- repository <- controller <- response

3) Ponta a Ponta (E2E) = aplicações front end


Route Params => Parametros que compõe a rota

Query Params => Busca, paginação, não obrigatórios
depois do ?
chave=valor



Cálculo do NPS (nota da empresa)
1 2 3 4 5 6 7 8 9 10
Detratores -> dão uma nota de 0 - 6
Passivos -> 7 - 8
Promotores -> 9 - 10
Passivos serão removidos do cálculo

(Número de promotores - número de detratores) / (número de respondentes) * 100

