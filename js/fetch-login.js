const scriptURL = 'https://script.google.com/macros/s/AKfycbz5NW_sS9ag-pZMHv0Z3FHH2MBSUOrvlT3Wf0SgpxAYifbfy4SRSxrCkLj6kLLDZFUTiw/exec';

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch('${scriptURL}?mode=login', {
    method: "POST",
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  if (result.success) {
    if (result.role === "admin") {
      window.location.href = 'admin_dashboard.html?rekening=${result.rekening}';
    } else {
      window.location.href = 'nasabah_dashboard.html?rekening=${result.rekening}';
    }
  } else {
    alert(result.message);
  }
}
