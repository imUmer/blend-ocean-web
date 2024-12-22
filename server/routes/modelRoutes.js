const express = require('express');
const {getAllModel, getEAModel, createModel, getModels, searchModel } = require('../controllers/modelController')
const router = express.Router();

router.get('/', getAllModel);
router.get('/chunk', getModels);
router.get('/eamodels', getEAModel);
router.get('/search', searchModel);
router.post('/create', createModel);


module.exports = router;