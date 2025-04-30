import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function MaterialList() {
  const [materiais, setMateriais] = useState([]);
  const navigate = useNavigate();

  const carregarMateriais = async () => {
    try {
      const response = await api.get('/material');
      setMateriais(response.data);
    } catch (error) {
      alert('Erro ao buscar materiais');
    }
  };

  useEffect(() => {
    carregarMateriais();
  }, []);

  const handleEdit = (material) => {
    navigate('/materiais/form', { state: { material } });
  };

  return (
    <div>
      <h2>Materiais</h2>
      <button onClick={() => navigate('/materiais/form')}>Novo Material</button>
      <ul>
        {materiais.map((m) => (
          <li key={m.id}>
            {m.nome} - {m.tipo} - {m.serial}
            <button onClick={() => handleEdit(m)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaterialList;
