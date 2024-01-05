const express = require('express');
const router = express.Router();
const Employee = require('../Model/Employee.model'); // Adjust the path as necessary

// Route to get all employee data
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/attendance/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find the employee by email
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Extract only the relevant information for attendance records
    const attendanceData = {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      attendance: employee.attendance.map((attendance) => ({
        id: attendance._id,
        date: attendance.date.toISOString(), // Convert date to string
        status: attendance.status,
      })),
    };

    res.json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/employee/find/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const employee = await Employee.findOne({ email: email });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new employee
router.post('/add', async (req, res) => {
  const { name, email, address, phoneNo, team, salary, role, doj, gender } = req.body;

  try {
    // Check if an employee with the same email already exists
    const existingEmployeeByEmail = await Employee.findOne({ email: email });
    if (existingEmployeeByEmail) {
      return res.status(409).json({ message: "Employee with this email already exists." });
    }

    // Check if an employee with the same phone number already exists
    const existingEmployeeByPhone = await Employee.findOne({ phoneNo: phoneNo });
    if (existingEmployeeByPhone) {
      return res.status(409).json({ message: "Employee with this phone number already exists." });
    }

    // If no existing employee is found, proceed to save the new employee
    const newEmployee = new Employee({
      name, email, address, phoneNo, team, salary, role, doj, gender
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Route to delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an employee by ID
router.put('/employees/:id', async (req, res) => {
  const { name, email, address, phoneNo, team, salary, role, doj, gender } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, address, phoneNo, team, salary, role, doj, gender },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to add attendance record for an employee
// router.post('/employees/:id/attendance', async (req, res) => {
//   const { date, status } = req.body;

//   try {
//     const employee = await Employee.findById(req.params.id);

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Create a new attendance record
//     const attendanceRecord = {
//       date,
//       status,
//     };

//     // Push the new attendance record to the employee's attendance array
//     employee.attendance.push(attendanceRecord);

//     // Save the updated employee document
//     const updatedEmployee = await employee.save();

//     res.status(201).json(updatedEmployee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


router.get('/attendance', async (req, res) => {
  const { team, date } = req.query;

  try {
    const query = { team };

    if (date) {
      query['attendance.date'] = new Date(date);
    }

    const employees = await Employee.find(query);

    // Extract only the relevant information for each employee
    const attendanceData = employees.map((employee) => {
      return {
        id: employee._id,
        name: employee.name,
        attendance: employee.attendance.map((attendance) => ({
          date: attendance.date.toLocaleDateString(),
          status: attendance.status,
          _id: attendance._id,
        })),
      };
    });

    res.json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update attendance record for an employee
router.put('/employees/:id/attendance/:attendanceId', async (req, res) => {
  const { date, status } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Find the attendance record by ID in the employee's attendance array
    const attendanceRecord = employee.attendance.id(req.params.attendanceId);

    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Update the attendance record
    attendanceRecord.date = date;
    attendanceRecord.status = status;

    // Save the updated employee document
    const updatedEmployee = await employee.save();

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete attendance record for an employee
router.delete('/employees/:id/attendance/:attendanceId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Find the attendance record by ID in the employee's attendance array
    const attendanceRecord = employee.attendance.id(req.params.attendanceId);

    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Remove the attendance record from the employee's attendance array
    attendanceRecord.remove();

    // Save the updated employee document
    const updatedEmployee = await employee.save();

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get employees by team and date
router.get('/', async (req, res) => {
  const { team, date } = req.query;

  try {
    let query = { team };

    if (date) {
      // If a date is provided, add it to the query
      query['attendance.date'] = new Date(date);
    }

    const employees = await Employee.find(query);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/employees/:id/attendance', async (req, res) => {
  const { date, status } = req.body;
  const employeeId = req.params.id;

  try {
    console.log('Request received:', { date, status, employeeId });

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      console.log('Employee not found');
      return res.status(404).json({ message: 'Employee not found' });
    }

    console.log('Employee found:', employee);

    // Convert and format the date string
    const attendanceDate = new Date(date);
    console.log('Attendance date:', attendanceDate);

    // Find the index of existing attendance record for the given date
    const existingAttendanceRecordIndex = employee.attendance.findIndex(att =>
      att.date.toISOString() === attendanceDate.toISOString());

    if (existingAttendanceRecordIndex !== -1) {
      console.log('Existing attendance record found:', employee.attendance[existingAttendanceRecordIndex]);
      // Update the existing attendance record with the new status
      employee.attendance[existingAttendanceRecordIndex].status = status;
    } else {
      console.log('No existing attendance record found. Adding a new one.');
      // Add a new attendance record
      const newAttendanceRecord = { date: attendanceDate, status };
      employee.attendance.push(newAttendanceRecord);
    }

    // Save the updated employee document
    const updatedEmployee = await employee.save();

    console.log('Employee updated:', updatedEmployee);

    // Format the date before sending the response
    const formattedAttendance = updatedEmployee.attendance.map(att => ({
      date: att.date.toLocaleDateString(),
      status: att.status,
      _id: att._id
    }));

    console.log('Sending response:', { ...updatedEmployee.toObject(), attendance: formattedAttendance });

    res.status(201).json({ ...updatedEmployee.toObject(), attendance: formattedAttendance });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/:employeeId/review', async (req, res) => {
  try {
      const { month, rating, description } = req.body;
      const employee = await Employee.findById(req.params.employeeId);

      if (!employee) {
          return res.status(404).send('Employee not found');
      }

      employee.reviews.push({ month, rating, description });
      await employee.save();

      res.status(201).send('Review added successfully');
  } catch (e) {
      res.status(500).send(e.message);
  }
});

router.get('/:employeeId/reviews', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;


