const NewsService = require('../service/News-service')
const ErrorHandler = require('../exeptions/errorHandler')

class NewsController {
    async getNews(req,res,next) {
        console.log(req.body)
        try {
            const news = await NewsService.getNews()
            res.status(200).json(news)
        } catch (e) {
            next(e)
        }
    }

    async postNews(req,res,next) {
        try {
            const news = await NewsService.postNews(req.body)
            res.status(201).json(news)
        } catch (e) {
            next(e)
        }
    }
    async patchNews(req,res,next) {
        console.log(req.method)
        try {
            const news = await NewsService.patchNews(req.body)
            res.status(201).json(news)
        } catch (e) {
            next(e)
        }
    }
    async deleteNews(req,res,next) {
        console.log(req.method)
        try {
            const news = await NewsService.deleteNews(req.body)
            res.status(200).json(news)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new NewsController()