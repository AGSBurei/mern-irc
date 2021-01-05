const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    role: [{
        _idRole: {
            type : ObjectId, 
            ref: 'Role'
        },
    }],
    collectionOfFolder: [{
        _idFolder: {
            type : ObjectId, 
            ref: 'Folder'
        },
    }],
    collectionOfUser: [{
        _idUser: { 
            type : ObjectId, 
            ref: 'User'
        },
        _idRole: {
            type : ObjectId, 
            ref: 'Role'
        },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Server', serverSchema);