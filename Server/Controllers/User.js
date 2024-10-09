const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.listUsers = async(req,res)=>{
    try{
        console.log("List User ")
        const user = await User.find({}).select('-password ').exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Get User List Server Error!');
    };
};

// exports.getUser = async (req, res) => {
//     try {
//         console.log("USER",req.user)
//         const user = await User.findOne({ username: req.user.username }).exec();
//         if (!user) {
//             console.log("User not found");
//             return res.status(404).send("User not found");
//         }
//         res.send(user);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Server Error');
//     }
// };

exports.deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findOneAndDelete({_id: id}).exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Delete User Server Error!');
    };
};

exports.changeUserStatus = async(req,res)=>{
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.body.id},
            {enabled:req.body.enabled},
            { new: true }
        ).exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Change User Status Server Error!');
    };
};

exports.changeUserRole = async(req,res)=>{
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.body.id},
            {role:req.body.role},
            { new: true }
        ).exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Change User Role Server Error!');
    };
};

exports.changeUserPassword = async(req,res)=>{
    try{
        var {id, password} = req.body;
        // 1 gen salt
        const salt = await bcrypt.genSalt(10);
        // 2 encrypt
        var enPassword = await bcrypt.hash(password, salt);

        const user = await User.findOneAndUpdate(
            {_id: id},
            {password:enPassword},
            { new: true }
        ).exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Change User Password Server Error!');
    };
};

exports.saveOrder = async (req, res) => {
    try {
      const id = req.user._id;
      const { products, address, orderTotal } = req.body;
      const order = await Order.create({
        products,
        orderTotal,
        address,
        orderBy: id,
      });
  
      await Promise.all(
        products.map(async (item) => {
          await Product.updateOne(
            { _id: item.key },
            { $inc: { quantity: -item.count, sold: item.count } }
          );
        })
      );
  
      res.status(200).send(order);
    } catch (err) {
      console.error(err);
      res.status(500).send('Save Order Server Error');
    }
  };
  
exports.addToWishList = async(req,res)=>{
    try{
        const {productId} = req.body;

        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {$addToSet:{wishlist:productId}},
            { new: true}
        ).exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Add Wishlist Server Error!');
    };
};
  
exports.getWishList = async(req,res)=>{
    try{
        console.log(req.user._id)
        const list = await User.findOne(
            {_id: req.user._id},
        )
        .select('wishlist')
        .populate('wishlist')
        .exec();
        res.status(200).send(list);
    }catch(err){
        console.log(err);
        res.status(500).send('GET Wishlist Server Error!');
    };
};
  
exports.deleteWishList = async(req,res)=>{
    try{
        const {productId} = req.params;
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {$pull:{wishlist:productId}},
            {new:true}
        ).exec();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Delete Wishlist Server Error!');
    };
};

exports.getOrder = async(req,res)=>{
    try{
        const order = await Order.find(
            {orderBy: req.user._id},
        )
        .populate('products')
        .exec();
        res.status(200).send(order);
    }catch(err){
        console.log(err);
        res.status(500).send('GET User Order Server Error!');
    };
};


  
