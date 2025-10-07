package Prova_4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ControleDespesas {
    private String cpf;
    private int[] despesas = new int[1000];
    private ArrayList<DespesaMes> list = new ArrayList<>();
    private int contador=1;
    public ControleDespesas(String cpf, int despesas){
        this.cpf= cpf;
        for (int i = 0; i < contador; i++) {
            this.despesas[i]=despesas;

        }
        contador++;
    }

    public String getCpf() {
         return cpf;
    }
    public void totalizaMes(int mes){
        for (DespesaMes mes1 : list) {
            if (mes == mes1.getMes()) {
                System.out.println(mes1.getValor());
            }
        }
    }
}
