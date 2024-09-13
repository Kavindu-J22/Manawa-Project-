const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evapreSchema = new Schema({

title : {
            type : String,
            require: true
      },
  groupno : {
        type : String,
        require: true
  },

   task1 :{
         type: Number,
         require: true
   },
   
   task2 : {
    type: Number,
    require: true
},

   total: {
    type: Number,
    require: true
   }

})

const EvaluatePre = mongoose.model("EvaluatePre", evapreSchema);

module.exports = EvaluatePre;