// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Intern extends Employee {
    constructor(school) {
        this.school = school;
        super(name, id, email);
    }

    getSchool() {
        console.log(`School: ${this.school}`);
    }

    getRole() {
        console.log(`Role: Intern`);
    }
}

module.exports = Intern;