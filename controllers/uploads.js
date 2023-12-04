const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const e = require('express');

const uploadFile = async (req, res) => {
  const id = req.params.id;
  const tipo = req.params.tipo;

  // Validar tipo
  const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un medico, usuario u hospital',
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningun archivo',
    });
  }

  // Procesar la imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split('.');
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extension permitida',
    });
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen',
      });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: 'Archivo subido',
      nombre: nombreArchivo,
    });
  });
};

const obtenerImagen = async (req, res) => {
  const { tipo, imagen } = req.params;
  let pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

  // Imagen por defecto
  if (fs.existsSync(pathImg)) {
    return res.sendFile(pathImg);
  } else {
    pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    return res.sendFile(pathImg);
  }
};

module.exports = {
  uploadFile,
  obtenerImagen,
};