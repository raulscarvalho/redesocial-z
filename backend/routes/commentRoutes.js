const express = require('express');
const router = express.Router();

const {
  criarComentario,
  listarComentariosDoPost,
} = require('../controllers/commentController');

router.post('/', criarComentario);

router.get('/:postId', listarComentariosDoPost);

module.exports = router;