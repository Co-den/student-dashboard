import express from "express";



const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);


    

export default router;
