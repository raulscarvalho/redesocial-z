import React, { useState, useEffect } from 'react';
import { fetchTodosPosts } from '../services/api'; 
import PostItem from '../components/PostItem'; 

const TodosPosts = () => {

  const [posts, setPosts] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarPosts = async () => {
      try {
        setLoading(true); 
        setError(null); 
        const response = await fetchTodosPosts();
        
        setPosts(response.data); 

      } catch (err) {
        console.error("Erro ao buscar posts:", err);
        setError('Falha ao carregar os posts. Tente novamente.');
      } finally {
        setLoading(false); 
      }
    };

    carregarPosts();
  }, []); 

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Todos os Posts</h2>
      <section>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))
        ) : (
          <p>Nenhum post encontrado.</p>
        )}
      </section>
    </div>
  );
};

export default TodosPosts;