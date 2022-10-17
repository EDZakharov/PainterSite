const fs = require('fs')
const ImageModel = require('../models/image-model')
const ErrorHandler = require('../exeptions/errorHandler')

class ImageService {

    async getImagesList() {
        try {
            const images = await ImageModel.find({})
            return images
        } catch (e) {
            console.log(e)
        }
    }

    async upload(file, description) {
        console.log('FILE-SERVICES: ',file)
        if (!file) {
        console.log('!FILE')
            throw ErrorHandler.BadRequest('Error: Формат должен быть jpeg, png или jpg ')
        }
        console.log('try to find DB img')
        const uploadData = await ImageModel.findOne({name: file.filename})
        console.log('uploadDATA: ',uploadData)
        if (uploadData) {
            throw ErrorHandler.BadRequest('Такая картинка уже есть')
        }

        try {
            const newUpload = await new ImageModel({
                // user: email,
                name: file ? file.filename : '',
                imageSrc: file ? file.path : '',
                description: description ? description : ''
            })
	    console.log("newUploadDB: ",newUpload)
            await newUpload.save()
            return newUpload

        } catch (e) {
            console.log(e)
        }
    }

    async delete(name) {
        if(!name){
            throw ErrorHandler.BadRequest('Такая картинка не найдена')
        }
        try {
            fs.readdir('server/uploads', (err, data) => {
                fs.access(`server/uploads/${name}`, (error) => {
                    if (error) {
                        //Файл не найден
                        // throw ErrorHandler.BadRequest('Такая картинка не найдена')
                        return {message: 'not found'}
                    } else {
                        //Файл найден
                        fs.unlink(`server/uploads/${name}`,
                            async function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //Очистка базы данных (удаляем)
                                    await ImageModel.deleteOne({name});

                                }

                            });
                    }
                });

            })
            return {message: `Картинка ${name} была удалена`}
        }catch (e) {
            console.log(e)
        }
    }

    async patch(name, description) {
        try {
            await ImageModel.findOneAndUpdate({name},{description})
            const newList = await ImageModel.find({})
            return newList
        } catch (e) {
            console.log(e)
        }
    }


}

module.exports = new ImageService()
