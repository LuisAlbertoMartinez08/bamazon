var mysql = require('mysql');
var inquirer = require('inquirer');

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


function itemsForSale () {
    connection.query('SELECT * FROM products', function(err, res) {
        console.log(res);
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            choices: function(value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].itemname);
                }


function start(){
	inquirer.prompt({
		name:"buyItem";
		type:"rawlist";
		message:"Would you like to [BUY] an item today?"
	})
}