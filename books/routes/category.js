const router = require('express').Router()
const Category = require('../controllers/category')
const auth =require('../../user/config/jwt')

router.post('/createCategory',auth,Category.createCategory)
//router.get('/all',Category.getAllCategory)
router.get('/fineOne/:id',Category.getCategory)
router.post('/update/:id',Category.updateCategory)
router.delete('/deleteOne/:id',Category.deleteCategory)


module.exports = router;
