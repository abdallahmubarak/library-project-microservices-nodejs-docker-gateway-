  
const express = require('express');
const router = express.Router();
const orders = require('../controllers/order.controllers')
 
router.post('/createOrder',orders.createOrder)
router.get('/all',orders.findAll)
router.get('/findOneOrder/:id',orders.findOneOrder)
router.post('/updateOrder/:id',orders.updateOrder)
router.delete('/deleteOrder/:id',orders.deleteOrder)

module.exports = router;