const router = require("express").Router();
let EvaluateTopic = require("../models/Topics");



//Add feedback for topics
router.route("/add").post((req,res) => {
    const groupno = req.body.groupno;
    const topic = req.body.topic;
    const staus = req.body.staus;
    const feedback = req.body.feedback;

    if(!groupno || !topic || !staus || !feedback){
        return res.status(422).json({error:"please add all the feilds"})

    }
     

    EvaluateTopic.findOne({groupno: groupno})
    .then((savedEvaTopic) => {
        if(savedEvaTopic) {
            return res.status(422).json({error:"Group already exists with that no"})
        }

    const newEvaTopic = new EvaluateTopic({
        groupno,
        topic,
        staus,
        feedback
       
    })

    newEvaTopic.save().then(() => {
         res.json("Result Added")

    }).catch((err) => {
        console.log(err);
    })
  
}).catch((err) =>{
    console.log(err);
})
})



router.route("/").get((req,res) => {
     
    EvaluateTopic.find().then((Evatopics) => {
        res.json(Evatopics)

    }).catch((err) => {
        console.log(err)
    })


})


//update  using topic ID
router.route("/update/:id").put(async (req, res) => {
      let topicID = req.params.id;
      const {groupno,topic, staus,feedback} = req.body;

      const updateTopic = {
        groupno,
        topic,
        staus,
        feedback
      }


      const update = await EvaluateTopic.findByIdAndUpdate(topicID, updateTopic).then(() => {
        res.status(200).send({status: "Result updated"})
      }).catch((err) => {
          console.log(err);
          res.status(500).send({status: "Error with updating data", error: err.message});
      })   
})



//Delete  
router.route("/delete/:id").delete(async (req, res) => {
      let topicID = req.params.id;
      
      await EvaluateTopic.findByIdAndDelete(topicID).then(() => {
          res.status(200).send({status: " deleted"});
      }).catch ((err) => {
          console.log(err.message);
          res.status(500).send({status: " Error with delete ", error: err.message});
      })
    })


router.route("/get/:id").get(async(req, res) => {

    let topicID = req.params.id;
    const topic = await EvaluateTopic.findById(topicID).then((topic) => {
        res.status(200).send({status: "  fetched", topic})
    }).catch(() => {
         console.log(err.message);
         res.status(500).send({status:"Error with get " , error: err.message})
    })
})



module.exports = router;
