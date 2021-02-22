const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//username-> emp_sai01, Password -> YZMKHuqyxpED4X6s, Generated under the section 'Database access' in mongoDB atlas website
const mongoUrl = 'mongodb+srv://emp_sai01:YZMKHuqyxpED4X6s@cluster0-qfjxv.mongodb.net/<dbname>?retryWrites=true&w=majority'
app.get('/', (req, res) =>{
    res.send('Welcome to Node.js')
})

app.listen(3000, ()=> console.log('Server started at 3000'))
