const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const fs = require('fs')
const nodemailer = require('nodemailer');
dotenv.config();

const DbService = require('./dBConnection.js');
const { allowedNodeEnvironmentFlags } = require('process');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var userEmail = null;



var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
//POST CALLS
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
    const result = db.getLogin(formData.email, formData.password);
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
            var createdAt = new Date();
            db.createToken(formData.email, expireDate, token, createdAt);
            const message = {
                from: process.env.EMAIL_USER,
                to: formData.email,
                subject: "HelpingSoup Reset Password",
                text: 'Hello,\n\nTo reset your password, please click the link below.\n\nhttp://' + process.env.DOMAIN + '/user/reset-password?token='+ encodeURIComponent(token) +'&email='+ formData.email +'\n\nSincerely,\n\nThe HelpingSoupTeam'
            };
            transporter.sendMail(message, (err, info) => {
                if(err) console.log(err);
                //else console.log(info);
            });
            response.json({success: true});
        }
        else response.json({success: false});
    })
});



app.post('/resetVolunteerPassword', (request, response) => {
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    const result = db.findOldPassword(userEmail);
    result
    .then(data => {
        if(data[0].volunteerPassword == formData.password){
            response.json({success: false});
        }
        else{
            const result = db.resetPassword(userEmail, formData.password);
            result
            .then(data => response.json({success: true}));
            const result2 = db.updateToken(userEmail);
            userEmail = null;
        }
    });
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
    const result2 = db.findEmails();
    result2
    .then(data => {
        for(var i = 0; i < data.length; i++){
            const message = {
                from: process.env.EMAIL_USER,
                to: data[i].volunteerEmail,
                subject: "New HelpingSoup Donation",
                text: 'Hello,\n\nA new donation from ' + formData.firstName + ' ' + formData.lastName + ' has been submitted to HelpingSoup. The donation is available from '  + formData.startTime + ' to ' + formData.endTime + ' on ' + formData.date + ', and it is located at ' + formData.address + ', ' + formData.city + ', ' + formData.state + ' ' + formData.zip + '.\n\nFor more information, click this link: [placeholder link].' + '\n\nSincerely,\n\nThe HelpingSoup Team'
            };
            transporter.sendMail(message, (err, info) => {
                if(err) console.log(err);
                //else console.log(info);
            });
        }
    });
})

app.post('/api/SelectingOrders',(request,response) => {
    const formData = request.body;
    const db = DbService.getDbServiceInstance();
    console.log(formData);
    const result = db.insertSelectedCustomer(formData.deliveryNotes,formData.deliveryStatus,formData.volunteerEmail,formData.customerID);
    
    result
    .then(response.json({success: true}));
});

//GET CALLS
app.get('/user/reset-password', (request, response) => {
    
    //delete expired or used tokens
    const db = DbService.getDbServiceInstance();
    const curDate = new Date();
    db.deleteTokens(curDate);

    //find token
    const result = db.findToken(request.query.email, request.query.token);
    result
    .then(data => {
        if(data.length > 0){
            console.log('token found!');
            //login.navigate('http://' + process.env.FRONTEND_DOMAIN + '/frontend/pages/forgetpassword.html');
            //response.writeHead(302, {Location: 'http://' + process.env.FRONTEND_DOMAIN + '/frontend/pages/forgetpassword.html'});
            response.writeHead(302, {Location: 'http://localhost:5500/frontend/pages/forgotpassword.html'});
            userEmail = request.query.email;
            response.end();
        }
        else{
            console.log('your token has expired or no token as been found, sorry');
            //login.navigate('http://' + process.env.FRONTEND_DOMAIN + '/frontend/pages/error.html');
            //response.writeHead(302, {Location: 'http://' + process.env.FRONTEND_DOMAIN + '/frontend/pages/error.html'});
            response.writeHead(302, {Location: 'http://localhost:5500/frontend/pages/error.html'});
            response.end();
        }
    });
});

app.get('/api/GetAllOrders', (request, response) => {
    const db = DbService.getDbServiceInstance();
    const result= db.getDonations();
    result
    .then(data => {
            response.send(data);
    });
    
});

app.get('/api/GetAllSelectedOrders', (request, response) => {
    const email = request.query.volunteerEmail;
    const db = DbService.getDbServiceInstance();
    const result = db.getSelectedOrders(email);

    result
    .then(data =>{
        response.send(data);
    });
});

app.delete('/api/delSelectedOrder', (request, response) => {
    const ID = request.query.customerID;
    const db = DbService.getDbServiceInstance();
    const result = db.delSelectedOrder(ID);
    result
    .then(response.json({success: true}));
});

app.put('/api/updateStatus', (request, response) => {
    const ID = request.query.customerID;
    const Status = request.query.deliveryStatus;
    console.log("type of " + typeof Status);
    const db = DbService.getDbServiceInstance();
    const result = db.updateInProgress(ID,Status);
    result
    .then(response.json({success: true}));
});

app.listen(process.env.PORT, () => console.log('app is running'));