// automation/collect_data.js
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const API_URL = "http://localhost:3000/api/form"; // endpoint backend kamu
// const OUTPUT_DIR = "/home/cron"; // tempat simpan file hasil cron
const OUTPUT_DIR = "/Users/ipan/Documents/project-test/cron";

// pastikan folder ada
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// fungsi untuk ambil data dari API
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

async function run() {
  try {
    const data = await fetchData(API_URL);

    const now = new Date();
    const dateStr = now
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "");
    const hourStr = now.toTimeString().slice(0, 5).replace(":", ".");

    const fileName = `cron_${dateStr}_${hourStr}.csv`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    // ubah array of object jadi CSV
    const headers = ["name", "email"];
    const csvRows = [headers.join(",")];
    data.forEach((item) => {
      csvRows.push(`${item.name},${item.email}`);
    });

    fs.writeFileSync(filePath, csvRows.join("\n"), "utf-8");
    console.log(`✅ Data saved to ${filePath}`);
  } catch (err) {
    console.error("❌ Error collecting data:", err.message);
  }
}

run();
