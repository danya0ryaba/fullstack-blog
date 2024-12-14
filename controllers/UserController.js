import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation error", errors: errors.array() });
        }
        const { fullName, email, password, avatarUrl } = req.body;

        const salt = await bcrypt.hash(password, 10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName,
            email,
            passwordHash: hash,
            avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Register error" });
    }

}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user._doc.passwordHash);

        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login error" });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { passwordHash, ...userData } = user._doc;
        res.json(userData || {});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get user error" });
    }
}