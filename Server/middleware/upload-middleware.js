
const diff = require('../service/diff-arr')
const multer = require('multer')
const moment = require('moment')
const ImageModel = require('../models/image-model')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
	      const path = __dirname.replace('middleware','uploads')
	      console.log(path)
        fs.readdir(path, async (err, data) => {
            let list = await ImageModel.find({})
            console.log('DATA: ', data)
	          console.log('LIST: ', list)
            const mongoImageNames =list? list.map(el => el.name):[]
            const serverImageNames = data? data.map(el => el):[]
	          console.log('MONGOIMG: ', mongoImageNames)
	          console.log('SERVERIMG: ', serverImageNames)
            // console.log(mongoImageNames)
            const showDiff = diff(mongoImageNames, serverImageNames)
	          console.log('DIFF: ',showDiff)
            if (showDiff.length !== 0) {
                //Clear DB
                for (const elName of showDiff) {
                    await ImageModel.deleteOne({name: elName})
                }
                //Clear uploads Diff
                for (const elName of showDiff) {
                    if (data.length !== 0) {
                        //Проверка на наличие файла в папке
                        fs.access(path, (error) => {
                            if (error) {
                                //Файл не найден
                                cb(null, path)
                            } else {
                                //Файл найден
                                fs.unlink(path+`/${elName}`,
                                    function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            //Перезаписываем файл (удаляем)
                                            cb(null, path)
                                        }
                                    });
                            }
                        });
                    } else {
                        cb(null, path)
                    }
                }
            } else {
                cb(null, path)
                console.log('FILE HAS BEEN LOADED')
            }

        }, (err => console.log('DATA_LOAD_ERROR: ',err)))
    },
    filename: function (req, file, cb) {
	console.log('ADD_FILENAME')
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
	console.log('FILE_FILTER')
    if ((file.mimetype).includes('jpeg') ||
        (file.mimetype).includes('png') ||
        (file.mimetype).includes('jpg')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 20
}

module.exports = multer({storage: storage, fileFilter, limits: limits})
