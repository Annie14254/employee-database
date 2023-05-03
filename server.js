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
        switch(answers){
            case "View All Departments":
                viewAllDepartments();
            case "View All Roles":
                viewAllRoles();
            case "View All Employees":
                viewAllEmployees();
            case "Add a Department":
                addDepartment();
            case "Add a Role":
                addRole();
            case "Add a Employee":
                addEmployee();
            case "Update an Employee Role":
                updateEmployee();
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
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
        displayMainQuestions();
    })
}

// view roles
function viewAllRoles(){
    db.query("SELECT role.id AS id, role.title, department.name FROM role INNER JOIN department ON role.department_id = department.id", (err, data) =>
    {
        if (err){
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
        displayMainQuestions();
    })
}

// view employees
function viewAllEmployees(){
    db.query("SELECT employee.id AS id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id", (err, data) =>
    {
        if (err){
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
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
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
        displayMainQuestions();
    })
}

// add a role
function addRole(){
    db.query("", (err, data) =>
    {
        if (err){
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
        displayMainQuestions();
    })
}
// add an employee
function addEmployee(){
    db.query("", (err, data) =>
    {
        if (err){
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
        displayMainQuestions();
    })
}

// update an employee
function updateEmployee(){
    db.query("", (err, data) =>
    {
        if (err){
            res.status(400).json({error: err.message})
            return;
        };
        data: data;
        displayMainQuestions();
    })
}

displayMainQuestions();