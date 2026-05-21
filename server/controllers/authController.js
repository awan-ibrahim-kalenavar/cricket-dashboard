import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ error_msg: "All fields are required" });
    }

   
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error_msg: "User already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      jwt_token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ error_msg: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

  
    if (!username || !password) {
      return res.status(400).json({ error_msg: "Please enter all fields" });
    }

    
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(400).json({ error_msg: "Invalid username" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error_msg: "Invalid password" });
    }

    
    res.status(200).json({
      jwt_token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ error_msg: error.message });
  }
};