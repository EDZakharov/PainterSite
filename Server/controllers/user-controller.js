const UserService = require('../service/user-service')
const ErrorHandler = require('../exeptions/errorHandler')
const {validationResult} = require('express-validator')

class UserController {
    async registration(req,res,next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ErrorHandler.BadRequest('Ошибка валидации', errors.array()))
            }
            const {email, password} = req.body
            const userData = await UserService.registration(email, password)
            if(userData) {
                res.cookie('refreshToken', userData.refreshToken,{httpOnly: true})
                res.status(200).json(userData)
            }
        } catch (e) {
            next(e)
        }
    }

    async login(req,res,next) {
        try{
            const {email, password} = req.body
            const userData = await UserService.login(email,password)
            if(userData){
                res.cookie('refreshToken', userData.refreshToken, {httpOnly: true})
                res.status(200).json(userData)
            }
        }catch (e) {
            next(e)
        }
    }

    async logout(req,res,next) {
        try{
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.status(200).json(token)
        }catch (e) {
            next(e)
        }
    }

    async refresh(req,res,next) {
        try{
            const {refreshToken} = req.cookies
            const token = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', token.refreshToken,{httpOnly: true})
            // res.setHeader('Access-Control-Allow-Headers')
            res.status(200).json(token)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()