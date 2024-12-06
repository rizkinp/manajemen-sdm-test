const express = require('express');
const { createLeaveRequest, getLeaveRequests } = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createLeaveRequest);
router.get('/', protect, getLeaveRequests);

module.exports = router;