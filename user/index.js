const express =require("express");
const path=require("path")
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app =express();

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
require('dotenv').config()
require("./config/dbUserConnection")


//app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('redis', io)
//app.use(bodyParser.json());


app.get('/user', (req, res) => res.send('Hello user, API with mongo!'));

const userRoutes = require("./routes/user.routes")

app.use("/user", userRoutes)

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));