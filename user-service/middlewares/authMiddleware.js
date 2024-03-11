import jwt from "jsonwebtoken";
import model from '../models/index.js'
const Users=model.user;


export const auth=async(req, res, next) =>{
  var token
  const secret=process.env.JWT_SECRET_KEY
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
      token=req.headers.authorization.split(" ")[1]
      const decoded=jwt.verify(token,secret)
      console.log(token)
      console.log(decoded)
      const isUser= await Users.findById(decoded.userId)
      console.log(isUser)
      if(!isUser) throw new Error('No User Found')
      // const id:string=decoded.id
      // Logger.info(decoded.id)
      req.user=decoded.userId
      console.log(req.user)
      next()
      
    } catch (error) {
      console.log(error.message)
      res.status(403).json({message:error.message})
    }
  }
  if (!token) {
    res.status(403).json({message:"No token"});
  }
  
}