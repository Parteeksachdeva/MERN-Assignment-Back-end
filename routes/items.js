const express = require("express")
const items = require("../controllers/items.js")
const Route= express.Router();
const middleware= require("../Middleware/user")

Route.get("/",items.getItems)
Route.post("/",middleware.Authentication,items.addItems)
Route.delete("/delete",items.deleteItem)

module.exports=Route;

