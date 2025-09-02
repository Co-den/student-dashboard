const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessment: { type: String },
  score: { type: Number },
  weight: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grade', GradeSchema);
