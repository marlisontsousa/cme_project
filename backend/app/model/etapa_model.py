from app.database.Database import db
from sqlalchemy import Integer
from sqlalchemy import String

class Etapa(db.Model):
    __tablename__ = 'etapa'
    id=db.Column(db.Integer, primary_key=True)
    etapas=db.Column(db.String(50), nullable=False)
    data=db.Column(db.String(50), nullable=False)
    material_id=db.Column(db.Integer,db.ForeignKey('material.id'), nullable=False)
    falha_id=db.Column(db.Integer,db.ForeignKey('falha.id'))
    
    material=db.relationship('Material', back_populates='etapa')
    falha=db.relationship('Falha', back_populates='etapa')
    processos=db.relationship('Processo', back_populates='etapa')


    def to_dict(self):
        return{"id": self.id,"etapas":self.etapas,"data":self.data,"material":self.material.to_dict(),"falha":self.falha.to_dict()}