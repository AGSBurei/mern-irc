const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Role', roleSchema);