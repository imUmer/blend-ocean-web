const express = require('express');
const {getAllModel, getEAModel, createModel } = require('../controllers/modelController')
const router = express.Router();

router.get('/', getAllModel);
router.get('/eamodels', getEAModel);
router.post('/create', createModel);


module.exports = router;