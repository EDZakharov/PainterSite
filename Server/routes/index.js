const Router = require('express').Router
const UserController = require('../controllers/user-controller')
const ImageController = require('../controllers/image-controller')
const BiographyController = require('../controllers/Biography-controlle')
const router = new Router()
const {body} = require('express-validator')
const AuthMiddleware = require('../middleware/auth-middleware')
const upload = require('../middleware/upload-middleware')


//ALL-QUERIES
router.get('/images',
    ImageController.getImagesList)
router.get('/imagesByCategory',
    ImageController.getImageByCategoryName)
router.get('/biography',
    BiographyController.getBio)
//ADMIN-PANEL-QUERIES
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

router.patch('/patchBio',
    AuthMiddleware,
    BiographyController.patchBio)
router.post('/upload',
    //AuthMiddleware,
    upload.single('image'),
    ImageController.upload)
router.delete('/delete',
    AuthMiddleware,
    ImageController.delete)
router.patch('/patch',
    AuthMiddleware,
    ImageController.patch)



module.exports = router
