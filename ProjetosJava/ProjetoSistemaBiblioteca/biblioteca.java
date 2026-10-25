package ProjetoSistemaBiblioteca;

import java.util.ArrayList;

public class biblioteca {
    private ArrayList<MaterialBiblioteca> materiais;


    public biblioteca() {
        materiais = new ArrayList<>();
    }

    public void adicionarMaterial(MaterialBiblioteca material) {
        materiais.add(material);
        System.out.println("Material adicionado: " + material.getTitulo());
    }

    public void listarMateriais() {
        if (materiais.isEmpty()) {
            System.out.println("Nenhum material disponível.");
        } else {
            System.out.println("Materiais disponíveis na biblioteca:");
            for (MaterialBiblioteca m : materiais) {
                m.exibirDetalhes();
                System.out.println("-------------------------");
            }
        }
    }

    public MaterialBiblioteca buscarPorTitulo(String titulo) {
        for (MaterialBiblioteca m : materiais) {
            if (m.getTitulo().equalsIgnoreCase(titulo)) {
                return m;
            }
        }
        System.out.println("Material não encontrado: " + titulo);
        return null;
    }

    public void emprestarMaterial(MaterialBiblioteca material) {
        if (material != null && materiais.contains(material)) {
            material.emprestar();
            materiais.remove(material);
            System.out.println("Material removido da biblioteca após empréstimo.");
        } else {
            System.out.println("Material não disponível para empréstimo.");
        }
    }
}
