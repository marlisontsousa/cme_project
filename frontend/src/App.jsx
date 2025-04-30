import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import FuncionarioForm from './pages/Funcionario/FuncionarioForm';
import FuncionarioList from './pages/Funcionario/FuncionarioList';
import MaterialList from './pages/Material/MaterialList';
import MaterialForm from './pages/Material/MaterialForm';
import FalhaList from './pages/Falha/FalhaList';
import FalhaForm from './pages/Falha/FalhaForm';
import EtapaList from './pages/Etapa/EtapaList';
import EtapaForm from './pages/Etapa/EtapaForm';
import ProcessoList from './pages/Processo/ProcessoList';
import ProcessoForm from './pages/Processo/ProcessoForm';
import RastrearSerial from './pages/Rastreamento/RastrearSerial';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/funcionarios" element={<FuncionarioList />} />
        <Route path="/funcionarios/form" element={<FuncionarioForm />} />
        <Route path="/materiais" element={<MaterialList />} />
        <Route path="/materiais/form" element={<MaterialForm />} />
        <Route path="/falhas" element={<FalhaList />} />
        <Route path="/falhas/form" element={<FalhaForm />} />
        <Route path="/etapas" element={<EtapaList />} />
        <Route path="/etapas/form" element={<EtapaForm />} />
        <Route path="/processos" element={<ProcessoList />} />
        <Route path="/processos/form" element={<ProcessoForm />} />
        <Route path="/rastrear" element={<RastrearSerial />} />
      </Routes>
    </div>
  );
}

export default App;