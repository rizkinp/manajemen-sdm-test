require('dotenv').config();
const express = require('express');
const httpProxy = require('express-http-proxy');

const app = express();


const EMPLOYEE_SERVICE_URL = process.env.EMPLOYEE_SERVICE_URL;
const LEAVE_SERVICE_URL = process.env.LEAVE_SERVICE_URL;

if (!EMPLOYEE_SERVICE_URL || !LEAVE_SERVICE_URL) {
  console.error('Error: Missing environment variables for service URLs.');
  process.exit(1);
}

const employeeServiceProxy = httpProxy(EMPLOYEE_SERVICE_URL, {
  proxyReqPathResolver: (req) => req.originalUrl,
});

const leaveServiceProxy = httpProxy(LEAVE_SERVICE_URL, {
  proxyReqPathResolver: (req) => req.originalUrl,
});

app.use('/api/employees', (req, res, next) => {
  console.log(`Proxying to Employee Service: ${EMPLOYEE_SERVICE_URL}${req.originalUrl}`);
  employeeServiceProxy(req, res, next);
});

app.use('/api/leaves', (req, res, next) => {
  console.log(`Proxying to Leave Service: ${LEAVE_SERVICE_URL}${req.originalUrl}`);
  leaveServiceProxy(req, res, next);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
