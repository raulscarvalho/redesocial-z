import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/api';

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Username e password são obrigatórios.');
      return;
    }
    if (password.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    try {
      setLoading(true);
      const dadosUsuario = { username, password };

      await registrarUsuario(dadosUsuario);
      navigate('/'); 

    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Falha ao registrar. Tente novamente.');
      }
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Página de Cadastro</h2>
      <p>Crie uma nova conta para postar e comentar.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username:</label> <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label> <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Cadastro;