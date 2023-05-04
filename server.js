const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
require("dotenv").config()

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
            case "Add a Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateEmployee();
                break;
            case "Exit":
                return;
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
        console.log(data)
        displayMainQuestions();
    })
}

// view roles
function viewAllRoles(){
    db.query("SELECT role.id AS id, role.title, department.name FROM role INNER JOIN department ON role.department_id = department.id", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.log(data)
        displayMainQuestions();
    })
}

// view employees
function viewAllEmployees(){
    db.query("SELECT employee.id AS id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.log(data)
        displayMainQuestions();
    })
}

// add a department
function addDepartment(){
    db.query("INSERT INTO department (name) VALUES (?)", 
    
    inquirer.prompt([
        {
            name: "departmentname",
            message: "What is the name of the new department?",
            type: "input"
        }
    ])
    .then(answers => {
        return;
    })
    
    ,(err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.log(data);
        displayMainQuestions();
    })
}

// add a role
function addRole(){
    db.query("INSERT INTO role (title, salary, department_id) VALUES (?)",  
    
    
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
            type: "rawList",
            choices: function(){
                return departments.map(item => ({id: item.id, name: item.name}))
            }
        }
    ]) 
    .then(answers => {
        return;
    })
    ,(err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.log(data);
        displayMainQuestions();
    })
}
// add an employee
function addEmployee(){
    db.query("", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        console.log(data);
        displayMainQuestions();
    })
}

// update an employee
function updateEmployee(){
    db.query("", (err, data) =>
    {
        if (err){
            console.log(err);
            return;
        };
        data: data;
        displayMainQuestions();
    })
}

displayMainQuestions();