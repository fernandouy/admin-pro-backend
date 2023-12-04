/* 
  Busquedas
  Path: /api/todo/:busqueda
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColección } = require('../controllers/busqueda');
const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColección);

module.exports = router;