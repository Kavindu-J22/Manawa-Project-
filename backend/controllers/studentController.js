const Student = require("../models/Student");

const mongoose = require("mongoose");

//fetch student profile
exports.getStudentProfile = async (req,res) =>{
    try{
        if(!req.user) {
            res.status(422).json({
                success:false,
                desc:"Can not find the user - please check again",

            });
        }else {
            res.status(200).send({
                student:req.user,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getStudentProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateStudentProfile = async (req,res) => {
    const {name,email,contactNumber,password} = req.body;

    try{
        const newData = {
            name,
            email,
            contactNumber,
            password
        };

        const updatedstudent = await Student.findByIdAndUpdate(
            req.user.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "student update successfully",
            updatedstudent,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating student profile controller " +error,
        });
    }
};

//delete student profile
exports.deleteStudentProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No student with id: ${req.user._id}`);

    try {
        await Student.findByIdAndRemove(req.user._id);
        const deletedStudent = await DeletedStudentModel.create({
            studentID:req.user._id
        });
       
        res.status(200).send({
            success: true,
            desc: "Student deleted successfully",
            deletedStudent,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Student Profile controller-" + error,
        });
    }


};


exports.allProfiles =  (req,res) =>{
    
    Student.find().then((Students) => {
        res.json(Students)

    }).catch((err) => {
        console.log(err)
    })
    
};