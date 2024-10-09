const express = require('express');
const router = express.Router();

// Controller
const  { 
    getProductByFilter, 
    deleteProduct, 
    getAllProduct, 
    createProduct, 
    getProductByCount, 
    updateProduct, 
    getProductById, 
    searchProduct 
} = require("../Controllers//Product");

// Middleware
const { auth, adminCheck } = require("../Middleware/Auth");

// Endpoint http://localhost:5000/api/product/product-list
// Method GET
// Access Publish
router.get('/product/product-list', getAllProduct);

// Endpoint http://localhost:5000/api/product/count/:count
// Method GET
// Access Publish
router.get('/product/count/:count', getProductByCount);

// Endpoint http://localhost:5000/api/product/:id
// Method GET
// Access Publish
router.get('/product/:id', getProductById);

// // Endpoint http://localhost:5000/api/product/create-product
// // Method POST
// // Access Private
router.post('/product/create-product', auth, adminCheck, createProduct);

// // Endpoint http://localhost:5000/api/product/get-product-filter
// // Method POST
// // Access Publish
router.post('/product/get-product-filter',getProductByFilter);

// Endpoint http://localhost:5000/api/product/update-product/:id
// Method PUT
// Access Private
router.put('/product/update-product/:id', auth, adminCheck, updateProduct);

// Endpoint http://localhost:5000/api/product/delete-product/:id
// Method DELETE
// Access Private
router.delete('/product/delete-product/:id', auth, adminCheck, deleteProduct);

// Endpoint http://localhost:5000/api/product/search/product
// Method DELETE
// Access Publish
router.post('/search/product',searchProduct);


module.exports = router;