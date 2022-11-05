const router = require('express').Router()
const userController = require('../controllers/user')
const { body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const User = require('../models/user')

router.post(
    '/register',
    body('username').isLength({ min: 3 }).withMessage(
        'username must be at least 3 characters'
    ),
    body('password').isLength({ min: 8 }).withMessage(
        'password must be at least 8 characters'
    ),
    body('confirmPassword').isLength({ min: 8 }).withMessage(
        'confirmPassword must be at least 8 characters'
    ),
    body("username").custom(value => {
        return User.findOne({ username: value }).then(user => {
            if(user) {
                return Promise.reject('Username is already in use')
            }
        })
    }),
    validation.validate,
    userController.register
)

// ================================================================================================================== //

router.post(
    '/login',
    body('username').isLength({ min: 3 }).withMessage(
    'username must be at least 3 characters'
    ),
    body('password').isLength({ min: 8 }).withMessage(
    'password must be at least 8 characters'
    ),
    validation.validate,
    userController.login
)
            
// ================================================================================================================== //

router.post(
    '/verify-token',
    tokenHandler.verifyToken,
    (req, res) => {
        res.status(200).json({ user: req.user })
    }
)
// ================================================================================================================== //
    
module.exports = router;

