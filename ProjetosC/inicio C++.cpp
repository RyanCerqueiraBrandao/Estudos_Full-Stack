#include <stdio.h>
#include <locale.h>
int main(){
	setlocale(LC_ALL,"portuguese");
	int age;
	char name[30];
	float height;
	
	printf("Digite o Seu Nome completo: ");
	gets(name);
	
	printf("Digite a Sua Idade: ");
	scanf("%i",&age);
	
	printf("Digite a sua Altura: ");
	scanf("%f",&height);
	
	printf("\n");

	printf("Seu nome �: %s\nSua idade �: %i \nSua Altura �: %.2f",name,age,height);

}