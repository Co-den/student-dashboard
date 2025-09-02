const Message = require('../models/Messages');


exports.list = async (req, res) => {
// simple inbox for current user
const userId = req.user._id;
const items = await Message.find({ $or: [{ to: userId }, { from: userId }] }).populate('from to').sort({ createdAt: -1 });
res.json({ items });
};


exports.create = async (req, res) => {
const { to, subject, body } = req.body;
if (!to || !body) return res.status(400).json({ error: 'Missing fields' });
const msg = await Message.create({ from: req.user._id, to, subject, body });
res.status(201).json(msg);
};


exports.get = async (req, res) => {
const msg = await Message.findById(req.params.id).populate('from to');
if (!msg) return res.status(404).json({ error: 'Not found' });
// simple access check: sender or recipient
if (!msg.from._id.equals(req.user._id) && !msg.to._id.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });
res.json(msg);
};


exports.remove = async (req, res) => {
const msg = await Message.findById(req.params.id);
if (!msg) return res.status(404).json({ error: 'Not found' });
if (!msg.from.equals(req.user._id)) return res.status(403).json({ error: 'Only sender can delete' });
await msg.remove();
res.status(204).end();
};