package Prova_2;

import java.util.ArrayList;

public class ProdutosFabricados implements IprodutoFabricado {
    private String nome;
    private ArrayList<Iproduto> list = new ArrayList<>();
    public String getNome(){
        return this.nome;
    }

    public float getCusto() {
        for (Iproduto p : list) {
            return p.getCusto() ;
        }
        return 0;
    }

    public int getNumeroIngredientes(){
        return list.size();
    }
    public Iproduto getIngrediente(int numero){
        return list.get(numero);
    }

}
