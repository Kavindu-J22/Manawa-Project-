const Staff = require("../models/Staff");

const mongoose = require("mongoose");


//fetch staff profile
exports.getStaffProfile = async (req,res) =>{
    try{
        if(!req.user) {
            res.status(422).json({
                success:false,
                desc:"Can not find the user - please check again",

            });
        }else {
            res.status(200).send({
                staff:req.user,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getstaffProfile controller - "+error,
        });
    }
};

//update staff profile
exports.updateStaffProfile = async (req,res) => {
    const {name,email,contactNumber,password} = req.body;

    try{
        const newData = {
            name,
            email,
            contactNumber,
            password
        };

        const updatedstaff = await Staff.findByIdAndUpdate(
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
            desc: "staff update successfully",
            updatedstaff,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating staff profile controller " +error,
        });
    }
};

//delete staff profile
exports.deleteStaffProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No student with id: ${req.user._id}`);

    try {
        await Student.findByIdAndRemove(req.user._id);
        const deletedStudent = await DeletedStaffModel.create({
            staffID:req.user._id
        });
       
        res.status(200).send({
            success: true,
            desc: "Staff deleted successfully",
            deletedStaff,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Staff Profile controller-" + error,
        });
    }


};


exports.allProfiles =  (req,res) =>{
    
    Staff.find().then((Staff) => {
        res.json(Staff)

    }).catch((err) => {
        console.log(err)
    })
    
};