// scripts/seed.js
const dotenv = require("dotenv")
dotenv.config({path:".env"});
const mongoose = require("mongoose");


// models
const User = require("../models/User");
const Course = require("../models/Courses");
const Assignment = require("../models/Assignments");
const Timetable = require("../models/Timetable");
const Grade = require("../models/Grades");
const Fee = require("../models/Fees");
const Message = require("../models/Messages");
const Announcement = require("../models/Announcement");

async function clearCollections() {
  await Promise.all([
    User.deleteMany(),
    Course.deleteMany(),
    Assignment.deleteMany(),
    Timetable.deleteMany(),
    Grade.deleteMany(),
    Fee.deleteMany(),
    Message.deleteMany(),
    Announcement.deleteMany(),
  ]);
}

async function seed() {
  const uri = process.env.MONGO_URI;
  await mongoose.connect(uri);

  console.log("🔁 Clearing collections...");
  await clearCollections();

  console.log("👥 Creating users...");
  const [student, instructor, admin] = await Promise.all([
    User.create({
      name: "Jane Doe",
      email: "jane@campus.edu",
      password: "password",
      role: "student",
    }),
    User.create({
      name: "Prof. Ahmed",
      email: "ahmed@campus.edu",
      password: "password",
      role: "instructor",
    }),
    User.create({
      name: "System Admin",
      email: "admin@campus.edu",
      password: "password",
      role: "admin",
    }),
  ]);

  console.log("📚 Creating courses...");
  const [cse201, cse240, mth210, des150] = await Promise.all([
    Course.create({
      code: "CSE201",
      title: "Data Structures & Algorithms",
      instructor: instructor._id,
      credits: 3,
      semester: "2025-1",
    }),
    Course.create({
      code: "CSE240",
      title: "Computer Networks",
      instructor: instructor._id,
      credits: 3,
      semester: "2025-1",
    }),
    Course.create({
      code: "MTH210",
      title: "Linear Algebra",
      credits: 3,
      semester: "2025-1",
    }),
    Course.create({
      code: "DES150",
      title: "UI/UX Studio",
      credits: 2,
      semester: "2025-1",
    }),
  ]);

  console.log("🗓 Creating timetable entries...");
  await Promise.all([
    Timetable.create({
      course: cse201._id,
      day: "Mon",
      startTime: "08:00",
      endTime: "09:30",
      location: "B101",
    }),
    Timetable.create({
      course: cse201._id,
      day: "Mon",
      startTime: "16:00",
      endTime: "18:00",
      location: "L2",
    }), // lab
    Timetable.create({
      course: cse240._id,
      day: "Tue",
      startTime: "10:00",
      endTime: "11:30",
      location: "C303",
    }),
    Timetable.create({
      course: mth210._id,
      day: "Wed",
      startTime: "12:00",
      endTime: "13:30",
      location: "M110",
    }),
    Timetable.create({
      course: des150._id,
      day: "Thu",
      startTime: "14:00",
      endTime: "16:00",
      location: "S210",
    }),
  ]);

  console.log("📝 Creating assignments...");
  const [a1, a2, a3] = await Promise.all([
    Assignment.create({
      course: cse201._id,
      title: "Project Milestone",
      description: "Submit project repo",
      dueDate: new Date("2025-08-28"),
      weight: 20,
    }),
    Assignment.create({
      course: cse240._id,
      title: "Quiz 2",
      description: "Multiple choice quiz",
      dueDate: new Date("2025-08-27"),
      weight: 10,
    }),
    Assignment.create({
      course: des150._id,
      title: "Prototype v2",
      description: "UI prototype",
      dueDate: new Date("2025-09-02"),
      weight: 25,
    }),
  ]);

  console.log("📊 Creating grades...");
  await Promise.all([
    Grade.create({
      course: cse201._id,
      student: student._id,
      assessment: "Midterm",
      score: 78,
      weight: 30,
    }),
    Grade.create({
      course: cse201._id,
      student: student._id,
      assessment: "Project",
      score: 82,
      weight: 40,
    }),
    Grade.create({
      course: cse240._id,
      student: student._id,
      assessment: "Midterm",
      score: 60,
      weight: 30,
    }),
  ]);

  console.log("💰 Creating fee records...");
  await Promise.all([
    Fee.create({
      student: student._id,
      amount: 120000,
      status: "paid",
      paidAt: new Date("2025-08-01"),
    }),
    Fee.create({
      student: student._id,
      amount: 100000,
      status: "paid",
      paidAt: new Date("2025-05-01"),
    }),
  ]);

  console.log("✉️ Creating messages...");
  await Promise.all([
    Message.create({
      from: instructor._id,
      to: student._id,
      subject: "Quiz 2 topics",
      body: "Focus on routing protocols and subnetting.",
    }),
    Message.create({
      from: admin._id,
      to: student._id,
      subject: "ID Card",
      body: "Collect your ID card at the admin office.",
    }),
  ]);

  console.log("📣 Creating announcements...");
  await Promise.all([
    Announcement.create({
      title: "Library Hours Extended",
      body: "Main library open till 10pm on weekdays.",
    }),
    Announcement.create({
      title: "Hackathon",
      body: "Register by Aug 30. Teams of 3–5.",
    }),
  ]);

  console.log("✅ Seed complete!");
  console.log("Created users:", {
    student: student.email,
    instructor: instructor.email,
    admin: admin.email,
  });
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
