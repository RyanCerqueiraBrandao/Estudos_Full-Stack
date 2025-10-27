package br.edu.petcare.model;

public class Pessoa {
    private String nome,telefone,email,usuario,senha;

    public void pessoa(String nome,String telefone, String email, String usuario, String senha){
        this.nome=nome;
        this.telefone=telefone;
        this.email=email;
        this.usuario=usuario;
        this.senha=senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
    public void exibirDados(){};
}