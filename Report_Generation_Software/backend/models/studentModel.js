const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

    name:{
        type:String,
    },
    regNo:{
        type:String,
        required:['enter the register number']
    },
    password:{
        type:String,
        required:['enter the password']
    },
    dept:{
        type:String, 
        enum:['ADS','AUT','BIO','CHM','CIV','CSE','EEE','ECE','INT','MEC',]
    },
    gd_scores: {
        subject:{
            type:Number,
        },
        communication:{
            type:Number,
        },
        body_language:{
            type:Number,
        },
        active:{
            type:Number,
        },
        listening:{
            type:Number,
        },
    },
    gd_total:{
        type:Number
    },   
    aptitude_scores: {
        core:{
            type:Number,
        },
        verbal:{
            type:Number,
        },
        quants:{
            type:Number,
        },
        coding:{
            type:Number,
        },
    },
    aptitude_total:{
        type:Number
    }, 
})

module.exports = mongoose.model('student',studentSchema)
