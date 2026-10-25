#include<stdio.h>
#include<locale.h>
int main(){
	int a,b,c;
	setlocale(LC_ALL, "portuguese");
	printf("Digite Três Numeros inteiros: ");
	scanf("%i%i%i",&a,&b,&c);
	
	if ((a+b)>c) {
		printf("A Soma de a + b é maior que C");
	}
	else {
		printf("A Soma de a + b não é maior que C");
	}
}