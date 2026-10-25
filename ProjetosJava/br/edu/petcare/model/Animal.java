package br.edu.petcare.model;

public class Animal {
    private String nome,especie,raca,dono;
    private int idade;
    private float peso;
    
    public void Animal(String nome,String especie,String raca, int idade,float peso, String dono){
        this.nome=nome;
        this.especie=especie;
        this.raca=raca;
        this.idade=idade;
        this.peso=peso;
        this.dono=dono;
    }
    public void Animal(String nome,String especie,String raca,int idade,float peso)
}
