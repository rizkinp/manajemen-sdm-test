const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendResponse = require('../helpers/response');
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
// Register
const registerEmployee = async (req, res) => {
  const { name, email, password, position } = req.body;
  
  // Validasi input
  if (!name || !email || !password || !position) {
    return sendResponse(res, 400, 'Name, email, position, or password are required');
  }

  try {
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return sendResponse(res, 400, 'Email already exists');
    }

    const employee = await Employee.create({ name, email, password, position });
    sendResponse(res, 201, 'Employee registered successfully', {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      position: employee.position,
      token: generateToken(employee._id),
    });
  } catch (error) {
    sendResponse(res, 500, 'Server Error', error.message);
  }
};
// Login
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (employee && (await bcrypt.compare(password, employee.password))) {
      sendResponse(res, 200, 'Login successful', {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        token: generateToken(employee._id),
      });
    } else {
      sendResponse(res, 400, 'Invalid credentials');
    }
  } catch (error) {
    sendResponse(res, 500, 'Server Error', error.message);
  }
};
// Get All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    sendResponse(res, 200, 'Employees fetched successfully', employees);
  } catch (error) {
    sendResponse(res, 500, 'Server Error', error.message);
  }
};

module.exports = { registerEmployee, loginEmployee, getAllEmployees };
