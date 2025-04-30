import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function ProcessoForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const processoEdit = location.state?.processo || null;

  const [formData, setFormData] = useState({
    status: '',
    funcionario_id: '',
    material_id: '',
    etapa_id: ''
  });

  const [funcionarios, setFuncionarios] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [etapas, setEtapas] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resFunc, resMat, resEtapas] = await Promise.all([
          api.get('/funcionarios'),
          api.get('/materiais'),
          api.get('/etapas'),
        ]);
        setFuncionarios(resFunc.data);
        setMateriais(resMat.data);
        setEtapas(resEtapas.data);
      } catch (err) {
        alert('Erro ao carregar dados');
      }
    };

    carregarDados();

    if (processoEdit) {
      setFormData(processoEdit);
    }
  }, [processoEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (processoEdit) {
        await api.put(`/processos/${formData.id}`, formData);
      } else {
        await api.post('/processos', formData);
      }
      navigate('/processos');
    } catch (error) {
      alert('Erro ao salvar processo');
    }
  };

  return (
    <div>
      <h2>{processoEdit ? 'Editar Processo' : 'Cadastrar Processo'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />

        <select name="funcionario_id" value={formData.funcionario_id} onChange={handleChange} required>
          <option value="">Selecione um funcionário</option>
          {funcionarios.map(f => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>

        <select name="material_id" value={formData.material_id} onChange={handleChange} required>
          <option value="">Selecione um material</option>
          {materiais.map(m => (
            <option key={m.id} value={m.id}>{m.nome} - {m.serial}</option>
          ))}
        </select>

        <select name="etapa_id" value={formData.etapa_id} onChange={handleChange} required>
          <option value="">Selecione uma etapa</option>
          {etapas.map(e => (
            <option key={e.id} value={e.id}>{e.etapas} - {e.data}</option>
          ))}
        </select>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ProcessoForm;
