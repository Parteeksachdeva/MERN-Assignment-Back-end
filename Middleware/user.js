const jwt=require("jsonwebtoken"); 

module.exports.Authentication= (req,res,next)=>{
    const authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token==null) return res.sendStatus(401);

    jwt.verify(token,"BGe595zOWmNR5VprikrF16J8t6U7tfdU",(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next()
    })
}