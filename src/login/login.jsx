import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { Card, Title, PasswordInput, Button, TextInput, Text} from '@mantine/core';

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
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title id="title" >Sign in</Title>
        <div className="loginItems">
          <div className="loginItem">
            <TextInput radius='lg' label='Username' placeholder='Username' onChange={(e) => updateUsername(e.target.value)} value={username}/>
          </div>
          <div className="loginItem">
            <PasswordInput radius="lg" label="Password:" placeholder="Password" onChange={(e) => updatePassword(e.target.value)} value={password}/>
          </div>
          <div className="loginItem">
            <Button radius='lg' onClick={() => loginUser()}>Sign in</Button>
          </div>
        </div>
        <div id="createAccount">
          <Text size='sm' c='dimmed'>Don't have an account? Create one:</Text>
          {/* <button className="btn btn-primary" onClick={() => createUser()}>Create Account</button> */}
          <Button radius='lg' onClick={() => navigate('/createAccount')}>Create Account</Button>
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
      </Card>
    </div>
  );
}
