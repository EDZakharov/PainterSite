const AdminModel = require('../models/admin-model')
const tokenService = require('../service/token-service')
const adminDto = require('../dtos/admin-dtos')
const bcrypt = require('bcrypt')


class AdminService {

    async registration(email, password) {
        const candidate = await AdminModel.findOne({email})
        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует.`)
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await AdminModel.create({email, password: hashPassword, isAdmin:true})

        const adminDTO = new adminDto(user)

        const tokens = tokenService.generateTokens({...adminDTO})
        await tokenService.saveToken(adminDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            admin: adminDTO
        }
    }

}

module.exports = new AdminService()