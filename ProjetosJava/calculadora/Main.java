package calculadora;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Calculadora calculadora = new Calculadora();

        System.out.println("10 + 5 = " + calculadora.somar(10, 5));
        System.out.println("10 - 5 = " + calculadora.subtrair(10, 5));
        System.out.println("10 * 5 = " + calculadora.multiplicar(10, 5));
        System.out.println("10 / 5 = " + calculadora.dividir(10, 5));
    }
}
