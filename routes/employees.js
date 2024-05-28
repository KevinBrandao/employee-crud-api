// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

/**
 * @swagger
 * /employees:
 *  get:
 *    description: Use to request all employees
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *  get:
 *    description: Use to request a specific employee
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the employee
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /employees:
 *  post:
 *    description: Use to create a new employee
 *    responses:
 *      '201':
 *        description: Created
 */
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary
  });
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *  put:
 *    description: Use to update an employee
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the employee
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *  delete:
 *    description: Use to delete an employee
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the employee
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    await employee.remove();
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;