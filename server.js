//for required add-ons mysql2, inquirer for testing, console table to show mysql tables on the console
import mysql2 from 'mysql2';
import inquirer from 'inquirer';
import cTable from 'console.table';

//chalk to brighten the terminal text up! 
import chalk from 'chalk';

//for password protection
import dotenv from 'dotenv';
dotenv.config()

//node -r dotenv/config server.js  - to do sans import message above to ensure dotenv installation

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

const startDatabase = () => {
        inquirer.prompt ([
        {
            type: 'list',
            name: 'menuChoices',
            message: chalk.whiteBright.bold.bgCyanBright('Select a database option below: '),
            choices: [ 'View all Employees', 
                       'View all Employees by Department', 
                       'View all Departments',
                       'View Department budgets',
                       'View all Roles',
                       'Add an Employee',
                       'Add a Department',
                       'Add a Role',
                       'Delete an Employee',
                       'Delete a Department',
                       'Delete a Role',
                       'Update an Employee`s Role',
                       'Update an Employee`s Manager',
                       'Exit']
        }
        ])
        .then((answers) => {
            const { menuChoices } = answers;

            if (menuChoices === 'View all Employees') {
                viewEmployees();
            }

            if (menuChoices === 'View all Employees by Department') {
                viewEmployeesByDepartment();
            }

            if (menuChoices === 'Exit') {
                connection.end();
            };
        });
    };

const viewEmployees = () => {
           console.log(chalk.whiteBright.bold.bgGreenBright('Showing all employees...'));
           const employeeQuery = `SELECT employee.id, 
                       employee.first_name,
                       employee.last_name,
                       role.title,
                       department.name AS department,
                       role.salary,
                       CONCAT (manager.first_name, " ", manager.last_name) AS manager
                    FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

        //    connection.promise().query(sql, (err, rows) => {
        //        if (err) throw err;
        //        console.table(rows);
        //        startDatabase();

        connection.promise().query(employeeQuery, (err, rows)); {
            if(err){
                console.log(chalk.whiteBright.bold.bgRedBright(err));
                return;
            }
                console.table(chalk.yellowBright('All Employees'), rows);
        }

        // connection.promise().query(sql, (err, rows))
        //             .catch(err => console.log(err))
        //             .then(console.table(chalk.yellowBright('All Employees'), rows));

        //           connection.promise().query(sql, (err, rows))
//           .then(console.table(chalk.yellowBright('All Employees'), rows)
//           .catch(err => console.log(err)));
//           startDatabase();

                   startDatabase();
}

const viewEmployeesByDepartment = () => {
    console.log(chalk.whiteBright.bold.bgGreenBright('Showing employees by department...'));
    const sql = `SELECT employee.first_name,
                        employee.last_name,
                        department.name AS department
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id`;
    
    connection.promise().query(sql, (err, rows)); {
        if (err){
            console.log(chalk.whiteBright.bold.bgRedBright(err));
            return;
        } 
        console.table(rows);
    }
        startDatabase();
}


startDatabase();

