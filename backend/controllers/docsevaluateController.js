const Evadoc = require("../models/EvaluateDocs");

//add new evaluation for documents
exports.addEvadoc = async (req, res) => {
 
  //constant variables for the attributes
  const {groupno,title, total,description} = req.body;
 
  if (!title || !groupno || !total || !description) {
    return res.status(422).json({ error: "please add all the feilds" })

}


Evadoc.findOne({ groupno: groupno })
    .then((savedEvaDoc) => {
        if (savedEvaDoc) {
            return res.status(422).json({ error: "Group already exists with that no" })
        }
  //object
  const newEvaDoc = new Evadoc({
    title,
    groupno,
    total,
    description

})
 
  //saving the object to the db 
  newEvaDoc.save().then(() => {
    res.json("Document marks Added")

}).catch((err) => {
    console.log(err);
})

}).catch((err) => {
console.log(err);
})
}

//delete existing one
exports.deleteEvaDoc = async (req, res) => {
  let docID = req.params.id;
 
  await Evadoc.findByIdAndDelete(docID).then(() => {
    res.status(200).json({ status: "Document Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  })
}
 
//update 
exports.updateEvaDoc= async (req, res) => { 
  //fetch id from url
  let docID = req.params.id;
 
  const { title, groupno, total ,description} = req.body;
  
  const updateDoc = {
    title,
    groupno,
    total,
    description
}

  //check whether there's for the ID
  const update = await Evadoc.findByIdAndUpdate(docID, updateDoc).then(() => {
    res.status(200).send({ status: "Document updated" })
}).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
})
}

//view 
exports.viewEvaDocs= async (req, res) => { 
 
  //calling Service model
  Evadoc.find().then((Evadocs) => {
    res.json(Evadocs)

}).catch((err) => {
    console.log(err)
})
}
 
//view one
exports.viewOneEvaDoc = async (req, res) => {
  
  let docID = req.params.id;
  const doc = await Evadoc.findById(docID).then((doc) => {
      res.status(200).send({ status: "  fetched", doc })
  }).catch(() => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get ", error: err.message })
  })
}