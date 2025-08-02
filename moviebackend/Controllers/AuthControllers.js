const Register = require('../Models/Register');
const Login = require('../Models/Login');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
    const adminExists = await Register.findOne({email : "admin@gmail.com"});
    
    if(!adminExists){
        const hashedpassword = await bcrypt.hash("admin", 10);
        const newAdmin = new Register({
            name : "Admin",
            gender : "Male",
            email : "admin@gmail.com",
            mobile : "1111111111",
            createPassword : hashedpassword,
            confirmPassword : hashedpassword,
            role : "Admin"
        });
        await newAdmin.save();
        await new Login({email:"admin@gmail.com",password:hashedpassword}).save();
        console.log("Admin Created!");
    }
}
createAdmin();

exports.RegisterUser = async (req,res) => {
    try{
        const {name,gender,email,mobile,createPassword,confirmPassword} = req.body;

        if(!name){
            return res.status(400).json({status:"error",message:"Name is required"});
        }

        if(!gender){
            return res.status(400).json({status:"error",message:"Gender is required"});
        }

        if(!email){
            return res.status(400).json({status:"error",message:"Email is required"});
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({status:"error" ,message:"Invalid Email Address"});
        }

        if(!mobile){
            return res.status(400).json({status:"error",message:"Mobile is required"});
        }

        if(!/^\d{10}$/.test(mobile)){
            return res.status(400).json({status:"error" ,message:"Invalid Mobile No"})
        }

        if(!createPassword){
            return res.status(400).json({status:"error",message:"Create Password is required"});
        }

        if(!confirmPassword){
            return res.status(400).json({status:"error",message:"Confirm Password is required"});
        }

        if(createPassword != confirmPassword){
            return res.status(400).json({status:"error",message:"Create Password and Confirm Password doesnt match"});
        }

        const emailExists = await Register.findOne({email});
        if(emailExists){
            return res.status(400).json({status:"error",message:"Email Already Exists"});
        }

        const hashedpassword = await bcrypt.hash(createPassword,10);

        const addUser = new Register({name,gender,email,mobile,createPassword:hashedpassword,confirmPassword:hashedpassword});
        await addUser.save();
        await new Login({email,password:hashedpassword}).save();

        req.session.user = {name,email,mobile,role:"user"};

        return res.status(200).json({status:"success",message:"Registration Successfull!"});


    }catch(error){
        return res.status(500).json({status:"error",message:error.message});
    }
}

exports.getRegisterUser = async (req,res) => {
    try{

        const getData = await Register.find({},{ createPassword: 0, confirmPassword: 0 });

        return res.status(200).json({status:"Success",RegisterData:getData});
        
    }catch(error){
        return res.status(500).json({status:"error",message:error.message});
    }
}

exports.LoginUser = async (req,res) => {
    try{

        const {email,password} = req.body;

        if(!email){
            return res.status(400).json({status:"error",message:"Email is required"});
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({status:"error" ,message:"Invalid Email Address"});
        }

        if(!password){
            return res.status(400).json({status:"error",message:"Password is required"});
        }

        const userExists = await Login.findOne({email});
        if(!userExists){
            return res.status(400).json({status:"error",message:"Invalid Email"});
        }

        const ispasswordvalid = await bcrypt.compare(password, userExists.password);
        if(!ispasswordvalid){
            return res.status(400).json({status:"error",message:"Invalid Password"});
        }

        const registered = await Register.findOne({email});

        req.session.user = {
            name : registered.name,
            email : registered.email,
            mobile : registered.mobile,
            role : registered.role
        }

        return res.status(200).json({status:"success",message:"Login Successfull!",name:registered.name,mobile:registered.mobile,role:registered.role});  

    }catch(error){
        return res.status(500).json({status:"error",message:error.message});

    }
}

//destroy
exports.LogoutUser = async (req,res) => {
    req.session.destroy ((err) => {
            if(err){
                return res.status(500).json({status : "error",message : "Erro While logging out!"})
            }else{
                return res.status(200).json({status : "success",message : "Logout successfull!"})
            }
    })
}

exports.LogoutAdmin = async (req,res) => {
   req.session.destroy((err) => {
    if(err){
        return res.status(500).json({status:"error",message:"Error while logging out!"});
    }else{
        return res.status(200).json({status:"error",message:"Admin Logout Successfull!"});
    }
   })
}