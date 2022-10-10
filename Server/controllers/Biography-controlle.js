const BiographyService = require('../service/biography-service')

class biographyController {

    async getBio(req,res,next){
        try{
            const bio = await BiographyService.getBio()
            res.status(200).json({biography: bio.description})
        }catch (e) {
            next(e)
        }
    }

    async patchBio(req,res,next){
        console.log(req.body.description)
        try{
            const bio = await BiographyService.patchBio(req.body.description)
            res.status(200).json({biography: bio.description})
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new biographyController()