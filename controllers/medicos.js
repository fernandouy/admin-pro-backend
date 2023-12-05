const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const ObjectId = require('mongoose').Types.ObjectId;

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
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        ok: false,
        msg: 'Id no válido',
      });
    }

    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'Medico no encontrado',
      });
    }

    if (req.body.hospital) {
      const hospitalDB = await Hospital.findById(req.body.hospital);

      if (!hospitalDB) {
        return res.status(404).json({
          ok: false,
          msg: 'El hospital no existe',
        });
      }
    }

    const cambiosMedico = {
      ...req.body,
      usuario: req.uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      msg: 'Actualizar médico',
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const borrarMedico = async (req, res) => {
  const { id } = req.params;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'Médico no encontrado',
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Médico borrado',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
