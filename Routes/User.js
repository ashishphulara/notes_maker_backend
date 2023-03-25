
const router = require("express").Router()

const User= require("../Models/UserAuth");
const CryptoJS = require("crypto-js")



router.post("/register" , async (req, res )=>{

    const newUser = new User({
       
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      });

    try {
        const data = await User.findOne({ email: req.body.email });
        if (data !== null) {
          res.status(409).json({
            status: "failure",
            message: "User already exists",
          });
        } else {
          const savedUser = await newUser.save();
          res.status(201).json({
            status: "success",
            message: "User created",
            savedUser,
          });
          console.log(savedUser);
        }
      } catch (err) {
        res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }
    });


router.post("/loginuser", async (req, res) => {
  try {
    const { contact, password } = req.body;
    const user = await User.findOne({ contact: contact });
    if (user == null) {
      res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (originalPassword == password) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC);
        res.status(200).json({
          status: "success",
          message: "Login successful",
          token: token,
          user: user,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Invalid password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
});

module.exports = router;