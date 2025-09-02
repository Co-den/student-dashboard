import Course from "../models/Courses.js";
import User from "../models/User.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { code, title, description, credits, instructor } = req.body;

    const exists = await Course.findOne({ code });
    if (exists) return res.status(400).json({ message: "Course code already exists" });

    const course = await Course.create({
      code,
      title,
      description,
      credits,
      instructor,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "firstName lastName email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "firstName lastName email")
      .populate("students", "firstName lastName email");

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enroll a student into a course
export const enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: "Student already enrolled" });
    }

    course.students.push(studentId);
    await course.save();

    res.json({ message: "Student enrolled successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
