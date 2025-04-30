from app.database.Database import db
from sqlalchemy import Integer
from sqlalchemy import String

class Material(db.Model):
    __tablename__ = 'material'
    id =db.Column(db.Integer, primary_key=True)
    nome=db.Column(db.String(100), nullable=False)
    tipo=db.Column(db.String(50), nullable=False)
    data_validade=db.Column(db.String(50),nullable=False)
    serial=db.Column(db.String, nullable=False)

    processos=db.relationship('Processo', back_populates='material')
    falha=db.relationship('Falha', back_populates='material')
    etapa=db.relationship('Etapa', back_populates='material')
    

    def to_dict(self):
        return{"id": self.id,"nome":self.nome,"tipo":self.tipo,"data_validade":self.data_validade,"serial":self.serial}