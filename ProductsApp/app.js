//app.js
// https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
// https://medium.com/@bhanushali.mahesh3/creating-a-simple-website-with-node-js-express-and-ejs-view-engine-856382a4578f
// https://github.com/tweneboah/Node-Express-EJS-CRUD


const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override');




const bodyParser = require('body-parser');



const product = require('./routes/product.route'); // Imports routes for the products
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Set up mongoose connection
const mongoose = require('mongoose');

mongoose.connect('connectionString', { useNewUrlParser: true, useUnifiedTopology: true  })


mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', product);


/*

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
*/


let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
