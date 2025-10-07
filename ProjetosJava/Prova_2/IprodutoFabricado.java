package Prova_2;

public interface IprodutoFabricado extends Iproduto{
    int getNumeroIngredientes();
    Iproduto getIngrediente(int numero);
}
