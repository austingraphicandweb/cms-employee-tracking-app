// this is where i am going to be writing my inquirer functions that will prompt the user for questions in the cli and the information will then be stored within the database.

// this is where i am calling the required installations so that the program works

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

  //this is the first thing that the user sees. from here they are directed to the next function which will allow them to either add, view, or change data within the program
  function begin(){
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What do you want to do?",
        choices: ["add information", "view database content","update employee roles"]
        }).then (response => {
        if(response.start === "add information"){
          addInfo();
        } else if (response.start === "view database content") {
          viewDatabase();
        } else if (response.start === "update employee roles"){
            employeeRole();
        }  
        // else if (response.start === "delete data"){
        //     deleteData();
        // }
  });
  };
  
  // this is what the user sees if they decid to add inforamtion. this function allows the user to choose what they want to add to the database.
  function addInfo(){
    inquirer.prompt
    (
        {
            type:"list",
            message:"What would you like to add to the database",
            choices:["department","role","employee"],
            name:"add"
        }
        //redirects them to the next function that contains more detailed steps
    ).then(response => {
        if (response.add === "department"){
            departmentAdd();
        } else if (response.add === "role"){
            role();
        } else if (response.add === "employee"){
            employee();
        }
    })
  };

  //this is the next step in viewing the database. here, the user decides what they want to view.
  function viewDatabase(){
    inquirer.prompt 
    (
        {
        
            type:"list",
            message:"What would you like to view in the database",
            choices:["department","role","employee"],
            name:"database"

        }
        // this is what directs the user to the information they choose to view
    ).then(response => {
            if(response.database === "department"){
                departmentView();
            } else if (response.database === "role"){
                roleData();
            } else if (response.database === "employee"){
                employeeData();
            }
    })
  };

  //this is where the user goes when they want to choose to edit an employees role.
  function employeeRole(){
    // right here is where the department table is being chosen so that an action can take place
  connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // this is what is sued to look through the department names in the department table
      const mappedRes = res.map(employee => employee.last_name)
      // this is where the user determines which employee they want to add information for
      inquirer.prompt(
          [
              {
                  type:"list",
                  message:"which employee do you want to edit?",
                  choices:[mappedRes],
                  name:"name"
              }
          ],
          //the return is that it take the information that the user entered in and inserts it back into the database in place of what was there before
      ).then(response => {
          // returning the department name from the department table through the usage of res.find
           const foundObj = res.find(department => {
              return response.department === department.name
           })  

           //this is more specifically what is being targeted by the new information and where the information will be put into the database.
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

//   function deleteData(){
//       inquirer.prompt
//     (
//         {
//             type:"list",
//             message:"what would you like to delete?",
//             choices:["department","role","employee"],
//             name:"delete"
//         }
//     ).then(response => {
//             if(response.delete === [0]){
//                 //insert code to delete a specific department
//             } else if (response.delete === [1]){
//                 //insert code to delete a specific role
//             } else if (response.delete === [2]){
//                 //insert code to delete a specific employee
//             }
//     });
//   };

// if the user wants to view the department database, this function takes care of that.
  function departmentView(){
      //this is what is connecting the js to the mysql and picking out certain information
    connection.query("SELECT * FROM department;", function (err, res){
        if (err) throw err;

        res.forEach(element => {
           console.log(element.name); 
        })
        
    });
  };
// if the user wants to view the role database, this function takes care of that.
  function roleData(){
      //this is what is connecting the js to the mysql and picking out certain information
    connection.query("SELECT * FROM role LEFT JOIN department ON department.id = role.department_id;", function (err, res){
        if (err) throw err;

        res.forEach(element => {
           console.log(element.title); 
        })
        
    });
  }

  // if the user wants to view all of the employee data put together by joining tables, this function takes care of that.
  function employeeData(){
      //this is what is connecting the js to the mysql and picking out certain information
    connection.query("select * FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id = role.department_id;", function (err, res){
        if (err) throw err;

        res.forEach(element => {
           console.log(element.first_name); 
        })
        
    });
  }

  function departmentAdd(){
             // right here is where the department table is being chosen so that an action can take place
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // this is what is used to look through the department names in the department table
        //these are the questions prompted for the user
        inquirer.prompt(
            [
                {
                    type:"input",
                    message:"what is the name of the department?",
                    name:"department"
                },
            ],
            //this the is promise that occurs after the user has put in their selctions.
        ).then(response => {
            // returning the department name from the department table through the usage of res.find
            // shows the specific department names
             const foundObj = res.find(department => {
                return response.department === department.name
             })  
             //this is a connection to the sql database from the script        
             connection.query ("INSERT INTO department SET ?", 
            {
                name:response.name
            },
            function (err,res){
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
            })
        })
      });
  }

  //this is the function that is used for inputting a new user into the database. 
  function role(){
      // right here is where the department table is being chosen so that an action can take place
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // this is what is used to look through the department names in the department table
        const mappedRes = res.map(department => department.name)
        //these are the questions prompted for the user
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
            //this the is promise that occurs after the user has put in their selctions.
        ).then(response => {
            // returning the department name from the department table through the usage of res.find
            // shows the specific department names
             const foundObj = res.find(department => {
                return response.department === department.name
             })  
             //this is a connection to the sql database from the script        
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
      // this is a connection that is selecting all of the data within the role table in sql
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        // this is what is sued to look through the department names in the department table
        const mappedRes = res.map(role => role.title)
        //these are the questions being asked to the user to determine what information will be stored for an employee within the database
        inquirer.prompt(
            [
                {
                    type:"input",
                    message:"what is the first name",
                    name:"first_name"
                },
                {
                    type:"input",
                    message:"what is the last name",
                    name:"last_name"
                },
                {
                    type:"list",
                    message:"what is your role",
                    choices: [mappedRes],
                    name: "role"
                }
            ],//this promise is what happens when the questions are answered by the user. the roles are displayed for the user to see, and then the information is put into the database depending on which role is chosen
        ).then(response => {
            // returning the department name from the department table through the usage of res.find
             const foundObj = res.find(role => {
                return response.role === role.title
             })  
            //  console.log(foundObj);          
             connection.query ("INSERT INTO employee SET ?", 
            {
                first_name: response.first_name,
                last_name: response.last_name,
                // this is defined in the fole function usually before an employee is added.
                role_id: foundObj.id
            },
            function (err,res){
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
            })
        })
      });
  };


  //this calls the first function that will run when the program is started
  begin();