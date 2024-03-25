  
const router = require("express").Router()
const books = require('../controllers/book')
const auth =require('../../user/config/jwt')

router.post('/createBook',auth,books.createBook)
router.get('/all',books.getAllBooks)
router.get('/fineOne/:id',books.getBook)
router.post('/update/:id',books.updateBook)
router.delete('/deleteOne/:id',books.deleteBook)
//router.post('/buy',auth,books.buy)


module.exports = router;