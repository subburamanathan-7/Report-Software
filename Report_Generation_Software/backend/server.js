const express = require ('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const port = process.env.PORT || 5000

const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/dbconfig');

const cors = require('cors')

connectDB()
const app = express();

app.use(express.json()) //Body Parser
app.use(express.urlencoded({extended:false})) //urlEncoded
app.use(cors({
    origin:"*"
})) //Cross-Orgin Access

app.use('/api/student',require('./routes/studentRoutes'));

app.use(errorHandler);//Overides default ErrorHandler
app.listen(port,()=> console.log(`App up and running on ${port}`))