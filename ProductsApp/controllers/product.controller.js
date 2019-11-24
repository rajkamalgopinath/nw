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


exports.productList = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.render('productList', {page:'productList', menuId:'productList', products: products});
        //res.send(products);
    })
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