const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const teamMembers = [];
const idArray = [];

function appMenu() {
    function createManager() {
        console.log("Please build your team") /
            inquirer
                .prompt([
                    /* prompt choices here */
                    {
                        type: "input",
                        name: "managerName",
                        message: "What is your manager's name?",
                        validate: answer => {
                            if (answer !== "") {
                                return true;
                            }
                            return "Please enter at least one character.";
                        }
                    },
                    {
                        type: "input",
                        name: "managerId",
                        message: "What is your manager's id?",
                        validate: answer => {
                            const pass = answer.match(/^[1-9]\d*$/);
                            if (pass) {
                                return true;
                            }
                            return "Please enter a positive number greater than zero.";
                        }
                    },
                    {
                        type: "input",
                        name: "managerEmail",
                        message: "What is your manager's email address?",
                        validate: answer => {
                            const pass = answer.match(/\S+@\S+\.\S+/);
                            if (pass) {
                                return true;
                            }
                            return "Please enter a valid email address.";
                        }
                    },
                    {
                        type: "input",
                        name: "managerOfficeNumber",
                        message: "What is your manager's office number?",
                        validate: answer => {
                            const pass = answer.match(/^[1-9]\d*$/);
                            if (pass) {
                                return true;
                            }
                            return "Please enter a positive number greater than zero.";
                        }
                    }
                ])
                .then(answers => {
                    /* build manager */
                    const manager = new Manager(
                        answers.managerName,
                        answers.managerId,
                        answers.managerEmail,
                        answers.managerOfficeNumber
                    );
                    teamMembers.push(manager);
                    idArray.push(answers.managerId);
                    createTeam();
                });
    }
    function createTeam() {
        inquirer
            .prompt([
                /* prompt choice here */
                {
                    type: "list",
                    name: "memberChoice",
                    message: "Which type of team member would you like to add?",
                    choices: [
                        "Engineer",
                        "Intern",
                        "I don't want to add any more team members"
                    ]
                }
            ])
            .then(userChoice => {
                /* call one function below based on choice */
                const selection = userChoice.memberChoice;
                if (selection === "Engineer") {
                    return addEngineer();
                } else if (selection === "Intern") {
                    return addIntern();
                } else {
                    return buildTeam();
                }
            });
    }
    function addEngineer() {
        inquirer
            .prompt([
                /* prompts here */
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is your engineer's name?",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is your engineer's id?",
                    validate: answer => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                            if (idArray.includes(answer)) {
                                return "This ID is already taken. Please enter a different number.";
                            } else {
                                return true;
                            }
                        }
                        return "Please enter a positive number greater than zero.";
                    }
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is yoru engineer's email?",
                    validate: answer => {
                        const pass = answer.match(/\S+@\S+\.\S+/);
                        if (pass) {
                            return true;
                        }
                        return "Please enter a valid email address.";
                    }
                },
                {
                    type: "input",
                    name: "engineerGithub",
                    message: "What is your engineer's GitHub username?",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                }
            ])
            .then(answers => {
                /* create engineer */
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGithub
                );
                teamMembers.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
            });
    }
    function addIntern() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "internName",
                    message: "What is your intern's name?",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                },
                {
                    type: "input",
                    name: "internId",
                    message: "What is your intern's id?",
                    validate: answer => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                            if (idArray.includes(answer)) {
                                return "This ID is already taken. Please enter a different number.";
                            } else {
                                return true;
                            }
                        }
                        return "Please enter a positive number greater than zero.";
                    }
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is your intern's email?",
                    validate: answer => {
                        const pass = answer.match(/\S+@\S+\.\S+/);
                        if (pass) {
                            return true;
                        }
                        return "Please enter a valid email address.";
                    }
                },
                {
                    type: "input",
                    name: "internSchool",
                    message: "What is your intern's school?",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                }
            ])
            .then(answers => {
                const intern = new Intern(
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool
                );
                teamMembers.push(intern);
                idArray.push(answers.internId);
                createTeam();
            });
    }
    function buildTeam() {
        let htmlString = "";
        let headHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>My Team</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <script
      defer
      src="https://use.fontawesome.com/releases/v5.11.2/js/all.js"
      integrity="sha384-b3ua1l97aVGAPEIe48b4TC60WUQbQaGi2jqAWM90y0OZXZeyaTCWtBTKtjW2GXG1"
      crossorigin="anonymous"
    ></script>
      </head>
      <body>
      <div class="container-fluid">
      <div
        class="row bg-danger text-white d-flex justify-content-center align-items-center"
        style="height: 100px;"
      >
        <h1>My Team</h1>
      </div>
      <div class="row justify-content-around">`;
        teamMembers.forEach(member => {
            console.log(member.getRole());
            // Check what kind of position and set role specific output
            let roleSvg = "";
            let roleOutput = "";
            if (member.getRole() === "Manager") {
                roleSvg = `<i class="fas fa-mug-hot"></i>`;
                roleOutput = `Office Number: ${member.getOfficeNumber()}`;
            } else if (member.getRole() === "Engineer") {
                roleSvg = `<i class="fas fa-glasses"></i>`;
                roleOutput = `GitHub Username: ${member.getGithub()}`;
            } else if (member.getRole() === "Intern") {
                roleSvg = `<i class="fas fa-user-graduate"></i>`;
                roleOutput = `School: ${member.getSchool()}`;
            }

            let memberDiv = `<div class="card mb-3" style="max-width: 18rem;">
      <div class="card-header text-white bg-primary">
      <div>${member.getName()}</div>
                        <div>${roleSvg} ${member.getRole()}</div>
                        </div>
                        <div class="card-body bg-light">
                        <div class="border bg-white">ID: ${member.getId()}</div>
                        <div class="border bg-white">Email: ${member.getEmail()}</div>
                        <div class="border bg-white">${roleOutput}</div>
                        </div></div>`;

            headHtml += memberDiv;
        });
        const footerHtml = `
    </div>  
    </div>
      </body>
      </html>`;
        htmlString = headHtml + footerHtml;
        fs.writeFileSync("team.html", htmlString, "utf-8");
    }
    createManager();
}
appMenu();