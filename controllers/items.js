const items = require("../Scema/itemScema");
const jwt=require("jsonwebtoken"); 
module.exports.getItems = async(req,res)=>{
    const authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let email;
    if(token==null) return res.sendStatus(401);
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return res.sendStatus(403);
        email=user
    })
    try{
        const it = await items.find({email:email});
        res.json(it)
        res.status(200)
    }
    catch{
        res.status(400).json({error:"Internal Error"})
    }
}  
module.exports.addItems = async(req,res)=>{
    const {message,email} = req.body;
    try{
        const it= await new items({
            message,
            email
        })
        await it.save();
        res.status(200).json({message:"Sucessfully Uplouded"})
    }
    catch{
        res.status(400).json({error:"Internal Error"})
    }
} 
module.exports.deleteItem= async(req,res)=>{
    const id = req.headers.id;
    try{
        await items.deleteOne( {"_id": id});
        res.status(200).json({"success": "true"})
    }
    catch{
        res.status(400).json({"success": "false"})
    }
}