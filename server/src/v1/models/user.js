const { model, Schema } = require('mongoose')
const { schemaOptions } = require('./modelOptions')

module.exports = model("users", new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    premium: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: 'No description'
    },
    verified: {
        type: Boolean,
        default: false
    }
}, schemaOptions))