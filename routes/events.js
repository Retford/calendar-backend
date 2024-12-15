/**
 * Event Routes
 * /api/events
 */

const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const isDate = require('../helpers/isDate');

const router = Router();

// Todas tienen que pasar por la validación de JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento

router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  createEvent
);

// Actualizar Evento
router.put('/:id', updateEvent);

// Eliminar Evento
router.delete('/:id', deleteEvent);

module.exports = router;
