from app.database.Database import db
from app.model.falha_model import Falha

class FalhaService:
    @staticmethod
    def criar_falha(data):
        falha=Falha(tipo=data['tipo'],data=data['data'],material_id=data['material_id'])
        db.session.add(falha)
        db.session.commit()
        return falha