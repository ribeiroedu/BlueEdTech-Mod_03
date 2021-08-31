const express = require('express');
const mongoose = require('mongoose');
// const usuarioModel = require('./models/usuario');
const Usuario = require('./models/usuario')

mongoose.connect("mongodb://localhost:27017/usuarios", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// const usuario2 = new Usuario({
//     nome: "Pedro",
//     sobrenome: "Ribeiro",
//     cpf: "42512595861",
//     idade: "1995-04-05",
//     senha: "123456",
// });

// usuario2.save().then(() => {
//     console.log("Filme salvo!");
// }).catch((err) => {
//     console.log(err);
// });

Usuario.find({ nome: "Pedro" })
.then((usuarios) => {
    console.log(usuarios);
})
.catch((err) => {
    console.log(err);
});


Usuario.findByIdAndDelete("612d6e5ce69844360408456a")
.then(() => {
    console.log("Usuario excluido.");
})
.catch((err) => {
    console.log(err);
})


const app = express();
const port = 3000;



app.listen(port, () => {
    console.info(`App rodando na porta ${port}`);
});