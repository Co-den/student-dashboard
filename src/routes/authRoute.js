import express from "express";
import authController from "../controllers/authController.js";


const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);


    

export default router;
