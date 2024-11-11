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
router.get('/products/:slug', function(req, res, next) {
  const productSlug = req.params.slug;
const product = products.find(p => p.slug === req.params.slug);

if (!product) {
  return res.status(404).send('Produkt hittades inte');
}

// hämta 3 slumpade produkter
const similarProducts = products
.filter(p=> p.slug !== productSlug)
.sort(() => 0.5 - Math.random())
.slice(0, 3);

res.render('Product-details', {
  title: product.name,
  product:product,
  similarProducts: similarProducts,
  });

});


module.exports = router;
