package SistemaLocadoraVeiculos;

public abstract class veiculos implements alugavel{
    private String modelo,marca;
    private int ano;
    private boolean disponivel;

    public veiculos(String modelo,String marca,int ano,boolean disponivel){
        this.modelo=modelo;
        this.marca=marca;
        this.ano=ano;
        this.disponivel=disponivel;
    }

    public String getModelo() {
        return modelo;
    }

    public String getMarca() {
        return marca;
    }

    public int getAno() {
        return ano;
    }
    public boolean getdisponivel(){
        return disponivel;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
    public abstract void exibirDetalhes();

}
