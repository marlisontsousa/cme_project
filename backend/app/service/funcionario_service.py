from app.database.Database import db
from app.model.funcionario_model import Funcionario

class FuncionarioService:
    @staticmethod
    def criar_funcionario(data):
        funcionario=Funcionario(nome=data['nome'],cpf=data['cpf'],funcao=data['funcao'])
        db.session.add(funcionario)
        db.session.commit()
        return funcionario
    
    @staticmethod
    def buscar_funcionario():
        return Funcionario.query.all()