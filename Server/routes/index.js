const Router = require('express').Router
const UserController = require('../controllers/user-controller')
const router = new Router()
const {body} = require('express-validator')
const AuthMiddleware = require('../middleware/auth-middleware')


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.registration)

router.post('/login',
    UserController.login)

router.post('/logout',
    UserController.logout)

router.get('/refresh',
    UserController.refresh)

module.exports = router