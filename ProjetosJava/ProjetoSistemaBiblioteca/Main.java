package ProjetoSistemaBiblioteca;

import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        biblioteca biblioteca = new biblioteca();
        int opcao;

        do {
            System.out.println("MENU BIBLIOTECA");
            System.out.println("1 - Adicionar Livro");
            System.out.println("2 - Adicionar Revista");
            System.out.println("3 - Adicionar Jornal");
            System.out.println("4 - Listar Materiais");
            System.out.println("5 - Buscar por Título");
            System.out.println("6 - Emprestar Material");
            System.out.println("7 - Sair");
            System.out.print("Escolha uma opção: ");
            opcao = sc.nextInt();
            sc.nextLine();

            switch (opcao) {
                case 1:
                    System.out.print("Título: ");
                    String tituloL = sc.nextLine();
                    System.out.print("Autor: ");
                    String autorL = sc.nextLine();
                    System.out.print("Ano de publicação: ");
                    int anoL = sc.nextInt();
                    System.out.print("Número de páginas: ");
                    int paginas = sc.nextInt();
                    sc.nextLine();
                    livro l = new livro(tituloL, autorL, anoL, paginas);
                    biblioteca.adicionarMaterial(l);
                    break;

                case 2:
                    System.out.print("Título: ");
                    String tituloR = sc.nextLine();
                    System.out.print("Autor: ");
                    String autorR = sc.nextLine();
                    System.out.print("Ano de publicação: ");
                    int anoR = sc.nextInt();
                    System.out.print("Edição: ");
                    int edicao = sc.nextInt();
                    sc.nextLine();
                    revista r = new revista(tituloR, autorR, anoR, edicao);
                    biblioteca.adicionarMaterial(r);
                    break;

                case 3:
                    System.out.print("Título: ");
                    String tituloJ = sc.nextLine();
                    System.out.print("Autor: ");
                    String autorJ = sc.nextLine();
                    System.out.print("Ano de publicação: ");
                    int anoJ = sc.nextInt();
                    System.out.print("Data da edição (número): ");
                    int dataEd = sc.nextInt();
                    sc.nextLine();
                    jornal j = new jornal(tituloJ, autorJ, anoJ, dataEd);
                    biblioteca.adicionarMaterial(j);
                    break;

                case 4:
                    biblioteca.listarMateriais();
                    break;

                case 5:
                    System.out.print("Digite o título a buscar: ");
                    String busca = sc.nextLine();
                    MaterialBiblioteca encontrado = biblioteca.buscarPorTitulo(busca);
                    if (encontrado != null) {
                        encontrado.exibirDetalhes();
                    }
                    break;

                case 6:
                    System.out.print("Digite o título do material para emprestar: ");
                    String emprestarTitulo = sc.nextLine();
                    MaterialBiblioteca material = biblioteca.buscarPorTitulo(emprestarTitulo);
                    biblioteca.emprestarMaterial(material);
                    break;

                case 7:
                    System.out.println("Encerrando o programa...");
                    break;

                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        } while (opcao != 7);

    }
}
