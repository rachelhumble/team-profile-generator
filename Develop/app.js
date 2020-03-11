const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managers = [];
const engineers = [];
const interns = [];
let employeeId = 0;
const employees = { managers, engineers, interns };

function questions(answers) {
    inquirer
        .prompt([
            {
                type: 'list',  
                message: "Select employee role:",
                name: "role",
                choices: [ "Manager", "Engineer", "Intern" ]
              },
              {
                  message: "Enter employee name:",
                  name: "name",
              },
              {
                  message: "Enter employee email:",
                  name: "email"
              },
              {
                  message: "Enter manager's office number:",
                  name: "officeNumber",
                  when: function(answers) {
                      return answers.role === "Manager";
                  }
              },
              {
                  message: "Enter intern's school name:",
                  name: "school",
                  when: function(answers) {
                      return answers.role === "Intern";
                  }
              },
              {
                  message: "Enter engineer's Github username:",
                  name: "github",
                  when: function(answers) {
                      return answers.role === "Engineer";
                  }
              },
              {
                  type: 'confirm',
                  message: "Do you have another employee to submit?",
                  name: "confirm"
              }
        ])
        .then((answers) => {
            if(answers.confirm) {
                answers.id = employeeId + 1;
                employeeId = answers.id;
                delete answers.confirm;
                if(answers.role === "Manager") {
                    managers.push(answers);
                } else if(answers.role === "Engineer") {
                    engineers.push(answers);
                } else {
                    interns.push(answers);
                }
                questions();
            } else {
                answers.id = employeeId + 1;
                delete answers.confirm;
                if(answers.role === "Manager") {
                    managers.push(answers);
                } else if(answers.role === "Engineer") {
                    engineers.push(answers);
                } else {
                    interns.push(answers);
                };
                // console.log(JSON.stringify(managers, null, '  ' ));
                // console.log(JSON.stringify(engineers, null, '  ' ));
                // console.log(JSON.stringify(interns, null, '  ' ));
                console.log(JSON.stringify(employees, null, '  ' ));
            };
        });
}

async function init() {
    try {
      await questions();
    //   await render(employees);

    } catch(err) {
      console.log(err);
    }
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```