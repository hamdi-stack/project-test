const apiUrl = "http://localhost:3000/api/form";
const form = document.getElementById("dataForm");
const tableBody = document.querySelector("#dataTable tbody");

// Fungsi ambil data dari server
async function fetchData() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    tableBody.innerHTML = "";
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.name}</td><td>${item.email}</td>`;
      tableBody.appendChild(row);
    });
  } catch (error) {
    alert("Gagal memuat data dari server.");
    console.error(error);
  }
}

// Event submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    const result = await res.json();

    // 🔍 Cek apakah server kirim error
    if (!res.ok) {
      alert(result.error || "Terjadi kesalahan saat menyimpan data.");
      return;
    }

    // Jika sukses
    alert("Data berhasil disimpan!");
    form.reset();
    fetchData();
  } catch (error) {
    alert("Tidak dapat terhubung ke server.");
    console.error(error);
  }
});

// Jalankan pertama kali
fetchData();

// const apiUrl = "http://localhost:3000/api/form";
// const form = document.getElementById("dataForm");
// const tableBody = document.querySelector("#dataTable tbody");

// // Fungsi ambil data dari server
// async function fetchData() {
//   const res = await fetch(apiUrl);
//   const data = await res.json();

//   tableBody.innerHTML = "";
//   data.forEach((item) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `<td>${item.name}</td><td>${item.email}</td>`;
//     tableBody.appendChild(row);
//   });
// }

// // Event submit form
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const newData = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//   };

//   await fetch(apiUrl, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newData),
//   });

//   form.reset();
//   fetchData(); // refresh tabel
// });

// // Jalankan pertama kali
// fetchData();
