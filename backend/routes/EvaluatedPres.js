const router = require("express").Router();
let Evapre = require("../models/EvaluatedPresentations");



//Add marks for presenations
router.route("/add").post((req,res) => {
    const title = req.body.title;
    const groupno = req.body.groupno;
    const task1    = Number(req.body.task1);
    const task2  = Number(req.body.task1);
    const total   = Number(req.body.total)
    
    if(!title || !groupno || !task1 || !task2 || !total){
        return res.status(422).json({error:"please add all the feilds"})

    }
     

    Evapre.findOne({groupno: groupno})
    .then((savedEvaPre) => {
        if(savedEvaPre) {
            return res.status(422).json({error:"Group already exists with that no"})
        }

    const newEvaPre = new Evapre({
        title,
        groupno,
        task1,
        task2,
        total
       
    })

    newEvaPre.save().then(() => {
         res.json("Presenation Added")

    }).catch((err) => {
        console.log(err);
    })
  
}).catch((err) =>{
    console.log(err);
})
})



router.route("/").get((req,res) => {
     
    Evapre.find().then((Evapres) => {
        res.json(Evapres)

    }).catch((err) => {
        console.log(err)
    })


})


//update  using  ID
router.route("/update/:id").put(async (req, res) => {
      let preID = req.params.id;
      const {title,groupno,task1, task2,total} = req.body;

      const updatePre = {
          title,
        groupno,
        task1,
        task2,
        total
      }


      const update = await Evapre.findByIdAndUpdate(preID, updatePre).then(() => {
        res.status(200).send({status: "Presentation updated"})
      }).catch((err) => {
          console.log(err);
          res.status(500).send({status: "Error with updating data", error: err.message});
      })   
})



//Delete  Using  Id
router.route("/delete/:id").delete(async (req, res) => {
      let preID = req.params.id;
      
      await Evapre.findByIdAndDelete(preID).then(() => {
          res.status(200).send({status: " deleted"});
      }).catch ((err) => {
          console.log(err.message);
          res.status(500).send({status: " Error with delete ", error: err.message});
      })
    })


router.route("/get/:id").get(async(req, res) => {

    let preID = req.params.id;
    const pre = await Evapre.findById(preID).then((pre) => {
        res.status(200).send({status: "  fetched", pre})
    }).catch(() => {
         console.log(err.message);
         res.status(500).send({status:"Error with get " , error: err.message})
    })
})



module.exports = router;
