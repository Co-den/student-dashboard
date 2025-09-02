const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  day: { type: String, required: true },           // e.g. 'Mon', 'Tue'
  startTime: { type: String, required: true },     // e.g. '08:00'
  endTime: { type: String },                       // optional
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timetable', TimetableSchema);
