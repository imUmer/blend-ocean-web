const express = require('express');
const {getAllModel, getEAModel, createModel, getModels, searchModel, deleteModel } = require('../controllers/modelController')
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', getAllModel);
router.get('/chunk', getModels);
router.get('/eamodels', getEAModel);
router.get('/search', searchModel);
router.post('/create', createModel);
router.delete('/:id', deleteModel); // Delete user


module.exports = router;