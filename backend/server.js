const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const db = pgp({
    database: 'ecommerce_db'
});
const uuid = require('uuid');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// This API returns information for all products in the database as an array of objects
app.get('/api/products', (req, resp, next) => {
    db.any(`select * from products`)
    .then(products => resp.json(products))
    .catch(next);
});

// This API returns the information for a single product by the product ID.
app.get('/api/products/:id', (req, resp, next) => {
    let id = req.params.id; //update this once frontend is built
    db.one(`select * from products where id = $1`, id)
    .then(product => resp.json(product))
    .catch(next);
});

// This API allows a new user to sign up. The request body will be in JSON format.
app.post('/api/user/signup', (req, resp, next) => {
    var info = req.body.info; //update this once front end is built
    bcrypt.hash(info.password, 10)
    .then(encryptedPassword => {
        return db.one(`insert into users (username, first_name, last_name, email_address, password) values ($1, $2, $3, $4, $5) returning username, first_name, last_name, email_address`, [info.username,  info.first_name, info.last_name, info.email_address, encryptedPassword]);
    })
    .then(result => resp.json(result))
    .catch(next);
});

// This API handles user logins.
app.post('/api/user/login', (req, resp, next) => {
    db.one(`select * from users where username = $1`, [req.body.info.username])
    .then(result => {
        return [bcrypt.compare(req.body.info.password, result.password), result];
    })
    .spread((matched, result) => {
        if (matched) {
            let token = uuid.v4();
            resp.json({auth_token: token, username: req.body.info.username, first_name: result.first_name, last_name: result.last_name});
            return db.one(`insert into auth_tokens (auth_token, user_name)
            values ($1, $2)`, [token, req.body.info.username])
        }
    })
    .then(result => resp.json(result))
    .catch(next);
});


// app.use() authentication middleware here --> look up token and corresponding user_name and then pull shopping cart for that user

// This API requires authentication in order to access.
// Sending a POST request to the shopping cart API will add a new product to the cart. The request body will contain a JSON object containing the ID of the product to add, something like:
// {
//   "product_id": 347
// }
// In response, the back-end should create a new entry in a shopping cart table that links the product with the customer.
app.post('/api/shopping_cart', (req, resp, next) => {
    db.one(`insert into shopping_cart values (default, $1, $2) returning *`, [req.body.user_name, req.body.product_id]) //update this when frontend is created
    .then(result => resp.json(result))
    .catch(next);
});

// This API requires authentication in order to access.
// Sending a GET request to the shopping cart API will return the items that are currently in the shopping cart for that user as an array of objects representing the products.
app.get('/api/shopping_cart', (req, resp, next) => {
    db.any(`select * from shopping_cart where user_name = $1`, [req.query.user_name])
    .then(result => resp.json(result))
    .catch(next);
});

// This API requires authentication in order to access.
//
// Sending a POST request to the shopping cart checkout API will create a purchase record in the purchase table. This will eventually support charging credit cards with the Stripe API, but we will defer that to another day.
//
// In addition to inserting to the purchase table, we also want to record which products were purchased by linking the new purchase with each product that was bought with that purchase by adding records to the product_in_purchase table.
//
// Finally, as the last step in the checkout, clear out the shopping cart for this customer.
app.post('/api/shopping_cart/checkout', (req, resp, next) => {
    db.one(`insert into purchases (user_name, num_of_products) (select user_name, count(product_id) as num_of_products from shopping_cart where user_name = $1 group by shopping_cart.user_name) returning id`, [req.body.user_name]) //this creates the purchase record in the purchase table (currently includes user_name and product count)
    .then(result => db.any(`insert into products_in_purchase (product_id, purchases_id) (select products.id, $2 from products inner join shopping_cart on shopping_cart.product_id = products.id where user_name = $1) returning *`, [req.body.user_name, result.id])) //this inserts the products purchased records to the products_in_purchase table (includes product id and purchases_id)
    .then(results => db.any(`delete from shopping_cart where user_name = $1 returning *`, [req.body.user_name])) //this clears the shopping_cart for the user checking out
    .then(results => resp.json(results))
    .catch(next);
});


app.use((err, req, resp, next) => { //error handling
  resp.status(500);
  resp.status(401);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
