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
// require(dotenv).config();

const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '559200',
    database: 'employeeDatabase'
});

connection.connect((err) => {
    if(err) {
        console.log(chalk.white.bgRedBright(err));
        return;
    }
    console.log(chalk.greenBright.bold(`Connected to the employee database. ID: ${connection.threadId}`));
});


const startPage = ['View all Employees'];

const allEmployees = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name, r.title`;
