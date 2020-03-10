// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(github) {
        this.github = github;
        super(name, id, email);
    }

    getGithub() {
        console.log(`Github Username: ${github}`);
    }

    getRole() {
        console.log(`Role: Engineer`);
    }
}

module.exports = Engineer;