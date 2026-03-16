//Função Normal
function saudacao(nome){
    console.log(`ola,${nome}`)
}

//mais curta
const saudacao2 = (nome) =>{
    console.log(`ola,${nome}`)
}

//ainda mais curta
const saudacao3 = (nome) => console.log(`ola ${nome}`)

saudacao("jose")
saudacao2("maria")
saudacao3("joao")

//callback
function recebeusuario(nome,callback){
    console.log("recebendo usuario...")

    callback(nome)
}

recebeusuario("jose",saudacao3)

//callback com funcao anonima
recebeusuario("jose",function(nome){
    console.log(`ola,${nome}`)
})

//
function calculadora(v1,v2, operacao){
    console.log(`calculando...`)
    
    const resultado = operacao(v1, v2);
    
    console.log(`O resultado é: ${resultado}`);
}

const somar = (v1,v2) => v1+v2;
const multiplicar = (v1,v2) => v1*v2
const subtrair = (v1,v2) => v1-v2
const dividir = (v1,v2) => v1/v2

calculadora(10,2,somar)