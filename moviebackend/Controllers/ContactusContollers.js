const Contact = require('../Models/Contactus');

exports.contactUser = async (req,res) => {
    try{

        const {name,subject,email,phone,query} = req.body;

        if(!name){
            return res.status(400).json({status:"error",message:"Name is required!"});
        }

        if(!subject){
            return res.status(400).json({status:"error",message:"Subject is required!"});
        }    
        
        if(!email){
            return res.status(400).json({status:"error",message:"Email is required!"});
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({status:"error" ,message:"Invalid Email Address"});
        }

        if(!phone){
            return res.status(400).json({status:"error",message:"Mobile is required"});
        }

        if(!/^\d{10}$/.test(phone)){
            return res.status(400).json({status:"error" ,message:"Invalid Mobile No"})
        }

        if(!query){
            return res.status(400).json({status:"error",message:"Query is required"});
        }

        const addcontact = new Contact({name,subject,email,phone,query});
        await addcontact.save();

        return res.status(200).json({status:"Success",message:"Your Query Saved Successfully!"});

    }catch(error){
        return res.status(500).json({status:"error",message:err.message});
    }
}

exports.getcontact = async (req,res) => {
    try{

        const getcontactData = await Contact.find({});
        
        return res.status(200).json({status:"success",getcontactdata:getcontactData})

    }catch(error){
        return res.status(500).json({status:"error",message:error.message});
    }
}