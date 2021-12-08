//for required add-ons mysql2, inquirer for testing, console table to show mysql tables on the console
import mysql2 from 'mysql2';
import inquirer from 'inquirer';
import cTable from 'console.table';

// //to start connection to the server
// export default connection;

//chalk to brighten the terminal text up! 
import chalk from 'chalk';

//for password protection
import dotenv from 'dotenv';
dotenv.config()

//node -r dotenv/config server.js  - to do sans import message above to ensure dotenv installation

// import('dotenv').config;

// require('dotenv').config();

const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.USER_PW,
    database: 'employeeDatabase'
});

connection.connect((err) => {
    if(err) {
        console.log(chalk.whiteBright.bold.bgRedBright(err));
        return;
    }
    console.log(chalk.greenBright.bold(`Connected to the employee database. ID: ${connection.threadId}`));
});


const startPage = ['View all Employees', 'View all Employees by Department', 'Exit'];

// const allEmployees = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name, r.title, d.department_name AS "Department"`;
//will require reference from the schema file and starter functions to search employees below

const startDatabase = () => {
    inquirer.prompt({
        name: 'selectMenu',
        type: 'list',
        message: chalk.whiteBright.bold.bgMagentaBright('Select a database option below: '),
        choices: startPage
    }).then((answer) => {
        switch (answer.selectMenu) {
            case 'View all Employees':
                showAllEmployees();
                break;
            case 'View all Employees by Department':
                showByDepartment();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}

const showAllEmployees = () => {
        console.log('Showing all employees...');
        const sql = `SELECT employee.id, 
                    employee.first_name,
                    employee.last_name,
                    role.title,
                    department.name AS department,
                    role.salary`;

        //err and rows aren't showing as defined - figure this out
          connection.promise().query(sql, (err, rows))
          .then(console.table(chalk.yellowBright('All Employees'), rows)
          .catch(err => console.log(err)));
          startDatabase();

        // connection.promise().query(sql, (err, rows) => {
        //         if (err) throw err;
        //         console.table(chalk.yellowBright('All Employees'), rows);
        //         startDatabase();
    
};


startDatabase();