const express = require('express'); //importa o módulo express para o arquivo
const app = express(); //declara que o app está fazendo uso do express

const port = 3000; //define porta de trabalho para o servidor

//declarando lista chamada filmes (array)
const filmes = [
    'Your Name',
    'Belle',
    'Sen to Chihiro no Kamikakushi',
    'Thrice upon a time',
    'Ghost in the Shell',
    'Lupin III',
    'Akira',
];

//GET / home (entrou na aplicação ela chega na home) (endpoint)
// a => (flecha) serve para apontar uma função anônima (arrow function)
app.get('/', (req, res) => {
    res.send("Bem vindos ao meu site de lista de filmes!");
});

//GET /filmes, listando todos
//endpoint /filmes que exibe o array de filmes na tela
app.get('/filmes', (req, res) => {
    res.send(filmes);
});

//GET /filmes, exibindo apenas o id
app.get('/filmes/:id', (req, res) => {
    const id = req.params.id -1; //define id como parâmetro vindo do req, sendo o parâmetro id, o -1 para corrigir o fato do id começar no 0 e não no 1
    const filme = filmes[id]; //define o item filme como o item de índice id da lista filmes 
    res.send(filme); //joga na tela o item achado
});

//joga o servidor para ouvir a partir da porta port
app.listen(port, () => {
    console.info(`App esta rodando em: http://localhost:${port}/`); // crase para chamar sem comm concatenar
});