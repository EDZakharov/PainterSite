const ErrorHandler = require('../exeptions/errorHandler')

module.exports = function (err,req,res,next) {
    if(err instanceof ErrorHandler){
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
    }
    return res.status(500).json({
        message: err.message
    })
}