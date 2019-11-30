const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/test', product_controller.test);
router.get('/create', product_controller.product_new);
router.post('/createNew', product_controller.product_create);
router.get('/', product_controller.products);
router.get('/list/:page', product_controller.productList);
router.get('/list', product_controller.productList);
router.put('/:id/update', product_controller.product_update);
router.get('/:id', product_controller.product_details);
    router.delete('/:id/delete', product_controller.product_delete);
    
module.exports = router;
