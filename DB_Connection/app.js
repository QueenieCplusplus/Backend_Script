var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

//express 用來聲明 app object 的位置。
var app = express();

//Import the mongoose module
var mongoose = require('mongoose');

var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
// We use connect-flash to help us with error handling 
//by providing flash messages 
//which can be displayed to user on error.
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var User = require('./models/user.js');


//Set up default mongoose connection
// var mongoDB = ’insert_your_database_url_here‘ ;

// var mongoDB = 'mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect(mongoDB);

//If the password contains reserved URI characters, you must escape the characters per RFC 2396. 
//For example, if your password is @bc123, 
//you must escape the @ character when specifying the password in the connection string; 
//e.g. %40bc123.

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

//local DB
// var dbConfig = require('./db.js');
// mongoose.connect(dbConfig.url);

// Mongo DB Driver version shall be 3.4+
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true});
// client.connect(err => {
//   const collection = client.db("").collection("");
//   // perform actions on the collection object
//   client.close();
// });

// Auth in Express 4.X
var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
// app.use(session({ secret: "cats" })); 
//express-session deprecated undefined resave option; provide resave option

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({ 
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use is method for Middlewarechain
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// //passport 
// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

// custom  response
// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });


// // DB
// var config = require('./db');
// mongoose.connect(config.connection);


// serialize & deserialize
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Login
passport.use('login', new LocalStrategy({
  passReqToCallback: true
},
function (req, username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false, req.flash('info', 'User not found.'))
    }

    var isValidPassword = function (user, password) {
      return bcrypt.compareSync(password, user.password)
    }

    if (!isValidPassword(user, password)) {
      return done(null, false, req.flash('info', 'Invalid password'))
    }

    return done(null, user)
  })
}
));

//Signup

passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done) {
  var findOrCreateUser = function () {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false, req.flash('info', 'User already exists'));
      } else {
        var newUser = new User();
        newUser.username = username;
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        newUser.email = req.params.email;
        newUser.firstname = req.params.firstname;
        newUser.lastname = req.params.lastname;

        newUser.save(function (err, user) {
          if (err) {
            throw err;
          }

          return done(null, user);
        });
      }
    });
  };

  process.nextTick(findOrCreateUser)
}));

module.exports = app;
