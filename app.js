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
            console.log(response);
        if(response.start === "add information"){
          addInfo();
        } else if (response.start === "view database content") {
          viewDatabase();
        } else if (response.start === "update employee roles"){
            employeeRole();
        } else if (response.start === "delete data"){
            deleteData();
        }
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
        if (response.add === "department"){
            department();
        } else if (response.add === "role"){
            role();
        } else if (response.add === "employee"){
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
            name:"database"

        }
    ).then(response => {
            if(response.database === "department"){
                //insert code to allow user to view the department data
            } else if (response.database === "role"){
                //insert code to allow user to view role data
            } else if (response.database === "employee"){
                //insert code to allow user to view employee data
            }
    })
  };

  //is this function going to get its logic from what is inside of the database?
  function employeeRole(){
    // how to show a list of employees to choose from and update
  }

  function deleteData(){
      inquirer.prompt
    (
        {
            type:"list",
            message:"what would you like to delete?",
            choices:["department","role","employee"],
            name:"delete"
        }
    ).then(response => {
            if(response.delete === [0]){
                //insert code to delete a specific department
            } else if (response.delete === [1]){
                //insert code to delete a specific role
            } else if (response.delete === [2]){
                //insert code to delete a specific employee
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
    ).then(response => {
        connection.query ("INSERT INTO department SET ?", 
        {
            name: response.department
        },
        function (err,res){
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        })
    })
  };

  function role(){
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        const mappedRes = res.map(department => department.name)
        console.log(mappedRes);
        inquirer.prompt(
            [
                {
                    type:"input",
                    message:"what is the role",
                    name:"role"
                },
                {
                    type:"input",
                    message:"what is your salary",
                    name:"salary"
                },
                {
                    type:"list",
                    message:"what department does the role belong to?",
                    choices: mappedRes,
                    name: "department"
                }
            ],
        ).then(response => {
             const foundObj = res.find(department => {
                return response.department === department.name
             })  
            //  console.log(foundObj);          
             connection.query ("INSERT INTO role SET ?", 
            {
                title: response.role,
                salary: response.salary,
                department_id: foundObj.id
            },
            function (err,res){
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
            })
        })
      });
  };

  function employee(){
    (
        {
            type:"input",
            message:"name",
            name:"name"
        }
    ).then(response => {

    })
  };

  begin();