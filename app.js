const express = require("express");
const app = express();

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Grade calculation function
function calculateGrade(marks) {
    if (marks >= 90) return "A";
    else if (marks >= 75) return "B";
    else if (marks >= 60) return "C";
    else if (marks >= 40) return "D";
    else return "F";
}

/* -------------------------------------------------
   1️⃣ Read marks using Query Parameter (Address Bar)
   Example: http://localhost:3000/grade?marks=82
---------------------------------------------------*/
app.get("/grade", (req, res) => {
    const marks = parseInt(req.query.marks);

    if (isNaN(marks)) {
        return res.send("Please provide valid marks");
    }

    const grade = calculateGrade(marks);
    res.send(`Marks: ${marks} <br> Grade: ${grade}`);
});

/* -------------------------------------------------
   2️⃣ HTML Form Page
---------------------------------------------------*/
app.get("/", (req, res) => {
    res.send(`
        <h2>Student Grade Calculator</h2>
        <form action="/submit" method="post">
            <label>Enter Marks:</label>
            <input type="number" name="marks" required />
            <button type="submit">Calculate Grade</button>
        </form>
    `);
});

/* -------------------------------------------------
   3️⃣ Read data from HTML Form (POST API)
---------------------------------------------------*/
app.post("/submit", (req, res) => {
    const marks = parseInt(req.body.marks);
    const grade = calculateGrade(marks);

    res.send(`Marks: ${marks} <br> Grade: ${grade}`);
});

// Server start
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});