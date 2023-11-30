/* 
Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  obtenerUsuarios,
  actualizarUsuario,
  crearUsuario,
  borrarUsuario,
} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, obtenerUsuarios);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El nombre es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El nombre es obligatorio').isEmail(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete(
  '/:id',
  [validarJWT, check('id', 'No es un ID valido').isMongoId(), validarCampos],
  borrarUsuario
);

module.exports = router;
