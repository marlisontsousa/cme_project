from app.model.funcionario_model import Funcionario
from app.service.funcionario_service import FuncionarioService
from flask import jsonify,request,Blueprint

funcionario_db = Blueprint('funcionario', __name__, url_prefix='/funcionario')

@funcionario_db.route('/',methods=['POST'])
def criar_funcionario():
    data=request.get_json()
    funcionario=FuncionarioService.criar_funcionario(data)
    return jsonify(funcionario.to_dict())

@funcionario_db.route('/',methods=['GET'])
def buscar_funcionario():
    funcionario=FuncionarioService.buscar_funcionario()
    return jsonify([u.to_dict() for u in funcionario])