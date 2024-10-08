import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Title, Button, TextInput } from '@mantine/core';
import { PasswordStrengthInput } from './passwordRequirement'
import { loginOrCreate } from './login.js';
import { ErrorMessage } from '../shared/error.jsx';
import '../shared/style.css'

export function CreateAccount() {
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const [show, setShow] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState("");

  const navigate = useNavigate();

  async function createUser() {
    loginOrCreate({ setModalMessage, setShow, username, password, navigate }, 'create');
  }

  return (
    <div className="mainPage">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>Create Account</Title>
        <div>
          <div className="cardItem">
            <TextInput radius='lg' label='Username' placeholder='Username' onChange={(e) => updateUsername(e.target.value)} value={username} />
          </div>
          <div className="cardItem">
            <PasswordStrengthInput onChange={(e) => updatePassword(e.target.value)} value={password}></PasswordStrengthInput>
          </div>
          <div className="cardItem">
            <Button radius='lg' onClick={() => createUser()}>Create Account</Button>
          </div>
        </div>
      </Card>

      <ErrorMessage show={show} modalMessage={modalMessage} setShow={setShow}></ErrorMessage>
    </div>
  );
}
