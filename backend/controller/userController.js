const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

//user register api endpoint---------------------------------------------------------------------------------------------------------------------------
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", message: "Email empty or invalid" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ status: "error", message: "Invalid email format" });
  }

  // Password validation using regex
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.json({
      status: "error",
      message: "Invalid password format",
    });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "error",
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.json({ status: "ok", message: "User created successfully" });
  } catch (error) {
    throw error;
  }
});

//user login api endpoint---------------------------------------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (email && password === "") {
    return res.json({ status: "error", error: "no data" });
  }

  if (!user) {
    return res.json({ status: "error", error: "User Not Found" });
  } else if (user && (await bcrypt.compare(password, user.password))) {
    //compare password with hashed password
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    return res.json({ status: "ok", token: token });
  } else {
    return res.json({ status: "error", error: "Invalid password" });
  }
});

module.exports = router;
