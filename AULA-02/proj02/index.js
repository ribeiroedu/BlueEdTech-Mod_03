const express = require('express');
const app = express();

const port = 3000;

const games = [
    'Uncharted',
    'Minecraft',
    'League of Legends',
    'Starcraft',
];

const msgInicio = [
    'Bem vindos',
    'Olá, amigo',
    'E aí galera',
    'Allon-sy',
];


app.get('/', (req, res) => {
    res.send(`<h1>Bem vindo a Página Inicial!</h1>`);
});

app.get('/games', (req, res) => {
    res.send(games);
});

//mostra o item e o respectivo id
// games.forEach(function (item, indice) {
//     console.log(item, indice);
// });

function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/games/:id', (req, res) => {
    const id = req.params.id -1;
    const game = games[id];
    if (id > games.length -1 || id < 0) {
        res.send('Id invalido! Tente novamente!');
    } else {
        res.send(game);
    }

    // const id = randomMinMax(0,4);
    // const game = games[id];
    // res.send(game);
});

app.listen(port, () => {
    console.info(`O app deste servidor está rodando em: http://localhost:${port}/`);
});