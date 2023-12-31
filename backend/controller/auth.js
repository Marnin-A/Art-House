const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");
require("dotenv").config();

const saltRounds = Number(process.env.saltRounds);
const secretKey = process.env.secretKey;

async function signup(req, res, next) {
  const { name, email, password, user_role } = req.body;
  try {
    const hashedPassword = await hashPassword(password, saltRounds);
    const result = await usermodel.createUser(
      name,
      email,
      hashedPassword,
      user_role
    );
    return res.status(200).send({ status: 200, message: "Sign up successful" });
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function hashPassword(password, saltRounds) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password Hashing Failed");
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await usermodel.getUserByEmail(email);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid Password or Email" });
    }
    const user = result.rows[0];
    const hashedPassword = user.password;

    //Comparing HashedPassword
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      // JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        secretKey,
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        status: 200,
        message: "Login Successful",
        token,
        user: user.name,
        role: user.user_role,
      });
    } else {
      // Password Doesn't Match
      return res.status(401).json({ status: 401, message: "Invalid Login" });
    }
  } catch (error) {
    console.error("error in loing route:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

module.exports = { signup, login, hashPassword };
