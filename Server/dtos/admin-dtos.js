module.exports = class AdminDtos {
    email
    id
    isAdmin

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isAdmin = model.isAdmin
    }
}
