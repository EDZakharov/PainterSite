const ErrorHandler = require('../exeptions/errorHandler')
const tokenService = require('../service/token-service')

module.exports = function (req,res,next) {
    console.log(req.headers.authorization)
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return next(ErrorHandler.UnauthorizedError())
        }

        const accessToken = authHeader.split(' ')[1]
        if(!accessToken){
            return next(ErrorHandler.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken).then(res => {
            if(res === null){
                return next(ErrorHandler.UnauthorizedError())
            }
        }).catch(e => console.log(e))
        // if(!userData){
        //     return next(ErrorHandler.UnauthorizedError())
        // }
        req.user = userData
        next()

    }catch (e) {
        return next(ErrorHandler.UnauthorizedError())
    }
}