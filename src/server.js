const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Routes
const announcementRoutes = require("./routes/announcementRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const messageRoutes = require("./routes/messageRoutes");
const feesRoutes = require("./routes/feesRoutes");
const courseRoutes = require("./routes/coursesRoutes");
const authRoutes = require("./routes/authRoute");

// Middlewares
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

// Apply rate limiter
app.use(rateLimiter);

// Parse JSON body
app.use(express.json());

// Configure CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-dashboard-uah3.onrender.com",
  "https://student-dashboard-frontend-snowy.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Health check endpoint
app.get("/_health", (req, res) => res.json({ ok: true }));

// Mount API routes
app.use("/api/announcements", announcementRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

// Request logger
app.use((req, res, next) => {
  console.log(
    `[REQ] ${req.method} ${req.originalUrl} from ${req.ip} origin=${
      req.get("origin") || "-"
    }`
  );
  next();
});

// 404 handler and global error handler
app.use(notFound);
app.use(errorHandler);

// Database connection and server startup
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
