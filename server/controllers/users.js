import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
	const {email, password} = req.body;

	try {
		const existingUser = await User.findOne({email});

		if(!existingUser) res.status(404).json({message: "User doesn't exist."})

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

		if(!isPasswordCorrect) res.status(400).json({message: "Invalid credentials."})

		const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRETKEY, {expiresIn: '1h'});

		res.status(200).json({result: existingUser, token})
	} catch (error) {
		res.status(500).json({message: "Something went wrong."})
	}
}

export const register = async (req, res) => {
	const {email, password, firstName, lastName, confirmPassword} = req.body;


	try {
		const existingUser = await User.findOne({email});

		if(existingUser) res.status(400).json({message: "User already exist."});

		if(password !== confirmPassword) res.status(400).json({message: "Passwords don't match."});

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

		const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRETKEY, {expiresIn: '1h'});

		res.status(200).json({result, token})
	} catch (error) {
		res.status(500).json({message: "Something went wrong."})
	}
}