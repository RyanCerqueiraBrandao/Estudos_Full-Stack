/*Faça um algoritmo que leia o nome, o sexo e o estado civil de uma pessoa. Caso sexo seja “F” e
estado civil seja “CASADA”, solicitar o tempo de casada (anos).*/
#include<stdio.h>
#include<stdlib.h>
#include<locale.h>
#include<string.h>
int main(){
	setlocale(LC_ALL, "portuguese");
	char nome[50],sexo,estadoCivil[40];
	int tempo;
	tempo = 0;
	printf("digite o seu nome: ");
	gets(nome);
	
	printf("digite o seu Sexo (M|F): ");
	scanf("%c",&sexo);
	
	fflush(stdin);
	
	printf("digite estado Civíl: ");
	gets(estadoCivil);
	
	if (sexo == 'F' && strcmp(estadoCivil,"CASADA") == 0) {
		printf("digite a quantos anos você está casada: ");
		scanf("%i",&tempo);
	}
	
}