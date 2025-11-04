
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @route
 * @desc
 */
const criarComentario = async (req, res) => {
  const { texto, postId } = req.body;

  try {
    if (!texto || !postId) {
      return res.status(400).json({ msg: 'Inclua texto e postId.' });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post não encontrado.' });

    const novoComentario = new Comment({
      texto,
      postId,
      usuario: req.usuario._id,
    });

    const comentario = await novoComentario.save();
    res.status(201).json(comentario);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

/**
 * @route
 * @desc
 */
const listarComentariosDoPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comentarios = await Comment.find({ postId: postId })
                                     .populate('usuario', 'username')
                                     .sort({ createdAt: -1 });

    res.json(comentarios);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

module.exports = {
  criarComentario,
  listarComentariosDoPost,
};