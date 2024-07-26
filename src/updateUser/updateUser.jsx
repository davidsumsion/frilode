import React from 'react';
import { useNavigate } from 'react-router-dom';
import './updateUser.css';


export function UpdateUser() {
  const [phone, updatePhone] = React.useState("");
  const [firstName, updateFirstName] = React.useState("");
  const [preferredName, updatePreferredName] = React.useState("");
  const [lastName, updateLastName] = React.useState("");

  const navigate = useNavigate();
  
  async function updateUser() {
    console.log(`Phone; ${phone}`)
    const response = await fetch('api/updateuser', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ phone, firstName, preferredName, lastName})
    });
    // force all phone, firstName, prefferedName, lastname to not be ""
    if (response.ok) navigate('/search')
    // else throw error
  }



  return (
    <div className="mainPage">
      <div className="UpdateUserMenu">
            <h2 id="title">Update Personal Information:</h2>
            <div className="PersonalItems">
                <div className="PersonalItem">
                  <label className="form-label">Mobile Phone Number:</label>
                  <input type="phone" className="form-control" id="phone" onChange={(e) => updatePhone(e.target.value) } value={phone} placeholder="(XXX)-XXX-XXXX"></input>
                </div>
                <div className="PersonalItem">
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-control" id="firstName" onChange={(e) => updateFirstName(e.target.value) } value={firstName} placeholder="First Name"></input>
                </div>
                <div className="PersonalItem">
                  <label className="form-label">Preferred Name:</label>
                  <input type="text" className="form-control" id="preferredName" onChange={(e) => updatePreferredName(e.target.value) } value={preferredName} placeholder="Preferred Name"></input>
                </div>
                <div className="PersonalItem">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-control" id="lastName" onChange={(e) => updateLastName(e.target.value) } value={lastName} placeholder="Last Name"></input>
                </div>
                <div className="PersonalItem">
                  <button className="btn btn-primary" onClick={() => updateUser()}>Update My Info</button>
                </div>
            </div>
      </div>
    </div>
  );
}
