// this is where i am going to be writing my inquirer functions that will prompt the user for questions in the cli and the information will then be stored within the database.

//how can i use inquirer to insert data into mysql?

const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "mysqlrules!",
    database: "employee_tracker"
  });
  
  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    //insert the function name asking questions here.
  });

  function begin(){
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What do you want to do?",
        choices: ["add information", "view database content","update employee roles", "delete data"]
        }).then (response => {
    for(i=0;i<choices.length;i++){
        if(response.choices === [0]){
          addInfo();
        } else if (response.choices === [1]) {
          viewDatabase();
        } else if (response.choices === [2]){
            employeeRole();
        } else if (response.choices === [3]){
            deleteData();
        }
    };

  });
  };
  
  function addInfo(){
    inquirer.prompt
    (
        {
            type:"list",
            message:"What would you like to add to the database",
            choices:["department","role","employee"],
            name:"add"
        }
    ).then(response => {
        if (response.choices === [0]){
            department();
        } else if (response.choices === [1]){
            role();
        } else if (response.choices === [2]){
            employee();
        }
    })
  };

  function viewDatabase(){
    inquirer.prompt 
    (
        {
        
            type:"list",
            message:"What would you like to view in the database",
            choices:["department","role","employee"],
            name:"add"

        }
    ).then(response => {
        for(i=0;i<choices.length;i++){
            if(response.choices === [0]){
                //insert code to allow user to view the department data
            } else if (response.choices === [1]){
                //insert code to allow user to view role data
            } else if (response.choices === [2]){
                //insert code to allow user to view employee data
            }
        }
    })
  };

  function employeeRole(){
    // how to show a list of employees to choose from and update
  }

  function deleteData(){
      inquirer.prompt
    (
        {
            type:"list",
            message:"what would you like to delete?",
            choices:["department","role","employee"]
        }
    ).then(response => {
        for(i=0;i<choices.length;i++){
            if(response.choices === [0]){
                //insert code to delete a specific department
            } else if (response.choices === [1]){
                //insert code to delete a specific role
            } else if (response.choices === [2]){
                //insert code to delete a specific employee
            }
        }
    });
  };

  function department(){
    inquirer.prompt
    (
        {
            type:"input",
            message:"department",
            name:"department"
        }
    )
  };

  function role(){
    (
        {
            type:"input",
            message:"what is the role",
            name:"role"
        }
    )
  };

  function employee(){
    (
        {
            type:"input",
            message:"name",
            name:"name"
        }
    )
  };

  begin();