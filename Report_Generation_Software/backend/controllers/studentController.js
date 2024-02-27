const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel')

const generateToken = require('../config/generateToken');

//  @desc loginStudent
// @route POST/api/student/register
// @Public{}
const register = asyncHandler(async(req,res)=>{
    
    const {name, regNo,password, gd_total, aptitude_total,dept} = req.body;
    
    const studentExists = await Student.findOne({regNo})
    if(studentExists){
        res.status(400)
        throw new Error('Exisitng User')
    }

    const newStudent = await Student.create({
        name,
        regNo,
        password,
        dept,
        gd_total,
        aptitude_total
    })
    
    if(newStudent){
        res.status(201).json({
            _id:newStudent.id,
            name:newStudent.name,
            regNo:newStudent.regNo,
            dept:newStudent.role,
            gd_total:newStudent.gd_total,
            aptitude_total:newStudent.aptitude_total,
            token:generateToken(newStudent._id)
        })
    }
    else{
        res.status(404)
        throw new Error('student creation failed')
    }
})

//  @desc loginStudent
// @route POST/api/student/login
// @Public{}
const login = asyncHandler(async(req,res)=>{
    const {regNo, password} = req.body;
    // console.log(formData)

    const currentStudent = await Student.findOne({$and:[{regNo:regNo},{password:password}]});

    if(!currentStudent){
        res.status(404)
        throw new Error('student not found')
    }
    res.status(200).json({

        name:currentStudent.name,
        regNo:currentStudent.regNo,
        dept:currentStudent.dept,
        token:generateToken(currentStudent._id),
    });
})

// @desc getStudentDetails
// @route GET/api/student/get
// @Private{Student}
const getStudentDetails = asyncHandler(async(req,res)=>{
  
    const score = await Student.find({regNo:req.user.regNo},{
        name:1,
        regNo:1,
        dept:1,
        gd_scores:1,
        gd_total:1,
        aptitude_scores:1,
        aptitude_total:1
    });
    if(!score){
        res.status(404)
        throw new Error('invalid student details')
    }

    res.status(200).json(score)
})

module.exports ={
    register,
    login,
    getStudentDetails
}