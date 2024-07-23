const MUUID = require('uuid-mongodb')

class User {
    constructor(email, username, hashedPassword){
        this.email = email
        this.username = username
        this.hashedPassword = hashedPassword
        this.ownedVehicles = []
        this.signedWaivers = []
        this.bookings = []

        // infrormation release waiver?
        this.userID = MUUID.v4();
    }

    updateUserInfo(phoneNumber, email, firstName, lastName, location){
        this.phoneNumber = phoneNumber
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.location = location
        //TODO: user photo
    }

    setDriversLicence(driversLicenseID){
        this.driversLicenseID = driversLicenseID
    }

    addBooking(bookingID){
        this.bookings.push(bookingID)
    }

    signWaiver(waiverID){
        this.signedWaivers.push(waiverID)
        //implement signature? or just have checkbox?
    }

    //TODO: implement update username/password
}