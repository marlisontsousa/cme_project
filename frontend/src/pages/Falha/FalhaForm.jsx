import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function FalhaForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const falhaEdit = location.state?.falha || null;

  const [formData, setFormData] = useState({
    tipo: '',
    data: '',
    material_id: ''
  });

  const [materiais, setMateriais] = useState([]);

  useEffect(() => {
    const carregarMateriais = async () => {
      try {
        const res = await api.get('/materiais');
        setMateriais(res.data);
      } catch (err) {
        alert('Erro ao carregar materiais');
      }
    };

    carregarMateriais();

    if (falhaEdit) {
      setFormData(falhaEdit);
    }
  }, [falhaEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (falhaEdit) {
        await api.put(`/falhas/${formData.id}`, formData);
      } else {
        await api.post('/falhas', formData);
      }
      navigate('/falhas');
    } catch (error) {
      alert('Erro ao salvar falha');
    }
  };

  return (
    <div>
      <h2>{falhaEdit ? 'Editar Falha' : 'Cadastrar Falha'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="tipo" placeholder="Tipo" value={formData.tipo} onChange={handleChange} required />
        <input name="data" placeholder="Data" value={formData.data} onChange={handleChange} required />
        
        <select name="material_id" value={formData.material_id} onChange={handleChange} required>
          <option value="">Selecione um material</option>
          {materiais.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome} - {m.serial}
            </option>
          ))}
        </select>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FalhaForm;
