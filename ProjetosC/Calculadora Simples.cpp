#include<stdio.h>
#include<stdlib.h>
#include<locale.h>
int main () {
	float n1,n2,resultado;
	char operacao;
	
	setlocale(LC_ALL, "portuguese");
	
	printf("Digite o primeiro Número: ");
	scanf("%f",&n1);
	
	fflush(stdin);
	
	printf("Informe o Tipo de Operação(+|-|*|/): ");
	scanf("%c",&operacao);
	
	fflush(stdin);
	
	printf("Digite o Segundo Número: ");
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
			printf("opção inválida!!");				
	}
}