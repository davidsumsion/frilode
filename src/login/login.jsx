import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

export function Login() {
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");

  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const body = await response.json();
    if (response.ok) {
      localStorage.setItem('username', username);
      if (body.complete) navigate('/search') 
      else navigate('/updateUser')
    } else {
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new Bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }

  return (
    <div className="mainPage">
      <div className="loginMenu" >
            <h2 id="title" >Sign in</h2>
            <div className="loginItems">
                <div className="loginItem">
                  <label className="form-label">Email or mobile phone number:</label>
                  <input type="email" className="form-control" id="Email" onChange={(e) => updateUsername(e.target.value) } placeholder="email@example.com" value={username}></input>
                </div>
                <div className="loginItem">
                  <label className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" onChange={(e) => updatePassword(e.target.value) } value={password} placeholder="Password"></input>
                </div>
                <div className="loginItem">
                  <button className="btn btn-primary" onClick={() => loginUser()}>Sign in</button>
                </div>
            </div>
            <div id="createAccount">
              <label id="createAccountText">Don't have an account? Create one below:</label>
              {/* <button className="btn btn-primary" onClick={() => createUser()}>Create Account</button> */}
              <button className="btn btn-primary" onClick={() => navigate('/createAccount')}>Create Account</button>
            </div>
            <div className="modal fade" id="msgModal" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-dark">
                  <div className="modal-body">error message here</div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}
