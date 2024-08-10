const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const connectDB = require("./src/database/connection"); 
let cors = require('cors')

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8000;

// log requests
app.use(morgan('tiny'));

app.use(cors()); 

// mongodb connecction
connectDB();

// parse request to body parser 
app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.json()); 

// load routers
app.use('/api/v1/users', require("./src/routes/user.routes")); 
app.use('/api/v1/books', require('./src/routes/book.routes')); 
app.use('/api/v1/emails', require('./src/routes/email.routes')); 
app.use('/api/v1/orders', require('./src/routes/order.routes')); 

app.listen(PORT, () => {
    console.log(`server is running of port ${PORT}`);
})


