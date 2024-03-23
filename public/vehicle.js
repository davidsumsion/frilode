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

const dropDownMenu = document.getElementById("vehicleTypeButton")

document.addEventListener("DOMContentLoaded", async function() {
    const jetSki = document.getElementById("jetSki")
    if (jetSki){
        jetSki.addEventListener("click", async function(event){
            await search("jetSkiArr")
            window.location.href = "marketplace.html";
        });   
    }
}); 

document.addEventListener("DOMContentLoaded", async function() {
    const snowmobile = document.getElementById("snowmobile")
    if (snowmobile){
        snowmobile.addEventListener("click", async function(event){
            await search("snowmobileArr")
            window.location.href = "marketplace.html";
        });   
    }
}); 

document.addEventListener("DOMContentLoaded", async function() {
    const razor = document.getElementById("razor")
    if (razor){
        razor.addEventListener("click", async function(event){
            await search("razorArr")
            window.location.href = "marketplace.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    const renter = document.getElementById("rent")
    if (renter){
        renter.addEventListener("click", async function(){
            var object = JSON.parse(localStorage.getItem("selectedVehicle"));
            object.rented = true;

            //JET SKI
            if (object.vehicleType == "jetSki"){
                const response = await fetch('/api/jetSki', {
                    method: 'GET',
                    headers: {'content-type': 'application/json'}
                });
                let myList = await response.json();

                jsonVehicle = JSON.stringify({'vehicle':'jetski'})
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
                    jsonString = JSON.stringify(myList[i])
                    const response2 = await fetch('/api/jetSki', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: jsonString,
                    });
                }

                window.location.href = "VehicleAdded.html";
                showAlert("You Rented a Vehicle!")
            }

            //SNOWMOBILE
            if (object.vehicleType == "snowmobile"){
                const response = await fetch('/api/snowmobile', {
                    method: 'GET',
                    headers: {'content-type': 'application/json'}
                });
                let myList = await response.json();

                jsonVehicle = JSON.stringify({'vehicle':'snowmobile'})
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
                    jsonString = JSON.stringify(myList[i])
                    const response2 = await fetch('/api/snowmobile', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: jsonString,
                    });
                }

                window.location.href = "VehicleAdded.html";
                showAlert("You Rented a Vehicle!")
            }

            //RAZOR
            if (object.vehicleType == "razor"){
                const response = await fetch('/api/razor', {
                    method: 'GET',
                    headers: {'content-type': 'application/json'}
                });
                let myList = await response.json();

                jsonVehicle = JSON.stringify({'vehicle':'razor'})
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
                    jsonString = JSON.stringify(myList[i])
                    const response2 = await fetch('/api/razor', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: jsonString,
                    });
                }

                window.location.href = "VehicleAdded.html";
                showAlert("You Rented a Vehicle!")
            }
        });   
    }
}); 



//LOAD VEHICLES
//Load Jetskis
async function loadJetSKi() {
    let jetSkiList = [];
    try {
      // Get the latest JetSki List from the service
      const response = await fetch('/api/jetSki');
      jetSkiList = await response.json();
  
      // Save the scores in case we go offline in the future
      localStorage.setItem('jetSkiArr', JSON.stringify(jetSkiList));
    } catch {
      // If there was an error then just use the last saved scores
      const jetSkiArrText = localStorage.getItem('jetSkiArr');
      if (jetSkiArrText) {
        jetSkiList = JSON.parse(jetSkiArrText);
      }
    }
  }



async function nameDay(){
    const response = await fetch('https://nameday.abalin.net/api/V1/today?country=es&timezone=Arctic/Longyearbyen', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'country': 'us'
    }
    })
    return response.json();
}



// async function fakeData(){
//     if (!localStorage.getItem("fakeIndicator") || localStorage.getItem("fakeIndicator") == "false"){
//         let vehicleTypes = ["jetSki", "jetSki", "jetSki", "jetSki", "jetSki"]
//         let names = ["fun", "funner", "funest", "funester", "funestest"]
//         let pricesDay = ["100", "110", "120", "130", "140"]
//         let pricesHour = ["30", "35", "40", "45","50"]
//         let makes = ["skidoo", "waterhoser", "lockheedmartin", "bomber", "cruise"]
//         let models = ["super soaker", "super slick", "fasttrack", "bouncer", "rider"]
//         let images = [
//             "https://upload.wikimedia.org/wikipedia/commons/5/5f/1985_Kawasaki_550_Jet_Ski%C2%AE.jpg", 
//             "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFRUZGRYYGhkYHBgaHBoaGhwZHBkcGhgaHB0dIS4lHB4rHxkYJjgmLS8xNTU1GiQ7QDs0QC40NTEBDAwMEA8QHhISHDQsJCs0MTQ2NDE0NzQ/NDE0NT8xNDQ2NDc0Pzo0PzE0NDQ0NjExNzQ0PzQ0NDQ0NTQ0MTQxNP/AABEIALABHgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcBAgj/xABIEAACAQIDAggHCwsFAQAAAAABAgADEQQSIQUxBiJBUWFxgZETMlKSobHRBxUXQlRicoKTotIUFiMzREVTwdPh8ENVc7LC4v/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAKBEBAAICAAUDAwUAAAAAAAAAAAECAxESITFBUQQiYXGRoRMUMoHw/9oADAMBAAIRAxEAPwDqMRE0EREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREhY7aS0yFCs7n4q8nSzblHp6IE2Jqz8MqSvkcoALZiH8UG+vGC5t24dM2LBYtKyLUpuHRr2YbjYlTv5iCOySJ2kTtniIlUiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiJhrYkLpqW8kant5hJMxHUZpA2ntihh7eGqBWbxUAL1H+iigs3WBaY6mPdEd38HTVfFdmLAC2pdeKL5tAobXTXW01FeDVbEXbEYuoXqG706KCmSNbI75mNgDbICQPJve+YtFuibVPCj3T6iv4PC02p2Or1gucCxFslzlPxhm13XE2/YXCgPh6b1kZXIs2YBQbbmGYjVubn7Jrm1+BmDwtMsPBpWVSyI7l2dgOKCOUXtrlAE5xj8JXqOWqm7MeQlrA8ig9HJeJ4p6JMzvUO97b24lHDeHDaOFyc5LDMDboW5t0Tie2dv18QXZ3cKDZUV2VQDuuB450Op5zyaDesTwrXwS+EwFR0yhM9WqyBiVIJACHflJ0PNzi+pYtcHVICYc4cHxiKtSqx+jnOUa86nsm1e+5/wVOMqlnBXD0yCxGmZ7g5FPVqeYW5xO44bDpTRURFRFFlVQAoHQBOd8EtoDD/ocOc9GxY5wgcOTfXLoy20uclrb25N6w+0QQucZCd9zoD18vWNOmQiE6IiVSIiAiIgIiR3xtNWyF1DDeL7uvmgSImI4lPLXzhML7RpDe6wJcSrq7eoLvf0e2e7M25Rro7o3ERihY2tcAE2PLoRBtZxMGDxiVVz03V1BK5lNxmG8X5bXmeAiIgIiICIiAiIgIiQsRjlUEggKPjsbL2eV6B0zFr1rHNJmI6phNtTukd8WPijN07l7957AZSYjabMeIjOeRn4ifVW2Y9i9sx/kOKqavW8Gp5EUJ943fvnlt6iZ5Vcpy+ImU7aO0lpi9RzruVAf5a+kdU0zhJw7egn6CkBc2DPuBsTfKu/dzjtmyDg3S3vVqOel7+uUvCLgn4QBsO6Kyg8SqudHNxvbUrpcaC9yNdJmtvd7nKJy2vG9RH5c/ocMmD+ErU/yqqCChrsfAU25CtFbDML+MW7t8+8b7pG0HFhWSiCLZaKIp843YedPNo06FJvB43Z7Um1tUw72U9Kq11bztJS4jBYVgTRxDj5lWnZvOQlZ7Y1rk9TNsrhE9OqKjjO1ySXHhMxKlbsGN2Ive994E27A8J8wAp1KaHyVVEbQDyhmO7fcznzYBrZlsyjeVN7dJG8Dp3dM+MOgvyE9O706d8uxvOO20G0aozgfOJQHrJt2C5lQ+IZzxRpz7h7T/mkrKOpuxv6h1DkltRbmgfdGk4IIqMG5CCRbqtydE2fZO36qWWq6uh0uRZrd2vYB2zWcRUIRiBxgDYdNtJC2fXDMMxPbv7emB3vYeO8ImoIseLe2qHVTpzbuwS0nKNm7camAEewHIdR/aWn54FRq6en2ym3Q5ir11RSzGwE59Q4aF3VEcZmO8A2AAuSb8gAJn3jtqu5sWJUc+lzz2G6cM+aMdd9/DNrxVfvtcli2bKo16ABIuC4UML5xmF9OQjo6pou2Nu8bwSG4XVyOUjUr1C1z/aXeywng0YjM7gEAmw1F+TkA1O/dPLivOKs5Mm5meycWo3K+2lwuyqQiWdgQutyCdxtbkmvYXC1nOYqwublnNiSd5N9e2WaOiXPFF95sBeRMVwgprpm13b7clt28zNvW3tOsdfu5W9RWO6dS2Y+mepboXX0n2SDtjaWGwq8Y53Pipm1PNe2gHYTzctqDa228Q4tRU2PxsrW7Bbjcu/Tr3Sh/IHBL1nyE72bxjz8ZvUJ0x1yX92W39Qlc9Zjc/buscbwvxD3VESinQgvbpL5jfqAm78FeCNCtRpYnE1HxLOocLUY+DW97gLfjW3am2m6axwdwmCaojYim7INQ7Kxpu3ICl7sNb7iNLWnW8Jiabi1NlsNMq6WHNl0t1WnspERHKNPRW3FG9aZaNFUUIiqiroFUBVA5gBoJkiJtoiIgIiICIiAmHFYpKa5nYAdJAv1XnuJZwjFAGcKSqnQFrcUHovONbY4RVi+ZwS5uM+Yrl50C24g6iDvkHQMfwhphrO6hT4qvlprfk8ds1Qi3jKpHGFhcSIOEGGZgP09aqdy0qTsRz5Wqqi26QoHrnK1xj5syIoffmVC7k85d8zE9s8qYnEEks7i+hu5W45rXExOKszuYZmInq7LVxeHRMzI6sRcqzszA21U5XyXHQbTT9o7bSq9lqtQXdcujp2orK69eZuqc/tc3Nr89wZKRARe4HWQJeCutaS1a2jUw2zwFVtUenXHPTqBm7VaxHpmRNr1KWjl05LPcDqBOh7JpxyDe699/VJ+A4QGm1jWrMltyuQBzAZ0YDS+4Cc7Ya27PJb0dd7rMxPxLb6mNGIQpUCVEberAEdYIsQekaiaJtbZyYWqrBc6HjIHCsptvRr3zW05NxEu6O2cDe5TEBiblvCliTzk5VvM2KxeArrkc1VFw18qMbgWBvnB3G0zjxWpblPJvFjy0t7p3DVtq7Y8NkyUUohQbrTAAY+UbKDu0sSZXKRe5VT2fy3HtBm2HYOAbxMXUB+eht91G9c8HBFD4mMoueQXCH77Ceh6lDh8VRuS9BWB5AWTXnzIRbzTLBMRhyLI9Wn81rVU6Quqv6D1SbU4E4gC6oH/4zm9NremVlfYFVDZqbX5gM3flvA+MViVXis+/dcN/6AYdoEg08jHjlhzOliei4OjDtHXJD4Z00uyjyTcDtU6GRyvOinpF1P3SB3gwJqU/IxC9Tq6HvUMvewnw2FrG9lD/APG6OfNRi3okZHTlzr3P6eLbuMsKNPDZbvXvzqFdSO0qb9YkmdJM6habIyUFzVDlqNvzArlHkjNbXnkjGbWzKVoXeodAVBbKOVhbef8AOSV1DaeGpiyqzC1jfMQRzFW4p7pIPC1QLBHtzcUDsF9J5L45tbi1M/WXitF5tuImfryYMDseuFceDIZxlzOwXKtwTxSQ1zy9Ql2mBqFVDVgmS2UUwxOgyi5YryE8hGsqDwq5qZ7dPbIWI25Uf4rgcwe3Z4n9+mXgy2n3ahJpmtPONL7FPQQ/pKjux5GY+hUt3T7wjO1vyfBuc1rOVyA8ZV8YjnZRxivjDWaqlcg3FLfyFm9JWzN9YmbFgeE+PYhUeigAY5qoQD4t8zN47HKm+5OUc061wVjrzdqenrH8mLaVHHMUChWFWmaitTcBMgcISXvvBKjRyOMp5RNexDPTd0cgsps1mYqTy6gi82CvhcS4s+IwpUAAJ4U5FAFgERTkWwAHFAkT836h1NXCdtRSR33nWKxHSHeKRXpCHhdoqh/Vr3uR5rsy/dl/s/aSVGBXDOHFrVKClX331NJVuL8gtfWVWI2C6IXNXDED4qNTZt9tBljD1qlgquwAFtCVXrsthNNOvbP23UWmDVo1GtYXyMWNyAL2Xfci9wLbybazY1a+7Xq1nB6dOxvc5vKuQe8SXSx9ZDda9Qdblh3NcSG3bonIsPwrxibq2fodQfVaWmH90Guvj0UfnKsVPYLGDbpMTXdhcLaWJ4qDLV/hMQrMOdCeK3VcES5/KrePTdesK3/RmlVJieKb6+sEeg7p7ATX9scFKVds6nwbkkuyqrZrjmbQG+tx0zYIgcp4W8C3oqHpVGdLHNnPGBAJNlWwIsL985ziSVJve/0VHtn6bZQd4v1znPDDgGpD16AJ+N4IC1h8YqRqfo6aQkw5A2IbnPfPBV6JkxNOxOgHf/MyKTIJaMDMoC9PokBXmVaw6YEtSvOe7+8zZl5Gv2ESAKi8/rn2rjyh6R64EzNPpXI3EyMr9I7x7ZlU/wCCxlEilinQ3ViDzg2PfvlnQ4TYpBYVnI5mJcdz3HolNY8xnqyMtnocK6xsDTpuTp+rUMT9TKSZlbbVNtamApsd1yH37j4xblmfglSqUGWqmCZ6wDBXqVkSmuY+MEK5swXS+Y7ybc28Yo1K7I7s6Kjq/g6dewYLrkJWkpKk62v6hK055744M78Eo+iyD10jH5Vs/lwh8+n/AEp0XEYP8pVRicjEVGZlUV3UoQcoQMEFJwCFzWIIuTqdK58BhqFZiKdGmgW6cV3rMzeNoV4irrxVzFiV428SDVcJTw1T9Vs+o/SuUjtIo2Et6XBzMLjZ1uhqtAHu8HL6tt1t1ND0M+nUQi6ntKmVuIxD1PHdmHkDip1ZV8YfSzTjf1FK/P0cbZq1+VTXwFJDlODUsDYqlaixB+dlpcXttPRhKfyI/a0v6Uy4vaNOiLMdRuRd/duXttNex226j6LxF5lPGPW3stOdcmW87iNR8sVve08o1HyssTicNTNmwxB5hVpkjrtS0mIbUw3yZvtE/oygE9nqjfd3jfdfe+mG+TP9on9Ge++mG+Tv9on9KUuHKBuOpZeYGx6+nq6ZcYbZ1CoLoW05Mwv3EXHNzTF8kV6xLnfLFesS+vfTDfJ3+0T+lKd8ajEnjgEkgZV0XWwNgATa2thuOmulydhJyF+9fwz5OwxyO3df2TH7nHPdiPVU/wBCnGKT53mj2z6GJT5/miWh2E3lnzP/AKnz7yP5f3T7Y/Xx+Wv3GPz+FcK68z+bPKuIC2uSL7uKNeqWR2M/OPT7JS7VTj01PUe8Cbretukt1yVt0lkXaNiGVGYghhdFXcbg3YXA6RL/AAPD3EILMjgfTD26sy7pRbFZKpuxZETIWtv47hVAJvoSSSdbKrWF7CdZ2XwOwdJlqLSR2stmIulxqHCkm7cudizfOm3RD2DtrF12RjQqeCYi7stNVyn4wJIYjl0BvNviJVIiICIiBqW2+AeGr53RBTqsc2a2ZSfonRfq238s5bwl4M1cLrVQql7BwCyG+7jDd22nf546ggggEHQg6gjmI5YTT8wvhrct5HdLTve1fc9wVa5VDRc8tEhV8wgp3AHpmn7T9yisLmhiKbjkWorUzbrXMCe6Q05eZ83m1Y/gDtBL3wzOBy02SpfqCtm9E17GbMrUv1lGqn00df8AsIEYNPoVDMObpi8GkhcQeiZBjW5hId4vBpOGNPkie/l/zfvGQLxeBYDaJG4HzjPffN94JF+mV14vBpZe+9Tkdu+fQ21W/iN3/wBpV3i8moTUJ52lU8r0L7J575VPK9C+yQbxeVdJ3vnU8v7q+yPfOp5f3V9kgZplw+HdzZEZzzKpY+gQaSvfOp5f3V9kLtSqDcOQecBb+qZl4O4w7sHiT1Uah/8AMypwVx53YLEdtJx6xBp8jhFif47ej2R+ceJ/jv6PZPteCmOvY4SuOk0qhHoUzKnA7Gn9mrDrpVPwzPDXwzwV8QwjhJih/rN2gH1ifX5zYr+O3cvsmccC8cf2Wt9mw9czLwDx5/Zqvmgeto4K+IP06+I+yIvCPEn/AF39HsmNsU7HOzliNdbfyEt6Pue4478O4+zHreXOyPc7xPhafhabeDDqWDNTClQbkGzEkdAEsViOkLFYjpC14BcDw7ria4XIoVkpbySQCpqcwtZsvLxeTQ9UExUsOqm6jW1t5/zkmWVoiIlCIiB4RPhkPlEdg9kyRAjPQc7qrD6q+yYXwVQ7sS4+onsk+IFS+zax/a3H1EmJtj4g/t1QfUSXcSDXn2DiT+8Ko6lX2yM/BfEn96YkdWn/AKm1RKNHxHAJ38fH1m+kqt6zK6p7k1Jjc4lr8/g0HqM6TEDmJ9x+j8pfzB+KefA9R+Uv5g/FOnxA5h8D1H5S/mD8U8+B2l8qqeYPxTqEQOX/AAO0vlT+Yv4o+B6l8qfzF/FOoRA5f8D1L5U/mL+Ke/A9S+VP5i/inT4gcx+CCl8pf7NPbPpfcjpj9qf7NPbOmRA5zS9y0IbpjainnVFB9DSYvAOsNBtXFgcwdwO4PN6iBo35iV/91xfnv+OejgNX/wB1xfnP+ObxEg0ocCa4/emK73/HMqcEcQP3lX7c345uEQNTHBOv/uNf7345kTgxXH7xr/59abREo1+nsCsP2+ueu3tk2ns6oN+JqHrCyziQR0oMN9Rj1hZmVTz37p9RKEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED//Z",
//             "https://www.furycat.com/images/jet-ski-tour.jpg",
//             "https://img.redbull.com/images/c_crop,w_3200,h_1600,x_0,y_461,f_auto,q_auto/c_scale,w_1200/redbullcom/2021/3/21/czbeu7fszcxtqbiozvbk/history-of-jet-ski",
//             "https://www.h2ocraft.com/wp-content/uploads/2019/12/jet-766192_1280.jpg"
//         ]
//         for (let i = 0; i < 5; i++){
//             myVehicle = new Vehicle(vehicleTypes[i], names[i], pricesDay[i], pricesHour[i], makes[i], models[i], "this long description is short", images[i])
//             const jsonJetSkiString = JSON.stringify(myVehicle)
//             const response = await fetch('/api/jetSki', {
//                 method: 'POST',
//                 headers: {'content-type': 'application/json'},
//                 body: jsonJetSkiString,
//             });
//         }


//         vehicleTypes = ["snowmobile", "snowmobile", "snowmobile", "snowmobile", "snowmobile"]
//         names = ["fun", "funner", "funest", "funester", "funestest"]
//         pricesDay = ["100", "110", "120", "130", "140"]
//         pricesHour = ["30", "35", "40", "45","50"]
//         makes = ["Arctic Cat", "skidoo", "skidoo", "polaris", "yamaha"]
//         models = ["sleder", "super slick", "fasttrack", "bouncer", "rider"]
//         images = [
//             "https://sleddermag.com/wp-content/uploads/2019/10/Arctic-Cat-2021-Featured-M8000_165_AlphaOne_Manual_MY21_Red-Char-copy.jpg",
//             "https://www.snowmobile.com/blog/wp-content/uploads/2019/02/2020-Arctic-Cat-Riot-Powder.jpg",
//             "https://cdnmedia.endeavorsuite.com/images/organizations/500699a5-3936-419f-b038-df6b18e6e660/arctic%20cat%20snow/mountainvalley_arcticcatHR.jpg?v=1508161655792",
//             "https://squidex-rsp.ari.production.ldv-svcs.live/api/assets/3dd1d843-73db-43d6-adb3-ff7f351f3018",
//             "https://robbreport.com/wp-content/uploads/2020/01/hardcore_alphaone_hypergreen_my20_201812_arcticcat_reshoot_0121_ka.jpg?w=681&h=383&crop=1"
//         ]
//         for (let i = 0; i < 5; i++){
//             myVehicle = new Vehicle(vehicleTypes[i], names[i], pricesDay[i], pricesHour[i], makes[i], models[i], "this long description is short", images[i])
//             const jsonSnowmobileString = JSON.stringify(myVehicle)
//             const response = await fetch('/api/snowmobile', {
//                 method: 'POST',
//                 headers: {'content-type': 'application/json'},
//                 body: jsonSnowmobileString,
//             });
//         }




//         vehicleTypes = ["razor", "razor", "razor", "razor", "razor"]
//         names = ["fun", "funner", "funest", "funester", "funestest"]
//         pricesDay = ["100", "110", "120", "130", "140"]
//         pricesHour = ["30", "35", "40", "45","50"]
//         makes = ["RazArctic Cat", "Razskidoo", "skidoo", "polaris", "yamaha"]
//         models = ["sleder", "super slick", "fasttrack", "bouncer", "rider"]
//         images = [
//             "https://www.teamfasmotorsports.com/cdn-cgi/image/quality%3D85/assets/images/polaris_rzr1k4_aluminum_roof_2a.jpeg",
//             "https://i.pinimg.com/originals/95/5b/fb/955bfb13e33dbc84f4de0048804da6e5.jpg",
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzSipgp4BsWR6VKNgob_DPSqAirTzqOFMx9Q&usqp=CAU",
//             "https://cdn1.polaris.com/globalassets/rzr/2024/model/vehicle-cards/rzr-xp-4-1000-ultimate-my24-b6c9-matte-titanium-z24nmf99am.png?v=b9f883f5",
//             "https://www.wintersrec.com/wp-content/uploads/2024/01/20240103_150756-TRADE-IN-1600-Black-2018-Polaris-RZR-900-EFI-ATV-for-Sale.jpg"
//         ]
//         for (let i = 0; i < 5; i++){
//             myVehicle = new Vehicle(vehicleTypes[i], names[i], pricesDay[i], pricesHour[i], makes[i], models[i], "this long description is short", images[i])
//             const jsonString = JSON.stringify(myVehicle)
//             const response = await fetch('/api/razor', {
//                 method: 'POST',
//                 headers: {'content-type': 'application/json'},
//                 body: jsonString,
//             });
//         }
//         localStorage.setItem("fakeIndicator", "true");

//     }
// };

// fakeData();


async function search(VT){
    console.log("reached search")
    var vehicleList = [];

    if (VT === "jetSkiArr") {
        const response = await fetch('/api/jetSki', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        vehicleList = await response.json();
    }

    if (VT === "snowmobileArr") {
        const response = await fetch('/api/snowmobile', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        vehicleList = await response.json();
    }

    if (VT === "razorArr") {
        const response = await fetch('/api/razor', {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        });
        vehicleList = await response.json();
    }



    let retList = [];
    for (let i = 0; i < vehicleList.length; i++){
        if(vehicleList[i].rented != true){
            retList.push(vehicleList[i]);
        }
    }
    localStorage.setItem("queryResults", JSON.stringify(retList))
};


document.addEventListener("DOMContentLoaded", async function() {
    var container = document.querySelector(".containerMarketplace");
    if(container) {
        await finishedCards();
    }
});


document.addEventListener("DOMContentLoaded", async function(){
    var descriptive = document.querySelector("#descriptivetitle");
    if(descriptive) {
        await displayVehicle();
    }
});


//change queryResults to grab the vehicle they clicked on
async function displayVehicle(name){
    vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));
    document.querySelector('#descriptivetitle').textContent = vehicle.name;
    document.querySelector('#specImg').src = vehicle.image;
    document.querySelector("#specTitle").textContent = vehicle.name;
    document.querySelector("#specInfo").innerHTML = `Price/day: ${vehicle.priceDay}$<br>Price/hour: ${vehicle.priceHour}$<br>Make: ${vehicle.make}<br>Model: ${vehicle.model}`;
    document.querySelector("#longDescription").textContent = vehicle.description;
}

async function delayExecution() {
    setTimeout( async function() {
      console.log("This function took 3 seconds to run.");
    }, 3000); 
  }


async function finishedCards() {
    data = JSON.parse(localStorage.getItem("queryResults"))
    for (let i = 0; i < data.length; i++){
        // jsonObject = JSON.parse(data[i]);
        jsonObject = data[i];
        const tempVehicle = new Vehicle(jsonObject.vehicleType, jsonObject.name, jsonObject.priceDay, jsonObject.priceHour, jsonObject.make, jsonObject.model, jsonObject.description, jsonObject.image, jsonObject.rented)

        var vehicleCard = document.createElement("div");
        vehicleCard.classList.add("card");
        var img = document.createElement("img");
        var nameofVehicle = document.createElement("h3");
        var info = document.createElement("p");
        var moreInfo = document.createElement("button");
        nameofVehicle.textContent = tempVehicle.name;
        
        img.classList.add("market-photos");
        img.src = tempVehicle.image;
        // img.src = "data:image/jpeg;base64,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"
        img.alt = tempVehicle.name;

        info.innerHTML = `Price/day: ${tempVehicle.priceDay}$<br>Price/hour: ${tempVehicle.priceHour}$<br>Make: ${tempVehicle.make}<br>Model: ${tempVehicle.model}`

        moreInfo.setAttribute("type", "submit")
        moreInfo.classList.add("btn", "btn-primary", "btn-sm");
        moreInfo.textContent = "See More Info";
        var div = document.createElement("div");
        div.setAttribute("method", "get");
        div.appendChild(moreInfo);

        moreInfo.addEventListener("click", async function(){
            localStorage.setItem("selectedVehicle", JSON.stringify(tempVehicle));
            await delayExecution();
            window.location.href = "exampleVehicle.html";
        })

        var container = document.getElementById("containerMarketplace");
        vehicleCard.appendChild(img);
        vehicleCard.appendChild(nameofVehicle);
        vehicleCard.appendChild(info);
        vehicleCard.appendChild(div);
        container.appendChild(vehicleCard);
    }
}


async function addNewVehicle(){
    const nameEl = document.querySelector("#name");
    const vehicleTypeEl = document.querySelector("#vehicleType");
    const priceDayEl = document.querySelector("#PriceDay");
    const priceHourEl = document.querySelector("#PriceHour");
    const makeEl = document.querySelector("#make");
    const modelEl = document.querySelector("#model");
    const descriptionEl = document.querySelector("#description");
    const imageEl = document.querySelector("#imageUpload");
    let newVehicle = new Vehicle(vehicleTypeEl.value, nameEl.value, priceDayEl.value, priceHourEl.value, makeEl.value, modelEl.value, descriptionEl.value, "");
    if (vehicleTypeEl.value == "jetSki") { 
        const jsonJetSkiString = JSON.stringify(newVehicle)
        const response = await fetch('/api/jetSki', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonJetSkiString,
        });
        const jetSkis = await response.json();
    }    
    if (vehicleTypeEl.value == "snowmobile") { 
        const jsonSnowmobileString = JSON.stringify(newVehicle)
        const response = await fetch('/api/snowmobile', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonSnowmobileString,
        });
        const jetSkis = await response.json();
    }    
    if (vehicleTypeEl.value == "razor") { 
        const jsonString = JSON.stringify(newVehicle)
        const response = await fetch('/api/razor', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: jsonString,
        });
        const jetSkis = await response.json();
    }  
    window.location.href = "VehicleAdded.html";
}


function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-primary', 'alert-dismissible', 'fade', 'show');
    alertDiv.setAttribute('role', 'alert');
  
    alertDiv.textContent = message;
  
    const closeButton = document.createElement('button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
  
    alertDiv.appendChild(closeButton);

    var myHeader = document.getElementById("myHeader");
    myHeader.appendChild(alertDiv);
  }

//simulate realtiem alerts that will come in with WebSocket
// setInterval(() => { showAlert("Someone Rented a Vehicle!") }, 5000);


