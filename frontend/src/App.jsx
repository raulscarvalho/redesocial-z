import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, usuario, logout } = useAuth();

  const navStyle = {
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    ...linkStyle,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  return (
    <div>
      <nav style={navStyle}>
        <div>
          <Link to="/" style={linkStyle}>
            Todos os Posts
          </Link>
          {isAuthenticated && (
            <Link to="/criar-post" style={linkStyle}>
              Criar Post
            </Link>
          )}
        </div>

        <div>
          {isAuthenticated ? (
            // se estiver logado
            <>
              <span style={{ marginRight: '1rem' }}>
                Olá, <strong>{usuario.username}</strong>
              </span>
              <button onClick={logout} style={buttonStyle}>
                Logout
              </button>
            </>
          ) : (
            // se nao estiver logado
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              <Link to="/cadastro" style={linkStyle}>
                Cadastro
              </Link>
            </>
          )}
        </div>
      </nav>

      <hr />

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;