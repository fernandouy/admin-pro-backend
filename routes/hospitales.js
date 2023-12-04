/* 
  Hospitales
  Path: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  obtenerHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require('../controllers/hospitales');
const router = Router();

router.get('/', validarJWT, obtenerHospitales);
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);
router.put('/:id', validarJWT, actualizarHospital);
router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;
