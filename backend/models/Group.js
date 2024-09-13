const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({



    studentID1 : {
        type : String,
        unique: true,
        require: true
       },



    studentID2 : {
            type : String,
            unique: true,
            require: true
           },
    
        

    studentID3 : {
            type : String,
            unique: true,
            require: true
               },
        
           

          
    studentID4 : {
            type : String,
            unique: true,
            require: true
                },
            
                
    field: {

        type: String,
        require: true
    },        

   
   
    supervisorName :{
                type: String,
                require: true
            },
            
                        
    
    coSupName :{
                type: String,
                
               },
        
           
    topic : {
            type:String,
            require: true
        }  ,
        status : {
            type:String,
           
        }        
 
})

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;