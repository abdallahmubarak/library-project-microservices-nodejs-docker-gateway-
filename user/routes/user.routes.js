const router = require("express").Router()
const User = require('../controllers/user.controllers')

router.post('/createUser', User.createUser)
router.post('/login', User.loginUser)
router.get('/users',User.findAllUsers)
router.get('/user/:id',User.findOneUser)
router.post('/updateUser/:id',User.updateUser)
router.delete('/deleteuser/:id',User.deleteUser)

module.exports = router;