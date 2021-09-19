const mysql = require('mysql2');
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
let instance = null;
var queryList = [];

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.HSDB_USER,
    password:process.env.HSDB_PASSWORD,
    database:process.env.DATABASE,
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
    goodsAssigned TINYINT(1) NOT NULL DEFAULT 0
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
    deliveryStatus TINYINT(1) NOT NULL DEFAULT 0,
    volunteerID INT NOT NULL,
    customerID INT NOT NULL,
    FOREIGN KEY (volunteerID) REFERENCES volunteer(volunteerID),
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
);`;
queryList.push(createVolunteerDelivery);
var createResetTokens = `CREATE TABLE IF NOT EXISTS resettokens(
    tokenID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiration DATETIME NOT NULL,
    createdAt DATETIME NULL,
    updatedAt DATETIME NULL,
    used TINYINT(1) NOT NULL DEFAULT 0
);`
queryList.push(createResetTokens);
class DbService{
    static getDbServiceInstance(){
        connection.connect(function (err) {
            if (err) console.log(err.message);
        });
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
    async getLogin(email, password){
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
                     " customerStreetAddress, customerCity, customerState, customerZip, pickUpDate, startTime, endTime, goodsNotes)" +
                     " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
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
    async findEmail(email){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT volunteerEmail FROM volunteer WHERE volunteerEmail = ?;";
                connection.query(query, [email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }
    async updateToken(email){
        try{
            const update = await new Promise((resolve, reject) => {
                const query = "UPDATE resettokens SET used = 1 WHERE email = ?;";
                connection.query(query, [email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return update;
        } catch(error){
            console.log(error);
        }
    }
    async createToken(email, expiration, token, createdAt){
        try{
            const insert = await new Promise((resolve, reject) => {
                const query = "INSERT INTO resettokens(email, expiration, token, createdAt) VALUES (?, ?, ?, ?);";
                    connection.query(query, [email, expiration, token, createdAt], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
                });
            return insert;
        } catch(error){
            console.log(error);
        }
    }
    async deleteTokens(date){
        try{
            const del = await new Promise((resolve, reject) => {
                const query = "DELETE FROM resettokens WHERE expiration < ? OR used = 1;";
                    connection.query(query, [date], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
            });
            return del;
        } catch(error){
            console.log(error);
        }
    }
    async findToken(email, token){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT tokenID FROM resettokens WHERE email = ? AND token = ?;";
                    connection.query(query, [email, token], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }
    async findOldPassword(email){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT volunteerPassword FROM volunteer WHERE volunteerEmail = ?;";
                    connection.query(query, [email], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
            });
            return response;
        } catch(error){
            console.log(error)
        }
    }
    async resetPassword(email, password){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE volunteer SET volunteerPassword = ? WHERE volunteerEmail = ?;";
                    connection.query(query, [password, email], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }
    async findEmails(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT volunteerEmail FROM volunteer;";
                    connection.query(query, [], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }
    getDonations() {
        const query = "SELECT * FROM helpingsoupdb.customer;";
        return query;

    }
}



module.exports = DbService;