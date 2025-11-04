const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @route
 * @desc
 */
const registrarUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Por favor, inclua username e password.' });
    }
    let usuario = await User.findOne({ username });
    if (usuario) {
      return res.status(400).json({ msg: 'Usuário já existe.' });
    }
    usuario = new User({ username, password });
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    await usuario.save();

    const token = generateToken(usuario._id);
    res.status(201).json({
      _id: usuario._id,
      username: usuario.username,
      token: token,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

/**
 * @route
 * @desc
 */
const loginUsuario = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ msg: 'Por favor, inclua username e password.' });
    }

    const usuario = await User.findOne({ username });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const token = generateToken(usuario._id);
    res.status(200).json({
      _id: usuario._id,
      username: usuario.username,
      token: token,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario, 
};