import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarNovoPost } from '../services/api';

const CriarPost = () => {

  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!titulo || !texto) {
      setError('O título e o texto são obrigatórios.');
      return; 
    }

    try {
      setLoading(true); 
      setError(null); 

      const dadosPost = { titulo, texto };
      await criarNovoPost(dadosPost);
      navigate('/'); 

    } catch (err) {
      console.error('Erro ao criar post:', err);
      
      if (err.response && err.response.status === 401) {
        setError('Você não está autorizado a criar posts. Faça login novamente.');

      } else {
        setError('Falha ao criar o post. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Criar Novo Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="titulo">Título:</label> <br />
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="texto">Texto:</label> <br />
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows="5"
            style={{ width: '300px' }}
          />
        </div>

        {/* Mensagens de erro amigáveis (Requisito) */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Desabilita o botão durante o loading */}
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Post'}
        </button>
      </form>
    </div>
  );
};

export default CriarPost;