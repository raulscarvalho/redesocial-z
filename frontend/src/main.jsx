import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import App from './App.jsx';
import TodosPosts from './pages/TodosPosts.jsx';
import CriarPost from './pages/CriarPost.jsx';
import PostIndividual from './pages/PostIndividual.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import RotaProtegida from './components/RotaProtegida.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <TodosPosts /> },
      { path: '/posts/:id', element: <PostIndividual /> },
      { path: '/cadastro', element: <Cadastro /> },
      { path: '/login', element: <Login /> },
      
      {
        element: <RotaProtegida />,
        children: [
          {
            path: '/criar-post',
            element: <CriarPost />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);