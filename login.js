function login() {
    const emailEl = document.querySelector("#Email");
    localStorage.setItem("Email", emailEl.value);
    window.location.href = "query.html";
  }
  