const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const saltRounds = Number(process.env.saltRounds);
const secretKey = "TOP SECRET";

// Signup Route
router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password, saltRounds);

  const result = db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );
  console.log(hashPassword);
  return res.send(result);
});

// Login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try { 
    const result = await db.query("SELECT id, password FROM users WHERE email =$1", [email]);
    if (result.rows.length === 0) {
      res.status(400).json({ message: "Invalid Password or Email"})
    }
    const user = result.rows[0];
    const hashedPassword = result.rows[0].password;

    //Comparing HashedPassword
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      // JWT token
      const token = jwt.sign({ userId: user.id, email: user.email}, secretKey, {
        expiresIn: 60 * 60,
      });
      return res.json({ message: "Login Successful", token });
    } else{
      // Password Doesn't Match
      return res.status(401).json({ message : "Invalid Login"})
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error"})
  }
});


async function hashPassword(password, saltRounds) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw ("Password Hashing Failed", error);
  }
}
module.exports = router;
// Test data
// {
//     "email":"something@gmail.com",
//     "password":"123456"
// }