//CRUD de lista
const express = require("express");
const app = express();

const port = 3000;

app.use(express.json()); // falar para as reqs do express trabalhar com json

const filmes = [
  {
    id: 1,
    nome: "Capitão América: O primeiro vingador",
    imagemUrl:
      "https://play-lh.googleusercontent.com/9LAzip_XWe8eVWEUGCnSJ4xf706RmYtSu5bZRAfvqbs2aW6YVlLbPF7UVTfMpJKQUioKGw",
  },
  {
    id: 2,
    nome: "Capitã Marvel",
    imagemUrl:
      "https://br.web.img2.acsta.net/pictures/19/02/04/18/35/1468867.jpg",
  },
  {
    id: 3,
    nome: "O Incrível Hulk",
    imagemUrl:
      "https://br.web.img2.acsta.net/c_310_420/pictures/210/485/21048566_20131010182211313.jpg",
  },
  {
    id: 4,
    nome: "Homem de Ferro",
    imagemUrl:
      "https://images-na.ssl-images-amazon.com/images/I/81vTHovrz%2BL._AC_SY606_.jpg",
  },
  {
    id: 5,
    nome: "Homem de Ferro 2",
    imagemUrl:
      "https://media.fstatic.com/SFp4c8GT3GTGYok7_526qDSHTns=/290x478/smart/media/movies/covers/2018/09/66432b37ed80464274a58239b695007f95c79155.jpg",
  },
];

// funções de validação

//função em formato de named function (antigo)
// function getFilmesValidos() {
//   return filmes.filter(Boolean);
// }

// arrow function (es6+ novo)
const getFilmesValidos = () => filmes.filter(Boolean); //filtro retorna apenas entradas válidas na listagem (lista validada sem null)
const getFilmeById = (id) =>
  getFilmesValidos().find((filme) => filme.id === id);
const getIndexByFilme = (id) =>
  getFilmesValidos.findIndex((filme) => filme.id === id);

// primeira rota, retorna apernas a msg hello, bluemer.
app.get("/", (req, res) => {
  res.send("Hello, Bluemer!");
});

// rota dos filmes - primeira rota - listagem dos filme para exibir todos
app.get("/filmes", (req, res) => {
  res.send(getFilmesValidos());
});

// rota do filme individual por id
app.get("/filmes/:id", (req, res) => {
  const id = req.params.id;
  const filme = getFilmeById(id);

  if (!filme) {
    res.send("Filme não Encontrado");
  }
  res.send(filme);
});

//rota de cadastro de um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body;

  if (!filme || !filme.nome || !filme.imagemUrl) {
    res.status(400).send({
      message: "Filme inválido. Tente novamente.",
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

  res.send(`Filme adicionado com sucesso: ${filme.nome}. 
  O ID do filme é ${filme.id}`);
});

//rota de atualizacao de um filme
app.put("/filmes/:id", (req, res) => {
  const id = +req.params.id;

  const filmeIndex = getIndexByFilme(id);

  if (filmeIndex < 0) {
    res.status(404).send({
      message: "O filme não foi encontrado, tente novamente.",
    });
    return;
  }

  const novoFilme = req.body;

  if (!Object.keys(novoFilme).length) {
    res.status(400).send({
      message: "O body está vazio!",
    });
    return;
  }

  if (!novoFilme || !novoFilme.nome || !novoFilme.imagemUrl) {
    res.status(400).send({
      message: "filme inválido, tente novamente.",
    });
    return;
  }

  const filme = getFilmeById(id);

  filmes[filmeIndex] = {
    ...filme,
    ...novoFilme,
  };

  res.send(filmes[filmeIndex]);
});

//rota de remocao de um filme
app.delete("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  const filme = filmes[id];
  if (!filme) {
    res.send("Filme não Encontrado");
  }
  delete filmes[id];
  res.send("Filme excluido com sucesso");
});

//sugestao da galera SPLICE
app.delete("/filmesSplice/:id", (req, res) => {
  const id = req.params.id - 1;
  filmes.splice(id, 1);
  //delete filmes[id]
  res.send("Filme excluido com sucesso.");
});

//Definicao do listener passando a porta do servico
app.listen(port, function () {
  console.info(`App rodando na porta http://localhost:${port}/`);
});
