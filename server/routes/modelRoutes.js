const express = require('express');
const {getAllModel, getEAModel, createModel, getModels, getModel, searchModel, updateModel, deleteModel } = require('../controllers/modelController')
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', getAllModel);
router.get('/chunk', getModels);
router.get('/eamodels', getEAModel);
router.get('/search', searchModel);
router.get('/:id', getModel);
router.post('/create',protect, admin, createModel);
router.put('/:id', protect, admin, updateModel);
router.delete('/:id', protect, admin, deleteModel); // Delete user


module.exports = router;