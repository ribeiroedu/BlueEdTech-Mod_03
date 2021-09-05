const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const games = [
  {
    id: 1,
    nome: "Mario & Luigi: Superstar Saga",
    imagemUrl:
      "https://upload.wikimedia.org/wikipedia/pt/8/80/Mario_%26_Luigi_Superstar_Saga.png",
  },
  {
    id: 2,
    nome: "The Legend of Zelda: The Minish Cap",
    imagemUrl:
      "https://static.emulatorgames.net/images/gameboy-advance/legend-of-zelda-the-the-minish-cap.jpg",
  },
  {
    id: 3,
    nome: "Need for Speed: Underground 2",
    imagemUrl:
      "https://wowroms-photos.com/emulators-roms-logo/27/13675/420-420/Need+for+Speed+-+Underground+2+(USA,+Europe)+(En,Fr,De,It)-image.jpg",
  },
  {
    id: 4,
    nome: "Donkey Kong Country 2",
    imagemUrl: "https://m.media-amazon.com/images/I/51YQov91COL._AC_SX466_.jpg",
  },
  {
    id: 5,
    nome: "Pokémon FireRed Version",
    imagemUrl: "https://images.uncyc.org/pt/6/64/Pok%C3%A9monFireRed.jpg",
  },
];

const pegarGamesValidos = () => games.filter(Boolean);
const pegarGamePeloId = (id) =>
  pegarGamesValidos().find((game) => game.id === id);
const pegarIndexPeloGame = (id) =>
  pegarGamesValidos().findIndex((game) => game.id === id);

app.get("/", (req, res) => {
  res.send("Bem vindo à página de catálogo de games!");
});

app.get("/games", (req, res) => {
  res.send(pegarGamesValidos());
});

app.get("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const game = pegarGamePeloId(id);

  if (!game) {
    res.send("Este game não foi encontrado. Tente novamente.");
  }
  res.send(game);
});

app.post("/games", (req, res) => {
  const game = req.body;

  if (!game || !game.nome || !game.imagemUrl) {
    res.status(400).send({
      message: "Entrada inválida. Tente novamente.",
    });
    return;
  }

  const ultimoGame = games[games.length - 1];

  if (games.length) {
    game.id = ultimoGame.id + 1;
    games.push(game);
  } else {
    game.id = 1;
    games.push(game);
  }

  res.send(`O game foi adicionado ao catálogo com sucesso: ${game.nome}. 
  O ID do filme adicionado é ${game.id}`);
});

app.put("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const gameIndex = pegarIndexPeloGame(id);

  if (gameIndex < 0) {
    res.status(404).send({
      message: "Este game não foi encontrado. Tente novamente.",
    });
    return;
  }

  const novoGame = req.body;

  if (!Object.keys(novoGame).length) {
    res.status(400).send({
      message: "Erro. Não foi enviada nenhuma informação!",
    });
    return;
  }

  if (!novoGame || !novoGame.nome || !novoGame.imagemUrl) {
    res.status(400).send({
      message: "Game inválido. Tente novamente.",
    });
    return;
  }

  const game = pegarGamePeloId(id);

  console.log(gameIndex);
  games[gameIndex] = {
    ...game,
    ...novoGame,
  };

  res.send(games[gameIndex]);
});

app.delete("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const gameIndex = pegarIndexPeloGame(id);

  if (gameIndex < 0) {
    res.status(404).send({
      message: "O game não foi encontrado. Tente novamente.",
    });
    return;
  }

  games.splice(gameIndex, 1);
  res.send({
    message: "O game foi removido do catálogo com sucesso!",
  });
});

app.listen(port, () => {
  console.info(`Rodando de boas na porta: http://localhost:${port}/`);
});
