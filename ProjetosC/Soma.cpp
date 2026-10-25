//Faça um algoritmo que receba dois números e exiba o resultado da uma soma
#include<stdio.h>
#include<locale.h>
int main() {
	int n1,n2,total;
	setlocale(LC_ALL, "portuguese");
	printf("Digite o Primeiro numero: ");
	scanf("%i",&n1);
	printf("Digite o Segundo numero: ");
	scanf("%i",&n2);
	
	total = n1 +n2;
	printf("A soma dos dois numeros é: %i",total);
	
}
