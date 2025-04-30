import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

function FuncionarioForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const funcionarioEdit = location.state?.funcionario || null;

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    funcao: ''
  });

  useEffect(() => {
    if (funcionarioEdit) {
      setFormData(funcionarioEdit);
    }
  }, [funcionarioEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (funcionarioEdit) {
        await api.put(`/funcionario/${formData.id}`, formData);
      } else {
        await api.post('/funcionario/', formData);
      }
      navigate('/funcionarios');
    } catch (error) {
      alert('Erro ao salvar funcionário');
    }
  };

  return (
    <div>
      <h2>{funcionarioEdit ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
        <input name="funcao" placeholder="Função" value={formData.funcao} onChange={handleChange} required />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FuncionarioForm;
