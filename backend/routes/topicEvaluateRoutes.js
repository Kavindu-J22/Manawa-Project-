const router = require("express").Router();

const {addTopicEvaluation,deleteTopicEvaluation,updateEvaTopic,viewFeedbacks,viewOneEvaTopic} = require ('../controllers/topicEvaluateController')

//add new topics evaluation
router.post("/add", addTopicEvaluation);

//delete existing one
router.delete("/delete/:id", deleteTopicEvaluation);

//update existing evaluation
router.put("/update/:id", updateEvaTopic);

//view all topics evaluations
router.get("/", viewFeedbacks);

//view one evaluation
router.get("/get/:id", viewOneEvaTopic);

module.exports = router;
