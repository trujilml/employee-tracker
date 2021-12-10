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
                       'View Department budgets', //not printing out department budgets like expected
                       'View all Roles', //not printing all roles like expected
                       'Add an Employee', //inquirer prompts appear but 'you must provide a choices parameter' appears and am unable to finish the prompt
                       'Add a Department',
                       'Add a Role', //function is clearly working but all roles from its function is still not displayed
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

            if(menuChoices === 'View all Departments') {
                viewAllDepartments();
            }

            if(menuChoices === 'View Department budgets') {
                viewDepartmentBudgets(); //not printing out department budgets like expected
            }

            if(menuChoices === 'View all Roles') {
                viewAllRoles(); //not printing all roles like expected
            }
 
            if(menuChoices === 'Add an Employee') {
                addEmployee(); //inquirer prompts appear but 'you must provide a choices parameter' appears and am unable to finish the prompt
            }

            if(menuChoices === 'Add a Department') {
                addDepartment();
            }

            if(menuChoices === 'Add a Role') {
                addRole(); //function is clearly working but all roles from its function is still not displayed
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
                       roles.title,
                       department.name AS department,
                       roles.salary,
                       CONCAT (manager.first_name, " ", manager.last_name) AS manager
                    FROM employee
                        LEFT JOIN roles ON employee.role_id = roles.id
                        LEFT JOIN department ON roles.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

        connection.promise().query(employeeQuery).then(([ rows ]) => {
            let employee = rows;
            console.table(chalk.yellowBright.bold('All Employees'), employee);
        }).catch(err => console.log(chalk.whiteBright.bold.bgRedBright(err)));

                   startDatabase();
}

const viewEmployeesByDepartment = () => {
    console.log(chalk.whiteBright.bold.bgGreenBright('Showing employees by department...'));
    const employeeDepartmentQuery = `SELECT employee.first_name,
                                            employee.last_name,
                                            department.name AS department
                                    FROM employee
                                        LEFT JOIN roles ON employee.role_id = roles.id
                                        LEFT JOIN department ON roles.department_id = department.id`;
    

    connection.promise().query(employeeDepartmentQuery).then(([ rows ]) => {
        let employeeDepartment = rows;
        console.table(chalk.blueBright.bold('Employees by their respective department'), employeeDepartment);
        }).catch(err => console.log(chalk.whiteBright.bold.bgRedBright(err)));
                    
        startDatabase();
}

const viewAllDepartments = () => {
    console.log(chalk.whiteBright.bold.bgGreenBright('Showing all departments...'));
    const departmentQuery = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(departmentQuery).then(([ rows ]) => {
        let department = rows;
        console.table(chalk.magentaBright.bold('All Departments'), department);
         }).catch(err => console.log(chalk.whiteBright.bold.bgRedBright(err)));

        startDatabase();
}
//not printing out department budgets like expected
const viewDepartmentBudgets = () => {
    console.log(chalk.whiteBright.bold.bgGreenBright('Showing budget by department...'));
    const departmentBudgetQuery = `SELECT department_id AS id,
                                          department.name AS department,
                                          SUM(roles.salary) AS budget
                                   FROM roles
                                   JOIN department ON roles.department_id = department.id GROUP BY department.id`;
    
    connection.promise().query(departmentBudgetQuery).then(({ rows }) => {
        let departmentBudget = rows;
        console.table(chalk.cyanBright.bold('Department Budgets'), departmentBudget);
        }).catch(err => console.log(chalk.whiteBright.bold.bgRedBright(err)));

        startDatabase();
}
//not printing all roles like expected
const viewAllRoles = () => {
    console.log(chalk.whiteBright.bold.bgGreenBright('Showing all roles...'));
    const roleQuery = `SELECT roles.id, roles.title, department.name AS department
                       FROM roles
                       INNER JOIN department ON roles.department_id = department.id`;

    connection.promise().query(roleQuery).then(({ rows }) => {
        let roles = rows;
        console.table(chalk.cyanBright.bold('All Roles'), roles);
        }).catch(err => console.log(chalk.whiteBright.bold.bgRedBright(err)));

        startDatabase();
}
//inquirer prompts appear but 'you must provide a choices parameter' appears and am unable to finish the prompt
const addEmployee = () => {
    inquirer.prompt([
    {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log('Please enter a first name.');
                    return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: addLastName => {
            if (addLastName) {
                return true;
            } else {
                console.log('Please enter a last name.');
                return false;
            }
        }
    }
    ])
    .then(answer => {
        const params = [answer.addFirstName, answer.addLastName];

        //obtain roles from the roles table in seeds sql file
        const roleSql = `SELECT roles.id, roles.title FROM roles`;

        const roles = console.table(({ department_id, title }) => ({name: title, value: department_id}));

        connection.promise().query(roleSql).then(({ roles }));
//reformat const and connection query functions similar to addDepartment function below
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
            }
        ])
        .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            const managers = console.table(({ manager_id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: manager_id }));

            connection.promise.query(managerSql).then(({ managers }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                }
            ])
            .then(managerChoice => {
                const manager = managerChoice.manager;
                params.push(manager);

                const newHireSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;

                connection.query(newHireSql, params); {
                    console.log("Employee entered!");
                };

                //reformat const and connection query functions similar to addDepartment function below
            })
        })

    // startDatabase();
    viewEmployees();
    })
}
//add chalk to this
const addDepartment = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'addDepartment',
        message: 'What department do you want to add?',
        validate: addDepartment => {
            if (addDepartment) {
                return true;
            } else {
                console.log("Please enter a department");
                return false;
            }
        }
        }
    ])
        .then(answer => {
            const deptSql = `INSERT INTO department(name)
                            VALUES (?)`;
            
            connection.query(deptSql, answer.addDepartment, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.addDepartment + 'to departments!');

                viewAllDepartments();
            });
        })
    }
//function is clearly working but all roles from its function is still not displayed
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What role do you want to add?",
            validate: addARole => {
                if (addARole) {
                    return true;
                } else {
                    console.log("Please enter a role");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?",
            validate: addSalary => {
                if (addSalary) {
                    return true;
                } else {
                    console.log("Please enter a salary.");
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const params = [answer.role, answer.salary];

        const roleSql = `SELECT name, id FROM department`;

        connection.query(roleSql, (err, data) => {
            if (err) throw (err);

            const department = data.map(({ name, id}) => ({ name: name, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: "What department is this role in?",
                    choices: department
                }
            ])
            .then(departmentChoice => {
                const dept = departmentChoice.dept;
                params.push(dept);

                const dptSql = `INSERT INTO roles (title, salary, department_id)
                                VALUES (?, ?, ?)`;
                
                connection.query(dptSql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Added " + answer.role + " to roles!");

                viewAllRoles();
                });
            });
        });
    });
};

startDatabase();
