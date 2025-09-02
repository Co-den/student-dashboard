const Assignment = require("../models/Assignments");

exports.list = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 20);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Assignment.find().populate("course").skip(skip).limit(limit),
    Assignment.countDocuments(),
  ]);
  res.json({ items, meta: { page, limit, total } });
};

exports.create = async (req, res) => {
  const { course, title, description, dueDate, weight } = req.body;
  if (!course || !title)
    return res.status(400).json({ error: "Missing required fields" });
  const assignment = await Assignment.create({
    course,
    title,
    description,
    dueDate,
    weight,
  });
  res.status(201).json(assignment);
};

exports.get = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id).populate(
    "course"
  );
  if (!assignment) return res.status(404).json({ error: "Not found" });
  res.json(assignment);
};

exports.update = async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!assignment) return res.status(404).json({ error: "Not found" });
  res.json(assignment);
};

exports.remove = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
