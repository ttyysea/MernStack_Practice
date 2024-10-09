const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        text:true
    },
    description: {
        type: String,
        text:true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        text:true
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    images: {
        type: Array,
    },
    sold:{
        type:Number,
        default:0
    },

},{ timestamps: true });


module.exports = Product = mongoose.model('Products', productSchema);