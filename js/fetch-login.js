const scriptURL = "https://script.google.com/macros/s/AKfycbxZTDt9bkndQluMwX1rzuMEZC3VWKxQxz2A_b_HknuK_LIU7GbIY4VEVTR94AsC9csKOw/exec";

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
