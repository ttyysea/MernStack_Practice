const express = require('express');
const router = express.Router();

// Controller
const {
    getAllCategory,
    createCategory,
    updateCategory,
    getCategoryById,
    deleteCategory
} = require('../Controllers/Category');

// Middleware
const { auth, adminCheck } = require("../Middleware/Auth");

// Endpoint http://localhost:5000/api/category/category-list
// Method GET
// Access Publish
router.get('/category/category-list', getAllCategory);

// Endpoint http://localhost:5000/api/category/create-category
// Method POST
// Access Private
router.post('/category/create-category', auth, adminCheck, createCategory);

// Endpoint http://localhost:5000/api/category/:id
// Method GET
// Access Publish
router.get('/category/:id', getCategoryById);

// Endpoint http://localhost:5000/api/category/update-category/:id
// Method PUT
// Access Private
router.put('/category/update-category/:id', auth, adminCheck, updateCategory);

// Endpoint http://localhost:5000/api/category/delete-category/:id
// Method DELETE
// Access Private
router.delete('/category/delete-category/:id', auth, adminCheck,deleteCategory);


module.exports = router;