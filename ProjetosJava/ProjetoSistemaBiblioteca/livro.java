package ProjetoSistemaBiblioteca;

public class livro extends MaterialBiblioteca{
    private int numeroPaginas;
    public livro(String titulo,String autor,int anoPublicacao, int numeroPaginas){
        super(titulo, autor, anoPublicacao);
        this.numeroPaginas=numeroPaginas;
    }

    public int getNumeroPaginas() {
        return numeroPaginas;
    }

    @Override
    public void exibirDetalhes() {
        System.out.println("Livro:");
        System.out.println("Título: " + getTitulo());
        System.out.println("Autor: " + getAutor());
        System.out.println("Ano: " + getAnoPublicacao());
        System.out.println("Número de páginas: " + numeroPaginas);
    }
}
