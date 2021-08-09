const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();
var queryList = [];

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    //database:process.env.DATABASE,
    port:process.env.DB_PORT
});

connection.connect((err => {
    if (err) console.log(err.message);
    else console.log('db ' + connection.state);
}));

var createDb = "CREATE DATABASE IF NOT EXISTS helpingsoupdb;";
queryList.push(createDb);
var useDb = "use helpingsoupdb;";
queryList.push(useDb);
var createCustomer = `CREATE TABLE IF NOT EXISTS customer(
    customerID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customerFirstName VARCHAR(50) NULL,
    customerLastName VARCHAR(50) NULL,
    customerEmail VARCHAR(100) NULL,
    customerStreetAddress VARCHAR(250) NULL,
    customerCity VARCHAR(100) NULL,
    customerState VARCHAR(50) NULL,
    customerZip CHAR(5) NULL,
    pickupDate DATE NULL,
    startTime TIME NULL,
    endTime TIME NULL,
    goodsNotes VARCHAR(500) NULL,
    goodsAssigned TINYINT(1) NOT NULL
);`
queryList.push(createCustomer);
var createVolunteer = `CREATE TABLE IF NOT EXISTS volunteer(
    volunteerID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    volunteerFirstName VARCHAR(100) NULL,
    volunteerLastName VARCHAR(100) NULL,
    volunteerEmail VARCHAR(100) NULL,
    volunteerStreetAddress VARCHAR(250) NULL,
    volunteerCity VARCHAR(100) NULL,
    volunteerState VARCHAR(50) NULL,
    volunteerZip CHAR(5) NULL,
    volunteerSchool VARCHAR(100) NULL,
    volunteerPassword VARCHAR(250) NOT NULL
);`;
queryList.push(createVolunteer);
var createVolunteerDelivery = `CREATE TABLE IF NOT EXISTS volunteerdelivery(
    deliveryNotesID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    deliveryNotes VARCHAR(500) NULL,
    deliveryStatus TINYINT(1) NULL,
    volunteerID INT NOT NULL,
    customerID INT NOT NULL,
    FOREIGN KEY (volunteerID) REFERENCES volunteer(volunteerID),
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
);`;
queryList.push(createVolunteerDelivery);
class DbService{
    static getDbServiceInstance(){
        for(let query of queryList){
            connection.query(query, function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        }
        return instance ? instance : new DbService();
    }

    async insertVolunteer(firstName, lastName, email, address, city, state, zip, school, password){
        try{
            const insert = await new Promise((resolve, reject) => {
                const query = "INSERT INTO volunteer (volunteerFirstName, volunteerLastName, volunteerEmail," +
                     " volunteerStreetAddress, volunteerCity, volunteerState," +
                     " volunteerZip, volunteerSchool, volunteerPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
                connection.query(query, [firstName, lastName, email, address, city, state, zip, school, password], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insert);
                })
            });
            return insert;
        } catch (error){
            console.log(error);
        }
    }
    async getLogin(email){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT volunteerPassword FROM volunteer WHERE volunteerEmail = ?;";
                connection.query(query, [email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            //console.log(response);
            return response;
        } catch(error){
            console.log(error);
        }
    }
    async insertDonation(firstName, lastName, email, address, city, state, zip, date, startTime, endTime, message){
        try{
            const insert = await new Promise((resolve, reject) => {
                const query = "INSERT INTO customer (customerFirstName, customerLastName, customerEmail," +
                     " customerStreetAddress, customerCity, customerState, customerZip, pickUpDate, startTime, endTime, goodsNotes, goodsAssigned)" +
                     " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0);";
                connection.query(query, [firstName, lastName, email, address, city, state, zip, date, startTime, endTime, message], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return insert;
        } catch(error){
            console.log(error);
        }
    }
    async changePassword(email, newPass){
        try{
            const insert = await new Promise((resolve, reject) => {
                const query = "UPDATE volunteer SET volunteerPassword = ? WHERE volunteerEmail = ?;";
                connection.query(query, [newPass, email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insert);
                })
            });
            return insert;
        } catch(error){
            console.log(error);
        }
    }
}

module.exports = DbService;