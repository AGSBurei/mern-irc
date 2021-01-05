const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 8
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
            ref: 'Server',
            default: false
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);