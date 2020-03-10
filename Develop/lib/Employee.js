// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.email = email;
      id = 1;
    }

    getName() {
        console.log(`Name: ${this.name}`);
      }

    getID() {
        console.log(`ID: ${this.id}`);
    }

    getEmail() {
        console.log(`Email: ${this.email}`);
    }

    getRole() {
        console.log(`Role: Employee`);
    }
}

module.exports = Employee;