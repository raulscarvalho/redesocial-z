import React, { createContext, useContext, useState, useEffect } from 'react';
import { registrarUsuario, loginUsuario } from '../services/api';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioArmazenado = localStorage.getItem('usuarioBlog');
      return usuarioArmazenado ? JSON.parse(usuarioArmazenado) : null;
    } catch (error) {
      console.error("Falha ao ler o localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (usuario && usuario.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`;

      localStorage.setItem('usuarioBlog', JSON.stringify(usuario));
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('usuarioBlog');
    }
  }, [usuario]);

  const login = async (username, password) => {
    const response = await loginUsuario({ username, password });
    setUsuario(response.data);
    return response.data;
  };

  const registro = async (username, password) => {
    const response = await registrarUsuario({ username, password });

    setUsuario(response.data);
    return response.data;
  };

  const logout = () => {
    setUsuario(null);
  };
  const valor = {
    usuario,
    isAuthenticated: !!usuario,
    login,
    logout,
    registro,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};