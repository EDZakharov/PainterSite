module.exports = class userDTO {
    email
    id

    constructor(model) {
        this.email = model.email
        this.id = model._id
    }
}
