from app.database.Database import db
from sqlalchemy import Integer
from sqlalchemy import String


class Processo(db.Model):
    __tablename__ ='processo'

    id=db.Column(db.Integer, primary_key=True)
    status=db.Column(db.String(50), nullable=False)
    funcionario_id=db.Column(db.Integer,db.ForeignKey('funcionario.id'), nullable=False)
    material_id=db.Column(db.Integer,db.ForeignKey('material.id'), nullable=False)
    etapa_id=db.Column(db.Integer,db.ForeignKey('etapa.id'),nullable=False)
    
    material=db.relationship('Material', back_populates='processos')
    etapa=db.relationship('Etapa', back_populates='processos')
    funcionario=db.relationship('Funcionario', back_populates='processos')
    



    def to_dict(self):
         return{"id": self.id,"status": self.status,'funcionario':self.funcionario.to_dict(),'material':self.material.to_dict(),'etapa':self.etapa.to_dict()}