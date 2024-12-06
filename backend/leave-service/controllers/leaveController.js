const LeaveRequest = require('../models/LeaveRequest');
const sendResponse = require('../helpers/response');

const createLeaveRequest = async (req, res) => {
  const { startDate, endDate, reason } = req.body;
  if (!startDate || !endDate || !reason) {
    return sendResponse(res, 400, 'Required fields are missing');
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Date Validation
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return sendResponse(res, 400, 'Invalid date format');
  }

  try {
    const leaveRequest = await LeaveRequest.create({
      employeeId: req.employee.id,
      startDate: start,
      endDate: end,
      reason,
    });
    sendResponse(res, 201, 'Leave request created successfully', leaveRequest);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

const getLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ employeeId: req.employee.id });
    sendResponse(res, 200, 'Data fetched successfully', requests);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

module.exports = { createLeaveRequest, getLeaveRequests };
