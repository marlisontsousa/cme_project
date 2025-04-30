import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>CME</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/funcionarios">Funcionários</Link></li>
        <li><Link to="/materiais">Materiais</Link></li>
        <li><Link to="/falhas">Falhas</Link></li>
        <li><Link to="/etapas">Etapas</Link></li>
        <li><Link to="/processos">Processos</Link></li>
        <li><Link to="/rastrear">Rastrear Serial</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;