const BioModel = require('../models/biography-model')
const ErrorHandler = require('../exeptions/errorHandler')

class BiographyService {

    async getBio() {
        const findDescription = await BioModel.find({})
        if(findDescription.length === 0){
            await BioModel.create({description:'Напишите биографию'})
        }
        return BioModel.findOne({_id: findDescription[0]._id})
    }

    async patchBio(description) {
        const findDescription = await BioModel.find({})
        const bio = await BioModel.findOneAndUpdate({_id: findDescription[0]._id}, {description})
        await bio.save();
        return BioModel.findOne({_id: findDescription[0]._id})
    }
}

module.exports = new BiographyService()