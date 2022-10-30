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

    async getImageByCategoryName(query) {
        try {
            if (Object.keys(query).length === 0) {
                const images = await ImageModel.find({})
                return images
            } else {
                const images = await ImageModel.find({category: query.category})
                return images
            }

        } catch (e) {
            console.log(e)
        }
    }

    async upload(file, description, category, imageName, sizes) {
        if (!file) {
            throw ErrorHandler.BadRequest('Error: Формат должен быть jpeg, png или jpg ')
        }
        const uploadData = await ImageModel.findOne({name: file.filename})
        if (uploadData) {
            throw ErrorHandler.BadRequest('Такая картинка уже есть')
        }

        try {
            const newUpload = await new ImageModel({
                name: file ? file.filename : '',
                imageName: imageName ? imageName : '',
                imageSrc: file ? file.path : '',
                description: description ? description : '',
                category: category ? category : '',
                sizes: sizes ? sizes : '',
            })
            console.log("ADD_NEW_IMG_TO_DB: ", newUpload)
            await newUpload.save()
            return newUpload

        } catch (e) {
            console.log(e)
        }
    }

    async delete(name) {
        console.log("DELETE-IMAGE", name)
        if (!name) {
            throw ErrorHandler.BadRequest('Такая картинка не найдена')
        }
        try {
            const path = __dirname.replace('service', 'uploads')
            console.log(path)
            fs.readdir(path, (err, data) => {
                fs.access(`${path}/${name}`, (error) => {
                    if (error) {
                        //Файл не найден
                        // throw ErrorHandler.BadRequest('Такая картинка не найдена')
                        return {message: 'not found'}
                    } else {
                        //Файл найден
                        fs.unlink(`${path}/${name}`,
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
        } catch (e) {
            console.log(e)
        }
    }

    async patch(name, description) {
        try {
            await ImageModel.findOneAndUpdate({name}, {description})
            const newList = await ImageModel.find({})
            return newList
        } catch (e) {
            console.log(e)
        }
    }


}

module.exports = new ImageService()
