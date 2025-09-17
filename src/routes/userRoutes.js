const express = require("express");
const UserController = require("../controllers/UserController.js");


const router = express.Router();

// USER PROFILE
router.get("/profile", UserController.getProfile);
router.put("/profile", UserController.updateProfile);
router.delete("/profile", UserController.deleteProfile);
module.exports = router;