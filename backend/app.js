const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
dotenv.config();
const DbService = require('./dBConnection');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

app.post('/volunteerSignUp', (request, response) =>{
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result1 = db.getLogin(formData.email)
    result1
    .then(data => {
        if(data.length > 0){
            response.json({success: false});
        }
        else{
            const result2 = db.insertVolunteer(formData.firstName, formData.lastName, formData.email,
                formData.address, formData.city, formData.state,
                 formData.zip, formData.school, formData.password);
           result2
           .then(response.json({success: true}));
        }
    })
});

app.post('/volunteerLogin', (request, response) => {
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result = db.getLogin(formData.email);
    result
    .then(data => {
        pass = []
        for(var i = 0; i < data.length; i++){
            pass.push(data[i].volunteerPassword);
        }
        var canLogin = false;
        for(var i = 0; i < pass.length; i++){
            if(pass[i] == formData.password) canLogin = true;
        }
        response.json({CanLogin: canLogin});
    });
});

app.post('/forgotPasswordEmail', (request, response) => {
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result1 = db.findEmail(formData.email);
    result1
    .then(data => {
        if(data.length > 0){
            db.updateToken(formData.email);
            var token = crypto.randomBytes(64).toString('base64');
            var expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);
            db.createToken(formData.email, expireDate, token);
            const message = {
                from: process.env.EMAIL_USER,
                to: formData.email,
                subject: "HelpingSoup Reset Password",
                text: 'To reset your password, please click the link below.\n\nhttp://' + process.env.DOMAIN + '/user/reset-password?token='+ encodeURIComponent(token) +'&email='+ formData.email
            };
            transporter.sendMail(message, (err, info) => {
                if(err) console.log(err);
                //else console.log(info);
            });
            response.json({success: true});
        }
        else response.json({success: false});
    });
});

app.get('/user/reset-password', (request, response, next) => {
    response.sendFile('login.html');
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