const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
});

connection.connect((err => {
    if (err) console.log(err.message);
    else console.log('db ' + connection.state);
}));


class DbService{
    static getDbServiceInstance(){
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
}

module.exports = DbService;