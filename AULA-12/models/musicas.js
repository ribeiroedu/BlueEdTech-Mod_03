const mongoose = require('mongoose');

const musicaModel = new mongoose.Schema({
    nome: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    capa: { type: String },
    letra: { type: String },
    duracao: { type: Number, required: true },
    dataCriacao: { type: Date, default: Date.now }
})

const Musica = mongoose.model("musicas", musicaModel);

module.exports = Musica;