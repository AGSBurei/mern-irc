const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
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

const User = mongoose.model('User', userSchema);

module.exports = User;