const Group = require("../models/Group");
const mongoose = require("mongoose");

//Add Group details
exports.addGroup = async (req, res) => {
    const {studentID1 ,studentID2,studentID3 ,studentID4 ,field ,supervisorName,coSupName,status,topic} = req.body;
    
    try {
       const newGroup = new Group({
        studentID1,
        studentID2,
        studentID3,
        studentID4,
        field,
        supervisorName,
        coSupName,
        status,
        topic   
    })
    
    newGroup.save().then(() => {
        res.json("Group Added")

   }).catch((err) => {
       console.log(err);
   })
   
    }catch (error) {
      res.status(500).json({
        error,
        desc: "Error occurred in AddGroup" + error,
      });
    }
  };




  //update Student Group
exports.updateGroup = async (req,res) => {
    const {studentID1 ,studentID2,studentID3 ,studentID4 ,field ,supervisorName,coSupName,status,topic} = req.body;
    let groupId = req.params.id;
    try{
        const updateGroup = {
            studentID1,
            studentID2,
            studentID3,
            studentID4,
            field,
            supervisorName,
            coSupName,
            status,
            topic
        }

        
        const update = await Group.findByIdAndUpdate(groupId, updateGroup).then(() => {
            res.status(200).send({status: "Group updated"})
     })
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating studet group controller " +error,
        });
    }
};


//delete student Group details
exports.deleteGroup = async(req,res) =>{
    let groupId = req.params.id;
    
    try {
        await Group.findByIdAndDelete(groupId).then(() => {
            res.status(200).send({status: "Group deleted"});
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Student Group controller-" + error,
        });
    }


};




//Get All Student Group
exports.getAllGroups = async (req,res) =>{
    
    try{
        Group.find().then((groups) => {
            res.json(groups)
    
        })
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in get All Group controller - "+error,
        });
    }
};



















//fetch Student Group
exports.getGroup = async (req,res) =>{
    let groupId = req.params.id;
    try{
        const user = await Group.findById(groupId).then((group) => {
            res.status(200).send({status: " Group fetched", group})
        })
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getGroup controller - "+error,
        });
    }
};



