const ImageService = require('../service/image-service')
// const ErrorHandler = require('../exeptions/errorHandler')

class imageController {

    async checkDuplicate(req,res,next)  {
        try {
            console.log('hi!: '+ req.file)

        }catch (e) {
            next(e)
        }
    }


    async upload(req,res,next) {
        // console.log(req.file)
        try{
            const upload = await ImageService.upload(req.email,req.file)
            res.status(201).json(upload)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new imageController()