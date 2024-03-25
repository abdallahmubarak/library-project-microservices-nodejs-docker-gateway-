const router = require("express").Router()
const User = require('../controllers/user.controllers')

router.post('/signup', User.signup)
router.post('/login', User.login)
router.post('./forgetPassword',User.forgetPassword)
router.get('/users',User.findAllUsers)
router.get('/user/:id',User.findOneUser)
router.post('/updateUser/:id',User.updateUser)
router.delete('/deleteuser/:id',User.deleteUser)

module.exports = router;