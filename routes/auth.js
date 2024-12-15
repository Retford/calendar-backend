/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
  '/new',
  [
    // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.post(
  '/',
  [
    // middleware
    check('email', 'El email es obligatorio').isEmail(),
    check(
      'password',
      'El password debe de tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
