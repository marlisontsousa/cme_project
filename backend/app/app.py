from flask import Flask
from app.database.Database import db
from app.controller.funcionario_controller import funcionario_db
from app.controller.material_controller import material_bp
from app.controller.falha_controller import falha_db
from app.controller.etapa_controller import etapa_bp
from app.controller.processo_controller import processo_db
from config import Config
from flask_cors import CORS
def create_app():
    app =Flask(__name__)
    CORS(app)
    app.config.from_object(Config)


    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(funcionario_db)
    app.register_blueprint(material_bp)
    app.register_blueprint(falha_db)
    app.register_blueprint(etapa_bp)
    app.register_blueprint(processo_db)
    

    return app