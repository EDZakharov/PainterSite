const ImageService = require('../service/image-service')

class imageController {

    async upload(req,res,next) {
        try{
            const upload = await ImageService.upload(req.email,req.file)
            console.log(upload)
            res.status(201).json(upload)
        }catch (e) {
            next(e)
        }
    }
    async getImagesList(req,res,next){
        try{
            const imagesList = await ImageService.getImagesList()
            res.status(200).json(imagesList)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new imageController()