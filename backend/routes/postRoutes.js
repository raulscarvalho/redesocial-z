const express = require('express');
const router = express.Router();
const { 
  criarPost, 
  listarPosts, 
  obterPostPorId 
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', listarPosts);
router.get('/:id', obterPostPorId);
router.post('/', protect, criarPost); 

module.exports = router;