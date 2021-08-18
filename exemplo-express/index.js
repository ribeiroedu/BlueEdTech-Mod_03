const express = require('express'); //importa o express
const app = express(); //inicializa express

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.get('/blue', function(req, res) {
    res.send('<h1>Welcome, Bluemer!</h1>')
})

app.get('/dashboard', function(req, res) {
    res.send('<h1>Bem-vindo, Eduardo!</h1>')
})

app.get('/pag02', function(req, res) {
    res.send('<h1>Bem-vindo, Ribeiro!</h1>')
})

app.listen(3000);