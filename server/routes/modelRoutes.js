const express = require('express');
const {getAllModel, createModel } = require('../controllers/modelController')
const router = express.Router();

router.get('/', getAllModel);
router.get('/create', createModel);


module.exports = router;