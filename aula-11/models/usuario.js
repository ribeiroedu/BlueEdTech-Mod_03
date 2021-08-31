const mongoose = require('mongoose');

const usuarioModel = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String },
    cpf: { type: String, required: true },
    idade: { type: Date, required: true },
    senha: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now }
});

const Usuario = mongoose.model("usuarios", usuarioModel);

module.exports = Usuario;