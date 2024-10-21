"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.route("/login").post(authController_1.loginUser);
// router.route("/register").post(registerUser);
exports.default = router;
