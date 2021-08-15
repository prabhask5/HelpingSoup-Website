const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mailer = require('nodemailer');
dotenv.config();

const DbService = require('./dBConnection');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    //port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});

app.post('/volunteerSignUp', (request, response) =>{
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result = db.insertVolunteer(formData.firstName, formData.lastName, formData.email,
         formData.address, formData.city, formData.state,
          formData.zip, formData.school, formData.password);
    result
    .then(data => response.json({data: data}));
});

app.post('/volunteerLogin', (request, response) => {
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result = db.getLogin(formData.email, formData.password);
    result
    .then(data => response.json({data: data}));
});

app.post('/donation', (request, response) => {
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result = db.insertDonation(formData.firstName, formData.lastName, formData.email,
         formData.address, formData.city, formData.state,
         formData.zip, formData.date, formData.startTime,
         formData.endTime, formData.message);
    result
    .then(data => response.json({data: data}));
})


app.listen(process.env.PORT, () => console.log('app is running'));