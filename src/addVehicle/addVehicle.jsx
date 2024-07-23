import React from 'react';
import './addVehicle.css'
import { useNavigate } from 'react-router-dom';


export function AddVehicle() {
  const navigate = useNavigate();
  const [name, updateName] = React.useState("");
  const [vehicleType, updateVehicleType] = React.useState("");
  const [priceDay, updatePriceDay] = React.useState("");
  const [priceHour, updatePriceHour] = React.useState("");
  const [make, updateMake] = React.useState("");
  const [model, updateModel]  = React.useState("");
  const [description, updateDescription] = React.useState("");
  const jetSkiImage = "https://www.furycat.com/images/jet-ski-tour.jpg";
  const snowmobileImage = "https://www.snowmobile.com/blog/wp-content/uploads/2019/02/2020-Arctic-Cat-Riot-Powder.jpg";
  const razorImage = "https://i.pinimg.com/originals/95/5b/fb/955bfb13e33dbc84f4de0048804da6e5.jpg";

  class Vehicle {
    constructor(vehicleType, name, priceDay, priceHour, make, model, description, image, rented=false){
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
    getName(){ return this.name; }
    getPriceDay(){ return this.priceDay; }
    getPriceHour(){ return this.priceHour; }
    getMake(){ return this.make; }
    getModel(){ return this.model; }
    getDescription(){ return this.description; }
    getImage(){ return this.image; }
}

  async function addNewVehicle(){
    // console.log("made it to add new vehicle")
    var image = "";
    if (vehicleType=="jetSki") {image = jetSkiImage}
    if (vehicleType=="snowmobile") {image = snowmobileImage}
    if (vehicleType=="razor") {image = razorImage}

    let newVehicle = new Vehicle(vehicleType, name, priceDay, priceHour, make, model, description, "");
    if (vehicleType == "jetSki") { 
        const jsonJetSkiString = JSON.stringify(newVehicle)
        const response = await fetch('/api/jetSki', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonJetSkiString,
        });
        // console.log("sent http")
        const jetSkis = await response.json();
    }    
    if (vehicleType == "snowmobile") { 
        const jsonSnowmobileString = JSON.stringify(newVehicle)
        const response = await fetch('/api/snowmobile', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonSnowmobileString,
        });
        const jetSkis = await response.json();
    }    
    if (vehicleType == "razor") { 
        const jsonString = JSON.stringify(newVehicle)
        const response = await fetch('/api/razor', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonString,
        });
        const jetSkis = await response.json();
    }  
    // Let other users know another vehicle was added
    // broadcastEvent(getPlayerName(), vehicleType, 'added');

    navigate('/success')
}

  return (
    <main className='container-fluid text-center'>
      <div>
        <h2> SkiDoo 2021 </h2>
          <h5>
            Input Your Vehicles Information: 
          </h5>

          <div className="mb-3" >
            <label htmlFor="vehicleType" className="form-label" >Vehicle Type: jetSki, snowmobile, razor. Must be exact.</label>
            <input className="form-control" id="vehicleType" onChange={(e) => updateVehicleType(e.target.value) } value={vehicleType} placeholder="jetSki, snowmobile, razor" ></input>
          </div>
          
          <div className="mb-3">
            <label htmlFor="name" className="form-label" >Name Your Vehicle</label>
            <input className="form-control" id="name" onChange={(e) => updateName(e.target.value) } value={name} placeholder="Name"></input>
          </div>

          <div className="mb-3">
            <label htmlFor="PriceDay" className="form-label">Price/Day</label>
            <input className="form-control" id="PriceDay" onChange={(e) => updatePriceDay(e.target.value) } value={priceDay} placeholder="$Price/Day"></input>
          </div>

          <div className="mb-3">
            <label htmlFor="PriceHour" className="form-label">Price/Hour</label>
            <input className="form-control" id="PriceHour" onChange={(e) => updatePriceHour(e.target.value) } value={priceHour} placeholder="$Price/Hour"></input>
          </div>

          <div className="mb-3">
            <label htmlFor="make" className="form-label">Make</label>
            <input className="form-control" id="make" onChange={(e) => updateMake(e.target.value) } value={make} placeholder="Make"></input>
          </div>

          <div className="mb-3">
            <label htmlFor="model" className="form-label">Model</label>
            <input className="form-control" id="model" onChange={(e) => updateModel(e.target.value) } value={model} placeholder="Model"></input>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input className="form-control" id="description" onChange={(e) => updateDescription(e.target.value) } value={description} placeholder="Description"></input>
          </div>
          <br></br>
            <div>
              <button className="btn btn-primary" onClick={() => addNewVehicle()}>Add My Vehicle</button>
          </div>
        </div>
    </main>
  );
}