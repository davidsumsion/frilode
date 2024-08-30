import React from 'react';
import '../shared/style.css'
import { useNavigate } from 'react-router-dom';
import { Card, Title, Button, Text, Image } from '@mantine/core'
import { rentVehicle } from '../../api/vehicleAPI'

export function Vehicle() {
  const lowTextProps = {
    size: 'lg'
  }
  const vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));
  const navigate = useNavigate();

  async function rent() {
    vehicle.rented = true;
    const response = await rentVehicle(vehicle)
    if (response.ok) navigate('/success')
    // TODO: else throw error
  }

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


