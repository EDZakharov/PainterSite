const ContactsModel = require('../models/contacts-model')
const ErrorHandler = require('../exeptions/errorHandler')

class ContactsService {
    async getContacts() {
        const contactsData = await ContactsModel.find({})
        if(!contactsData || contactsData.length === 0){
            const Contacts = {
                phone: "+111111",
                telegram: "http://telegram.ru/",
                whatsApp: "http://whatsapp.ru/"
            }
            await ContactsModel.create({contacts: Contacts})
            return ContactsModel.find()
        }
        return contactsData
    }

    async patchContactsData(data) {
        if(!data || !data.phone || !data.telegram || !data.whatsApp){
            throw ErrorHandler.BadRequest('Something went wrong')
        }
        const patchData = await ContactsModel.findOneAndUpdate({},{contacts:data})
        if(!patchData){
            throw ErrorHandler.BadRequest('Something went wrong')
        }
        await patchData.save();
        return ContactsModel.find()
    }
}

module.exports = new ContactsService()