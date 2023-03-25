const express = require("express");
const app = express();
const cors = require("cors")
const Users = require("./Routes/User")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
dotenv.config()


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongoose")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json());
app.use(cors());
app.use("/" , Users )

3
app.listen(8081 ,console.log("port listening at 8081"));