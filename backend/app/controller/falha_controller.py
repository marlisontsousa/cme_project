from app.service.falha_service import FalhaService
from flask import request,jsonify,Blueprint

falha_db=Blueprint('falha',__name__,url_prefix='/falha')

@falha_db.route('/', methods=['POST'])
def salvar_falha():
    data=request.get_json()
    falha=FalhaService.criar_falha(data)
    return jsonify(falha.to_dict())