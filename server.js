//for required add-ons mysql2, inquirer for testing, console.table to show mysql tables on the console
import mysql2 from 'mysql2';
import inquirer from 'inquirer';
import cTable from 'console.table';

//chalk package to brighten the terminal text up for completed prompts!
import chalk from 'chalk';

//dotenv package for password protection in hidden .env file
import dotenv from 'dotenv';
dotenv.config()

//node -r dotenv/config server.js  - to do sans import message above to ensure dotenv installation and node to start server.js file

//mysql2 connection function to start database server
const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.USER_PW,
    database: 'employeeDatabase'
});

connection.connect((err) => {
    if(err) {
        console.log(chalk.redBright.bold(err));
        return;
    }
    console.log(chalk.greenBright.bold(`Connected to the employee database. ID: ${connection.threadId}`));
});
//startDatabase function initiates at end of file, responsible for housing all of these choices for the employee tracker with their respective functions in order
const startDatabase = () => {
        inquirer.prompt ([
        {
            type: 'list',
            name: 'menuChoices',
            message: chalk.cyanBright.bold('Select a database option below: '),
            choices: [ 'View all Employees', 
                       'View all Employees by Department', 
                       'View all Employees by Manager',
                       'View all Departments',
                       'View Department budgets', 
                       'View all Roles', 
                       'Add an Employee', 
                       'Add a Department',
                       'Add a Role', 
                       'Delete an Employee',
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

            if(menuChoices === 'View all Employees by Manager') {
                viewEmployeesByManager();
            }

            if(menuChoices === 'View all Departments') {
                viewAllDepartments();
            }

            if(menuChoices === 'View Department budgets') {
                viewDepartmentBudgets();
            }

            if(menuChoices === 'View all Roles') {
                viewAllRoles(); 
            }
 
            if(menuChoices === 'Add an Employee') {
                addEmployee(); 
            }

            if(menuChoices === 'Add a Department') {
                addDepartment();
            }

            if(menuChoices === 'Add a Role') {
                addRole(); 
            }

            if(menuChoices === 'Delete an Employee') {
                deleteEmployee();
            }

            if(menuChoices === 'Delete a Role') {
                deleteRole(); 
            }

            if(menuChoices === 'Update an Employee`s Role') {
                updateEmployeeRole();
            }

            if(menuChoices === 'Update an Employee`s Manager') {
                updateEmployeeManager();
            }

            if (menuChoices === 'Exit') {
                connection.end();
            };
        });
    };
//shows all employees in database
const viewEmployees = () => {
           console.log(chalk.greenBright.bold('Showing all employees...'));
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
            }).catch(err => console.log(chalk.redBright.bold(err)));

            startDatabase();
};
//shows employees by their department
const viewEmployeesByDepartment = () => {
    console.log(chalk.greenBright.bold('Showing employees by department...'));
    const employeeDepartmentQuery = `SELECT employee.first_name,
                                            employee.last_name,
                                            department.name AS department
                                    FROM employee
                                        LEFT JOIN roles ON employee.role_id = roles.id
                                        LEFT JOIN department ON roles.department_id = department.id`;
    

    connection.promise().query(employeeDepartmentQuery).then(([ rows ]) => {
        let employeeDepartment = rows;
        console.table(chalk.blueBright.bold('Employees by their respective department'), employeeDepartment);
        }).catch(err => console.log(chalk.redBright.bold(err)));
                    
        startDatabase();
};
//shows employees by their manager
const viewEmployeesByManager = () => {
    console.log(chalk.greenBright.bold('Showing employees by manager...'));
    const managerDepartmentQuery = `SELECT employee.first_name,
                                            employee.last_name,
                                            CONCAT (manager.first_name, " ", manager.last_name) AS manager
                                    FROM employee
                                    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.promise().query(managerDepartmentQuery).then(([ rows ]) => {
        let managerDepartment = rows;
        console.table(chalk.blueBright.bold('Employees by their respective manager'), managerDepartment);
        }).catch(err => console.log(chalk.redBright.bold(err)));
                    
        startDatabase();
};
//shows all departments
const viewAllDepartments = () => {
    console.log(chalk.greenBright.bold('Showing all departments...'));
    const departmentQuery = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(departmentQuery).then(([ rows ]) => {
        let department = rows;
        console.table(chalk.magentaBright.bold('All Departments'), department);
         }).catch(err => console.log(chalk.redBright.bold(err)));

        startDatabase();
};
//shows the budget of each department
const viewDepartmentBudgets = () => {
    console.log(chalk.greenBright.bold('Showing budget by department...'));
    const departmentBudgetQuery = `SELECT department_id AS id,
                                          department.name AS department,
                                          SUM(roles.salary) AS budget
                                   FROM roles
                                   JOIN department ON roles.department_id = department.id GROUP BY department.id`;
    
    connection.promise().query(departmentBudgetQuery).then(([ rows ]) => {
        let departmentBudget = rows;
        console.table(chalk.cyanBright.bold('Department Budgets'), departmentBudget);
        }).catch(err => console.log(chalk.redBright.bold(err)));

        startDatabase();
};
//shows all employee roles
const viewAllRoles = () => {
    console.log(chalk.greenBright.bold('Showing all roles...'));
    const roleQuery = `SELECT roles.id, roles.title, department.name AS department, roles.salary
                        FROM roles
                        INNER JOIN department ON roles.department_id = department.id`;

    connection.promise().query(roleQuery).then(([ rows ]) => {
        let roles = rows;
        console.table(chalk.cyanBright.bold('All Roles'), roles);
        }).catch(err => console.log(chalk.redBright.bold(err)));

        startDatabase();
};
//inquirer prompt and generates new added employee in the employee table database
const addEmployee = () => {
    console.log(chalk.greenBright.bold('Enter the following below: '));
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
        const params = [answer.firstName, answer.lastName];
        //retrieves first and last name of the new employee followed by the role and manager below in their respective prompts

        //obtain roles from the roles table in seeds sql file
        const roleSql = `SELECT roles.id, roles.title FROM roles`;

        connection.query(roleSql, (err, data) => {
            if (err) throw (err);

            const roles = data.map(({ id, title }) => ({name: title, value: id}));

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

            connection.query(managerSql, (err, data) => {
                if (err) throw (err);

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

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

                const newHireSql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;

                connection.query(newHireSql, params, (err, result) => {
                    if (err) throw (chalk.redBright.bold(err));
                    console.log(chalk.magentaBright.bold("Employee entered!"));

                    viewEmployees();
                });
              });
            });
        });
    });
});
};
//inquirer prompt that adds a department
const addDepartment = () => {
    console.log(chalk.greenBright.bold('Enter the following below: '));
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
                if (err) throw (chalk.redBright.bold(err));
                console.log(chalk.magentaBright.bold(('Added ' + answer.addDepartment + ' to departments!')));

                viewAllDepartments();
            });
        });
    };
//inquirer prompt that adds a role
const addRole = () => {
    console.log(chalk.greenBright.bold('Enter the following below: '));
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

            const department = data.map(({name, id}) => ({ name: name, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: "What department is this role in?",
                    choices: department
                }
            ])
            .then(departmentChoice => {
                const dept = departmentChoice.department;
                params.push(dept);

                const dptSql = `INSERT INTO roles (title, salary, department_id)
                                VALUES (?, ?, ?)`;
                
                connection.query(dptSql, params, (err, result) => {
                    if (err) throw (chalk.redBright.bold(err));
                    console.log(chalk.magentaBright.bold(("Added " + answer.role + " to roles!")));

                viewAllRoles();
                });
            });
        });
    });
};
//inquirer prompt that deletes an employee
const deleteEmployee = () => {
    console.log(chalk.greenBright.bold('Select the following below: '));
    //obtain employee from employee table
    const employeeSql = `SELECT * FROM employee`;

    connection.query(employeeSql, (err, data) => {
        if (err) throw (err);

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to delete?',
                choices: employees
            }
        ])
        .then(employeeChoice => {
            const employee = employeeChoice.name;

            const sql = `DELETE FROM employee WHERE id = ?`;

            connection.query(sql, employee, (result) => {
                console.log(chalk.redBright.bold("Successfully deleted."));

                viewEmployees();
            });
        });
    });
};
//inquirer prompt that deletes a role
const deleteRole = () => {
    console.log(chalk.greenBright.bold('Select the following below: '));
    const roleSql = `SELECT * FROM roles`;

    connection.query(roleSql, (err, data) => {
        if (err) throw (chalk.redBright.bold(err));

        const roles = data.map(({ title, id }) => ({ name: title, value: id}));

        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: "What role do you want to delete?",
                choices: roles
            }
        ])
        .then(roleChoice => {
            const role = roleChoice.role;
            const sql = `DELETE FROM roles WHERE id = ?`;

            connection.query(sql, role, (result) => {
                console.log(chalk.redBright.bold("Successfully deleted."));

                viewAllRoles();
            });
        });
    });
};
//inquirer prompt that updates the role of an employee
const updateEmployeeRole = () => {
    console.log(chalk.greenBright.bold('Make the following changes below: '));
    //obtain employee from the employee table
    const employeeSql = `SELECT * FROM employee`;

    connection.query(employeeSql, (err, data) => {
        if (err) throw (err);

        const employees = data.map(({ id, first_name, last_name}) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
        .then(employeeChoice => {
            const employee = employeeChoice.name;
            const params = [];
            params.push(employee);
            
            const rolesSql = `SELECT * FROM roles`;

            connection.query(rolesSql, (err, data) => {
                if (err) throw (err);

                const roles = data.map(({ id, title }) => ({ name: title, value: id}));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What's the employee's new role?",
                        choices: roles
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);

                    let employee = params[0]
                    params[0] = role
                    params[1] = employee
                    
                    const updateSql = `UPDATE employee SET role_id = ? WHERE id =?`;

                    connection.query(updateSql, params, (err, result) => {
                        if (err) throw (chalk.redBright.bold(err));
                        console.log(chalk.greenBright.bold("Employee has been updated."));

                        viewEmployees();
                    });
                });
            });
        });
    });
};
//inquirer prompt that updates the manager of the employee
const updateEmployeeManager = () => {
    console.log(chalk.greenBright.bold('Make the following changes below: '));
    //obtain employee from the employee table
    const employeeSql = `SELECT * FROM employee`;

    connection.query(employeeSql, (err, data) => {
        if (err) throw (err);

        const employees = data.map(({ id, first_name, last_name}) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
        .then(employeeChoice => {
            const employee = employeeChoice.name;
            const params = [];
            params.push(employee);

            const managerSql = `SELECT * FROM employee`;

            connection.query(managerSql, (err, data) => {
                if (err) throw (err);

                const managers = data.map(({ id, first_name, last_name}) => ({ name: first_name + " "+ last_name, value: id }));

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

                    let employee = params[0]
                    params[0] = manager
                    params[1] = employee

                    const updateManagerSql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

                    connection.query(updateManagerSql, params, (err, result) => {
                        if (err) throw (chalk.redBright.bold(err));
                        console.log(chalk.greenBright.bold("Employee has been updated."));

                        viewEmployees();
                    });
                });
            });
        });
    });
};
//below function allows database to open using `node server.js`
startDatabase();