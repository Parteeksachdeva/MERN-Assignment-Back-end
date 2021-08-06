const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const mongoose = require("mongoose");
require('dotenv').config()

const Routeusers = require("./routes/users");
const Routeitems = require("./routes/items");



app.use("/users",Routeusers)
app.use("/items",Routeitems)
 
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{console.log("CONNECTED TO DATABASE")})
.catch(err=>console.log(err))

const PORT= process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})