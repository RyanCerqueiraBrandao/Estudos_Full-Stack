package ProjetoSistemaBiblioteca;

public abstract class MaterialBiblioteca {
    private String titulo,autor;
    private int anoPublicacao;
    public MaterialBiblioteca(String titulo, String autor, int anoPublicacao){
        this.titulo=titulo;
        this.autor=autor;
        this.anoPublicacao=anoPublicacao;
    }

    public int getAnoPublicacao() {
        return anoPublicacao;
    }

    public String getAutor() {
        return autor;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setAnoPublicacao(int anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public abstract void exibirDetalhes();
    public void emprestar(){
        System.out.println("Material emprestado: "+getTitulo());
    }
}