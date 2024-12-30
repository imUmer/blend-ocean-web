const express = require('express');
const {getAllMenu, createMenu, createSubMenu, getMenuWithSubmenus} = require('../controllers/menuController');
const router = express.Router();

// Menu
router.get('/', getAllMenu);
router.post('/create', createMenu);

// SubMenu
router.get('/submenu', (req,res)=> {
    res.send("Haha");
});
router.get('/:menuId/', getMenuWithSubmenus);
router.post('/:menuId/submenu/create', createSubMenu);

module.exports = router;