
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: 'Products'
                },
                name:String,
                count: Number,
                price: Number
            }
        ],
        orderTotal: Number,
        orderBy: {
            type: ObjectId,
            ref: 'Users'
        },
        address: {
            houseNumber: String,
            subDistrict: String,
            province: String,
            zipCode: String,
            phone: String,
        },
        status: {
            type: String,
            default: 'Processing'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
