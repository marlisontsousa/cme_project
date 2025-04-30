import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function FuncionarioList() {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  const carregarFuncionarios = async () => {
    try {
      const response = await api.get('/funcionario');
      setFuncionarios(response.data);
    } catch (error) {
      alert('Erro ao buscar funcionários');
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const handleEdit = (funcionario) => {
    navigate('/funcionarios/form', { state: { funcionario } });
  };

  return (
    <div>
      <h2>Funcionários</h2>
      <button onClick={() => navigate('/funcionarios/form')}>Novo Funcionário</button>
      <ul>
        {funcionarios.map((f) => (
          <li key={f.id}>
            {f.nome} - {f.cpf} - {f.funcao}
            <button onClick={() => handleEdit(f)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FuncionarioList;
