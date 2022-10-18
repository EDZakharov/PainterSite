const UserModel = require('../models/user-model')
const TokenModel = require('../models/token-model')
const tokenService = require('../service/token-service')
const userDTO = require('../dtos/user-dtos')
const bcrypt = require('bcrypt')
const ErrorHandler = require('../exeptions/errorHandler')

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ErrorHandler.BadRequest(`Пользователь ${email} уже существует`)
        } else {
            const hashPassword = await bcrypt.hash(password, 3)

            const user = await UserModel.create({email, password: hashPassword})

            const userDTOs = new userDTO(user)

            const tokens = tokenService.generateTokens({...userDTOs})
            await tokenService.saveToken(userDTOs.id, tokens.refreshToken)

            return {
                ...tokens,
                user: userDTOs
            }
        }
    }

    async login(email, password) {
	console.log("EMAIL: ",email)
	console.log("PASSWORD: ",password)
        const candidate = await UserModel.findOne({email})
        if (!candidate) {
            throw ErrorHandler.BadRequest(`Пользователь ${email} не найден`)
        }
        const comparePass = bcrypt.compareSync(password, candidate.password)
        if (!comparePass) {
            throw ErrorHandler.BadRequest(`Пароль введен неверно`)
        }

        const userDTOs = new userDTO(candidate)
	console.log("DTO_ADDED: ",userDTOs)
        const tokens = tokenService.generateTokens({...userDTOs})
        await tokenService.saveToken(userDTOs.id, tokens.refreshToken)
	console.log("TOKENS_ADDED")
        return {
            ...tokens,
            user: userDTOs,
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }



    async refresh(refreshToken){
        if(!refreshToken) {
            throw ErrorHandler.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = tokenService.findToken(refreshToken)

        if(!userData || !tokenFromDB) {
            throw ErrorHandler.UnauthorizedError()
        }

        const candidate = await UserModel.findOne({id:userData.id})
        const userDTOs = new userDTO(candidate)
        const tokens = tokenService.generateTokens({...userDTOs})
        await tokenService.saveToken(userDTOs.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTOs,
        }

    }



}

module.exports = new UserService()
