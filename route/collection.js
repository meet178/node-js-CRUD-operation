const express = require("express");
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const multer = require("multer")


const controllerData = require("../controller/collection")

const router = express.Router()

function validateinsert(req,res,next){
    console.log(req.body)
    const insertSchema = Joi.object({
        username:Joi.required("username is wrong"),
        Fname:Joi.required("Fname is wrong"),
        Lname:Joi.required("Lname is wrong"),
        email:Joi.required("email is wrong"),
        password:Joi.required("password is wrong"), 
    })
    let error=insertSchema.validate(req.body)
    console.log(error);
    if(error?.error)   
    {
        res.json({
            error:error.error.details
        })
    }
    else
    // console.log("inset ok");
    {
    next()
    }
}


function validateUpdate(req,res,next){
const UpdateSchema = Joi.object({
    id:Joi.required("pls enter id"),
    username:Joi.required("pls enter valid username for update"),
    Fname:Joi.required("pls enter valid Fname for update"),
    Lname:Joi.required("pls enter valid Lname for update"),
    email:Joi.required("pls enter valid email for update"),
    password:Joi.required("pls enter valid password for update") 

})
let error = UpdateSchema.validate(req.body)
console.log(error)
if(error.error)
    res.json({
        error:error
    })
    else
    {
        next()
    }
}

function middleware(req,res,next){
    console.log(  req.app.get("secretKey"))
    jwt.verify(
        req.headers["x-access-token"],
        "asdfghjkqwertyuiopzxcvbnm",
        function (err,decoded)
        {
            console.log(err)
            if(err)
            {
                res.json({ status: "error", message: err.message, data: null }); 
            }
            else
            {x
                req._Id = decoded.id;
                next();
            }
        }
    )
}

// var fileStorage = multer.diskStorage({ 
//     destination : function(req,file,cb){
//         cb(null , './upload');
//     },
//     filename: function (req, file, cb) { 
//         cb(null , file.originalname);   
//      }
// })

// var upload = multer({storage:fileStorage})

router.post("/insertData",validateinsert,controllerData.Datainsert)
router.put("/Updatedata",middleware,validateUpdate,controllerData.Dataupdate)
router.delete("/Deletedata",middleware,controllerData.Datadelete)
router.post("/Logindata",controllerData.logindata)
router.post("/imgupload",middleware,upload.single("image"),controllerData.imageupload)
// router.post("/user/generateToken",controllerData.genretetoken)
// router.get("/user/validateToken",controllerData.validatetoken)

module.exports=router


