import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'; 
import TodosPosts from './pages/TodosPosts.jsx';
import CriarPost from './pages/CriarPost.jsx';
import PostIndividual from './pages/PostIndividual.jsx';
import Cadastro from './pages/Cadastro.jsx';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />, 
    children: [
      {
        path: '/', 
        element: <TodosPosts />,
      },
      {
        path: '/criar-post',
        element: <CriarPost />,
      },
      {
        path: '/posts/:id', 
        element: <PostIndividual />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);