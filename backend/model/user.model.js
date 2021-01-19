const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    ListOfServer: [{
        _idServer: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Server'
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);