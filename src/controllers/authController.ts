import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/Token";
export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "every field is required", success: false })
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User not found", success: false })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials", success: false })
    }
    const token = await generateToken(user._id);
    return res.status(200).json({ message: "User logged in successfully", success: true }).cookie(
        'accessToken', token, {
        httpOnly: true,
        secure: true
    })
}
export const registerUser = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;
    try {
        if ([username, password, email].some((item) => !item || item.trim() === '')) {
            return res.status(400).json({ message: "every field is required", success: false })
        }

        const checkUser = await User.exists({
            $or: [{ username }, { email }]
        });

        if (checkUser) {
            return res.status(401).json({ message: "User already exists", success: true })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: IUser = await User.create({
            email,
            username,
            password: hashedPassword,
        })

        if (user) {
            return res.status(201).json({ message: "User created successfully", success: true })
        } else {
            return res.status(400).json({ message: "User not created", success: false })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ messgae: "server error", success: false })
    }
}