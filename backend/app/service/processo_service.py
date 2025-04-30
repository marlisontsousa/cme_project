from app.database.Database import db
from app.model.funcionario_model import Funcionario
from app.model.material_model import Material
from app.service.material_service import MaterialService
from app.model.etapa_model import Etapa
from app.model.processo_model import Processo
from reportlab.pdfgen import canvas
from openpyxl import Workbook
from flask import send_file,abort
import io

class ProcessoService:
    @staticmethod
    def criar_processo(data):
        processo=Processo(status=data['status'],funcionario_id=data['funcionario_id'],material_id=data['material_id'],etapa_id=data['etapa_id'])
        db.session.add(processo)
        db.session.commit()
        return processo

    @staticmethod
    def buscar_processo():
        return Processo.query.all()

    @staticmethod
    def buscar_serial(serial):
        material=Material.query.filter_by(serial=serial).first_or_404()
        resultado={
            'serial':material.serial,
            'processo':[]
        }
        for processo in material.processos:
            processo_dict={
                'id': processo.id,
                'status': processo.status,
                'etapa': processo.etapa.etapas if processo.etapa else None,
                'falhas': []
            }
            if processo.etapa and processo.etapa.falha:
                processo_dict['falhas'].append({
                'id': processo.etapa.falha.id,
                'tipo': processo.etapa.falha.tipo
                })  
            resultado['processo'].append(processo_dict)

        return resultado

    @staticmethod
    def gerar_relatorio(serial):
       dados=ProcessoService.buscar_serial(serial)
       if not dados:
           return None
       
       buffer = io.BytesIO()
       p= canvas.Canvas(buffer)

       y=800

       p.drawString(100,y,f"Relatorio do serial :{dados['serial']}")

       for processo in dados['processo']:
           y-=20
           p.drawString(100,y,f"Etapa:{processo['etapa']} | Status:{processo['status']}")
           if processo['falhas']:
               for falha in processo['falhas']:
                   y-=15
                   p.drawString(120,y,f"Falha:{falha['tipo']}")

       p.save()
       buffer.seek(0)
       return buffer



    @staticmethod
    def gerar_relatorio_excel(serial):
        material = Material.query.filter_by(serial=serial).first()

        if not material:
            abort(404, description="Material não encontrado")

       
        wb = Workbook()
        ws = wb.active
        ws.title = "Relatório de Processos"

        
        ws.append(["Serial", "Etapa", "Status", "Falha"])

        
        for processo in material.processos:
            etapa = processo.etapa.etapas if processo.etapa else "N/A"
            status = processo.status
            falha = processo.etapa.falha.tipo if processo.etapa and processo.etapa.falha else "Sem falha"
            ws.append([material.serial, etapa, status, falha])

        
        buffer = io.BytesIO()
        wb.save(buffer)
        buffer.seek(0)

        return buffer

                