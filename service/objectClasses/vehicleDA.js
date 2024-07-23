const MUUID = require('uuid-mongodb')

class Vehicle {
    constructor(name, ownerID, make, model, priceDay, location){
        this.name = name
        this.ownerID = ownerID
        this.make = make
        this.model = model
        this.priceDay = priceDay
        this.location = location``

        this.vehicleID = MUUID.v4();
        this.bookings = [] // bookingID
        this.waivers = [] // waiverID
        this.media = [] // mediaID
    }

    addBooking(bookingID){
        this.bookings.push(bookingID)
    }

    removeBooking(bookingID){
        const index = this.bookings.indexOf(bookingID)
        if (index >= 0){
            this.bookings.splice(index, 1)
        }
    }

    addWaiver(waiverId){
        this.waivers.push(waiverId)
    }

    removeWaiver(waiverID){
        const index = this.waivers.indexOf(waiverID)
        if (index >= 0){
            this.waivers.splice(index, 1)
        }
    }

    addMedia(mediaId){
        this.media.push(mediaId)
    }

    removeMedia(mediaId){
        const index = this.media.indexOf(mediaId)
        if (index >= 0){
            this.media.splice(index, 1)
        }
    }

    updateVehicle(name, ownerID, make, model, priceDay, location){
        this.name = name
        this.ownerID = ownerID
        this.make = make
        this.model = model
        this.priceDay = priceDay
        this.location = location
    }
}