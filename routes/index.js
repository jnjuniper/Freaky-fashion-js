var express = require('express');
var router = express.Router();
const db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    const sql = `
      SELECT product_name, 
      SKU, 
      product_price
      FROM products
    `;

    db.all(sql, [], function (error, rows) {
      res.render('Index', {
      title: 'Freaky Fashion',
      products: rows
      });
    }); 
});

module.exports = router;
