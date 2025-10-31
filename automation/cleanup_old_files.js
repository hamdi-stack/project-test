// automation/cleanup_old_files.js
const fs = require("fs");
const path = require("path");

// const TARGET_DIR = "/home/cron";
const TARGET_DIR = "/Users/ipan/Documents/project-test/cron";
const MAX_AGE_DAYS = 30;
// const MAX_AGE_DAYS = 30; // agar hapus semua file lebih dari 0 hari

function cleanup() {
  if (!fs.existsSync(TARGET_DIR)) return;

  const now = Date.now();
  const files = fs.readdirSync(TARGET_DIR);

  files.forEach((file) => {
    const filePath = path.join(TARGET_DIR, file);
    const stats = fs.statSync(filePath);
    const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

    if (ageDays > MAX_AGE_DAYS) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted old file: ${file}`);
    }
  });
}

cleanup();
