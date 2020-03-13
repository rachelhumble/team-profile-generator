const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");

let id = 0;
const employees = [];

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
                answers.id = id + 1;
                id = answers.id;
                delete answers.confirm;

                if(answers.role === "Manager") {
                    let employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                    employees.push(employee);
                } else if(answers.role === "Engineer") {
                    let employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                    employees.push(employee);
                } else {
                    let employee = new Intern(answers.name, answers.id, answers.email, answers.school);
                    employees.push(employee);
                }
                questions();
            } else {
                answers.id = id + 1;
                delete answers.confirm;

                if(answers.role === "Manager") {
                    let employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                    employees.push(employee);
                } else if(answers.role === "Engineer") {
                    let employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                    employees.push(employee);
                } else {
                    let employee = new Intern(answers.name, answers.id, answers.email, answers.school);
                    employees.push(employee);
                }

                render(employees);

                fs.mkdir('./output', { recursive: true }, (err) => {
                    if (err) throw err;
                });
                fs.writeFile(outputPath, render(employees), function (err) {
                    if (err) throw err;
                });

                console.log("Team Overview created successfully!");
            }
        });
}

async function init() {
    try {
      await questions();

    } catch(err) {
      console.log(err);
    }
}

init();

