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
        type: String
    },
    isActive: {
        type: Boolean,
        require: true
    },
    ListOfServer: {
        _idServer: [{ 
            type : ObjectId, 
            ref: 'Server' 
        }]
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);