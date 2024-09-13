const router = require("express").Router();

const {addEvaPre,deleteEvaPre,updateEvaPre,viewEvaPres,viewOneEvaPre} = require ('../controllers/presentationController')

//add new presentations evaluation
router.post("/add", addEvaPre);

//delete existing one
router.delete("/delete/:id", deleteEvaPre);

//update existing evaluation
router.put("/update/:id", updateEvaPre);

//view all presentations evaluations
router.get("/", viewEvaPres);

//view one evaluation
router.get("/get/:id", viewOneEvaPre);

module.exports = router;
