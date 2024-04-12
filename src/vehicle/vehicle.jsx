import React from 'react';
// import './vehicle.css'
import { useNavigate } from 'react-router-dom';



export function Vehicle() {
  const navigate = useNavigate();

  async function rent(){
    var object = JSON.parse(localStorage.getItem("selectedVehicle"));
    object.rented = true;
    //JET SKI
    if (object.vehicleType == "jetSki"){
        const response = await fetch('/api/jetSki', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        let myList = await response.json();
        var jsonVehicle = JSON.stringify({'vehicle':'jetski'})
        console.log(jsonVehicle)
        const response3 = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: jsonVehicle
        });
        for (let i = 0; i < myList.length; i++){
            if (myList[i].name == object.name){
                myList[i].rented = true;
            }
        }
        for (let i = 0; i < myList.length; i++) {
            var jsonString = JSON.stringify(myList[i])
            const response2 = await fetch('/api/jetSki', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonString,
            });
        }
    }
    //SNOWMOBILE
    if (object.vehicleType == "snowmobile"){
        const response = await fetch('/api/snowmobile', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        let myList = await response.json();

        var jsonVehicle = JSON.stringify({'vehicle':'snowmobile'})
        console.log(jsonVehicle)
        const response3 = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: jsonVehicle
        });

        for (let i = 0; i < myList.length; i++){
            if (myList[i].name == object.name){
                myList[i].rented = true;
            }
        }

        for (let i = 0; i < myList.length; i++) {
            var jsonString = JSON.stringify(myList[i])
            const response2 = await fetch('/api/snowmobile', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonString,
            });
        }
    }
    //RAZOR
    if (object.vehicleType == "razor"){
        const response = await fetch('/api/razor', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        let myList = await response.json();
        var jsonVehicle = JSON.stringify({'vehicle':'razor'})
        console.log(jsonVehicle)
        const response3 = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: jsonVehicle
        });
        for (let i = 0; i < myList.length; i++){
            if (myList[i].name == object.name){
                myList[i].rented = true;
            }
        }
        for (let i = 0; i < myList.length; i++) {
            var jsonString = JSON.stringify(myList[i])
            const response2 = await fetch('/api/razor', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonString,
            });
        }
    }
    navigate('/success')       
  }

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

  const vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));


  return (
    <main>
    <h2 id="descriptivetitle">{vehicle.name}</h2>
        <div className="container">
          <div className="card">
            <img className="market-photos" id= 'specImg' src={vehicle.image} alt={vehicle.name}></img>
            <h3 id="specTitle">{vehicle.name}</h3>
            <p id = "specInfo">
                Price/day: {vehicle.priceDay}$
                Price/hour: {vehicle.priceHour}$
                Make: {vehicle.make}
                Model: {vehicle.model}
            </p>
            </div>
            <div className="card">
              <h5>
                Description: 
              </h5>
              <p id="longDescription">{vehicle.description}</p>
           </div>
        
      </div>
      <div className="col-md-3 text-end">
        <a id="rent" className="btn btn-dark" onClick={ () =>rent() }>Book Now</a>
      </div>
  </main>
  );
}


