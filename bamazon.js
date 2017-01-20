var mysql = require('mysql');
var inquirer = require('inquirer');
               require('console.table'); 

var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'calle12C17',
	database:'Bamazon'
})

connection.connect(function(err){
	console.log('connected as id ' + connection.threadId);
    start();
})


var start = function(){
    inquirer.prompt({
        name: "buy",
        type: "rawlist",
        message: " Would you like to [buy] an item?",
        choices:["YES","NO"]
    }).then(function(answer){
        if(answer.buy.toUpperCase()=="YES"){
            buyItem();
        }else{
            return 'Please enter YES to continue';
        }

    })
}


var buyItem = function(){
    inquirer.prompt([{
        name:"item",
        type:"input",
        message:"From which department?"
    },{

    }])
}























// function gaming () {
//     connection.query('SELECT * FROM Products WHERE Department = "Gaming";', function(err, res){
//         console.log(res);
//         });
// }

// function communication () {
//     connection.query('SELECT * FROM Products WHERE Department = "Communications";', function(err, res){
//         console.log(res);
//         });
// }

// function computers () {
//     connection.query('SELECT * FROM Products WHERE Department = "Computers";', function(err, res){
//         console.log(res);
//         });
// }


