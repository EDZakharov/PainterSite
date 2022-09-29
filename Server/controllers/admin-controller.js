const adminService = require('../service/admin-service')

class AdminController {
    async registration(req,res,next) {
        try {
            const {email, password} = req.body
            const adminData = await adminService.registration(email, password)
            res.cookie('refreshToken', adminData.refreshToken)
            res.status(200).json(adminData)
        }catch (e) {
            console.log(e)
        }
    }

    async login(req,res,next) {
        try{

        }catch (e) {

        }
    }

    async logout(req,res,next) {
        try{

        }catch (e) {

        }
    }

    async refresh(req,res,next) {
        try{
        }catch (e) {

        }
    }

}

module.exports = new AdminController()