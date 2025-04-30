import React, { useState } from 'react';
import api from '../../services/api';

function RastrearSerial() {
  const [serial, setSerial] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const buscarSerial = async () => {
    setErro('');
    setResultado(null);

    try {
      const res = await api.get(`/processo/rastrear/${serial}`);
      setResultado(res.data.dados);
    } catch (err) {
      setErro('Serial não encontrado');
    }
  };

  const baixarRelatorio = (tipo) => {
    const url = `/processo/relatorio/pdf/${serial}`;
    window.open(api.defaults.baseURL + url, '_blank');
  };

  const baixarRelatorio2 = (tipo) => {
    const url = `/processo/relatorio/excel/${serial}`;
    window.open(api.defaults.baseURL + url, '_blank');
  };

  return (
    <div>
      <h2>Rastrear Serial</h2>
      <input
        type="text"
        placeholder="Digite o serial"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />
      <button onClick={buscarSerial}>Buscar</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {resultado && (
        <div>
          <h3>Resultado</h3>
          <thead>
          <tr>
          <th>id material</th>
          <th>nome material</th>
          <th>tipo</th>
          <th>data validade</th>
          <th>serial</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td key={resultado.id}>{resultado.id}</td>
          <td key={resultado.id}>{resultado.nome}</td>
          <td key={resultado.id}>{resultado.tipo}</td>
          <td key={resultado.id}>{resultado.data_validade}</td>
          <td key={resultado.id}>{resultado.serial}</td>
          </tr>
          </tbody>
          <button onClick={() => baixarRelatorio('pdf')}>Baixar PDF</button>
          <button onClick={() => baixarRelatorio2('excel')}>Baixar Excel</button>
        </div>
      )}
    </div>
  );
}

export default RastrearSerial;
