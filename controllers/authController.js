import { request, response } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const signup = async (request, response) => {
  const { email, password } = request.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return response.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
    });

    if (user) {
      response.status(201).json({
        id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      response.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const login= async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await user.comparePassword(password))) {
      response.json({
        id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      response.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    response.status(500).json({error:error.message});
  }
};
