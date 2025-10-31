const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// Helper functions
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// 📌 VALIDATION HELPER
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ✅ POST endpoint — menerima dan validasi data
app.post("/api/form", (req, res) => {
  const { name, email } = req.body;

  // --- VALIDATION ---
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name cannot be empty." });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const data = readData();
  const newEntry = { name, email };
  data.push(newEntry);
  writeData(data);

  res.status(201).json({
    message: "Data saved successfully.",
    data: newEntry,
  });
});

// ✅ GET endpoint — kembalikan data
app.get("/api/form", (req, res) => {
  const data = readData();
  res.json(data);
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log("🌐 Open in browser: http://localhost:3000");
});