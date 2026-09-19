from email_validator import validate_email, EmailNotValidError

user_bd = "Jorge"
senha_bd = "123"
email_bd = "jorge@gmail.com"

def login (usuario,senha,email):
    if (validar_email(email) == True):
        if(usuario != user_bd or senha != senha_bd or email!= email_bd):
            return False
        else:
            return True
    else:
        return False    

def validar_email(email):
    try:
        validate_email(email.strip(), check_deliverability=False)
        return True
    except EmailNotValidError :
        return False

def desconto(valor,cliente_vip):
    valor_com_desconto = valor
    if(cliente_vip == True):
        valor_com_desconto = valor*0.9
        return valor_com_desconto
    else:
        return valor_com_desconto

