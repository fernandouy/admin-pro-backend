const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const obtenerMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate('hospital', 'nombre img')
    .populate('usuario', 'nombre img');

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res) => {
  const uid = req.uid;

  const hospitalDB = await Hospital.findById(req.body.hospital);

  if (!hospitalDB) {
    return res.status(404).json({
      ok: false,
      msg: 'El hospital no existe',
    });
  }

  const medico = new Medico({
    usuario: uid,
    hospital: hospitalDB._id,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un fallo, hable con el administrador',
    });
  }
};

const actualizarMedico = async (req, res) => {
  res.json({
    ok: true,
    msg: 'Actualizar médico',
  });
};

const borrarMedico = async (req, res) => {
  res.json({
    ok: true,
    msg: 'Borrar médico',
  });
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
