package SistemaLocadoraVeiculos;

import java.lang.classfile.instruction.SwitchCase;
import java.util.Scanner;

public class main {
    static void main() {
        int op = 0,ano = 0, numeroPortas = 0, cilindradas = 0 ;
        double capacidade;
        Scanner sc = new Scanner(System.in);
        while(true){
            System.out.println("==== Menu Locadora ====");
            System.out.println("1-Adicionar carro");
            System.out.println("2-Adicionar Moto");
            System.out.println("3-Adicionar Caminhao");
            System.out.println("4-Listar Veiculos");
            System.out.println("5-Buscar por Modelo");
            System.out.println("6-Alugar Veiculo");
            System.out.println("7-Devolver Veiculo");
            System.out.println("8-Sair");
            System.out.print("Opcao: ");
            op = sc.nextInt();
            sc.nextLine();
        switch (op){
        case 1:
            System.out.print("Modelo: ");
            String modeloCarro = sc.nextLine();
            System.out.print("Marca: ");
            String marcaCarro = sc.nextLine();
            System.out.println("Ano: ");
            ano = sc.nextInt();
            System.out.println("Numero de Portas: ");
            numeroPortas = sc.nextInt();

            veiculos carro = new carro(modeloCarro, marcaCarro, ano,true, numeroPortas);
            locadora.adicionarVeiculos(carro);
            System.out.println("Carro adicionado com sucesso!");
            break;
            case 2:
                System.out.print("Modelo: ");
                String modeloMoto = sc.nextLine();
                System.out.print("Marca: ");
                String marcaMoto = sc.nextLine();
                System.out.println("Ano: ");
                ano = sc.nextInt();
                System.out.println("cilindradas: ");
                cilindradas = sc.nextInt();

                veiculos moto = new moto(modeloMoto, marcaMoto, ano,true, cilindradas);
                locadora.adicionarVeiculos(moto);
                System.out.println("Moto adicionada com sucesso!");
                break;
            case 3:
                System.out.print("Modelo: ");
                String modeloCaminhao = sc.nextLine();
                System.out.print("Marca: ");
                String marcaCaminhao = sc.nextLine();
                System.out.println("Ano: ");
                ano = sc.nextInt();
                System.out.println("Capacidade: ");
                capacidade = sc.nextDouble();

                veiculos caminhao = new caminhao(modeloCaminhao, marcaCaminhao, ano,true, capacidade);
                locadora.adicionarVeiculos(caminhao);
                System.out.println("Caminhao adicionado com sucesso!");
                break;
            case 4:
                locadora.listarVeiculos();
                break;
            case 5:
                System.out.print("Modelo a buscar: ");
                String buscar = sc.nextLine();
                veiculos encontrado = locadora.buscarPorModelo(buscar);
                if (encontrado != null) {
                    System.out.println("Veículo encontrado:");
                    encontrado.exibirDetalhes();
                } else {
                    System.out.println("Nenhum veículo encontrado com o modelo informado.");
                }
                break;
            case 6:
                System.out.print("Modelo a alugar: ");
                String modeloAlugar = sc.nextLine();
                veiculos vAlugar = locadora.buscarPorModelo(modeloAlugar);
                if (vAlugar == null) {
                    System.out.println("Veículo não encontrado.");
                } else if (vAlugar != null) {
                    locadora.alugarVeiculo( vAlugar);
                }
                break;
            case 7:
                System.out.print("Modelo a devolver: ");
                String modeloDevolver = sc.nextLine();
                veiculos vDevolver = locadora.buscarPorModelo(modeloDevolver);
                if (vDevolver == null) {
                    System.out.println("Veículo não encontrado.");
                } else if (vDevolver != null) {
                    locadora.devolverVeiculo(vDevolver);
                }
                break;
            case 8:
                System.out.println("Saindo do Sistema...");
                return ;
            default:
                System.out.println("Opcao Invalida!");
                break;
        }
        }
}
}
