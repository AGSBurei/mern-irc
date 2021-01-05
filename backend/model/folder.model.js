const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    channel: [{
        _idChannel: {
            type : ObjectId, 
            ref: 'Channel'
        },
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Folder', folderSchema);