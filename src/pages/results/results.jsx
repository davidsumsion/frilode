import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Card, Image, Text, Badge, Button, Group, Flex } from '@mantine/core'
import '../shared/style.css'

export function Results() {
  const navigate = useNavigate();

  function viewVehicle(myVehicle) {
    localStorage.setItem("selectedVehicle", JSON.stringify(myVehicle));
    navigate('/vehicle')
  }

  var queryResultsDisplay = []
  const data = JSON.parse(localStorage.getItem("queryResults"))
  data.forEach((vehicle) => {
    queryResultsDisplay.push(
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={vehicle.image} alt={vehicle.name} height={160}></Image>
        </Card.Section>
        <div className='cardItems'>
          <Group>
            <Text fw={500}>{vehicle.name}</Text>
            <Badge color="red">Discount</Badge>
          </Group>
          <Text size="md" c="dimmed">Price/day: ${vehicle.priceDay}</Text>
          <Text size="md" c="dimmed">Price/hour: ${vehicle.priceHour}</Text>
          <Text size="md" c="dimmed">Make: {vehicle.make}</Text>
          <Text size="md" c="dimmed">Model: {vehicle.model}</Text>
          <Text size="md" c="dimmed" truncate='end'>Description: {vehicle.description}</Text>
          <br></br>
          <Button onClick={() => viewVehicle(vehicle)} >See More Information</Button>
        </div>
      </Card>
    );
  })

  return (
    <div className="mainPage">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title> Results of your search: </Title>
        <div className="containerMarketplace">
          {queryResultsDisplay}
        </div>
      </Card>
    </div>
  );
}

