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

}
module.exports = new ContactsController()