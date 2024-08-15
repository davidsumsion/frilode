import React from 'react';
import './addVehicle.css'
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../api/vehicleAPI.js'
import { Card, Title, Button, TextInput, Textarea, Image } from '@mantine/core';
import { Select } from '@mantine/core';


export function AddVehicle() {
  const navigate = useNavigate();
  const [name, updateName] = React.useState("");
  const [vehicleType, updateVehicleType] = React.useState("");
  const [priceDay, updatePriceDay] = React.useState("");
  const [priceHour, updatePriceHour] = React.useState("");
  const [make, updateMake] = React.useState("");
  const [model, updateModel] = React.useState("");
  const [description, updateDescription] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null)
  const jetSkiImage = "https://www.furycat.com/images/jet-ski-tour.jpg";
  const snowmobileImage = "https://www.snowmobile.com/blog/wp-content/uploads/2019/02/2020-Arctic-Cat-Riot-Powder.jpg";
  const razorImage = "https://i.pinimg.com/originals/95/5b/fb/955bfb13e33dbc84f4de0048804da6e5.jpg";

  class Vehicle {
    constructor(vehicleType, name, priceDay, priceHour, make, model, description, image, rented = false) {
      this.vehicleType = vehicleType;
      this.name = name;
      this.priceDay = priceDay;
      this.priceHour = priceHour;
      this.make = make;
      this.model = model;
      this.description = description;
      this.image = image;
      this.rented = rented;
    }
    getName() { return this.name; }
    getPriceDay() { return this.priceDay; }
    getPriceHour() { return this.priceHour; }
    getMake() { return this.make; }
    getModel() { return this.model; }
    getDescription() { return this.description; }
    getImage() { return this.image; }
  }

  async function addNewVehicle() {
    var image = null;
    switch (vehicleType) {
      case 'jetSki':
        image = jetSkiImage;
        break;
      case 'snowmobile':
        image = snowmobileImage;
        break;
      case 'razor':
        image = razorImage;
        break;
    }

    let newVehicle = new Vehicle(vehicleType, name, priceDay, priceHour, make, model, description, image);
    const response = await createVehicle(newVehicle)
    if (response.ok) navigate('/success')
  }

  return (
    <main className='singleCardPage'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>Input Your Vehicles Information:</Title>

        <div className="singleCardElements" >
          <Select
            radius='lg'
            label="Vehicle Type:"
            placeholder="Pick Vehicle Type"
            data={['jetSki', 'snowmobile', 'razor']}
            clearable
            onChange={(value) => updateVehicleType(value)} value={vehicleType}
          />
          <TextInput radius='lg' label='Name' placeholder='Name' onChange={(e) => updateName(e.target.value)} value={name} />
          <TextInput radius='lg' label='Price/Day' placeholder='Price/Day' onChange={(e) => updatePriceDay(e.target.value)} value={priceDay} />
          <TextInput radius='lg' label='Price/Hour' placeholder='Price/Hour' onChange={(e) => updatePriceHour(e.target.value)} value={priceHour} />
          <TextInput radius='lg' label='Make' placeholder='Make' onChange={(e) => updateMake(e.target.value)} value={make} />
          <TextInput radius='lg' label='Model' placeholder='Model' onChange={(e) => updateModel(e.target.value)} value={model} />
          <Textarea radius='lg' label='Description' placeholder='Description' onChange={(e) => updateDescription(e.target.value)} value={description} />
          {/* Conditionally render the selected image if it exists */}
          <div>
          {selectedImage && (
            <div>
              {/* Display the selected image */}
              <Image
                alt="not found"
                width={"250px"}
                src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fpolaris-rzr&psig=AOvVaw3tHkw78znJKgHQKDwgTw6f&ust=1723603980182000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNj1tqn78IcDFQAAAAAdAAAAABAJ'}
              />
              <br /> <br />
              {/* Button to remove the selected image */}
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}

          <br />

          {/* Input element to select an image file */}
          <input
            type="file"
            name="myImage"
            // Event handler to capture file selection and update the state
            onChange={(event) => {
              console.log(event.target.files[0]); // Log the selected file
              setSelectedImage(event.target.files[0]); // Update the state with the selected file
            }}
          />
        </div>
      </div>
      <div>
        <Button radius='lg' onClick={() => addNewVehicle()}>Add My Vehicle</Button>
      </div>
    </Card>
    </main >
  );
}