from app.service.etapa_service import EtapaService
from flask import request,jsonify,Blueprint

etapa_bp=Blueprint('etapa',__name__,url_prefix='/etapa')

@etapa_bp.route('/', methods=['POST'])
def salvar_etapa():
    data=request.get_json()
    etapa=EtapaService.criar_etapa(data)
    return jsonify(etapa.to_dict())
