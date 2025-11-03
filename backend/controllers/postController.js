const Post = require('../models/Post');
const User = require('../models/User'); 

/**
 * @route  
 * @desc   
 */
const criarPost = async (req, res) => {
  try {
    
    const { titulo, texto, usuarioId } = req.body; 

    if (!titulo || !texto || !usuarioId) {
      return res.status(400).json({ msg: 'Por favor, inclua título, texto e ID do usuário.' });
    }
    
    const usuario = await User.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    const novoPost = new Post({
      titulo,
      texto,
      usuario: usuarioId, 
    });

    const post = await novoPost.save();
    res.status(201).json(post); 

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

/**
 * @route   
 * @desc    
 */
const listarPosts = async (req, res) => {
  try {
    const posts = await Post.find()
                            .populate('usuario', 'username') 
                            .sort({ createdAt: -1 });
    res.json(posts);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

/**
 * @route   
 * @desc    
 */
const obterPostPorId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
                           .populate('usuario', 'username');

    if (!post) {
      return res.status(404).json({ msg: 'Post não encontrado' });
    }
    res.json(post);

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post não encontrado' });
    }
    res.status(500).send('Erro no Servidor');
  }
};

module.exports = {
  criarPost,
  listarPosts,
  obterPostPorId,
};