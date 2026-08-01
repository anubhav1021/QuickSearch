const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./database/db");

const memberRoutes = require("./routes/memberRoutes");
const documentRoutes = require("./routes/documentRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ---------------- Routes ----------------
app.use("/api/auth", authRoutes);

app.use("/api/members", memberRoutes);

app.use("/api/documents", documentRoutes);

// ---------------- Test Route ----------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 QuickSearch Backend is Running!"
  });
});

// ---------------- Server ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});