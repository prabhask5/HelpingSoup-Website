WEBSITE URL: http://helpingsoup.com



To use:
1. Install node_modules express, cors, dotenv, mysql2, nodemon (when downloading nodemon use npm install -g nodemon --server), crypto, and nodemailer
2. Install mySql or xampp for db hosting (make sure to download mysql module on xampp)
3. Create user for db that has access to helpingsoupdb, and put credentials on .env file (port, db_port, and host stay the same)
4. cd to backend folder and type "nodemon app"
    4a. Should say "app is running" and "db connected" if working
5. then test if db connection is working using form submit on website (should create db automatically then enter data)
6. Download "liveserver" extension for vscode, and change port by going to settings (ctr + ,), extensions,
"live server config", and "settings:port" (this will take you to settings.json and change port to 5500), also change host to "localhost"
by going to "settings:host" and changing it there

Start up webapp:
1. Start up mysql database (through xampp or mysql), and drop `helpingsoupdb` if it exists
    1a. Start mySql and apache in xampp and click admin to manage db
2.Go to git bash terminal and type 'cd backend', and then type 'nodemon app'
    2a. Should say 'app is running' and 'db connected' if webapp is working
3.go to main.html, right click, and click 'open with live server'
    3a. Live server that starts with 'localhost:5500' should open in default browser
4. Now just use the website, all features should be working


Features of forms (to bug test)
Donation form:
    entering donation information into mysql database
    error checking for email, zip code, and times (checks if times are 30 min apart and if they're in office hours)
    error checking for if fields are empty
    sends out email to volunteers who have opted in
    email allows volunteers to opt out
Login form:
    checking if volunteer credentials are correct from mysql database
    error checking for if fields are empty
Forget password form:
    send email by checking if volunteer email is already in mysql database
    error checking for if fields are empty
Sign Up form:
    entering volunteer information into mysql database
    error checking for email, zip code, and passwords (checks if passwords are same)
    error checking for if fields are empty
    checks if volunteer email already exists in mysql database, and throws error if it is
    allows user to opt out of donation emails
