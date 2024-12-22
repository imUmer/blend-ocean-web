const express = require('express');
const {getAllModel, getEAModel, createModel, getModels } = require('../controllers/modelController')
const router = express.Router();

router.get('/', getAllModel);
router.get('/chunk', getModels);
router.get('/eamodels', getEAModel);
router.post('/create', createModel);


module.exports = router;