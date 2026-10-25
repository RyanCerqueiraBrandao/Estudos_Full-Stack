package Prova_2;

import java.util.ArrayList;

public class GerenteProdutos {
    ArrayList<IprodutoFabricado> listpf = new ArrayList<>();
    ArrayList<Iproduto> listp = new ArrayList<>();
    public void ingredientes (String nome){
        int contador=0;
        for (IprodutoFabricado pf:listpf){
            System.out.println("ingrediente:"+ pf.getIngrediente(contador));
            contador++;
        }
    }
    public void valorCompra (String nome){
        for (Iproduto p :listp) {
            System.out.println("valor:"+ p.getCusto());
        }
    }
}
