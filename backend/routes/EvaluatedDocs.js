const router = require("express").Router();
let Evadoc = require("../models/EvaluatedDoc");



//Add marks for documents
router.route("/add").post((req,res) => {
    const title = req.body.title;
    const groupno = req.body.groupno;
    const task1    = Number(req.body.task1);
    const task2  = Number(req.body.task1);
    const task3   = Number(req.body.task3);
    const total   = Number(req.body.total)
    
    if(!title || !groupno || !task1 || !task2 || !task3|| !total){
        return res.status(422).json({error:"please add all the feilds"})

    }
     

    Evadoc.findOne({groupno: groupno})
    .then((savedEvaDoc) => {
        if(savedEvaDoc) {
            return res.status(422).json({error:"Group already exists with that no"})
        }

    const newEvaDoc = new Evadoc({
        title,
        groupno,
        task1,
        task2,
        task3,
        total
       
    })

    newEvaDoc.save().then(() => {
         res.json("Document Added")

    }).catch((err) => {
        console.log(err);
    })
  
}).catch((err) =>{
    console.log(err);
})
})



router.route("/").get((req,res) => {
     
    Evadoc.find().then((Evadocs) => {
        res.json(Evadocs)

    }).catch((err) => {
        console.log(err)
    })


})


//update  using doc ID
router.route("/update/:id").put(async (req, res) => {
      let docID = req.params.id;
      const {title,groupno,task1, task2,task3,total} = req.body;

      const updateDoc = {
          title,
        groupno,
        task1,
        task2,
        task3,
        total
      }


      const update = await Evadoc.findByIdAndUpdate(docID, updateDoc).then(() => {
        res.status(200).send({status: "Doc updated"})
      }).catch((err) => {
          console.log(err);
          res.status(500).send({status: "Error with updating data", error: err.message});
      })   
})



//Delete  Using doc Id
router.route("/delete/:id").delete(async (req, res) => {
      let docID = req.params.id;
      
      await Evadoc.findByIdAndDelete(docID).then(() => {
          res.status(200).send({status: " deleted"});
      }).catch ((err) => {
          console.log(err.message);
          res.status(500).send({status: " Error with delete ", error: err.message});
      })
    })


router.route("/get/:id").get(async(req, res) => {

    let docID = req.params.id;
    const doc = await Evadoc.findById(docID).then((doc) => {
        res.status(200).send({status: "  fetched", doc})
    }).catch(() => {
         console.log(err.message);
         res.status(500).send({status:"Error with get " , error: err.message})
    })
})



module.exports = router;
