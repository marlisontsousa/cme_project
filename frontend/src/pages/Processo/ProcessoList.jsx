import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function ProcessoList() {
  const [processos, setProcessos] = useState([]);
  const navigate = useNavigate();

  const carregarProcessos = async () => {
    try {
      const response = await api.get('/processos');
      setProcessos(response.data);
    } catch (error) {
      alert('Erro ao buscar processos');
    }
  };

  useEffect(() => {
    carregarProcessos();
  }, []);

  const handleEdit = (processo) => {
    navigate('/processos/form', { state: { processo } });
  };

  return (
    <div>
      <h2>Processos</h2>
      <button onClick={() => navigate('/processos/form')}>Novo Processo</button>
      <ul>
        {processos.map((p) => (
          <li key={p.id}>
            {p.status} - Func: {p.funcionario_id} - Mat: {p.material_id} - Etapa: {p.etapa_id}
            <button onClick={() => handleEdit(p)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProcessoList;
