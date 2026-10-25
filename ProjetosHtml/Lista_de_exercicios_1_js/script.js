let nome="Ryan Cerqueira Brandão";
let anoAtual= 2026;
let anoNascimento = 2005;
let cidade = "Conceicao do Jacuipe";
let estado = "Bahia";
let pais = "Brasil";
let temCarteira = true;
let saldo = 0;
let deposito = 0; 
let saque = 0;
let matematica= 6.3;
let portugues= 7.8;
let ciencias = 8.1;
let salario = 3000;
let cliques = 0;
const pi = 3.14;



function questao1(){
    console.log(`Ola,${nome}! Seja Bem Vindo ao Curso de JavaScript`);
}

function questao2(){
    console.log(`Voce tem ${[anoAtual-anoNascimento]} anos.`);
}

function questao3(){
    console.log(`voce esta em ${cidade}-${estado}, ${pais}.`);
}

function questao4(){
    console.log(typeof temCarteira);
}

function questao5(){
    console.log(`Saldo atual:  ${saldo}`);
    deposito=prompt("Valor a ser depositado: ");
    deposito = Number(deposito);
    saldo+=deposito;
    saque = prompt("Valor a ser sacado: ");
    saque = Number(saque);
    saldo -= saque;
}

function questao6(){
    let media = [matematica+portugues+ciencias]/3;
    console.log(`Media Final: ${media}`);
}

function questao7(){
    salario*=1.1;
    console.log(`Novo Salario: ${salario}`);
}

function questao8(){
    if(cliques < 3){
        cliques++;
        if(cliques == 3){console.log(cliques);}
    }   
}

function questao9(){
    console.log(pi+=10);
}

function questao10(){
    let mensagem="oi";
    let numero = 10;
    let resultado = mensagem+numero;
    console.log(resultado + typeof resultado);
}