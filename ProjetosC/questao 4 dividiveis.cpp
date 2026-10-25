#include<stdio.h>
#include<stdlib.h>
#include<locale.h>
int main(){
	int numeros[10],i,num;
	setlocale(LC_ALL,"portuguese");
	for(i=0;i<10;i++){
		printf("Digite um valor positivo: ");
		scanf("%d",&numeros[i]);	
	}
	
	system("cls");
	
	for(i=0;i<10;i++){
		printf("%d|",numeros[i]);
	}
	printf("\nagora digite um numero positivo para calcular os divisíveis desses números :");
	scanf("%d",&num);
	for(i=0;i<10;i++){
		if(numeros[i] % num == 0){
			printf("%d|",numeros[i]);
		}
	}
}
