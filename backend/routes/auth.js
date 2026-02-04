const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* REGISTER */
/* REGISTER - auth.js */
router.post("/register", async (req, res) => {
  const { name, dob, gender, email, password, phone, address, qualification } = req.body;

  // 1. Validation: If any value is missing, bcrypt or MySQL might fail
  if (!password) return res.status(400).json({ msg: "Password is required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Explicitly name the columns to avoid index mismatch
  const sql = "INSERT INTO students (name, dob, gender, email, password, phone, address, qualification) VALUES (?,?,?,?,?,?,?,?)";
  
  db.query(sql, [name, dob, gender, email, hashedPassword, phone, address, qualification],
    (err, result) => {
      if (err) {
        console.error(err); // Log the actual error to your terminal
        //window.alert("Registration failed: " + err.message);
        return res.status(400).json(err);
      }
      res.json({ msg: "Registration successful" });
      //window.alert("Registration successful");
    });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM students WHERE email=?", [email], async (err, result) => {
    if (result.length === 0) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: result[0].id }, "secretkey");
    res.json({ token });
  });
});

/* PROFILE */
router.get("/profile", auth, (req, res) => {
  db.query("SELECT name,dob,gender,email,phone,address,qualification FROM students WHERE id=?",
    [req.user.id],
    (err, result) => res.json(result[0])
  );
});

/* UPDATE PROFILE */
router.put("/profile", auth, (req, res) => {
  const { name, phone, address, qualification } = req.body;

  db.query(
    "UPDATE students SET name=?, phone=?, address=?, qualification=? WHERE id=?",
    [name, phone, address, qualification, req.user.id],
    () => res.json({ msg: "Profile updated" })
  );
});

module.exports = router;
