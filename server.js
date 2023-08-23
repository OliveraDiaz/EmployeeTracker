const e = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password

        database: employee_db
}),