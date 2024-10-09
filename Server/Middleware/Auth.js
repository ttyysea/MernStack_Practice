const jwt = require("jsonwebtoken");
const User = require('../Models/User');

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).send("No Token, Access Denied");
        }
        console.log("Auth Header:", authHeader);
        const token = authHeader.replace("Bearer ", "");
        if (!token) {
            return res.status(401).send("No Token, Access Denied");
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified token:", verified);  // Add this line
        req.user = verified.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send('Token Invalid');
    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        const { username } = req.user;
        const adminUser = await User.findOne({ username }).exec();
        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).send('Admin Access Denied');
        } else {
            console.log("AdminCheck Token ", req.header("Authorization"));
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(401).send('Admin Access Denied');
    }
};
