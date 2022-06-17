//1 REQUIRE PACKAGES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


//1.1 REQUIRE 
const globalErrHandler = require('./utils/errHandler');

const app = express();

//2 REQUIRE ROUTES
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishRoutes = require('./routes/wishRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');

//3 APP.USE MIDDLEWARE


app.use(express.json());
app.use(cors());
app.options('*', cors());



//APP.USE ROUTES DECLARATION MIDDLEWARE
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/items',itemRoutes);
app.use('/api/v1/carts',cartRoutes);
app.use('/api/v1/wishes',wishRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/orders', orderRoutes);



app.use(globalErrHandler)
//4 SERVER
module.exports = app;



/*

NODE_ENV=development
PORT=3000
DATABASE=gfgfhg
DATABASE_LOCAL=kasi_market
DATABASE_USER=
DATABASE_PASSWORD=


JWT_SECRET=this-is-my-so-dangerously-encrypted-secret
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=90



STRIPE_SECRETE_KEY=sk_test_51L9xZ0AJ7djmLPom3HMCUAb2jDs16PbegNigaRl92qBstwHDvoLov0iBrdv3ytqgRUSLlZUtpEpGZ38mZDloANh000j8P9OCR3
STRIPE_PUBLIC_KEY=pk_test_51L9xZ0AJ7djmLPomIaBL4GY1UZlQYluus6uo31LE0mCYdkrBtdD9GYXZ1HUURnBaPvIuFrCHkzu8NIR4FAL5z3dy00CsMYLhh9
tt=@Ramndly123
*/