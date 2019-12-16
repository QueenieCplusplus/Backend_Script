# DB_connection

App using Express

                var express = require('express');
                var app = express();
                
Install & Dependencies

                var cookieParser = require('cookie-parser');


Passport for Auth
// using session to store User Object to obmit the Login Auth.

                var passport = require('passport');
                var LocalStrategy = require('passport-local').Strategy;
                var session = require('express-session');
                
MongoDB & Mongoose Driver

//Import the mongoose module

//prepare a cloud-based cluster to put DB there


                  var mongoose = require('mongoose');
                  var bcrypt = require('bcrypt-nodejs');
                  var favicon = require('serve-favicon');
                  var bodyParser = require('body-parser');
                  
// We use connect-flash to help us with error handling 

//by providing flash messages 

//which can be displayed to user on error.

                   var flash = require('connect-flash');
                   
// call app.use()

                    app.use(express.json());
                    app.use(express.urlencoded({ extended: false }));

                    app.use(bodyParser.urlencoded({ extended: false }));
                    app.use(cookieParser());
                    
                    app.use(passport.initialize());
                    app.use(passport.session());

                    app.use(session({ 
                      secret: 'your secret key',
                      resave: false,
                      saveUninitialized: false
                    }));

                    app.use(flash());     
                    app.use(logger('dev'));
                    
connect to local DB 

https://github.com/QuinoaPy/MongoDB_NodeApp

                    var dbConfig = require(‘./db.js’);
                    mongoose.connect(dbConfig.url);

connect to cloud-based cluster using Mongoose Middleware

//"useNewUrlParser" option and removing retryWrites from the url fixed the problem.
//mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test
//mongodb+srv://<username>:<password>@locallibrary-2m7tu.azure.mongodb.net/test?retryWrites=true&w=majority
  
                  mongoose.connect(
                    'mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test?retryWrites=true&w=majority', 
                  { useNewUrlParser: true, 
                    useUnifiedTopology: true,    
                    useFindAndModify: false,
                    useCreateIndex: true,
                    reconnectTries: 30,
                    reconnectInterval: 30000, // in ms
                  });

                mongoose.connection.once('open',() => {
                  console.log('connceted to database.')
                });

// Get Mongoose to use the global promise library

                mongoose.Promise = global.Promise;
                
//Get the default connection

                var db = mongoose.connection;

// Atlas clusters operate on port 27017

//Bind connection to error event (to get notification of connection errors)

                db.on('error', console.error.bind(console, 'MongoDB connection error:'));
