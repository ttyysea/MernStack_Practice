const mongoose  = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DATABASE);
        console.log('Database Connected');
    }catch(err){
        console.log('Database Disconnected : ',err);
    };
};

module.exports = connectDB;
