const express = require('express');
const app = express();

const port = 3000;

app.use(express.json()); //falar para as reqs do express trabalhar com json

const filmes = [
    'Capitão América',
    'Capitã Marvel',
    'Doutor Estranho',
    'Thor: Ragnarok',
    'Homem-Aranha',
];

//endpoints
//home
app.get('/', (req, res) => {
    res.send('Hello, Bluemer!')
});

//rota para listagem de filmes
app.get('/filmes', (req, res) => {
    res.send(filmes);
});

//response (res) - servidor --> cliente
//request (req) - cliente --> servidor

//rota do filme individual por id
app.get('/filmes/:id', (req, res) => {
    const id = req.params.id - 1; //correção do índice da lista, que começa em 0
    const filme = filmes[id];
    if(!filme) { //colocar apenas filme assume que ele é true, logo colocar !filme assume que ele é false (und)
        res.send('Filme não encontrado!');
    }
    res.send(filme);
});

//rota que cadastra um novo filme (post)
//READ - GET
//CREATE - POST
//UPDATE - PUT
//DELETE - DELETE
//não sabe qual filme está vindo aí
app.post('/filmes', (req, res) => {
    const filme = req.body.filme; //pega item que tá vindo do body (req vindo do body no rótulo filme)
    const id = filmes.length;
    filmes.push(filme); //add novo item filme ao array filmes

    res.send(`Filme adicionado com sucesso: ${filme}. O id do filme é ${id}`);
});

//update - put
app.put('/filmes/:id', (req, res) => {
    const id = req.params.id -1; //pega o id
    const filme = req.body.filme; //pega o novo nome
    const nomeAnterior = filmes[id]; //nome atual
    filmes[id] = filme; //substitui entrada com o novo nome inserido pego no req.body.filme

    res.send(`Filme atualizado com sucesso: ${filme}. Filme anterior: ${nomeAnterior}.`);
});

//delete - delete
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = filmes[id];
    if(!filme) {
        res.send('Filme não encontrado!')
    }
    delete filme
    res.send('Filme excluído com sucesso!')
});



app.listen(port, () => {
    console.log(`App rodando na porta http://localhost:${port}/`);
});