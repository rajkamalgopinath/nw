//app.js


const express = require('express');
const bodyParser = require('body-parser');


const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gopinrx:Kalai123!@cluster0-reyai.mongodb.net/productstutorial', { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use('/products', product);


let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});