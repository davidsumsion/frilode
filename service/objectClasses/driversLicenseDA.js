const MUUID = require('uuid-mongodb')

class driversLicense {
    constructor(licenseNumber, state, expDate, birthDate, firstName, middleName, lastName){
        this.licenseNumber = licenseNumber
        this.state = state
        this.expDate = expDate
        this.birthDate = birthDate
        this.firstName = firstName
        this.middleName = middleName
        this.lastName = lastName

        this.driversLicenseID = MUUID.v4();
    }
}