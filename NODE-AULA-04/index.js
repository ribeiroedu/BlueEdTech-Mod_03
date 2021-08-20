const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());


const listaDeGames = [
    'Uncharted',
    'League of Legends',
    'Tomb Raider',
    'Batman Arkhan',
    'Minecraft',
    'Fall Flat',
    'Fall Guys',
    'Mario',
    'Legend of Zelda',
    'Crash Bandicoot',
];

app.get('/', (req, res) => {
    res.send('Bem vindo à página inicial deste site de games!');
});

app.get('/games', (req, res) => {
    res.send(listaDeGames);
});

app.get('/games/:id', (req, res) => {
    const id = req.params.id -1;
    const game = listaDeGames[id];
    if(!game) {
        res.send('Este game não foi localizado, tente novamente.')
    }
    res.send(game);
});

app.post('/games', (req, res) => {
    const game = req.body.game;
    const id = listaDeGames.length;
    listaDeGames.push(game);    
    res.send(`O game ${game} foi cadastrado com sucesso e seu id para identificação é ${id}.`);
});

app.put('/games/:id', (req, res) => {
    const id = req.params.id -1; //pega o id enviado na rota
    const game = req.body.game; //pega o novo nome 
    const nomeAnterior = listaDeGames[id];
    listaDeGames[id] = game; //altera a entrada com o id correspondente pela nova entrada enviada
    res.send(`Nome do game atualizado com sucesso. O nome anterior ${nomeAnterior} foi alterado para ${game}.`);
});

app.delete('/games/:id', (req, res) => {
    const id = req.params.id -1;
    delete listaDeGames[id];
    res.send('Game excluído com sucesso!');
});

app.listen(port, () => {
    console.log(`O servidor está rodando de boas em: http://localhost:${port}/`);
});
