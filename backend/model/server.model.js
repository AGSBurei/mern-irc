const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    role: [{
        _idRole: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Role'
        },
    }],
    collectionOfFolder: [{
        _idFolder: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Folder'
        },
    }],
    collectionOfUser: [{
        _idUser: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        _idRole: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Role'
        },
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Server', serverSchema);