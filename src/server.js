const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('../src/database/connection');

dotenv.config({
    path: "config.env"
});
const PORT = process.env.PORT || 8000;

// mongodb connecction
connectDB();

app.listen(PORT, () => {
    console.log(`server is running of port ${PORT}`);
})