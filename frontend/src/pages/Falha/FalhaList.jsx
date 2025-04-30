import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function FalhaList() {
  const [falhas, setFalhas] = useState([]);
  const navigate = useNavigate();

  const carregarFalhas = async () => {
    try {
      const response = await api.get('/falhas');
      setFalhas(response.data);
    } catch (error) {
      alert('Erro ao buscar falhas');
    }
  };

  useEffect(() => {
    carregarFalhas();
  }, []);

  const handleEdit = (falha) => {
    navigate('/falhas/form', { state: { falha } });
  };

  return (
    <div>
      <h2>Falhas</h2>
      <button onClick={() => navigate('/falhas/form')}>Nova Falha</button>
      <ul>
        {falhas.map((f) => (
          <li key={f.id}>
            {f.tipo} - {f.data} - Material ID: {f.material_id}
            <button onClick={() => handleEdit(f)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FalhaList;
