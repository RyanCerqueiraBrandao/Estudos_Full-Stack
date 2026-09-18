def menu():
    while True:
        print("\n__________Menu:__________")
        print("Opção 1)")
        print("Opção 2)")
        print("Opção 3)")
        print("Sair 0)")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            print("Você escolheu a Opção 1")
        elif opcao == "2":
            print("Você escolheu a Opção 2")
        elif opcao == "3":
            print("Você escolheu a Opção 3")
        elif opcao == "0":
            print("Saindo...")
            break
        else:
            print("Opção inválida")

menu()
