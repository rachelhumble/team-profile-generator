// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor(officeNumber) {
        this.officeNumber = officeNumber;
        super(name, id, email);
    }

    getOfficeNumber() {
        console.log(`Office Number: ${this.officeNumber}`);
    }

    getRole() {
        console.log(`Role: Manager`);
    }
}

module.exports = Manager;