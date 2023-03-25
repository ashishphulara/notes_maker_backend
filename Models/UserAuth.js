const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email : {type : "String" , required : true , unique : true},
    password : {type : "String" , required : true },
    confirmPassword : {type : "string" , required : true}
},{timestamps:true})


mongoose.exports = mongoose.model("users" , UserSchema)