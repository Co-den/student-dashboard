const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/announcementController');
const auth = require('../middleware/auth');


router.get('/', ctrl.list); // public
router.post('/', auth, ctrl.create);
router.delete('/:id', auth, ctrl.remove);


module.exports = router;