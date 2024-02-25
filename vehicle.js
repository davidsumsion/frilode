class Vehicle {
    constructor(vehicleType, name, priceDay, priceHour, make, model, description, image){
        this.vehicleType = vehicleType;
        this.name = name;
        this.priceDay = priceDay;
        this.priceHour = priceHour;
        this.make = make;
        this.model = model;
        this.description = description;
        this.image = image;
    }
    getName(){ return this.name; }
    getPriceDay(){ return this.priceDay; }
    getPriceHour(){ return this.priceHour; }
    getMake(){ return this.make; }
    getModel(){ return this.model; }
    getDescription(){ return this.description; }
    getImage(){ return this.image; }
}

const dropDownMenu = document.getElementById("vehicleTypeButton")

// document.addEventListener("DOMContentLoaded", function() {
//     const dropDownMenu = document.getElementById("dropdownMenuButton")
//     dropDownMenu.addEventListener("click", function(event){
//         if (event.target.classList.contains("dropdown-item")){
//             const selectedItem = event.target.getAttribute("data-item")

//             // }
//         window.location.href = "marketplace.html";
//         }
//     });   
// });



class VehicleDA {
    constructor(){
        this.queryResults = null;
    }

    putVehicle(vehicle){ localStorage.setItem(vehicle.name, vehicle) }
}

myVehicleDA = new VehicleDA();

async function search(vehicleType){
    console.log("reached search")
    let returnList = []
    for (let i = 0; i < localStorage.length-1; i++){
        // let key = localStorage.key(i);
        let value = localStorage.value(i);
        if (value instanceof Vehicle){
            if (value.vehicleType === typeVehicle){
                returnList.push(value);
            }
        }
    }
    myVehicleDA.queryResults = returnList;
}