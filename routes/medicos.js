/* 
  Medicos
  Path: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', obtenerMedicos);
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser válido').isMongoId(),
    validarCampos,
  ],
  crearMedico
);
router.put('/:id', actualizarMedico);
router.delete('/:id', borrarMedico);

module.exports = router;
