import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Title, TextInput } from '@mantine/core'
import { ErrorMessage } from '../shared/error.jsx'
import { updateUserInfo } from '../../api/userAPI'


export function UpdateUser() {
  const [phone, updatePhone] = React.useState("");
  const [firstName, updateFirstName] = React.useState("");
  const [preferredName, updatePreferredName] = React.useState("");
  const [lastName, updateLastName] = React.useState("");
  const [show, setShow] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState("");

  const navigate = useNavigate();
  
  async function updateUser() {
    const response = await updateUserInfo(phone, firstName, preferredName, lastName)
    if (response.ok) navigate('/search')
    else {
      const body = await response.json();
      setModalMessage(`⚠ Error: ${body.msg}`)
      setShow(true);
    }
  }



  return (
    <div className="mainPage">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title>Update Personal Information:</Title>
            <div className="PersonalItems">
                <div className="PersonalItem">
                  <TextInput radius='lg' label='Mobile Phone Number' placeholder='(XXX)-XXX-XXXX' onChange={(e) => updatePhone(e.target.value)} value={phone}/>
                  {/* <label className="form-label">Mobile Phone Number:</label>
                  <input type="phone" className="form-control" id="phone" onChange={(e) => updatePhone(e.target.value) } value={phone} placeholder="(XXX)-XXX-XXXX"></input> */}
                </div>
                <div className="PersonalItem">
                  <TextInput radius='lg' label='First Name' placeholder='First Name' onChange={(e) => updateFirstName(e.target.value)} value={firstName}/>
                  {/* <label className="form-label">First Name:</label>
                  <input type="text" className="form-control" id="firstName" onChange={(e) => updateFirstName(e.target.value) } value={firstName} placeholder="First Name"></input> */}
                </div>
                <div className="PersonalItem">
                  <TextInput radius='lg' label='Preferred Name' placeholder='prefferredName' onChange={(e) => updatePreferredName(e.target.value)} value={preferredName}/>
                  {/* <label className="form-label">Preferred Name:</label>
                  <input type="text" className="form-control" id="preferredName" onChange={(e) => updatePreferredName(e.target.value) } value={preferredName} placeholder="Preferred Name"></input> */}
                </div>
                <div className="PersonalItem">
                  <TextInput radius='lg' label='Last Name' placeholder='Last Name' onChange={(e) => updateLastName(e.target.value)} value={lastName}/>

                  {/* <label className="form-label">Last Name:</label>
                  <input type="text" className="form-control" id="lastName" onChange={(e) => updateLastName(e.target.value) } value={lastName} placeholder="Last Name"></input> */}
                </div>
                <div className="PersonalItem">
                  <button className="btn btn-primary" onClick={() => updateUser()}>Update My Info</button>
                </div>
            </div>
      </Card>
      <ErrorMessage show={show} modalMessage={modalMessage} setShow={setShow}></ErrorMessage>
    </div>
  );
}
