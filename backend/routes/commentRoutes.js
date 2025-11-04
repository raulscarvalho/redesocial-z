const express = require('express');
const router = express.Router();
const {
  criarComentario,
  listarComentariosDoPost,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/:postId', listarComentariosDoPost);

router.post('/', protect, criarComentario); 

module.exports = router;