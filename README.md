# Desafio Tecnico fullStack

Este projeto foi desenvolvido como parte de um desafio técnico. O objetivo foi criar uma aplicação web para gerenciar os processos de uma Central de Materiais e Esterilização (CME), com foco em rastreabilidade, controle de falhas e gerenciamento de usuários e materiais hospitalares.

 Importante: O projeto ainda está em desenvolvimento. Até o momento, foram implementadas as entidades principais e os endpoints de cadastro e busca de funcionários.

 # Funcionalidades Implementadas
 
 - Estruturação inicial do backend em Python com Flask

 - Estruturação do frontend com React + Vite

 - Configuração do banco de dados PostgreSQL com Docker

 - Docker Compose com serviços de backend, frontend e banco de dados

 - Cadastro e busca de funcionários

 - Geração de relatórios (PDF e XLSX)

 Criação das entidades:

- Funcionário

- Material

- Etapa

- Falha

- Processo

# Funcionalidades pendentes
 
 
 - Implementação dos demais endpoints (materiais, processos, rastreabilidade, falhas)

 - Validação completa de etapas por serial

 - Interface frontend para Login e outras funcionalidades

 - Sistema completo de autenticação e perfis de acesso

 - Testes automatizados

 - Documentação com Swagger ou Postman

# Estrutura do Projeto.

O projeto foi dividido em backend (Flask) e frontend (React), com padrão arquitetural MVC + Repository no backend para facilitar a manutenção e escalabilidade.

Entidades no backend:

*Funcionario – técnicos, enfermagem e administradores

*Material – materiais a serem esterilizados

*Etapa – etapas do processo (recebimento, lavagem, esterilização, distribuição)

*Falha – controle de falhas por serial

*Processo – rastreamento do ciclo de esterilização

# Tecnologia Utilizadas.

# Backend:

Python 3.10+

Flask

SQLAlchemy

PostgreSQL

Docker + Docker Compose

# Frontend:

React

Vite

Axios

Docker

# Como rodar o projeto
Você precisará ter o Docker e o Docker Compose instalados.


# Clone o repositório
git clone (https://github.com/marlisontsousa/cme_project.git)

# Acesse a pasta do projeto
cd nome-do-repositorio

# Suba os containers
docker-compose up --build
O backend estará disponível em http://localhost:5000, e o frontend em http://localhost:3000.

 Perfis de Usuários Esperados
Técnico – Realiza etapas do processo

Enfermagem – Consulta processos e falhas

Administrador – Cadastra usuários e atribui funções

 # Consideraçoes Finais
Apesar do tempo limitado e do meu conhecimento atual, busquei aplicar boas práticas como separação de responsabilidades (MVC + Repository), uso de containers para padronizar o ambiente e uma base sólida para expansão do projeto.
Mesmo com o projeto ainda incompleto, a experiência foi extremamente rica e me permitiu colocar em prática conceitos essenciais de desenvolvimento full stack. Estou comprometido em continuar evoluindo esse projeto e expandindo as funcionalidades.

Estou disponível para esclarecer qualquer ponto técnico ou discutir as decisões tomadas durante o desenvolvimento.

