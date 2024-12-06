const express = require('express');
const { registerEmployee, loginEmployee, getAllEmployees } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.get('/', protect, getAllEmployees);

module.exports = router;