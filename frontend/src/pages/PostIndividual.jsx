import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostPorId, fetchComentariosDoPost, criarNovoComentario } from '../services/api';

const PostIndividual = () => {

  const { id } = useParams(); 

  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  
  const [novoComentario, setNovoComentario] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comentarioError, setComentarioError] = useState(null);
  const [comentarioLoading, setComentarioLoading] = useState(false);
  
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        const [resPost, resComentarios] = await Promise.all([
          fetchPostPorId(id),
          fetchComentariosDoPost(id)
        ]);

        setPost(resPost.data);
        setComentarios(resComentarios.data);

      } catch (err) {
        console.error("Erro ao buscar dados do post:", err);
        setError('Falha ao carregar o post ou os comentários.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const handleSubmitComentario = async (e) => {
    e.preventDefault();

    if (!novoComentario) {
      setComentarioError('O comentário não pode estar vazio.');
      return;
    }
    
    const usuarioId = '69091d6573cf9d0d48afb347';
    
    if (usuarioId === 'COLE_O_USER_ID_AQUI') {
        setComentarioError('Erro de Configuração: Adicione o usuarioId no PostIndividual.jsx');
        return;
    }

    try {
      setComentarioLoading(true);
      setComentarioError(null);

      const dadosComentario = {
        texto: novoComentario,
        postId: id,
        usuarioId: usuarioId
      };

      const response = await criarNovoComentario(dadosComentario);

      setNovoComentario('');
      
      const resNovosComentarios = await fetchComentariosDoPost(id);
      setComentarios(resNovosComentarios.data);


    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      setComentarioError('Falha ao enviar o comentário.');
    } finally {
      setComentarioLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  return (
    <div>
      <article>
        <h2>{post.titulo}</h2>
        <p><small>Por: {post.usuario?.username || 'Autor desconhecido'}</small></p>
        <div style={{ whiteSpace: 'pre-wrap', padding: '1rem 0' }}>
          {post.texto}
        </div>
      </article>

      <hr style={{ margin: '2rem 0' }} />

      <section>
        <h3>Comentários</h3>

        <form onSubmit={handleSubmitComentario} style={{ marginBottom: '1.5rem' }}>
          <textarea
            rows="3"
            style={{ width: '100%', maxWidth: '500px' }}
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Escreva seu comentário..."
          />
          <br />
          <button type="submit" disabled={comentarioLoading}>
            {comentarioLoading ? 'Enviando...' : 'Enviar Comentário'}
          </button>
          {comentarioError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{comentarioError}</p>}
        </form>

        <div>
          {comentarios.length > 0 ? (
            comentarios.map(comentario => (
              <div key={comentario._id} style={{ border: '1px solid #eee', padding: '0.5rem 1rem', marginBottom: '1rem' }}>
                <p><strong>{comentario.usuario?.username || 'Usuário'}</strong> disse:</p>
                <p>{comentario.texto}</p>
                <small style={{ color: '#888' }}>
                  {new Date(comentario.createdAt).toLocaleString('pt-BR')}
                </small>
              </div>
            ))
          ) : (
            <p>Seja o primeiro a comentar!</p>
          )}
        </div>
      </section>
      
      <Link to="/" style={{ marginTop: '2rem', display: 'block' }}>
        &larr; Voltar para todos os posts
      </Link>
    </div>
  );
};

export default PostIndividual;