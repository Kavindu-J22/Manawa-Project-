const mongoose = require('mongoose');
const studentUploadSchema = new mongoose.Schema({

     groupId:{
         type:String,
         require: true
     },

     avatar:{
         type:String
     },

     cloudinary_id: {
         type: String
     },


});

module.exports = mongoose.model('StudentUpload', studentUploadSchema);