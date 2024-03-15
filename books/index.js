const express = require("express");
const app = express();
const bodyParser = require('body-parser'); 
const cors = require("cors");

app.get('/books', (req, res) => res.send('Hello books, API with mongo!'));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
require('dotenv').config()
require("./config/dbBookConnection")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());


const bookRoutes = require("./routes/book.routes")
app.use("/book", bookRoutes)



app.listen(process.env.port, () => console.log(`books API listening on port 3002!`));