To use and test:
1. Install node_modules express, cors, dotenv, mysql, nodemon (when downloading nodemon use npm install -g nodemon --server), crypto, and nodemailer
2. Install mySql or xampp for db hosting (make sure to download mysql module on xampp)
3. Create user for db that has access to helpingsoupdb, and put credentials on .env file (port, db_port, and host stay the same)
4. cd to server folder and type "nodemon app"
    4a. Should say "app is running" and "db connected" if working
5. then test if db connection is working using form submit on website (should create db automatically then enter data)
6. For "forgot password email" stuff download "liveserver" extension for vscode, and change port by going to settings (ctr + ,), extensions,
"live server config", and "settings:port" (this will take you to settings.json and change port to 5500), also change host to "localhost"
by going to "settings:host" and changing it there
