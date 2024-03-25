const router = require('express').Router()
const subCategory = require('../controllers/subCategory')
const auth =require('../../user/config/jwt')

router.post('/createSubCategory',auth,subCategory.createSubCategory)
//router.get('/all',subCategory.getAllSubCategory)
router.get('/fineOne/:id',subCategory.getSubCategory)
router.post('/update/:id',subCategory.updateSubCategory)
router.delete('/deleteOne/:id',subCategory.deleteSubCategory)


module.exports = router;
