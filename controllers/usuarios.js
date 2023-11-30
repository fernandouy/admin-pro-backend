const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email role google');

  res.json({
    ok: true,
    msg: 'Get Usuarios',
    usuarios,
    uid: req.uid,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado',
      });
    }

    const usuario = new Usuario(req.body);

    // Guardar usuario
    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: 'Post Usuario',
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, revisar logs',
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID',
      });
    }

    const { email, google, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email',
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findOneAndUpdate({ _id: uid }, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, revisar logs',
    });
  }
};

const borrarUsuario = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID',
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, revisar logs',
    });
  }
};

module.exports = {
  actualizarUsuario,
  crearUsuario,
  obtenerUsuarios,
  borrarUsuario,
};
