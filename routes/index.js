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
    
    const products = [
      {
        name:'Sweatshirt dragkedja',
        brand:'UNIQLO',
        price:'559 SEK',
        image:'/images/produkt1.jpg',
        isNew: true,
        isLiked: true,
      },
      {
        name:'Bruna Joggers',
        brand:'Goyard',
        price:'799 SEK',
        image:'/images/produkt2.jpg',
        isNew: false,
        isLiked: false,
      },
      {
        name:'Brun Trenchcoat',
        brand:'ZARA',
        price:'4590 SEK',
        image:'/images/produkt3.jpg',
        isNew: false,
        isLiked: false,
      },
      {
        name:'Beige Sneakers',
        brand:'ADIDAS',
        price:'759 SEK',
        image:'/images/produkt4.jpg',
        isNew: false,
        isLiked: false,
      },
      {
        name:'Dubbelknäppt blazer',
        brand:'ACNE STUDIO',
        price:'1499 SEK',
        image:'/images/produkt5.jpg',
        isNew: false,
        isLiked: false,
      },
      {
        name:'Stickad Sweat',
        brand:'H&M',
        price:'659 SEK',
        image:'/images/produkt6.jpg',
        isNew: false,
        isLiked: false,
      },
      {
        name:'Raincoat',
        brand:'RAINS',
        price:'999 SEK',
        image:'/images/produkt7.jpg',
        isNew: false,
        isLiked: false,
      },
      {
        name:'Simple Pant',
        brand:'CARHARTT',
        price:'1099 SEK',
        image:'/images/produkt8.jpg',
        isNew: false,
        isLiked: false,
      },
    ];
   
    db.all(sql, [], function (error, rows) {
      res.render('Index', {
      title: 'Freaky Fashion',
      products: products,
      });
    }); 
});

module.exports = router;
