const request = require('supertest');
const app = require('../app');
const mockingoose = require('mockingoose');
const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../../employee-service/models/Employee');
const bcrypt = require('bcrypt');

describe('Leave Service Routes', () => {
  let token;

  // Get Token
  beforeAll(async () => {
    const employeeData = {
      email: 'john.doe@example.com',
      password: 'password123',
    };
  
    mockingoose(Employee).toReturn(employeeData, 'findOne');
  
    // Login employee
    const loginRes = await request('http://localhost:5001')  
      .post('/api/employees/login')
      .send(employeeData);
  
    token = loginRes.body.data.token; //Get Token
  });

  describe('POST /api/leaves', () => {
    it('should create a new leave request', async () => {
      const leaveData = {
        startDate: '2024-12-10',
        endDate: '2024-12-15',
        reason: 'Sick Leave',
      };
  
      // Mock LeaveRequest.create
      mockingoose(LeaveRequest).toReturn(leaveData, 'save');
  
      const res = await request(app)
        .post('/api/leaves')
        .set('Authorization', `Bearer ${token}`)  // Gunakan token di header
        .send(leaveData);
  
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Leave request created successfully');
      expect(res.body.data.startDate.substring(0, 10)).toBe(leaveData.startDate);
    });
  
    it('should return an error if required fields are missing', async () => {
      const leaveData = { startDate: '2024-12-10' };
  
      const res = await request(app)
        .post('/api/leaves')
        .set('Authorization', `Bearer ${token}`)  // Gunakan token di header
        .send(leaveData);
  
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Required fields are missing');
    });
  });
  

  describe('GET /api/leaves', () => {
    it('should fetch all leave requests for an employee', async () => {
      const mockLeaveRequests = [
        { startDate: '2024-12-10', endDate: '2024-12-15', reason: 'Sick Leave' },
        { startDate: '2024-12-20', endDate: '2024-12-25', reason: 'Vacation' },
      ];

      mockingoose(LeaveRequest).toReturn(mockLeaveRequests, 'find');

      const res = await request(app)
        .get('/api/leaves')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Data fetched successfully');
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0].reason).toBe('Sick Leave');
    });
  });
});