# Employee Tracker

<!-- insert in screenshot of completed console or gif of video -->
Employee Tracker is a command-line application used to manage a company's employee database.

## Description
For business owners, Employee Tracker is an application that allows one to view and manage the departments, roles, and employees of their workplace.

When the application is started, the user is presented -

Your Task

MEETS ALL REQUIREMENTS
Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager-, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role

                        ['View all Employees', 
                       'View all Employees by Department', 
                       'View all Employees by Manager',
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

Bonus
Try to add some additional functionality to your application, such as the ability to do the following:

Update employee managers. - works!

View employees by manager. - works!!

View employees by department. - works!

Delete departments, roles, and employees. - works!

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department. -works!



How to Submit the Challenge
You are required to submit BOTH of the following for review:

A walkthrough video demonstrating the functionality of the application. - RECORD VIDEO WHEN PROJECT IS COMPLETED
Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.

The URL of the GitHub repository, with a unique name and a README describing the project.
- https://github.com/trujilml/employee-tracker

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Developed With](#Developed-with)

## Installation
- This file can be cloned through GitHub into your own repository by selecting the above Code button.
- The following npm packages listed in the `Developed With` tab are required to install prior to running `node server.js` and initiating the command line.
- To view the database through MySQL, please type `mysql -u root -p`. Please note that with the dotenv package, you will need to add your MySQL password in the respective .env file and add it to the .gitignore file in order to prevent confidental information from leaking.

## Usage
- Open the terminal through either the Integrated Terminal on VS Code or through the Terminal application on Mac OS following the cloned upload of the file with their respective installers present (please view `Developed With` below).
- Type `node server.js` to get started.
- This application allows the user to view, add, edit, and delete their employees, employees' roles, departments, and managers. Users can interact freely in this application. 

## Developed With
- MySQL2 - Continuation package of MySQL. Relational database management system that ensures fast connection to host servers and web databases. The database involves hosting and retrieving the date of the employee, role and manager tables. - https://www.npmjs.com/package/mysql2
- dotenv - An npm package that protects login credentials from other users through the .env file and MySQL. - https://www.npmjs.com/package/dotenv
- console.table - npm package that adds the tables to display in the command line, works with use of MySQL2, Inquirer, Node.js and JS. - https://www.npmjs.com/package/console.table 
- Inquirer - npm package that houses a collection of interactive command line interfaces, where the user is able to interact with the employee tables and add several assets for this employee tracker. - https://www.npmjs.com/package/inquirer
- Chalk - npm package that styles and formats different colors and background for the command line terminal. Colorfully displays results from the inquirer prompts and titles of the inquired employee data tables. - https://www.npmjs.com/package/chalk
- JavaScript - Back-end Development 
- Node.js - Back-end Development 