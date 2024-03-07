  
const router = require("express").Router()
const books = require('../controllers/book.controllers')
 
router.post('/createBook',books.createBook)
router.get('/all',books.findAllBooks)
router.get('/fineOne/:id',books.findOne)
router.post('/update/:id',books.updateBook)
router.delete('/deleteOne/:id',books.deleteBook)

module.exports = router;