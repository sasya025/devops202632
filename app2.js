const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

// Built-in middleware to parse JSON
app.use(express.json());

// In-memory user storage
const users = [];

// Simulated login state
let isLoggedIn = false;

/* =========================
   Password Hashing (Bonus)
========================= */
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/* =========================
   Authentication Middleware
========================= */
function authMiddleware(req, res, next) {
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized access. Please login first."
    });
  }
}

/* =========================
   POST /register
========================= */
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists"
    });
  }

  users.push({
    username,
    password: hashPassword(password)
  });

  res.status(201).json({
    message: "User registered successfully"
  });
});

/* =========================
   POST /login
========================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = hashPassword(password);

  const user = users.find(
    u => u.username === username && u.password === hashedPassword
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  isLoggedIn = true;
  res.json({ message: "Login successful" });
});

/* =========================
   GET /dashboard (Protected)
========================= */
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the dashboard. You are authenticated."
  });
});

/* =========================
   Start Server
========================= */
app.listen(PORT, () => {
  console.log(`Authentication server running on port ${PORT}`);
});
