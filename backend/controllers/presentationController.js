
const EvaPre = require("../models/EvaluatePresentations");

//add new evaluation for documents
exports.addEvaPre = async (req, res) => {
 
  //constant variables for the attributes
  const {groupno,title, mark1,mark2,mark3, mark4} = req.body;
 
  if (!title || !groupno || !mark1 || !mark2 || !mark3 ||!mark4) {
    return res.status(422).json({ error: "please add all the feilds" })

}


EvaPre.findOne({ groupno: groupno })
    .then((savedEvaPre) => {
        if (savedEvaPre) {
            return res.status(422).json({ error: "Group already exists with that no" })
        }
  //object
  const newEvaPre = new EvaPre({
    title,
    groupno,
    mark1,
    mark2,
    mark3,
    mark4

})
 
  //saving the object to the db 
  newEvaPre.save().then(() => {
    res.json("Presentation marks Added")

}).catch((err) => {
    console.log(err);
})

}).catch((err) => {
console.log(err);
})
}

//delete existing one
exports.deleteEvaPre = async (req, res) => {
  let preID = req.params.id;
 
  await EvaPre.findByIdAndDelete(preID).then(() => {
    res.status(200).json({ status: "Presentation Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  })
}
 
//update 
exports.updateEvaPre= async (req, res) => { 
  //fetch id from url
  let preID = req.params.id;
 
  const { title, groupno, mark1 ,mark2, mark3, mark4} = req.body;
  const updatePre = {
    title,
    groupno,
    mark1,
    mark2,
    mark3,
    mark4
}

  //check whether there's for the ID
  const update = await EvaPre.findByIdAndUpdate(preID, updatePre).then(() => {
    res.status(200).send({ status: "Presentation updated" })
}).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
})
}

//view  all
exports.viewEvaPres= async (req, res) => { 
 
  //calling  model
  EvaPre.find().then((EvaPres) => {
    res.json(EvaPres)

}).catch((err) => {
    console.log(err)
})
}
 
//view one presenation evaluations
exports.viewOneEvaPre = async (req, res) => {
  
  let preID = req.params.id;
  const pre = await EvaPre.findById(preID).then((pre) => {
      res.status(200).send({ status: "  fetched", pre })
  }).catch(() => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get ", error: err.message })
  })
}