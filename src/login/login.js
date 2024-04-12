// function login() {
//     const emailEl = document.querySelector("#Email");
//     localStorage.setItem("Email", emailEl.value);
//     window.location.href = "query.html";
//   }
  

  // (async () => {
  //   const userName = localStorage.getItem('userName');
  //   if (userName) {
  //     document.querySelector('#playerName').textContent = userName;
  //     setDisplay('loginControls', 'none');
  //     setDisplay('playControls', 'block');
  //   } else {
  //     setDisplay('loginControls', 'block');
  //     setDisplay('playControls', 'none');
  //   }
  // })();
  
  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#Email')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('userName', userName);
      window.location.href = "query.html";
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }

  }
  
  

  
  async function getUser(email) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }
  
  function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }
  