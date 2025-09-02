const express = require("express");
const courseController = require("../controllers/courseController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.protect, courseController.getCourses) // Students & teachers can view
  .post(authMiddleware.protect, authMiddleware.adminOnly, courseController.createCourse); // Only admins can create

router
  .route("/:id")
  .get(authMiddleware.protect, courseController.getCourseById)
  .put(authMiddleware.protect, authMiddleware.adminOnly, courseController.updateCourse)
  .delete(authMiddleware.protect, authMiddleware.adminOnly, courseController.deleteCourse);

router.post("/enroll", authMiddleware.protect, courseController.enrollStudent);

module.exports = router;
