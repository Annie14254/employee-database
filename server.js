const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
require("dotenv").config()
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee database.`)
  );

const questionsList = [
    {
        name: "mainquestions",
        message: "Welcome to the employee database. Please select one of the following options:",
        type: "list",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit"]
    }
]

function displayMainQuestions(){
    inquirer.prompt(questionsList)
    .then (answers => {
        switch(answers.mainquestions){
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
            case "Update an Employee Role":
                updateEmployee();
                break;
            case "Exit":
                process.exit();
        }   
    })
}

// view departments
function viewAllDepartments(){
    db.query("SELECT department.id AS id, department.name FROM department", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.table(data)
        displayMainQuestions();
    })
}

// view roles
function viewAllRoles(){
    db.query("SELECT role.id AS id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.table(data)
        displayMainQuestions();
    })
}

// view employees
function viewAllEmployees(){
    db.query("SELECT employee.id AS id, employee.first_name, employee.last_name, role.title, employee.manager_id, department.name AS department, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.table(data)
        displayMainQuestions();
    })
}

// add a department
function addDepartment(){
    
    inquirer.prompt([
        {
            name: "departmentname",
            message: "What is the name of the new department?",
            type: "input"
        }
    ])
    .then(async answers => {
        await db.promise().query(`INSERT INTO department (name) VALUES ('${answers.departmentname}')`)
        viewAllDepartments();
    })
    
    .catch(err =>
    {
        if (err){
            console.log(err);
            return;
        };
    })
}

// add a role
async function addRole(){  
    const [departments] = await db.promise().query(`SELECT * FROM department`)

    inquirer.prompt([
        {
            name: "roletitle",
            message: "What is the title of the new role?",
            type: "input"
        },
        {
            name: "rolesalary",
            message: "What is the salary of the new role?",
            type: "input"
        },
        {
            name: "roledept_id",
            message: "What is the department of the new role?",
            type: "list",
            choices: function(){
                return departments.map(item => ({value: item.id, name: item.name}))
            }
        }
    ]) 
    .then(async answers => {
        await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roletitle}', ${answers.rolesalary},${answers.roledept_id})`)
        viewAllRoles();
    })
    .catch(err  =>
    {
        if (err){
            console.log(err);
            return;
        };
    })
}
// add an employee
async function addEmployee(){

    const [role] = await db.promise().query(`SELECT * FROM role`)
    const [employee] = await db.promise().query(`SELECT * FROM employee`)

    inquirer.prompt([
        {
            name: "employeefirst",
            message: "What is the first name of the employee?",
            type: "input"
        },
        {
            name: "employeelast",
            message: "What is the last name of the employee?",
            type: "input"
        },
        {
            name: "employeerole_id",
            message: "What is the role of the new employee?",
            type: "list",
            choices: function(){
                return role.map(item => ({value: item.id, name: item.title}))
            }
        },
        {
            name: "employeemanager_id",
            message: "Who is the manager of the new employee?",
            type: "list",
            choices: function(){
                return employee.map(item => ({value: item.id, name: item.first_name + " " + item.last_name}))
            }
        }
    ]) 
    .then(async answers => {
        await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.employeefirst}', '${answers.employeelast}',${answers.employeerole_id}, ${answers.employeemanager_id})`)
        viewAllEmployees();
    })
    .catch(err  =>
    {
        if (err){
            console.log(err);
            return;
        };
    })
}

// update an employee
async function updateEmployee(){

    const [role] = await db.promise().query(`SELECT * FROM role`)
    const [employee] = await db.promise().query(`SELECT * FROM employee`)

    inquirer.prompt([
        {
            name: "employee_id",
            message: "Which employee would you like to update?",
            type: "list",
            choices: function(){
                return employee.map(item => ({value: item.id, name: item.first_name + " " + item.last_name}))
            }
        },
        {
            name: "employeerole_id",
            message: "What is the updated role of the employee?",
            type: "list",
            choices: function(){
                return role.map(item => ({value: item.id, name: item.title}))
            }
        },
    ]) 
    .then(async answers => {
        await db.promise().query(`UPDATE employee SET role_id = ${answers.employeerole_id} WHERE id = ${answers.employee_id}`)
        console.log("Employee Role Updated");
        displayMainQuestions();
    })
    .catch(err  =>
    {
        if (err){
            console.log(err);
            return;
        };
    })
}

displayMainQuestions();