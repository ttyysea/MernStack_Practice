const express = require('express');
const router = express.Router();

// Middleware
const { auth, adminCheck } = require("../Middleware/Auth")

// Controller
const { getAllOrder, updateOrderStatus } = require("../Controllers/Admin");

// Endpoint http://localhost:5000/api/admin/get-all-order
// Method GET
// Access Private
router.get('/admin/get-all-order', auth, adminCheck, getAllOrder);

// Endpoint http://localhost:5000/api/admin/change-order-status
// Method PUT
// Access Private
router.put('/admin/change-order-status', auth, adminCheck, updateOrderStatus);

module.exports = router;