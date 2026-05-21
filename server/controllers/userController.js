import user from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getUserByid = async (req, res) => {
    try{
        const userid = req.params.id;
        const userdata = await user.findById(userid);
        if(!userdata){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(userdata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try{
        const userid = req.params.id;
        const {username, eamail, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await user.findByIdAndUpdate(userid, {
            username,
            email,
            password: hashedPassword
        }, {new: true});
        if (!updatedUser){
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
