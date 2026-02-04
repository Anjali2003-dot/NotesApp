const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
    userID : 
    { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true
    },
    title : 
    { 
        type : String , 
        required : true
    },
    content : 
    { 
        type : String , 
        default : ""
    },
    color : 
    { 
        type : String ,
        default : "#ffffff"
    }
}, {timestamps : true});

module.exports = mongoose.model("Note", noteSchema);