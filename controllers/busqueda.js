const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const { response } = require('express');

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regexp = new RegExp(busqueda, 'i');

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regexp }),
    Medico.find({ nombre: regexp }),
    Hospital.find({ nombre: regexp }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColección = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regexp = new RegExp(busqueda, 'i');

  let data = [];

  switch (tabla) {
    case 'medicos':
      data = await Medico.find({ nombre: regexp })
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');
        
      res.json({
        ok: true,
        resultados: data,
      });
      break;

    case 'hospitales':
      data = await Hospital.find({ nombre: regexp }).populate(
        'usuario',
        'nombre img'
      );
      res.json({
        ok: true,
        resultados: data,
      });
      break;

    case 'usuarios':
      data = await Usuario.find({ nombre: regexp });
      res.json({
        ok: true,
        resultados: data,
      });
      break;

    default:
      res.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser usuarios/medicos/hospitales',
      });
      break;
  }
};

module.exports = {
  getTodo,
  getDocumentosColección,
};
