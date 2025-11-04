import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchTodosPosts = () => api.get('/posts');
export const fetchPostPorId = (id) => api.get(`/posts/${id}`);
export const criarNovoPost = (dadosPost) => api.post('/posts', dadosPost);

export const registrarUsuario = (dadosUsuario) => api.post('/auth/register', dadosUsuario);
export const loginUsuario = (dadosLogin) => api.post('/auth/login', dadosLogin);

export const fetchComentariosDoPost = (postId) => api.get(`/comments/${postId}`);
export const criarNovoComentario = (dadosComentario) => api.post('/comments', dadosComentario);

export default api;