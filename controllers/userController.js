const Users = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//! Register logic
const createUser = async (req,res) => {
    //step 1: Check if data is coming or not
    console.log(req.body);

    //Step 2: Destructure the data
    const {firstName, lastName, email, password } = req.body;
    

    //Step 3: validate the incoming data
    if(!firstName || !lastName || !email || !password){
        return res.json({
            success: false,
            message: "Please enter all fields"
        })
    }

    //Step 4: try catch block
    try{
        //step 5 : Check existing user
        const existingUser = await Users.findOne({email : email})
        if(existingUser){
            return res.json({
                success: false,
                message: "User already exist"
            })
        }

        //password encryption
        const randomSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, randomSalt)

        //step 6 : create new user
        const newUser = new Users({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : encryptedPassword,

        })

        await newUser.save();
        res.json({
            success: true,
            message: "User created successfully"
        })

    }catch{
        res.status(500).json("Server Error")
    }

}


//! login logic
const loginUser =async (req,res) => {
    //for checking the postman
    // res.send("Welcome to LOGIN USER API.")

    // step 1: Check incoming data
    console.log(req.body)

    //destructring
    const {email, password} =req.body;

    //validation
    if(!email || !password){
        return res.json({
            success: false,
            message: "Please enter all fields"
        })
    }

    //try catch block
    try{
        //finding user
        const user = await Users.findOne({email: email})
        if(!user){
            return res.json({
                success: false,
                message: "User does not exits"
            })
        }

        //user exists: {FirstName, LastName, Email, Password} user.FirstName, user.LastName, user.password
         //comparing password

         const databasePassword = user.password
         const isMatch = await bcrypt.compare(password, databasePassword)
         if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid Credentails."
            })
        }

        //create token

        const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET)

        //response
        res.status(200).json({

            success: true,
            message: "User logged in successfullly",
            token: token,
            userData: user
        }
        )



    }catch{
        res.json({
            success: false,
            message: "Server Error",
            error: error
        })
    }

}

module.exports = {
    createUser,loginUser
}
