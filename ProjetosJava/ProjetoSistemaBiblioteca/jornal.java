package ProjetoSistemaBiblioteca;

public class jornal extends MaterialBiblioteca {
    private int dataedicao;
    public jornal(String titulo,String autor,int anoPublicacao, int dataedicao){
        super(titulo, autor, anoPublicacao);
        this.dataedicao=dataedicao;
    }

    public int getDataedicao() {
        return dataedicao;
    }

    @Override
    public void exibirDetalhes() {
        System.out.println("Jornal:");
        System.out.println("Título: " + getTitulo());
        System.out.println("Autor: " + getAutor());
        System.out.println("Ano: " + getAnoPublicacao());
        System.out.println("Data da edição: " + dataedicao);
    }}
