const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    Fname:{
        type:String,
        required:true
    },    
    Lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    // image:{
    //     type:String,
    //     required:true
    // }
});

module.exports = mongoose.model("collectionone", mongooseSchema);




