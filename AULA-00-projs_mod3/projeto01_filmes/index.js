const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const filmes = [
  {
    id: 1,
    nome: "A Viagem de Chihiro",
    imagemUrl:
      "https://br.web.img3.acsta.net/c_310_420/pictures/210/527/21052756_20131024195513383.jpg",
  },
  {
    id: 2,
    nome: "Meu Amigo Totoro",
    imagemUrl:
      "https://upload.wikimedia.org/wikipedia/pt/d/d0/Tonari_no_Totoro_p%C3%B4ster.png",
  },
  {
    id: 3,
    nome: "Paprika",
    imagemUrl:
      "https://m.media-amazon.com/images/M/MV5BNDliMTMxOWEtODM3Yi00N2QwLTg4YTAtNTE5YzBlNTA2NjhlXkEyXkFqcGdeQXVyNjE5MjUyOTM@._V1_.jpg",
  },
  {
    id: 4,
    nome: "Akira",
    imagemUrl:
      "https://upload.wikimedia.org/wikipedia/pt/d/d8/Akira_p%C3%B4ster.jpg",
  },
  {
    id: 5,
    nome: "Ghost in the Shell",
    imagemUrl:
      "https://imgc.allpostersimages.com/img/posters/ghost-in-the-shell_u-L-F4S6XY0.jpg?h=550&p=0&w=550&background=ffffff",
  },
];

const pegarFilmesValidos = () => filmes.filter(Boolean);
const pegarFilmePeloId = (id) =>
  pegarFilmesValidos().find((filme) => filme.id === id);
const pegarIndexPeloFilme = (id) =>
  pegarFilmesValidos().findIndex((filme) => filme.id === id);

app.get("/", (req, res) => {
  res.send("Bem vindo à página de catálogo de filmes de anime!");
});

app.get("/filmes", (req, res) => {
  res.send(pegarFilmesValidos());
});

app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filme = pegarFilmePeloId(id);

  if (!filme) {
    res.send("Este filme não foi encontrado. Tente novamente.");
  }
  res.send(filme);
});

app.post("/filmes", (req, res) => {
  const filme = req.body;

  if (!filme || !filme.nome || !filme.imagemUrl) {
    res.status(400).send({
      message: "Entrada inválida. Tente novamente.",
    });
    return;
  }

  const ultimoFilme = filmes[filmes.length - 1];

  if (filmes.length) {
    filme.id = ultimoFilme.id + 1;
    filmes.push(filme);
  } else {
    filme.id = 1;
    filmes.push(filme);
  }

  res.send(`O filme foi adicionado ao catálogo com sucesso: ${filme.nome}. 
  O ID do filme adicionado é ${filme.id}`);
});

app.put("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const filmeIndex = pegarIndexPeloFilme(id);

  if (filmeIndex < 0) {
    res.status(404).send({
      message: "Este filme não foi encontrado. Tente novamente.",
    });
    return;
  }

  const novoFilme = req.body;

  if (!Object.keys(novoFilme).length) {
    res.status(400).send({
      message: "Erro. Não foi enviada nenhuma informação!",
    });
    return;
  }

  if (!novoFilme || !novoFilme.nome || !novoFilme.imagemUrl) {
    res.status(400).send({
      message: "Filme inválido. Tente novamente.",
    });
    return;
  }

  const filme = pegarFilmePeloId(id);

  console.log(filmeIndex);
  filmes[filmeIndex] = {
    ...filme,
    ...novoFilme,
  };

  res.send(filmes[filmeIndex]);
});

app.delete("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const filmeIndex = pegarIndexPeloFilme(id);

  if (filmeIndex < 0) {
    res.status(404).send({
      message: "O filme não foi encontrado. Tente novamente.",
    });
    return;
  }

  filmes.splice(filmeIndex, 1);
  res.send({
    message: "O filme foi removido do catálogo com sucesso!",
  });
});

app.listen(port, () => {
  console.info(`Rodando de boas na porta: http://localhost:${port}/`);
});
