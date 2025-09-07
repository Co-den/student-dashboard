import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);


    

export default router;
