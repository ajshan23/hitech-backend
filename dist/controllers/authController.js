"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "every field is required", success: false });
    }
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User not found", success: false });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials", success: false });
    }
    return res.status(200).json({ message: "User logged in successfully", success: true });
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, department, email, password } = req.body;
    try {
        if ([username, password, department, email].some((item) => !item || item.trim() === '')) {
            return res.status(400).json({ message: "every field is required", success: false });
        }
        const checkUser = yield userModel_1.default.exists({
            $or: [{ username }, { email }]
        });
        if (checkUser) {
            return res.status(401).json({ message: "User already exists", success: true });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            email,
            department,
            username,
            password: hashedPassword,
        });
        if (user) {
            return res.status(201).json({ message: "User created successfully", success: true });
        }
        else {
            return res.status(400).json({ message: "User not created", success: false });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ messgae: "server error", success: false });
    }
});
exports.registerUser = registerUser;
