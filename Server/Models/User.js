const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    enabled: {
        type: Boolean,
        default: true
    },
    wishlist:[{
        type: ObjectId,
        ref: 'Products'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);

