const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackTopicSchema = new Schema({

groupno : {
        type : String,
        require: true
  },
 topic : {
            type : String,
            require: true
      },   
      supervisor : {
            type : String,
            require: true
      }, 
  status : {
        type : String,
        require: true
  }, 
  feedback : {
    type : String,
    require: true
}, 
  
})

const sendFeedback = mongoose.model("SendFeedback", feedbackTopicSchema);

module.exports = sendFeedback;