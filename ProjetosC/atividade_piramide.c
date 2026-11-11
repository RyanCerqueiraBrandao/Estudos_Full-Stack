/*faça um algoritmo que leia um valor inteiro N e desenhe uma pirãmide de asteriscos de altura N.
*
**
***
****.....
*/
#include <stdio.h>

int main() {
    int n, linha = 1, coluna;

    printf("Digite a altura da pirâmide (N): ");
    scanf("%d", &n);

    while (linha <= n) {
        coluna = 1; 
        while (coluna <= linha) {
            printf("*");
            coluna++;
        }
        printf("\n"); 
        linha++;
    }
}

