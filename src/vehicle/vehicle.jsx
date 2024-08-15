import React from 'react';
// import './vehicle.css'
import { useNavigate } from 'react-router-dom';
import { Card, Title, Button, Text, Image } from '@mantine/core'



export function Vehicle() {
  const lowTextProps = {
    size: 'lg'
  }

  const navigate = useNavigate();

  async function rent() {
    console.log(localStorage.getItem("selectedVehicle"))
    var object = JSON.parse(localStorage.getItem("selectedVehicle"));
    object.rented = true;
    const response = await fetch('/api/rentVehicle', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 'vehicle-id': object._id })
    })
    console.log(`responsecode: ${response.status}`)
    //TODO: handle if response was successful!!
    if (response.ok) navigate('/success')
    // else throw error     
  }

  const vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));

  return (
    <main className='mainPage'>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Image radius='lg' height={200} src={vehicle.image} alt={vehicle.name}></Image>
          <Title>{vehicle.name}</Title>
          <Text {...lowTextProps}>Price/day: {vehicle.priceDay}</Text>
          <Text {...lowTextProps}>Price/hour: {vehicle.priceHour}</Text>
          <Text {...lowTextProps}>Make: {vehicle.make}</Text>
          <Text {...lowTextProps}>Model: {vehicle.model}</Text> 
          <Text {...lowTextProps}>Description: {vehicle.description}</Text>
          <div className='cardItems'>
            <Button onClick={() => rent()}> Book </Button>
          </div>
        </Card>
    </main>
  );
}


