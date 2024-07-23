async function loginUser() {
  // const userName = document.querySelector('#Email')?.value;
  // const password = document.querySelector('#password')?.value;
  // loginOrCreate(`/api/auth/login`, {userName: userName, password: password});
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  // const userName = document.querySelector('#userName')?.value;
  // const password = document.querySelector('#password')?.value;
  // // TODO: phone number validation for USA
  // const phoneNumber = document.querySelector('#phoneNumber')?.value;
  // const email = document.querySelector('#Email')?.value;
  // const prefferedName = document.querySelector('#prefferedName')?.value;
  // // TODO: direct to drivers licence creation
  // loginOrCreate(`/api/auth/create`, {userName: userName, password: password, phoneNumber: phoneNumber, email: email, prefferedName: prefferedName})
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const email = document.querySelector('#Email')?.value;
  const password = document.querySelector('#password')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    localStorage.setItem('userName', email);
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
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }
  return null;
}
  