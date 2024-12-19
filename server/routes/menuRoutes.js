const express = require('express');
const {getAllMenu, createMenu} = require('../controllers/menuController');
const router = express.Router();

router.get('/', getAllMenu);
router.post('/create', createMenu);

module.exports = router;