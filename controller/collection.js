const express = require("express")
const modelcontroller = require("../model/collection")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



// Insert Data
module.exports = {
  Datainsert: function (req, response, next) {
console.log(req.body)
    modelcontroller.create(
      {
        username: req.body.username,
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        email: req.body.email,
        password: req.body.password
        // image:req.file.pathname
      },
      function (err, res) {
        if (err) next(err);
        else {
          // console.log("data is inserted")
          response.send({
            msg: "Data is inserted"
          })
        }
      }
    );
  },

  // UpdateData
  // 1st method
  Dataupdate: function (req, response, next) {
    console.log(req.body.id)
    modelcontroller.updateOne(
      { _id: req.body.id }, 
      { $set: 
        { username: req.body.username, 
          Fname: req.body.Fname, 
          Lname: req.body.Lname, 
          email: req.body.email, 
          password: req.body.password 
        } },
      function (err, res) {
        if (err) { console.log(err) }
        else {
          response.json({
            msg: "Data is Updated"
          })  
        }
      }
    )


    // 2nd method
    // modelcontroller.findByIdAndUpdate
    // (
    //     req.body._id,
    //     {        
    //         Fname:req.body.Fname,
    //         Lname:req.body.Lname,
    //         email:req.body.email,
    //     },
    //     {new: true}, 
    //     function(err,res){
    //       if(err) {console.log(err)}
    //       else
    //       {
    //         console.log("data updated");
    //       }
    //     })


  },


  // DeleteData
  Datadelete: function (req, response, next) {
    console.log(req.body.id)
    modelcontroller.deleteOne({ _id: req.body._id }, { $delete: { username: req.body.username, Fname: req.body.Fname, Lname: req.body.Lname, email: req.body.email, password: req.body.password } },
      function (err, res) {
        if (err) { console.log(err) }
        else {
          response.json({
            msg: "Data is deleted"
          })
        }
      }
    )
  },

  // login data
  logindata: async function ( req, response, next) {
    // response.send(req.body)
    if (req.body.username && req.body.password) {
      let user = await modelcontroller.findOne((req.body));
      console.log(user)
      if (user) {
        jwt.sign({ user }, 'asdfghjkqwertyuiopzxcvbnm', { expiresIn: "2h" }, (err, token) => {
          if (err) {
            response.send("somthing went wrong")
          }
          else {
            response.send(token)
            // response.send(req.body)
            // console.log(req.body)
            // response.send({ founduser, auth: token })
          }
        })
        
      }else{
        response.send({ result: "no user found" })

      }
    }
    else
    {
      response.send("not user found");
    }
      
  },


  imageupload: function (req,res){
    console.log(req.file)
    res.send({
      "msg":"image uploaded"
    })
  

  }

}


