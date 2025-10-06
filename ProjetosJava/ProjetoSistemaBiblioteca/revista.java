package ProjetoSistemaBiblioteca;

public class revista extends MaterialBiblioteca {
    private int edicao;
    public revista(String titulo,String autor,int anoPublicacao, int edicao){
        super(titulo, autor, anoPublicacao);
        this.edicao=edicao;
    }

    public int getEdicao() {
        return edicao;
    }

    @Override
    public void exibirDetalhes() {
        System.out.println("Revista:");
        System.out.println("Título: " + getTitulo());
        System.out.println("Autor: " + getAutor());
        System.out.println("Ano: " + getAnoPublicacao());
        System.out.println("Edição: " + edicao);
    }
}
