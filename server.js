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
app.use('/', require("./src/routes/router")); 
app.use('/', require('./src/routes/bookRouter')); 
app.use('/', require('./src/routes/emailRouter')); 
app.use('/', require('./src/routes/ordersRoute')); 

app.listen(PORT, () => {
    console.log(`server is running of port ${PORT}`);
})


