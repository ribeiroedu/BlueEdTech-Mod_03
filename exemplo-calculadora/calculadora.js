const nome = 'Calculadora';

function soma(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multi(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

//módulo contém métodos, funções, regras de negócios etc
//chamada para exportar para outro lugar essas peças contidas neste módulo
module.exports = {
    soma,
    sub,
    multi,
    div,
    nome
}