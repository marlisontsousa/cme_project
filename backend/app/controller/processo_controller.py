from app.service.processo_service import ProcessoService
from app.service.material_service import MaterialService
from flask import send_file
from flask import request,jsonify,Blueprint


processo_db=Blueprint('processo',__name__,url_prefix='/processo')

@processo_db.route('/',methods=['POST'])
def criar_processo():
    data=request.get_json()
    processo=ProcessoService.criar_processo(data)
    return jsonify(processo.to_dict())

@processo_db.route('/', methods=['GET'])
def buscar_processo():
    processo=ProcessoService.buscar_processo()
    return jsonify([u.to_dict() for u in processo])

@processo_db.route('/rastrear/<serial>',methods=['GET'])
def buscar_serial(serial):
    resultado=MaterialService.buscar_por_serial(serial)
    if not resultado:
        return jsonify({'sucesso:':False,'mensagem':'Serial nao encontrado'}), 404
    
    return jsonify({'sucesso':True,'dados':resultado}),200

@processo_db.route('/relatorio/pdf/<serial>', methods=['GET'])
def baixar_pdf(serial):
    buffer = ProcessoService.gerar_relatorio(serial)
    if not buffer:
        return jsonify({'sucesso': False, 'mensagem': 'Serial nao encontrado'}), 404
    
    return send_file(buffer, as_attachment=True, download_name=f'relatorio_{serial}.pdf',mimetype='application/pdf')


@processo_db.route('/relatorio/excel/<serial>', methods=['GET'])
def baixar_excel(serial):
    buffer = ProcessoService.gerar_relatorio_excel(serial)
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f'relatorio_{serial}.xlsx',
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )