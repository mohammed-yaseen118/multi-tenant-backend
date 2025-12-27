const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Session config
app.use(session({
  secret: "multi-tenant-secret-2025",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 30 // 30 minutes
  },
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/multi-tenant-auth"
  })
}));

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/multi-tenant-auth")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
