const e = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'utsabootcamp23!',
        database: employee_db
});


connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employee_db database.`);
    start();
    });

function initQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "I want to...?",
            name: "Choices",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee's Role",
                "Exit"
            ]
        }

    ]).then((answers) => {
        switch (answers.initQuestions) {
            

            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;
                
            case "View All Employees":
                viewAllEmployees();
                break;

             case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;            

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Exit":
                db.end();
                break;
        }
    })
}