const express = require("express");
const app = express();
const bodyParser = require('body-parser'); 

app.get('/books', (req, res) => res.send('Hello books, API with MySQL!'));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
require('dotenv').config()
require("./config/dbBookConnection")


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const bookRoutes = require("./routes/book.routes")
app.use("/book", bookRoutes)



app.listen(process.env.port, () => console.log(`books API listening on port 3002!`));