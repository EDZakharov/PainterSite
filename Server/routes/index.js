const Router = require('express').Router
const UserController = require('../controllers/user-controller')
const ImageController = require('../controllers/image-controller')
const BiographyController = require('../controllers/Biography-controlle')
const ContactsController = require('../controllers/Contacts-controller')
const NewsController = require('../controllers/News-controller')
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
router.get('/contacts',
    ContactsController.getContactsData)
router.get('/getUsersContacts',
    ContactsController.getUsersContactsData)
router.post('/postUsersContacts',
    ContactsController.addUsersContactsData)
router.delete('/delUsersContacts',
    ContactsController.deleteUsersContactsData)

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
router.patch('/patchContacts',
    AuthMiddleware,
    ContactsController.patchContactsData)
router.patch('/patchBio',
    AuthMiddleware,
    BiographyController.patchBio)
router.post('/upload',
    AuthMiddleware,
    upload.single('image'),
    ImageController.upload)
router.delete('/delete',
    AuthMiddleware,
    ImageController.delete)
router.patch('/patch',
    AuthMiddleware,
    ImageController.patch)
router.get('/news',
    // AuthMiddleware,
    NewsController.getNews)
router.post('/addnews',
    // AuthMiddleware,
    NewsController.postNews)
router.patch('/patchnews',
    // AuthMiddleware,
    NewsController.patchNews)
router.delete('/deletenews',
    // AuthMiddleware,
    NewsController.deleteNews)


module.exports = router
