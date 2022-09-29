const JWT = require('jsonwebtoken')
const TokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload){
        const accessToken = JWT.sign(payload,process.env.ADMIN_ACCESS_JWT,{expiresIn: '30m'})
        const refreshToken = JWT.sign(payload,process.env.ADMIN_REFRESH_JWT,{expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userID, refreshToken){
        const tokenData = await TokenModel.findOne({userID})

        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({user: userID, refreshToken})
        return token
    }

}

module.exports = new TokenService()