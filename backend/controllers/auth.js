import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    pucturePath,
    friends,
    location,
    occupation,
  } = req.body;
  try {
    const salt = await bcrypt.genSaltSync();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      pucturePath,
      friends,
      location,
      occupation,
      viewdProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Login User */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // cheking email
    const user = await User.findOne({ email: email });

    // cheking password
    const isMatch = await bcrypt.compare(password, user.password);

    // condition if user didn't exist
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    // condition if password didn't match
    else if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    } else {
      // jwt token signing
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      delete user.password;
      return res.status(200).json({ token, user });
    }
    delete user.password;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Important notes:

Math.floor(Math.random() * 1000)
-this will give you a random number between 1-1000
-dummy value





*/
