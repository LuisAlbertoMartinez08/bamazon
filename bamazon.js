var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table'); 

var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'calle12C17',
	database:'Bamazon'
})

connection.connect(function(err){
	console.log('connected as id ' + connection.threadId);
})


function gaming () {
    connection.query('SELECT * FROM Products WHERE Department = "Gaming";', function(err, res){
        console.log(res);
        });
}

function communication () {
    connection.query('SELECT * FROM Products WHERE Department = "Communications";', function(err, res){
        console.log(res);
        });
}

function computers () {
    connection.query('SELECT * FROM Products WHERE Department = "Computers";', function(err, res){
        console.log(res);
        });
}

