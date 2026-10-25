package SistemaLocadoraVeiculos;

import java.util.ArrayList;

public class locadora {
    private static ArrayList<veiculos>veiculos=new ArrayList<>();
    public static void adicionarVeiculos(veiculos v){
    veiculos.add(v);
    }
    public static void listarVeiculos(){
        for (veiculos v: veiculos)
            v.exibirDetalhes();
    }
    public static veiculos buscarPorModelo(String modelo){
        for (veiculos v : veiculos){
            if(v.getModelo().equalsIgnoreCase(modelo)){
                return v;
            }
        }
        return null;
    }
    public static void alugarVeiculo(alugavel a){
        a.alugar();
    }
    public static void devolverVeiculo(alugavel a){
        a.devolver();
    }
}
