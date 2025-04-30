from app.model.material_model import Material
from app.service.material_service import MaterialService
from flask import jsonify,request,Blueprint

material_bp =Blueprint('material', __name__, url_prefix='/material')

@material_bp.route('/', methods=['POST'])
def create_material():
    data=request.get_json()
    material=MaterialService.criar_material(data)
    return jsonify(material.to_dict())

@material_bp.route('/',methods=['GET'])
def buscar_material():
    material=MaterialService.buscar_material()
    return jsonify([u.to_dict() for u in material])


@material_bp.route('/buscar/<serial>', methods=['GET'])
def buscar_serial(serial):
    resultado = MaterialService.buscar_por_serial(serial)

    if not resultado:
        return jsonify({'sucesso': False, 'mensagem': 'Serial não encontrado'}), 404

    return jsonify({'sucesso': True, 'dados': resultado}), 200