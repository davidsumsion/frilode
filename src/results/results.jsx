import React from 'react';
import './results.css'
import { useNavigate } from 'react-router-dom';
import { Title, Card, Image, Text, Badge, Button, Group, Flex } from '@mantine/core'


export function Results() {
  const navigate = useNavigate();


  function viewVehicle(myVehicle) {
    localStorage.setItem("selectedVehicle", JSON.stringify(myVehicle));
    //change windows
    navigate('/vehicle')
  }


  var queryResultsDisplay = []
  const data = JSON.parse(localStorage.getItem("queryResults"))
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      // jsonObject = JSON.parse(data[i]);
      const tempVehicle = data[i];
      // const tempVehicle = new Vehicle(jsonObject.vehicleType, jsonObject.name, jsonObject.priceDay, jsonObject.priceHour, jsonObject.make, jsonObject.model, jsonObject.description, jsonObject.image, jsonObject.rented)
      queryResultsDisplay.push(
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image className="market-photos" src={tempVehicle.image} alt={tempVehicle.name} height={160}></Image>
          </Card.Section>
          <div className='cardItems'>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{tempVehicle.name}</Text>
              <Badge color="red">Discount</Badge>
            </Group>
            <Text size="md" c="dimmed">Price/day: {tempVehicle.priceDay}$</Text>
            <Text size="md" c="dimmed">Price/hour: {tempVehicle.priceHour}</Text>
            <Text size="md" c="dimmed">Make: {tempVehicle.make}</Text>
            <Text size="md" c="dimmed">Model: {tempVehicle.model}</Text>
            <Text size="md" c="dimmed" truncate='end'>Description: {tempVehicle.description}</Text>
            <br></br>
            <Button type="submit" className="btn btn-primary btn-sm" onClick={() => viewVehicle(tempVehicle)} >See More Information</Button>
          </div>
        </Card>
      );
    }
  } else {
    console.log('no data!')
  }

  return (
    <div className="overview">
      <Title> Results of your search: </Title>
      <div className="containerMarketplace">
        {queryResultsDisplay}
      </div>
    </div>
  );
}






// <div className="card">
//       <img className="market-photos" src={tempVehicle.image} alt={tempVehicle.name} />
//       <h3>{tempVehicle.name}</h3>
//       <p>
//         Price/day: {tempVehicle.priceDay}$<br />
//         Price/hour: {tempVehicle.priceHour}$<br />
//         Make: {tempVehicle.make}<br />
//         Model: {tempVehicle.model}
//       </p>
//       <button type="submit" className="btn btn-primary btn-sm" onClick={rent}>
//         See More Information
//       </button>
//     </div>