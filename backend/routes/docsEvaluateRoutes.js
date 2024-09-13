const router = require("express").Router();

const {addEvadoc,deleteEvaDoc,updateEvaDoc,viewEvaDocs,viewOneEvaDoc} = require ('../controllers/docsevaluateController')

//add new docs evaluation
router.post("/add", addEvadoc);

//delete existing one
router.delete("/delete/:id", deleteEvaDoc);

//update existing evaluation
router.put("/update/:id", updateEvaDoc);

//view all docs evaluations
router.get("/", viewEvaDocs);

//view one evaluation
router.get("/get/:id", viewOneEvaDoc);

module.exports = router;
