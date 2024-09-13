const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evadocSchema = new Schema({

      title: {
            type: String,
            require: true
      },

      groupno: {
            type: String,
            require: true
      },

      total: {
            type: Number,
            require: true
      },
      description: {
            type: String,
            require: true
      }

})

const EvaluateDoc = mongoose.model("EvaluateDoc", evadocSchema);

module.exports = EvaluateDoc;