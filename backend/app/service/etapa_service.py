from app.database.Database import db
from app.model.etapa_model import Etapa

class EtapaService:

    @staticmethod
    def criar_etapa(data):
        etapa=Etapa(etapas=data['etapa'],data=data['data'],material_id=data['material_id'],falha_id=data['falha_id'])
        db.session.add(etapa)
        db.session.commit()
        return etapa