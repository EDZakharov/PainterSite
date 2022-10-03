const fs = require('fs')
const ImageModel = require('../models/image-model')
const ErrorHandler = require('../exeptions/errorHandler')

class ImageService {
    async upload(email, image) {
        if (!image) {
            throw ErrorHandler.BadRequest('Error: Формат должен быть jpeg, png или jpg ')
        }

        const uploadData = await ImageModel.findOne({name: image.filename})

        if (uploadData) {
            throw ErrorHandler.BadRequest('Такая картинка уже есть')
        }

        try {
            const newUpload = await new ImageModel({
                // user: email,
                name: image ? image.filename : '',
                imageSrc: image ? image.path : ''
            })
            await newUpload.save()
            return newUpload

        } catch (e) {
            console.log(e)
        }
    }

    async getImagesList() {
        try {
            const images = await ImageModel.find({})
            return images
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ImageService()