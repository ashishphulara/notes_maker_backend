
const router = require("express").Router()
const bodyParser = require("body-parser")
const Users= require("../Models/UserAuth");

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.post("/register" , async (req, res )=>{

    const {email , password , confirmPassword} = req.body
       Users.findone({email: email },(Users , err)=>{                        
        if(Users){
            res.send({message :"user already registered"})
        }else{
            const user = new Users({
                email ,
                password,
                confirmPassword
                                                                                              
            }).user.save(err =>{
                if(err){
                    res.send (err)
                }else{
                    res.send({message : "success"})
                }
            })
        }
       })
     
       
       if(!(email && password && confirmPassword)){
           res.status(404).json({message : "all the fields are compulsory"})
       }
})


router.post("/login", async(req,res)=>{
    const {email , password } = req.body;
    Users.findone({email : email , password : password}).then(())
})
module.exports = router;