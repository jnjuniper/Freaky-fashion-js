var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db/db');


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/product-details', function(req, res){
  res.render('product-details');
});

app.get('/admin/products', (req, res) => {
  res.render('admin/products');
});

app.get('/admin/products/new', (req, res)=> {
  res.render('admin/new');
});

app.get('/api/products', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/admin/new', (req,res)=> {
try {
  const {
    'product-name': name,
    'product-sku': sku,
    'product-price': price,
  } = req.body;

  const stmt = db.prepare(`
    INSERT INTO products (name, sku, price)
    VALUES (?, ?, ?)
  `);
  stmt.run(name, sku, price);

  res.redirect('/admin/products');
} catch (err) {
  console.error('Kunde inte lägga in produkt i databas' ,err);
  res.status(500).send('Server Error');
}
});

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

module.exports = app;
