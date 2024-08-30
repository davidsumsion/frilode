import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../shared/style.css'
import { Card, Title, PasswordInput, Button, TextInput, Text } from '@mantine/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginOrCreate } from './login.js';
import { ErrorMessage } from '../shared/error.jsx';

export function Login() {
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const [show, setShow] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState("");

  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate({ setModalMessage, setShow, username, password, navigate }, 'login');
  }
  return (
    <div className="mainPage">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title id="title" >Sign in</Title>
        <div>
          <div className="cardItem">
            <TextInput radius='lg' label='Username' placeholder='Username' onChange={(e) => updateUsername(e.target.value)} value={username} />
          </div>
          <div className="cardItem">
            <PasswordInput radius="lg" label="Password:" placeholder="Password" onChange={(e) => updatePassword(e.target.value)} value={password} />
          </div>
          <div className="cardItem">
            <Button radius='lg' onClick={() => loginUser()}>Sign in</Button>
          </div>
        </div>
        <div className='cardItem'>
          <Text size='sm' c='dimmed'>Don't have an account? Create one:</Text>
          <Button radius='lg' onClick={() => navigate('/createAccount')}>Create Account</Button>
        </div>

        <ErrorMessage show={show} modalMessage={modalMessage} setShow={setShow}></ErrorMessage>
      </Card>
    </div>
  );
}
