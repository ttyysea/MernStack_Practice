const Order = require('../Models/Order');

exports.getAllOrder = async(req,res)=>{
    try{
        const order = await Order.find()
        .populate('orderBy', 'username')
        .exec();
        res.send(order);
    }catch(err){
        console.log(err);
        res.status(500).send('GET All Order Server Error!');
    };
};

exports.updateOrderStatus = async(req,res)=>{
    try{
        console.log("body",req.body)
        const { orderId, orderStatus } = req.body;
        const orderUpdate = await Order.findOneAndUpdate(
            {_id: orderId},
            {status: orderStatus},
            {new: true}
        ).exec();
        res.send(orderUpdate);
    }catch(err){
        console.log(err);
        res.status(500).send('Update Order Status Server Error!');
    };
};