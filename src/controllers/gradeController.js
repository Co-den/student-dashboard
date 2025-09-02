const Grade = require('../models/Grades');
const Course = require('../models/Courses');


exports.list = async (req, res) => {
// allow instructor/admin to filter by course or student
const filter = {};
if (req.query.course) filter.course = req.query.course;
if (req.query.student) filter.student = req.query.student;
const items = await Grade.find(filter).populate('course student');
res.json({ items });
};


exports.create = async (req, res) => {
const { course, student, assessment, score, weight } = req.body;
if (!course || !student) return res.status(400).json({ error: 'Missing required fields' });
const courseExists = await Course.findById(course);
if (!courseExists) return res.status(400).json({ error: 'Invalid course' });
const grade = await Grade.create({ course, student, assessment, score, weight });
res.status(201).json(grade);
};


exports.get = async (req, res) => {
const grade = await Grade.findById(req.params.id).populate('course student');
if (!grade) return res.status(404).json({ error: 'Not found' });
res.json(grade);
};


exports.update = async (req, res) => {
const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!grade) return res.status(404).json({ error: 'Not found' });
res.json(grade);
};


exports.remove = async (req, res) => {
await Grade.findByIdAndDelete(req.params.id);
res.status(204).end();
};