const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serverSchema = new Schema({
    servername: {
        type: String,
        required: true,
        minlength: 3
    },
    collectionOfFolder: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    role: [{
        name: { 
            type: String,
            required: true,
            minlength: 3 
        }
    }],
    collectionOfFolder: [{
        folderName: {
            type: String,
            required: true,
            minlength: 3
        },
        channel: [{
            channelName: {
                type: String,
                required: true,
                minlength: 3
            },
            message: [{
                _idUser: {
                    type : ObjectId, 
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
        }]
    }],
    collectionOfUser: [{
        _idUser: { 
            type : ObjectId, 
            ref: 'User'
        },
        role: { 
            type: String,
            required: true,
            minlength: 3 
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Server', serverSchema);