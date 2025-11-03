const express = require('express');
const router = express.Router();

const { 
  criarPost, 
  listarPosts, 
  obterPostPorId 
} = require('../controllers/postController'); 

router.post('/', criarPost);
router.get('/', listarPosts);
router.get('/:id', obterPostPorId);

module.exports = router; 