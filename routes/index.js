var express = require('express');
var router = express.Router();
const db = require('../db/db');
const products = require('../data/products');

/* GET home page. */
router.get('/', function(req, res, next) {
    const sql = `
      SELECT product_name, 
      SKU, 
      product_price
      FROM products
    `;
   
   
    db.all(sql, [], function (error, rows) {
      res.render('Index',{
      title: 'Freaky Fashion',
      products: products,
      });
    }); 
});

// Route to handle separate product details
router.get('/products/:id', function(req, res, next) {
  const productId = parseInt(req.params.id, 10); // convert ID to a number
  const product = products [productId];

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.render('Product-details', {
    title: product.name,
    product: product
  });
});

module.exports = router;
