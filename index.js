const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ message: "👋 Welcome to the Zunnaberry backend API!" });
});

app.use("/api/contact", contactRoutes);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
