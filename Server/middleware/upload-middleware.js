const multer = require('multer')
const moment = require('moment')
const ImageModel = require('../models/image-model')
const fs = require('fs')
const path = require('path')


const diff = function (a1, a2) {
    return a1.filter(i => !a2.includes(i))
        .concat(a2.filter(i => !a1.includes(i)))
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.readdir('server/uploads', async (err, data) => {
            const list = await ImageModel.find({})
            const mongoImageNames = list.map(el => el.name)
            const serverImageNames = data.map(el => el)
            // console.log(mongoImageNames)

            const showDiff = diff(mongoImageNames, serverImageNames)
            if (showDiff.length !== 0) {
                //Clear DB
                for (const elName of showDiff) {
                    await ImageModel.deleteOne({name: elName})
                }
                //Clear uploads Diff
                for (const elName of showDiff) {
                    if (data.length !== 0) {
                        //Проверка на наличие файла в папке
                        fs.access(`server/uploads/${elName}`, (error) => {
                            if (error) {
                                //Файл не найден
                                cb(null, 'server/uploads')
                            } else {
                                //Файл найден
                                fs.unlink(`server/uploads/${elName}`,
                                    function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            //Перезаписываем файл (удаляем)
                                            cb(null, 'server/uploads')
                                        }
                                    });
                            }
                        });
                    } else {
                        cb(null, 'server/uploads')
                    }
                }
            } else {
                cb(null, 'server/uploads')
            }

        }, (err => console.log(err)))
    },
    filename: function (req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') ||
        (file.mimetype).includes('png') ||
        (file.mimetype).includes('jpg')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 10
}

module.exports = multer({storage: storage, fileFilter, limits: limits})