  
const router = require("express").Router()
const books = require('../controllers/book.controllers')
const auth =require('../../midderlware/jwt')

router.post('/createBook',auth,books.createBook)
router.get('/all',books.findAllBooks)
router.get('/fineOne/:id',books.findOne)
router.post('/update/:id',books.updateBook)
router.delete('/deleteOne/:id',books.deleteBook)
router.post('/buy',auth,books.buy)


module.exports = router;