# 🚀 Project Test — Fullstack Automation & Data Processing

Selamat datang di **Project Test**, sebuah mini project yang terdiri dari tiga bagian:
1. 🧩 **Soal 1 — Backend API (Node.js + Express)**
2. 🤖 **Soal 2 — Automation & Cron Jobs**
3. 🧠 **Soal 3 — Database (PostgreSQL + SQL Processing)**

Semua proyek ini dibuat dan diuji di **macOS**, dengan pendekatan **realistic setup** seperti di lingkungan kerja profesional.

---

## 📁 Struktur Folder
project-test/
├── backend/ # Soal 1: REST API Backend (Express)
│ ├── server.js
│ ├── routes/
│ └── package.json
│
├── automation/ # Soal 2: Cron Job + Data Collector
│ ├── collect_data.js
│ ├── cleanup_old_files.js
│ └── README.md
│
├── database/ # Soal 3: PostgreSQL Schema & Query
│ ├── employees_schema.sql
│ └── data_processing.sql
│
└── README.md # Dokumentasi utama proyek


---

## 🧩 Soal 1 — Backend API (Node.js + Express)

### 🔧 Setup
1. Masuk ke folder backend:
   ```bash
   cd backend
   npm install

2. Jalankan server lokal:
node server.js

Server berjalan di:
👉 http://localhost:3000

📦 Fitur

Endpoint utama /api/data mengembalikan data JSON (dummy API).

Dapat digunakan untuk menguji automation script di soal nomor 2.

🤖 **Soal 2 — Automation & Cron Jobs**
🎯 Tujuan

Mengumpulkan data dari backend (API soal nomor 1) secara otomatis menggunakan cron job, lalu menyimpannya ke folder cron/ dalam format CSV.

⚙️ Setup Crontab (macOS)

Pastikan Node.js terpasang:

which node
# contoh: /usr/local/bin/node


Edit cron job:

export VISUAL=nano
crontab -e


Tambahkan jadwal berikut:

# collect data 3x per day at 08:00, 12:00, 15:00 WIB
0 8,12,15 * * * /usr/local/bin/node /Users/ipan/Documents/project-test/automation/collect_data.js >> /home/cron/collect.log 2>&1

# cleanup old files daily at 00:05
5 0 * * * /usr/local/bin/node /Users/ipan/Documents/project-test/automation/cleanup_old_files.js >> /home/cron/cleanup.log 2>&1


Simpan dan cek daftar cron:

crontab -l

🧪 Testing Manual

Jalankan script secara manual sebelum otomatisasi:

# Jalankan backend
node backend/server.js

# Jalankan pengumpulan data
node automation/collect_data.js


Jika berhasil, file CSV baru akan muncul di:

/Users/ipan/Documents/project-test/cron/


Contoh output:

cron_10302025_16.29.csv

🧠 **Soal 3 — Database (PostgreSQL + SQL Processing)**
💾 Tujuan

Membuat dan memproses data karyawan menggunakan PostgreSQL.
Database berisi tabel employees yang digunakan untuk query analisis.

⚙️ Setup PostgreSQL (macOS)

Install PostgreSQL via Homebrew:

brew install postgresql@16
brew services start postgresql@16


Masuk ke PostgreSQL:

psql postgres


Buat database:

CREATE DATABASE project_test;
\c project_test

🧱 Struktur Database

Tabel employees:

Kolom	Tipe Data	Deskripsi
id	SERIAL	Primary Key
name	VARCHAR	Nama karyawan
position	VARCHAR	Jabatan
join_date	DATE	Tanggal bergabung
release_date	DATE	Tanggal keluar (nullable)
years_of_experience	FLOAT	Lama pengalaman
salary	NUMERIC	Gaji
📜 File SQL

employees_schema.sql → Struktur & data awal tabel.

data_processing.sql → Query untuk analisis dan manipulasi data.

🧩 Query yang Dijalankan

File data_processing.sql berisi operasi:

Insert data karyawan baru

Update gaji berdasarkan posisi

Hitung total pengeluaran tahunan

Tampilkan top 3 pengalaman tertinggi

Subquery: engineer dengan pengalaman ≤ rata-rata

🔍 Akses via DBeaver

Buka DBeaver

Tambah koneksi ke localhost:5432

Pilih database project_test

Jalankan SQL dari folder database/

💡 Hasil Akhir Tabel
id	name	position	join_date	release_date	years_of_experience	salary
1	Jacky	Solution Architect	2018-07-25	2022-07-25	8.0	150.00
2	John	Assistant Manager	2016-02-02	2021-02-02	12.0	155.00
3	Alano	Manager	2010-11-09		14.0	175.00
4	Aaron	Engineer	2021-08-16	2022-08-16	1.0	85.00
5	Allen	Engineer	2024-06-06		4.0	85.00
6	Peter	Team Leader	2020-01-09		3.0	85.00
7	Albert	Engineer	2024-01-24		2.5	85.00

🧰 Tech Stack
Komponen	Teknologi
Backend	Node.js, Express
Automation	Node Cron, CSV Writer
Database	PostgreSQL
Tools	DBeaver, VSCode
OS	macOS

🚦 Jalur Eksekusi Singkat
Langkah	Perintah
1️⃣ Jalankan API backend	node backend/server.js
2️⃣ Jalankan automation test	node automation/collect_data.js
3️⃣ Buka PostgreSQL	psql postgres
4️⃣ Koneksi ke database	\c project_test
5️⃣ Jalankan SQL	psql -d project_test -f database/data_processing.sql
🧾 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran & simulasi technical test.
Dibangun dengan ❤️ menggunakan Node.js & PostgreSQL di macOS.

👨‍💻 Author
Hamdi