const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();


// log requests
app.use(morgan('tiny'));

app.use(cors());

// parse request to body parser 
app.use(bodyparser.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(express.json());

// load routers
app.use('/api/v1/users', require("./routes/user.routes"));
app.use('/api/v1/books', require('./routes/book.routes'));
app.use('/api/v1/emails', require('./routes/email.routes'));
app.use('/api/v1/orders', require('./routes/order.routes'));


module.exports = app;