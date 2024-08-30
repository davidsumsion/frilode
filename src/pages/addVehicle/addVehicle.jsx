import React from 'react';
import './addVehicle.css'
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../../api/vehicleAPI.js'
import { Card, Title, Button, TextInput, Textarea, Image } from '@mantine/core';
import { Select } from '@mantine/core';
import { ErrorMessage } from '../shared/error.jsx';


export function AddVehicle() {
  const navigate = useNavigate();
  const [name, updateName] = React.useState("");
  const [vehicleType, updateVehicleType] = React.useState("");
  const [priceDay, updatePriceDay] = React.useState("");
  const [priceHour, updatePriceHour] = React.useState("");
  const [make, updateMake] = React.useState("");
  const [model, updateModel] = React.useState("");
  const [description, updateDescription] = React.useState("");
  const [show, setShow] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState("");

  async function addNewVehicle() {
    let image = {
      'jetSki': "https://www.furycat.com/images/jet-ski-tour.jpg",
      'snowmobile': "https://www.snowmobile.com/blog/wp-content/uploads/2019/02/2020-Arctic-Cat-Riot-Powder.jpg",
      'razor': "https://i.pinimg.com/originals/95/5b/fb/955bfb13e33dbc84f4de0048804da6e5.jpg"
    }[vehicleType]

    let newVehicle = { vehicleType, name, priceDay, priceHour, make, model, description, image };
    const response = await createVehicle(newVehicle)
    if (response.ok) navigate('/success')
    else {
      const body = await response.json();
      setModalMessage(`⚠ Error: ${body.msg}`)
      setShow(true);
    }
  }

  return (
    <main className='singleCardPage'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>Input Your Vehicles Information:</Title>
        <div className="singleCardElements" >
          <Select radius='lg' label="Vehicle Type:" placeholder="Pick Vehicle Type" data={['jetSki', 'snowmobile', 'razor']} clearable onChange={(value) => updateVehicleType(value)} value={vehicleType} />
          <TextInput radius='lg' label='Name' placeholder='Name' onChange={(e) => updateName(e.target.value)} value={name} />
          <TextInput radius='lg' label='Price/Day' placeholder='Price/Day' onChange={(e) => updatePriceDay(e.target.value)} value={priceDay} />
          <TextInput radius='lg' label='Price/Hour' placeholder='Price/Hour' onChange={(e) => updatePriceHour(e.target.value)} value={priceHour} />
          <TextInput radius='lg' label='Make' placeholder='Make' onChange={(e) => updateMake(e.target.value)} value={make} />
          <TextInput radius='lg' label='Model' placeholder='Model' onChange={(e) => updateModel(e.target.value)} value={model} />
          <Textarea radius='lg' label='Description' placeholder='Description' onChange={(e) => updateDescription(e.target.value)} value={description} />
        </div>
        <div>
          <Button radius='lg' onClick={() => addNewVehicle()}>Add My Vehicle</Button>
        </div>
      </Card>

      <ErrorMessage show={show} modalMessage={modalMessage} setShow={setShow}></ErrorMessage>
    </main >
  );
}