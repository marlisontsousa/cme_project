from app.database.Database import db
from sqlalchemy import Integer
from sqlalchemy import String

class Funcionario(db.Model):
    __tablename__ = 'funcionario'
    id =db.Column(db.Integer, primary_key=True)
    nome=db.Column(db.String(100), nullable=False)
    cpf=db.Column(db.String(50), nullable=False)
    funcao=db.Column(db.String(50),nullable=False)

    
    processos=db.relationship('Processo', back_populates='funcionario')

    def to_dict(self):
        return{"id": self.id,"nome":self.nome,"cpf":self.cpf,"funcao":self.funcao}