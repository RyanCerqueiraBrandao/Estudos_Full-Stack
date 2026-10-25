def areabase(diametro):
    pi = 3.14159
    return pi * (diametro / 2) ** 2
def perimetro(diametro):
    pi = 3.14159
    return pi * diametro
def capacidadetomlinson(comprimento, diametro, coesaosolo):
    qponta = coesaosolo * (1 + 0.2 * comprimento / diametro)
    fponta = qponta * areabase(diametro)
    
    qlateral = 0.5 * coesaosolo * perimetro(diametro) * comprimento
    return fponta + qlateral
def capacidademeyerhof(comprimento, diametro, coesaosolo):
    qponta = coesaosolo * (1 + 0.4 * comprimento / diametro)
    fponta = qponta * areabase(diametro)
    
    qlateral = 0.7 * coesaosolo * perimetro(diametro) * comprimento
    return fponta + qlateral
def capacidadevesic(comprimento, diametro, coesaosolo):
    qponta = coesaosolo * (1 + 0.3 * comprimento / diametro)
    fponta = qponta * areabase(diametro)
    
    qlateral = 0.6 *  coesaosolo* perimetro(diametro) * comprimento
    return fponta + qlateral
def capacidadeskempton(tipo, diametro, coesaosolo):
    if tipo == "fricção" or tipo == 'fricçao' or tipo == 'FRICÇAO':
        return 0  
    else:
        qponta = coesaosolo * 9  
        fponta = qponta * areabase(diametro)
        return fponta
def capacidadeterzaghi(comprimento, diametro, coesaosolo, anguloatrito, densidade):
    pi = 3.14159
    tananguloatrito = anguloatrito * (pi / 180)  
    Nq = 1 + 0.4 * (tananguloatrito ** 2)
    Nc = 9
    fponta = (coesaosolo * Nc + 0.5 * densidade * comprimento * Nq) * areabase(diametro)
    
    qlateral = coesaosolo * perimetro(diametro) * comprimento
    return fponta + qlateral
tipo = input("Digite o tipo de estaca: ")
comprimento = float(input("Digite o comprimento da estaca em metros: "))
diametro = float(input("Digite o diâmetro da estaca em metros: "))
coesaosolo = float(input("Digite a coesão do solo em kPa: "))
anguloatrito = float(input("Digite o ângulo de atrito do solo em graus: "))
densidade = float(input("Digite a densidade do solo em kN/m³: "))
capacidade_tomlinson = capacidadetomlinson(comprimento, diametro, coesaosolo)
capacidade_meyerhof = capacidademeyerhof(comprimento, diametro, coesaosolo)
capacidade_vesic = capacidadevesic(comprimento, diametro, coesaosolo)
capacidade_skempton = capacidadeskempton(tipo, diametro, coesaosolo)
capacidade_terzaghi = capacidadeterzaghi(comprimento, diametro, coesaosolo, anguloatrito, densidade)
print(f"Capacidade de carga pelo método de Tomlinson: {capacidade_tomlinson} kN")
print(f"Capacidade de carga pelo método de Meyerhof: {capacidade_meyerhof} kN")
print(f"Capacidade de carga pelo método de Vesic: {capacidade_vesic} kN")
print(f"Capacidade de carga pelo método de Skempton: {capacidade_skempton} kN")
print(f"Capacidade de carga pelo método de Terzaghi: {capacidade_terzaghi} kN")
