const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

//ROUTES
const announcementRoutes = require("./routes/announcementRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const messageRoutes = require("./routes/messageRoutes");
const feesRoutes = require("./routes/feesRoutes");
const courseRoutes = require("./routes/coursesRoutes");

//MIDDLEWARES
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();

// apply rate limiter globally or to specific routes
app.use(rateLimiter);
app.use(notFound);
app.use(errorHandler);
const allowedOrigins = [
  'http://localhost:5173',
  'https://student-dashboard-uah3.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options('*', cors()); // Handle preflight requests

app.use(express.json());

app.get("/_health", (req, res) => res.json({ ok: true }));

app.use("/api/announcements", announcementRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/courses", courseRoutes);

// request logger (light)
app.use((req, res, next) => {
  console.log(
    `[REQ] ${req.method} ${req.originalUrl} from ${req.ip} origin=${
      req.get("origin") || "-"
    }`
  );
  next();
});

// serve static if needed later
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });
