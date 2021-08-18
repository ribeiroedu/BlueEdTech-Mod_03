const calculadora = require('./calculadora'); //chamada para receber exportação de outro lugar

console.log(calculadora.nome);
console.log('soma: ' + calculadora.soma(4,5)); //concatenação de string + number
console.log('subtração:', calculadora.sub(5,2));
console.log(calculadora.multi(2,8));
console.log(calculadora.div(8,2));