const ImageService = require('../service/image-service')

class imageController {
    async getImagesList(req,res,next){
        try{
            const imagesList = await ImageService.getImagesList()
            res.status(200).json(imagesList)
        }catch (e) {
            next(e)
        }
    }
    async getImageByCategoryName(req,res,next){
        console.log(req.query)
        try{
            const imagesList = await ImageService.getImageByCategoryName(req.query)
            res.status(200).json(imagesList)
        }catch (e) {
            next(e)
        }
    }

    async upload(req,res,next) {
        try{
            const upload = await ImageService.upload(req.file, req.body.image, req.body.category, req.body.imageName, req.body.sizes)
            res.status(201).json(upload)
        }catch (e) {
            next(e)
        }
    }

    async delete(req,res,next) {
        try{
            await ImageService.delete(req.body.name)
            const imagesList = await ImageService.getImagesList()
            res.status(200).json(imagesList)
        }catch (e) {

            next(e)
        }
    }

    async patch(req,res,next){
        try{
            const updImage = await ImageService.patch(req.body.name, req.body.description)
            res.status(200).json(updImage)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new imageController()
