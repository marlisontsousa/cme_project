from app.database.Database import db
from app.model.material_model import Material
import hashlib
from datetime import datetime

class MaterialService:
     
    @staticmethod
    def gerar_serial(data):
        prefixo_nome =''.join(filter(str.isalnum, data['nome'].lower()))[:5]
        hash_part = hashlib.sha256(data['nome'].encode()).hexdigest()[:6]
        data_part =datetime.now().strftime("%y%m%d")
        serial = f"{prefixo_nome}{hash_part}{data_part}"
        return serial
    
    @staticmethod
    def criar_material(data):
        serial1=MaterialService.gerar_serial(data)
        material=Material(nome=data['nome'],tipo=data['tipo'],data_validade=data['data_validade'],serial=serial1)
        db.session.add(material)
        db.session.commit()
        return material
    
    @staticmethod
    def buscar_material():
        return Material.query.all()

    @staticmethod
    def buscar_por_serial(serial):
        material = Material.query.filter_by(serial=serial).first()
        
        if not material:
            return None

        return {
            'id': material.id,
            'nome': material.nome,
            'tipo': material.tipo,
            'data_validade': material.data_validade,
            'serial': material.serial
        }