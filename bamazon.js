const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "calle12C17",
    database: 'Bamazon'
});

//Quieres comprar algo?
//Seleciona un departamento //Select * from Products
//Que item de este departamento quieres? //Select * from Product where = XXX
//Cuantas unidades quieres?  ValidateStockQuantity 
//Calcular la suma y el tax   CalculatePrice
//Devolver resultado
//Gracias por comprar, checkeanos en facebook pa mas info.

function bamazonApp() {
    //Get items
    conn.query('SELECT * FROM Bamazon.Products;', function(err, res) {
        if (err) {
            throw err;
        }
        console.table('Bamazon Inventory', res);
        inquirer.prompt({    
            type: 'confirm',
            name: 'shopConfirmation',
            message: 'Do you want to buy an item?',
            default: false
        }).then(function(answer){
            inquirer.prompt({
            name: 'item',
            type: 'input',
            message: 'Which item would you like to buy:',
            validate: function(value) {
                if (!isNaN(value) && (1 <= value) && (value <= res.length)) {
                    return true;
                }
                return 'Please enter the id of the item you would like to buy';
            }
        }).then(function(answer) {

            var item = res[parseInt(answer.item) - 1];

            inquirer.prompt({
                name: 'quantity',
                type: 'input',
                message: 'How many items would you like to purchase:',
                validate: function(value) {
                    //Check for input and validate with database
                    if ((0 <= value) && !isNaN(value)) {
                        if (value > item.Stock_Quantity) {
                            return 'We don\'t have enough quantity at this time. Please enter a lower number, or 0 to cancel purchase';
                        }
                        return true;
                    }
                    else {
                        return 'Please enter a positive number, or 0 to cancel purchase';
                    }
                }
            }).then(function(answer) {
                if (answer.quantity == 0) {
                    console.log('Purchase cancelled');
                    conn.end();
                }
                else {
                    updateBamazon(item, answer.quantity);
                }
            });
        })
        });
    });
}

function updateBamazon(item, quantity) {

    var total = (item.Price * quantity).toFixed(2);
    // var total = addTax(subtotal);

    //Update Bamazon Products with StockQuantity
    item.Stock_Quantity -= parseInt(quantity);
    conn.query("UPDATE `Bamazon`.`Products` SET `Stock_Quantity`= ? WHERE `id`= ?;", [item.Stock_Quantity, item.id], function(err) {
        if (err) throw err;
    });
    console.log('Total: $' + total);
    inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Any more items you would like to buy?',
        default: true
    }).then(function(answer) {
        if (answer.continue) bamazonApp();
        else {
            console.log('Thanks for shopping with us! Please check our Facebook Page for more info');
            conn.end();
        }
    });
}

// function addTax(subtotal){
//     //Assuming 7% is the tax in state
//     var tax = (subtotal * 1.07).toFixed();
//     return subtotal + tax;
// }


//Start App
conn.connect(function(err) {
    if (err) {
        throw err;
    }
    bamazonApp();
});