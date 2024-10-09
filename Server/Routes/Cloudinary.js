const express = require('express');
const router = express.Router();

// Controller
const { createImage, deleteImage } = require("../Controllers/Cloudinary")

// Middleware
const { auth, adminCheck } = require("../Middleware/Auth")

// Endpoint http://localhost:5000/api/create-images
// Method POST
// Access Private
router.post('/create-images', auth, adminCheck, createImage );

// Endpoint http://localhost:5000/api/remove-images
// Method POST
// Access Private
router.post('/delete-images', auth, adminCheck, deleteImage );

module.exports = router;