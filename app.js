var mysql = require("mysql");
var inquirer = require("inquirer");

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
  console.log("connected as id " + connection.threadId + "\n");
});

function readData(){
  connection.query("SELECT * FROM characters", function(err, data){
    if (err) throw err;
    console.log(data);
    for(i=0;i<data.length;i++){
      console.log(`${data[i]} | ${data[i].name}`);
    }
  });
}
