const express = require('express');
const router = express.Router();

let students = [
    { id: 1, name: "Ravi" }
];

// GET all students
router.get('/', (req, res) => {
    res.json(students);
});

// POST a new student
router.post('/', (req, res) => {
    const student = req.body;

    if (!student.name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const newStudent = {
        id: students.length + 1,
        name: student.name
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added",
        data: newStudent
    });
});

module.exports = router;