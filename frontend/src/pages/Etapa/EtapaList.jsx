import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function EtapaList() {
  const [etapas, setEtapas] = useState([]);
  const navigate = useNavigate();

  const carregarEtapas = async () => {
    try {
      const response = await api.get('/etapa');
      setEtapas(response.data);
    } catch (error) {
      alert('Erro ao buscar etapas');
    }
  };

  useEffect(() => {
    carregarEtapas();
  }, []);

  const handleEdit = (etapa) => {
    navigate('/etapas/form', { state: { etapa } });
  };

  return (
    <div>
      <h2>Etapas</h2>
      <button onClick={() => navigate('/etapas/form')}>Nova Etapa</button>
      <ul>
        {etapas.map((e) => (
          <li key={e.id}>
            {e.etapas} - {e.data} - Material ID: {e.material_id} {e.falha_id ? `- Falha ID: ${e.falha_id}` : ''}
            <button onClick={() => handleEdit(e)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EtapaList;
