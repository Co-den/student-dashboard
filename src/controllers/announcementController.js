const Announcement = require('../models/Announcement');


exports.list = async (req, res) => {
const items = await Announcement.find().sort({ publishedAt: -1 });
res.json({ items });
};


exports.create = async (req, res) => {
const { title, body, publishedAt } = req.body;
if (!title) return res.status(400).json({ error: 'Missing title' });
const a = await Announcement.create({ title, body, publishedAt });
res.status(201).json(a);
};


exports.remove = async (req, res) => {
await Announcement.findByIdAndDelete(req.params.id);
res.status(204).end();
};