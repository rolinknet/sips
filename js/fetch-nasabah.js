const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

document.addEventListener("DOMContentLoaded", () => {
  const rekening = new URLSearchParams(window.location.search).get('rekening');

  fetch('${scriptURL}?mode=getNasabah')
    .then(res => res.json())
    .then(data => {
      const nasabah = data.find(n => n.rekening === rekening);
      if (nasabah) {
        document.getElementById("infoNasabah").innerHTML = '
          <p><strong>Rekening:</strong> ${nasabah.rekening}</p>
          <p><strong>Nama:</strong> ${nasabah.nama}</p>
          <p><strong>Kontak:</strong> ${nasabah.kontak}</p>
          <p><strong>Tabungan:</strong> Rp ${nasabah.tabungan}</p>
          <p><strong>Pinjaman:</strong> Rp ${nasabah.pinjaman}</p>
        ';
      } else {
        document.getElementById("infoNasabah").innerHTML = '<p>Data tidak ditemukan.</p>';
      }
    });

  document.getElementById("gantiForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch('${scriptURL}?mode=gantiUser', {
      method: "POST",
      body: JSON.stringify({ rekening, newUsername, newPassword })
    });

    const result = await response.json();
    if (result.success) {
      alert("Berhasil mengganti username/password. Silakan login ulang.");
      logout();
    } else {
      alert("Gagal memperbarui: " + result.message);
    }
  });
});

function logout() {
  window.location.href = "login.html";
}
