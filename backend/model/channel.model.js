const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    message: [{
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
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Channel', channelSchema);