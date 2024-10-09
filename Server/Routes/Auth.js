const express = require('express');
const router = express.Router();

// Middleware
const { auth, adminCheck } = require("../Middleware/Auth")

// Controller
const {
    register, 
    login, 
    currentUser
} = require('../Controllers/Auth');

// Endpoint http://localhost:5000/api/register
// Method POST
// Access Publish
router.post('/register',register);

// Endpoint http://localhost:5000/api/login
// Method POST
// Access Publish
router.post('/login',login);

// Endpoint http://localhost:5000/api/current-user
// Method POST
// Access Private
router.post('/current-user', auth, currentUser);

// Endpoint http://localhost:5000/api/current-admin
// Method POST
// Access Private
router.post('/current-admin', auth, adminCheck, currentUser);


module.exports = router;
