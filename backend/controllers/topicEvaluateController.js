const SendFeedbak = require("../models/EvaluationTopics");

//add new evaluation for documents
exports.addTopicEvaluation= async (req, res) => {
 
  //constant variables for the attributes
  const {groupno,topic, status,feedback,supervisor} = req.body;
 
  if (!topic || !groupno || !status || !feedback || !supervisor) {
    return res.status(422).json({ error: "please add all the feilds" })

}

SendFeedbak.findOne({groupno: groupno})
    .then((savedTopic) => {
        if(savedTopic) {
            return res.status(422).json({error:"Group already exists with that no"})
        }

    const newFeedback = new SendFeedbak({
        groupno,
        topic,
        supervisor,
        status,
        feedback,
       
    })

    newFeedback.save().then(() => {
         res.json("Result Added")

    }).catch((err) => {
        console.log(err);
    })
  
}).catch((err) =>{
    console.log(err);
})
}


//delete existing one
exports.deleteTopicEvaluation = async (req, res) => {
  let topicID = req.params.id;
 
  await SendFeedbak.findByIdAndDelete(topicID).then(() => {
    res.status(200).json({ status: "Feedback Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  })
}
 
//update 
exports.updateEvaTopic= async (req, res) => { 
  //fetch id from url
  let topicID = req.params.id;
  const {groupno,topic, staus,supervisor,feedback} = req.body;

  const updateTopic = {
    groupno,
    topic,
    supervisor,
    staus,
    feedback
  }


  const update = await SendFeedbak.findByIdAndUpdate(topicID, updateTopic).then(() => {
    res.status(200).send({status: "Result updated"})
  }).catch((err) => {
      console.log(err);
      res.status(500).send({status: "Error with updating data", error: err.message});
  })   
}

//view 
exports.viewFeedbacks= async (req, res) => { 
 
  //calling Service model
  SendFeedbak.find().then((feedbackTopics) => {
    res.json(feedbackTopics)

}).catch((err) => {
    console.log(err)
})

}
//view one
exports.viewOneEvaTopic = async (req, res) => {
  
  let topicID = req.params.id;
  const topic = await SendFeedbak.findById(topicID).then((topic) => {
      res.status(200).send({status: "  fetched", topic})
  }).catch(() => {
       console.log(err.message);
       res.status(500).send({status:"Error with get " , error: err.message})
  })
}