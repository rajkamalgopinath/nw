const Product = require('../models/product.model');




//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.products = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.send(products);
    })
};


var countPromise = () => (
    new Promise((resolve, reject) => {
        Product.countDocuments({}, function(err, data) {
            if (err) 
            { 
                   console.log('Error'+err);
                   reject(err);
            }
             else {
                resolve(data);
             }
            
          });   
    })
);

var callCountPromise = async () => {
    var result = await (countPromise());
    return result;
};

exports.productList = function (req, res,next) {

    const rowsPerPage = 3; // results per page
    var currentPage = req.params.page || 1; // Page 

    var numOfProducts=1;

    callCountPromise().then(function(result) {
       numOfRows=result;
    });
   
    
    currentPage = parseInt(currentPage,10);

    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.render('productList', {page:'productList', menuId:'productList', currentPage: currentPage, 
        totalPages: Math.ceil(numOfRows/ rowsPerPage),
        products: products});
        //res.send(products);
    }).skip((rowsPerPage * currentPage) - rowsPerPage)
    .limit(rowsPerPage);
};


exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.render('product', {page:'product', menuId:'product', product: product});
        //res.send(product);
    })
};


// controllers/products.js
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/products/list");
        //res.send('Product Created successfully')
    })
};


exports.product_new = function (req, res) {

    res.render('productNew', {page:'productNew', menuId:'productNew'});
       
};


exports.product_update = function (req, res) {

    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        });

   
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {

        if (err) return next(err);
       // res.send('Product updated.');
        res.redirect("/products/list");

    });
};


// controllers/products.controller.js
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        //res.send('Deleted successfully!');
        res.redirect("/products/list");

    })
};