const express = require("express");
const router = require("./route/collection");
const mongoose = require("./config/database");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// const multer = require("multer")
const app=express();

dotenv.config();
app.use(bodyparser.json())
app.set("secretKey", "asdfghjkqwertyuiopzxcvbnm");

mongoose.connection.on(
    "error",
    console.error.bind(console,"MongoDB connection error:")
)


app.use("/dataenter",router)

app.listen(9696,(req,res)=>{
    console.log(`the port is 9696`);
})
