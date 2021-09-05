const express = require('express');
const router = express.Router();
const Musica = require('../models/musicas')

router.post("/add", async (req, res) => {
    await Musica.create(req.body)
    .then(() => {
        res.status(200).send("Música adicionada com sucesso");
    })
    .catch((err) => {
        res.status(400).send("Algo errado com a música. Tente novamente.");
    })
});

router.get('/', async (req, res) => {
    await Musica.find({})
    .then((musica) => {
        res.send(musica);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/findById/:id', async (req, res) => {
    await Musica.find({_id: req.params.id})
    .then((musica) => {
        res.send(musica);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.put("/update/:id", async (req, res) => {
    await Musica.updateOne({_id: req.params.id},req.body)
    .then(() => {
        res.status(200).send("Atuazliado com sucesso.");
    })
    .catch((err) => {
        console.log("Algo de errado com a música!");
    });
});

router.delete("/delete/:id", async (req, res) => {
    await Musica.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).send("Atuazliado com sucesso.");
    })
    .catch((err) => {
        console.log("Algo de errado com a música!");
    });
});



module.exports = router;

