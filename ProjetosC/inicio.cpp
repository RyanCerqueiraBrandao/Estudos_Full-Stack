#include<stdio.h>
#include<stdlib.h>
int main(){
	int age;
	
	
	while(true) {
	printf("Informe a sua idade: ");
	scanf("%i",&age);
	system("cls");
	
	if (age < 0 || age > 120) {
		printf("Idade Invalida! ");
		abort();
	} 
	else if (age >= 18){
		printf("voce e maior de idade\n");	
	}
	else {
		printf("voce e menor de idade\n");
	} 
	}
}