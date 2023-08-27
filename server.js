
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'utsabootcamp23!',
        database: 'employees_db',
});




connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employee_db database.`);
    initQuestions();
    });

function initQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "I want to...",
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
        switch (answers.Choices) {
            

            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;
                
            case "View All Employees":
                viewAllEmployees();
                break;

             case "Add a Department":
                addDepartment();
                break;

            case "Add a Role":
                addRole();
                break;

            case "Add an Employee":
                addEmployee();
                break;            

            case "Update an Employee's Role":
                updateEmployeeRole();
                break;

            case "Exit":
                db.end();
                break;
        }
    })
}

//functions for each choice

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
       initQuestions();

    });
};

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initQuestions();
    });
};

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initQuestions();
    });
};

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "departmentName",
            message: "Enter the name of the new department:",
        })
        .then((answer) => {
            console.log(answer.departmentName);
            const query = `INSERT INTO department (name) VALUES ("${answer.departmentName}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Added ${answer.departmentName} as a new department in the database!`);
                // restart the application
                initQuestions();
                console.log(answer.departmentName);
            });
        });
}


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "roleSalary"
        },
        {
            type: "input",
            message: "What is the department ID of the new role?",
            name: "roleDepartmentID"
        }
    ]).then((answer) => {
        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";


        connection.query(sql, [answer.roleName, answer.roleSalary, answer.roleDepartmentID], (err, res) => {
            if (err) throw err;
            console.log("Role added!");
            initQuestions();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the new employee?",
            name: "employeeFirstName"
        },
        {
            type: "input",
            message: "What is the last name of the new employee?",
            name: "employeeLastName"
        },
        {
            type: "input",
            message: "What is the role ID of the new employee?",
            name: "employeeRoleID"
        },
        {
            type: "input",
            message: "What is the manager ID of the new employee?",
            name: "employeeManagerID"
        }
    ]).then((answer) => {
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

        connection.query(sql, [answer.employeeFirstName, answer.employeeLastName, answer.employeeRoleID, answer.employeeManagerID], (err, res) => {
            if (err) throw err;
            console.log("Employee added!");
            initQuestions();
        });
    });
};  

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the employee you want to update?",
            name: "employeeID"
        },
        {
            type: "input",
            message: "What is the new role ID of the employee?",
            name: "employeeNewRoleID"
        }
    ]).then((answer) => {
        const sql = "UPDATE employee SET role_id = ? WHERE id = ?";

        connection.query(sql, [answer.employeeNewRoleID, answer.employeeID], (err, res) => {
            if (err) throw err;
            console.log("Employee updated!");
            initQuestions();
        });
    });
}


