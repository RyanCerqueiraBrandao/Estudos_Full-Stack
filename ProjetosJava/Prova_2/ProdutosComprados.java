package Prova_2;

public class ProdutosComprados implements Iproduto {
    private String nome;
    private float custo;

    public void setCusto(float custo) {
        this.custo = custo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNome(){
        return this.nome;
    }
    public float getCusto(){
        return this.custo;
    }
}
