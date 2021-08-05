const mysql = require('mysql');
const fs = require('fs');
const properties = require('./properties.js');

properties.createDatabase;
let connection = properties.connectionDb;

connection.connect(function (err){
    if (err) throw err;
    console.log("Connection Succeeded!");
});
