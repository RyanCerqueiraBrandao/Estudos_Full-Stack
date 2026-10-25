#include<stdio.h>
#include<stdlib.h>
#include<locale.h>
#include<string.h>

int main(){
	setlocale(LC_ALL,"portuguese");
	int peso,altura,imc;
	imc = 0;
	printf(" |Calculadora de IMC| \n");
	
	printf("Digite a sua altura (em centímetros): ");
	scanf("%i",&altura);
	
	printf("Digite a seu peso (em Kilogramas): ");
	scanf("%i",&peso);
	
	imc = peso/((altura*2)*2);
	
	printf("%i",&imc);
}