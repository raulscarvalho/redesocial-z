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

    // validação do cliente - requisito
    if (!titulo || !texto) {
      setError('O título e o texto são obrigatórios.');
      return; 
    }

    
    const usuarioId = '69091d6573cf9d0d48afb347';
    
    if (usuarioId === 'COLE_O_USER_ID_AQUI') {
        setError('Erro de Configuração: Por favor, adicione o usuarioId no código do CriarPost.jsx');
        return;
    }

    try {
      setLoading(true); 
      setError(null);   

      const dadosPost = { titulo, texto, usuarioId };

      await criarNovoPost(dadosPost);

      setTitulo('');
      setTexto('');
      
      navigate('/'); 

    } catch (err) {

      console.error('Erro ao criar post:', err);
      setError('Falha ao criar o post. Verifique o backend ou tente novamente.');
    } finally {
      setLoading(false); 
    }
  };

  // render do formulário
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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Post'}
        </button>
      </form>
    </div>
  );
};

export default CriarPost;