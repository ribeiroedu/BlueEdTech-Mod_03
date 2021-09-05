const express = require('express');
const router = express.Router();

router.post("/add", (req, res) => {

});

router.get('/', (req, res) => {
    res.send("rota ok");
});

router.put("/update", (req, res) => {

});

router.delete("/delete", (req, res) => {

});



module.exports = router;

