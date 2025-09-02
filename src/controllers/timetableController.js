const Timetable = require('../models/Timetable');


exports.list = async (req, res) => {
const items = await Timetable.find().populate('course');
res.json({ items });
};


exports.create = async (req, res) => {
const { course, day, startTime, endTime, location } = req.body;
if (!course || !day || !startTime) return res.status(400).json({ error: 'Missing fields' });
const t = await Timetable.create({ course, day, startTime, endTime, location });
res.status(201).json(t);
};


exports.update = async (req, res) => {
const t = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!t) return res.status(404).json({ error: 'Not found' });
res.json(t);
};


exports.remove = async (req, res) => {
await Timetable.findByIdAndDelete(req.params.id);
res.status(204).end();
};