import React from 'react';
import { Outlet, Link } from 'react-router-dom'; 

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Todos os Posts
        </Link>
        <Link to="/criar-post" style={{ marginRight: '1rem' }}>
          Criar Post
        </Link>
        <Link to="/cadastro">
          Cadastro
        </Link>
      </nav>

      <hr />

      <main>
        <Outlet /> 
      </main>
    </div>
  );
}

export default App;