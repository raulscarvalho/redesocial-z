import React from 'react';
import { Link } from 'react-router-dom'; 

const PostItem = ({ post }) => {
  const postStyle = {
    border: '1px solid #ddd',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <article style={postStyle}>
      <h2>
        <Link to={`/posts/${post._id}`}>{post.titulo}</Link>
      </h2>

      <p>
        <small>Por: {post.usuario?.username || 'Autor desconhecido'}</small>
      </p>

      <p>{post.texto.substring(0, 100)}...</p>
      
      <Link to={`/posts/${post._id}`}>Ler mais</Link>
    </article>
  );
};

export default PostItem;