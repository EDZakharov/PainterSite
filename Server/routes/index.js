const Router = require('express').Router
const AdminController = require('../controllers/admin-controller')

const router = new Router()


router.post('/registration', AdminController.registration)
router.post('/login', AdminController.login)
router.post('/logout', AdminController.logout)
router.get('/refresh', AdminController.refresh)

module.exports = router