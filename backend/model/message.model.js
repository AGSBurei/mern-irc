const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    _idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    msg: {
        type: String
    },
    datetime: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('example_message', messageSchema)
