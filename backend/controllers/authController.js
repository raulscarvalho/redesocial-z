
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * @route   
 * @desc    
 */
const registrarUsuario = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ msg: 'Por favor, inclua username e password.' });
    }

    let usuario = await User.findOne({ username });
    if (usuario) {
      return res.status(400).json({ msg: 'Usuário já existe.' });
    }

    usuario = new User({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10); 
    usuario.password = await bcrypt.hash(password, salt); 

    await usuario.save();
    
    const usuarioSalvo = usuario.toObject(); 
    delete usuarioSalvo.password; 

    res.status(201).json(usuarioSalvo);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
};

module.exports = {
  registrarUsuario,
};