const ContactsService = require('../service/contacts-service')

class ContactsController {
    async getContactsData(req,res,next){
        try {
            const contacts = await ContactsService.getContacts()
            res.status(200).json(contacts)
        }catch (e) {
            next(e)
        }
    }
    async patchContactsData(req,res,next){
        try {
            const contacts = await ContactsService.patchContactsData(req.body)
            res.status(200).json(contacts)
        }catch (e) {
            next(e)
        }
    }

    async addUsersContactsData(req,res,next){
        try {
            const addContacts = await ContactsService.postUsersContactsData(req.body)
            res.status(200).json(addContacts)
        }catch (e) {
            next(e)
        }
    }
    async getUsersContactsData(req,res,next){
        try {
            const getContacts = await ContactsService.getUsersContactsData()
            res.status(200).json(getContacts)
        }catch (e) {
            next(e)
        }
    }
    async deleteUsersContactsData(req,res,next){
        try {
            const delContacts = await ContactsService.deleteUsersContactsData(req.body)
            res.status(200).json(delContacts)
        }catch (e) {
            next(e)
        }
    }

}
module.exports = new ContactsController()