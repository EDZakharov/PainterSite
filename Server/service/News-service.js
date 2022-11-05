const NewsModel = require('../models/news-model')
const ErrorHandler = require('../exeptions/errorHandler')

class NewsService {
    async getNews() {
        try {
            const news = await NewsModel.find({})
            return news
        } catch (e) {
            console.log(e)
        }
    }

    async postNews(data) {
        if(!data){
            throw ErrorHandler.BadRequest('Что-то пошло не так')
        }
        try {
            const news = await NewsModel.create({
                imageSrc: data?.imageSrc,
                shortDescription: data?.shortDescription,
                date: data?.date,
                title: data?.title,
                longDescription: data?.longDescription
            })
            await news.save()
            return NewsModel.find({})
        } catch (e) {
            console.log(e)
        }
    }
    async patchNews(data) {
        console.log(data)
        if(!data){
            throw ErrorHandler.BadRequest('Что-то пошло не так')
        }
        try {
            const newData = {
                shortDescription: data?.shortDescription,
                date: data?.date,
                title: data?.title,
                longDescription: data?.longDescription
            }

            const news = await NewsModel.findOneAndUpdate({_id:data.id},newData)
            await news.save()
            return NewsModel.find({})
        } catch (e) {
            console.log(e)
        }
    }
    async deleteNews(data) {
        if(!data){
            throw ErrorHandler.BadRequest('Что-то пошло не так')
        }
        try {
            const news = await NewsModel.findByIdAndDelete({_id:data.id})
            await news.save()
            return NewsModel.find({})
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new NewsService()
