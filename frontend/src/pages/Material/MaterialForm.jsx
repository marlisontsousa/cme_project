import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function MaterialForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const materialEdit = location.state?.material || null;

  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    data_validade: '',
    serial: ''
  });

  useEffect(() => {
    if (materialEdit) {
      setFormData(materialEdit);
    }
  }, [materialEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (materialEdit) {
        await api.put(`/material/${formData.id}`, formData);
      } else {
        await api.post('/material', formData);
      }
      navigate('/materiais');
    } catch (error) {
      alert('Erro ao salvar material');
    }
  };

  return (
    <div>
      <h2>{materialEdit ? 'Editar Material' : 'Cadastrar Material'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
        <input name="tipo" placeholder="Tipo" value={formData.tipo} onChange={handleChange} required />
        <input name="data_validade" placeholder="Data de Validade" value={formData.data_validade} onChange={handleChange} required />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default MaterialForm;
