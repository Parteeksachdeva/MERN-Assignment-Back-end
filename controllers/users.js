const User = require("../Scema/UsersScema");
const jwt=require("jsonwebtoken"); 
const SECRET_KEY=process.env.SECRET_KEY;
const bcrypt = require('bcrypt');


module.exports.signin = async (req,res) => {
        const {email,password} = req.body;
        const user=await User.find({email: email,})
        if(user.length===0) return res.status(400).json({"error": "Invalid credentials"})
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(err) res.status(400).json({"error": "Invalid credentials"})
            if(result){
           
                const token=jwt.sign(email,SECRET_KEY)
                res.status(201).json({token:token})
            }
            else{
                res.status(400).json({"error": "Invalid credentials"})
            }
        });
        
}
module.exports.signup = async (req,res) => {
    const {firstname,lastname,email,password,repassword,birthday} = req.body;
    bcrypt.hash(password, 10, async(err, hash) =>{
        if(err) {console.log(err); return res.status(400).json({error:"Internal Error"})}

        try{
            const AlreadyUser=await User.find({email: email,})
            console.log(AlreadyUser.length)
            if(AlreadyUser.length!==0){
                res.status(200).json({message:"User Already Exists"})
            }
            else{
                const user=await new User({
                    firstname,
                    lastname,
                    email,
                    password:hash,
                    birthday,
                    admin:false
                })
                await user.save();
                res.status(200).json({success:true})
            }
           
        }
        catch{
            res.status(400).json({error:"Internal Error"})
        }  
    });
    
}
module.exports.getUsers= async(req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);

    }
    catch{
        res.status(400);
    }
}
module.exports.finduser = async(req,res)=>{
    const authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err) return res.sendStatus(403);
        res.status(200).json(user)
    })
}
module.exports.getRole= async (req,res)=>{
    const authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify (token,SECRET_KEY,async(err,user)=>{
        if(err) return res.sendStatus(403);
        const Userdetail=await User.find({email:user})
        if(Userdetail[0].admin==undefined)
        res.status(200).json({admin:false})
        else res.status(200).json({admin:Userdetail[0].admin})
    })
}
module.exports.deleteItem= async(req,res)=>{
    const id = req.headers.id;
    try{
        await User.deleteOne( {"_id": id});
        res.status(200).json({"success": "true"})
    }
    catch{
        res.status(400).json({"success": "false"})
    }
}