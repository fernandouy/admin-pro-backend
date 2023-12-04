/* 
  Uploads
  Path: /api/uploads
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { uploadFile, obtenerImagen } = require('../controllers/uploads');
const fileUpload = require('express-fileupload');
const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, uploadFile);
router.get('/:tipo/:imagen', obtenerImagen);

module.exports = router;
