const Admin = require("../models/Admin");

exports.updateAdminProfile = async (req,res) => {
  const {email,phoneno,password} = req.body;

  try{
      const newData = {
          
          email,
          phoneno,
          password
      };

      const updatedAdmin = await Admin.findByIdAndUpdate(
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
          desc: "admin update successfully",
          updatedAdmin,
      });
  }catch(error){
      res.status(500).json({
          success:false,
          desc:"Error in updating admin profile controller " +error,
      });
  }
};

//delete admin profile
exports.deleteAdminProfile = async(req,res) =>{

  if (!mongoose.Types.ObjectId.isValid(req.user._id))
      return res.status(404).send(`No Admin with id: ${req.user._id}`);

  try {
      await Student.findByIdAndRemove(req.user._id);
      const deletedStudent = await DeletedAdminModel.create({
          email:req.user._id
      });
     
      res.status(200).send({
          success: true,
          desc: "admin deleted successfully",
          deletedAdmin,

      });
  } catch (error) {
      res.status(500).json({
          success: false,
          desc: "Error in delete Student Profile controller-" + error,
      });
  }


};


exports.home =  (req,res) =>{
  
          res.status(200).json({
             success:true,
          data:"access granted "
      })
          
};