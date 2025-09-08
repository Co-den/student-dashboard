const express = require("express");
const authController = require("../controllers/authController.cjs");


const router = express.Router();

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

//USER PROFILE
router.get("/profile", authController.getProfile);

// UPDATE PROFILE
router.put("/profile", authController.updateProfile);

// DELETE PROFILE
router.delete("/profile", authController.deleteProfile);

module.exports = router;
