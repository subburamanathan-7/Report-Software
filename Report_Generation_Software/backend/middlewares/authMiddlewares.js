const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')

const authenticateStudent = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            token = token.substring(1,token.length-1)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded.id)
            req.user = await Student.findById(decoded.id).select('-password')
            next()
        }
        catch(e){
            res.status(401)
            throw new Error('student not authorized')
        }
    }
    if(!token){
        res.status(402)
        throw new Error('Token Not Found')
    }
})
module.exports = {authenticateStudent};