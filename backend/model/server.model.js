const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },    
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
    }],
    collectionOfUser: [{
        _idUser: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Server', serverSchema);