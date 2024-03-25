  
const router = require("express").Router()
const Brand = require('../controllers/brand')
const auth =require('../../user/config/jwt')

router.post('/createBrand',auth,Brand.createBrand)
//router.get('/all',Brand.getAllBrands)
router.get('/fineOne/:id',Brand.getBrand)
router.post('/update/:id',Brand.updateBrand)
router.delete('/deleteOne/:id',Brand.deleteBrand)


module.exports = router;