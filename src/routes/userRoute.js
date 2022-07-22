const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')
router.get('/', controller.get);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/', controller.put);
router.put('/:id', controller.put);
router.delete('/', controller.delete);
router.delete('/:id', controller.delete);
module.exports = router;