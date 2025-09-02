const Fee = require('../models/Fees');


exports.list = async (req, res) => {
// students get their own fees; admins see all
if (req.user.role === 'student') {
const items = await Fee.find({ student: req.user._id }).sort({ createdAt: -1 });
return res.json({ items });
}
const items = await Fee.find().populate('student').sort({ createdAt: -1 });
res.json({ items });
};


exports.create = async (req, res) => {
const { student, amount, status } = req.body;
if (!student || !amount) return res.status(400).json({ error: 'Missing fields' });
const fee = await Fee.create({ student, amount, status });
res.status(201).json(fee);
};


exports.update = async (req, res) => {
const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!fee) return res.status(404).json({ error: 'Not found' });
res.json(fee);
};


exports.remove = async (req, res) => {
await Fee.findByIdAndDelete(req.params.id);
res.status(204).end();
};