const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({

groupno : {
        type : String,
        require: true
  },
 topic : {
            type : String,
            require: true
      },   
  staus : {
        type : String,
        require: true
  }, 

  feedback : {
    type : String,
    require: true
}

})

const EvaluateTopic = mongoose.model("EvaluateTopic", topicSchema);

module.exports = EvaluateTopic;