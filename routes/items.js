const express = require("express")
const items = require("../controllers/items.js")
const Route= express.Router();

Route.get("/",items.getItems)
Route.post("/",items.addItems)
Route.delete("/delete",items.deleteItem)

module.exports=Route;

