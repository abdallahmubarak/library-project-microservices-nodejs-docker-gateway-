const router = require("express").Router()
const User = require('../controllers/user.controllers')
const {auth,authAdmin,authUser} =require('../config/jwt')

router.post('/signup', User.signup)
router.post('/login', User.login)
router.post('./forgetPassword',User.forgetPassword)
router.get('/users',User.findAllUsers)
//router.get('/user/:id',User.findOneUser)
//router.patch('/updateUser/:id',User.updateUser)
//router.delete('/deleteuser/:id',User.deleteUser)

module.exports = router;


//user token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAwNGViOGQxNTM0ZDM3OWZhNzUwMjciLCJpYXQiOjE3MTE1MDY2NDAsImV4cCI6MTcxMTU5MzA0MH0.RgRxiyKeuNLpQxy-mLyxVEybf0PzGugJKL8u1zyS1P4


//admin token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAwNGU3N2QxNTM0ZDM3OWZhNzUwMjUiLCJpYXQiOjE3MTE1MDY3NDAsImV4cCI6MTcxMTU5MzE0MH0.u_Ev9G1cAP_HBrpwNvaqggt5koOCYCeIDycmFPF6Wkg