const express = require("express")
const users = require("../controllers/users.js")
const Route= express.Router();

Route.get("/",users.getUsers)
Route.get("/getRole",users.getRole)
Route.get("/getuser",users.finduser)
Route.post("/signin",users.signin)
Route.post("/signup",users.signup)
Route.delete("/delete",users.deleteItem)

module.exports=Route;