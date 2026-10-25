package br.edu.petcare.model;

import java.util.ArrayList;

public class Dono extends Pessoa {
    private ArrayList<Animal> listaAnimais = new ArrayList<>();

    public void adicionarAnimal(String nome,String especie, String raca, int idade, float peso){
        listaAnimais.add(new Animal(nome,especie,raca,idade,peso));
    };

    @Override
    public void exibirDados(){
        System.out.println("Nome:" +getNome());
        System.out.println("Usuario:"+getUsuario());
        System.out.println("Telefone"+getTelefone());
        System.out.println("E-mail"+getEmail());

        for(Animal a:listaAnimais){
            System.out.println(a);
        }

    }

}