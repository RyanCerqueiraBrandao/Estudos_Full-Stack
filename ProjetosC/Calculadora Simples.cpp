#include<stdio.h>
#include<stdlib.h>
#include<locale.h>
int main () {
	float n1,n2,resultado;
	char operacao;
	
	setlocale(LC_ALL, "portuguese");
	
	printf("Digite o primeiro N�mero: ");
	scanf("%f",&n1);
	
	fflush(stdin);
	
	printf("Informe o Tipo de Opera��o(+|-|*|/): ");
	scanf("%c",&operacao);
	
	fflush(stdin);
	
	printf("Digite o Segundo N�mero: ");
	scanf("%f",&n2);
	
	switch(operacao){
		case '+':
			resultado = n1 + n2;
			printf("%.2f + %.2f = %.2f", n1,n2,resultado);
			break;
		case '-':
			resultado = n1 - n2;
			printf("%.2f - %.2f = %.2f", n1,n2,resultado);
			break;
		case '*':
			resultado = n1 * n2;
			printf("%.2f * %.2f = %.2f", n1,n2,resultado);
			break;
		case '/':
			resultado = n1 / n2;
			printf("%.2f / %.2f = %.2f", n1,n2,resultado);
			break;
		default :
			printf("op��o inv�lida!!");				
	}
}