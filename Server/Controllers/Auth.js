const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

exports.register = async(req,res)=>{
    try{
        const { username, password } = req.body;
        var user = await User.findOne({username});
        if(user){
            return res.status(400).send('User Already Exists');
        };

        const salt = await bcrypt.genSalt(10);
        await User.create({
            username,
            password: await bcrypt.hash(password, salt)
        });

        res.send('Register Success');
    }catch(err){
        console.log(err);
        res.status(500).send('Register Server Error!');
    };
};

exports.login = async(req,res)=>{
    try{
        const { username, password } = req.body;
        var user = await User.findOneAndUpdate({username}, {new: true});
        if(user && user.enabled){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                return res.status(400).send('Invalid Password');
            };
        const payload = {
            user:{
                _id: user._id,
                username: user.username,
                role: user.role
            }
        };   
        jwt.sign(payload, 
            process.env.JWT_SECRET, 
            {expiresIn: 3600}, 
            (err,token)=>{
                if(err) throw err;
                res.json({token, payload});
        });
        }else{
            return res.status(400).send('User Not Found');
        };

    }catch(err){
        console.log(err);
        res.status(500).send('Login Server Error!');
    };
};

exports.currentUser = async(req,res)=>{
    try{
        const user = await User.findOne({username: req.user.username})
        .select('-password').exec();
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).send('Current User Server Error!');
    };
};
