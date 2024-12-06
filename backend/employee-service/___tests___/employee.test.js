const request = require('supertest');
const app = require('../app');
const mockingoose = require('mockingoose');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

describe('Employee Controller', () => {
  
  describe('POST /register', () => {
    it('should register a new employee', async () => {
      const employeeData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        position: 'Developer',
      };

      // Mock the Employee model
      mockingoose(Employee).toReturn({ ...employeeData, _id: '12345' }, 'save');
      
      const res = await request(app)
        .post('/api/employees/register')
        .send(employeeData);

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('John Doe');
      expect(res.body.data.token).toBeDefined();
    });

    it('should return an error if required fields are missing', async () => {
      const employeeData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      const res = await request(app)
        .post('/api/employees/register')
        .send(employeeData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Name, email, position, or password are required');
    });

    it('should return an error if email already exists', async () => {
      const employeeData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        position: 'Developer',
      };

      mockingoose(Employee).toReturn({ ...employeeData, _id: '12345' }, 'findOne');

      const res = await request(app)
        .post('/api/employees/register')
        .send(employeeData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email already exists');
    });
  });

  describe('POST /login', () => {
    it('should login an existing employee', async () => {
      const employeeData = {
        email: 'johndoe@example.com',
        password: 'password123',
      };
  
      const hashedPassword = await bcrypt.hash('password123', 10);
      const employee = { 
        _id: '12345',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
        position: 'Developer',
      };
  
      mockingoose(Employee).toReturn(employee, 'findOne');
      
      const res = await request(app)
        .post('/api/employees/login')
        .send(employeeData);
  
      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.token).toMatch(/^eyJ/); 
    });
  });  

  describe('GET /employees', () => {
    it('should return all employees', async () => {
      const employees = [
        { _id: '1', name: 'John Doe', email: 'johndoe@example.com', position: 'Developer' },
        { _id: '2', name: 'Jane Doe', email: 'janedoe@example.com', position: 'Manager' },
      ];
  
      mockingoose(Employee).toReturn(employees, 'find');
  
      // Create a mock employee object for login
      const employeeData = {
        email: 'johndoe@example.com',
        password: 'password123',
      };
  
      // Mock the login response to get a valid token
      const loginRes = await request(app)
        .post('/api/employees/login')
        .send(employeeData);
  
      const token = loginRes.body.data.token;
  
      const res = await request(app)
        .get('/api/employees')
        .set('Authorization', `Bearer ${token}`);  // Include the token
  
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0].name).toBe('John Doe');
    });
  });
  
});