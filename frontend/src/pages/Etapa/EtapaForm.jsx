import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function EtapaForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const etapaEdit = location.state?.etapa || null;

  const [formData, setFormData] = useState({
    etapas: '',
    data: '',
    material_id: '',
    falha_id: ''
  });

  const [materiais, setMateriais] = useState([]);
  const [falhas, setFalhas] = useState([]);

  useEffect(() => {
    const carregarMateriaisEFalhas = async () => {
      try {
        const [resMateriais, resFalhas] = await Promise.all([
          api.get('/material'),
          api.get('/falha'),
        ]);
        setMateriais(resMateriais.data);
        setFalhas(resFalhas.data);
      } catch (err) {
        alert('Erro ao carregar dados');
      }
    };

    carregarMateriaisEFalhas();

    if (etapaEdit) {
      setFormData(etapaEdit);
    }
  }, [etapaEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (etapaEdit) {
        await api.put(`/etapa/${formData.id}`, formData);
      } else {
        await api.post('/etapa', formData);
      }
      navigate('/etapas');
    } catch (error) {
      alert('Erro ao salvar etapa');
    }
  };

  return (
    <div>
      <h2>{etapaEdit ? 'Editar Etapa' : 'Cadastrar Etapa'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="etapas" placeholder="Etapas" value={formData.etapas} onChange={handleChange} required />
        <input name="data" placeholder="Data" value={formData.data} onChange={handleChange} required />
        
        <select name="material_id" value={formData.material_id} onChange={handleChange} required>
          <option value="">Selecione um material</option>
          {materiais.map((m) => (
            <option key={m.id} value={m.id}>{m.nome} - {m.serial}</option>
          ))}
        </select>

        <select name="falha_id" value={formData.falha_id || ''} onChange={handleChange}>
          <option value="">(Opcional) Selecione uma falha</option>
          {falhas.map((f) => (
            <option key={f.id} value={f.id}>{f.tipo} - {f.data}</option>
          ))}
        </select>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EtapaForm;
