from app.database.Database import db
from sqlalchemy import Integer
from sqlalchemy import String

class Falha(db.Model):
    __tablename__ = 'falha'
    id =db.Column(db.Integer, primary_key=True)
    tipo=db.Column(db.String(50), nullable=False)
    data=db.Column(db.String(50), nullable=False)
    material_id=db.Column(db.Integer,db.ForeignKey('material.id'), nullable=False)
    
    material=db.relationship('Material', back_populates='falha')
    etapa=db.relationship('Etapa', back_populates='falha')

    def to_dict(self):
        return{"id": self.id,"tipo":self.tipo,"data":self.data,}