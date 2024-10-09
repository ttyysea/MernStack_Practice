const express = require('express');
const router = express.Router();

// Middleware
const { auth, adminCheck } = require("../Middleware/Auth")

// Controller
const { 
    listUsers,
    // getUser,
    deleteUser,
    changeUserStatus,
    changeUserRole,
    changeUserPassword,
    saveOrder,
    addToWishList,
    getWishList,
    deleteWishList,
    getOrder,
    getAllOrder
    
 } = require('../Controllers/User');


// Endpoint http://localhost:5000/api/user/list-users
// Method GET
// Access Private
router.get('/user/list-users', auth, adminCheck, listUsers);

// Endpoint http://localhost:5000/api/user/:id
// Method POST
// Access Private
// router.get('/user/:id',getUser);

// Endpoint http://localhost:5000/api/user/delete-user/:id
// Method DELETE
// Access Private
router.delete('/user/delete-user/:id', auth, adminCheck, deleteUser);

// Endpoint http://localhost:5000/api/user/change-status
// Method POST
// Access Private
router.post('/user/change-status', auth, adminCheck, changeUserStatus);

// Endpoint http://localhost:5000/api/user/change-role
// Method POST
// Access Private
router.post('/user/change-role', auth, adminCheck, changeUserRole);

// Endpoint http://localhost:5000/api/user/change-password
// Method PUT
// Access Private
router.put('/user/change-password', auth, adminCheck, changeUserPassword);

// Endpoint http://localhost:5000/api/user/order
// Method POST
// Access Private
router.post('/user/order', auth,  saveOrder);

// Endpoint http://localhost:5000/api/user/add-wishlist
// Method POST
// Access Private
router.post('/user/add-wishlist', auth,  addToWishList);

// Endpoint http://localhost:5000/api/user/get-wishlist
// Method GET
// Access Private
router.get('/user/get-wishlist', auth,  getWishList);

// Endpoint http://localhost:5000/api/user/delete-wishlist/:productId
// Method PUT
// Access Private
router.put('/user/delete-wishlist/:productId', auth,  deleteWishList);

// Endpoint http://localhost:5000/api/user/get-order
// Method GET
// Access Private
router.get('/user/get-order', auth,  getOrder);


module.exports = router;