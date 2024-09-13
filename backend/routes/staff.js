const router = require("express").Router();
let Student = require("../models/Staff");



//Add Student
router.route("/add").post((req,res) => {
    const staffID = req.body.username;
    const name    = req.body.name;
    const email    = req.body.email;
    const role    = req.body.role;
    const password   = req.body.password;
    
    if(!staffID || !name || !email || !role || !password){
        return res.status(422).json({error:"please add all the feilds"})

    }
     

    Student.findOne({staffID: staffID})
    .then((savedStudent) => {
        if(savedStudent) {
            return res.status(422).json({error:"Student already exists with that staffID"})
        }

    const newStudent = new Student({
        staffID,
        name,
        email,
        password,
       
    })

    newStudent.save().then(() => {
         res.json("Student Added")

    }).catch((err) => {
        console.log(err);
    })
  
}).catch((err) =>{
    console.log(err);
})
})



router.route("/").get((req,res) => {
     
    Student.find().then((Students) => {
        res.json(Students)

    }).catch((err) => {
        console.log(err)
    })


})


//update Student using an ID
router.route("/update/:id").put(async (req, res) => {
      let studentID = req.params.id;
      const {username,email, phoneno,password} = req.body;

      const updateAdmin = {
          username,
          email,
          phoneno,
          password
      }


      const update = await Admin.findByIdAndUpdate(studentID, updateAdmin).then(() => {
        res.status(200).send({status: "Admin updated"})
      }).catch((err) => {
          console.log(err);
          res.status(500).send({status: "Error with updating data", error: err.message});
      })   
})



//Delete Admin Using an Id
router.route("/delete/:id").delete(async (req, res) => {
      let studentID = req.params.id;
      
      await Admin.findByIdAndDelete(studentID).then(() => {
          res.status(200).send({status: "Admin deleted"});
      }).catch ((err) => {
          console.log(err.message);
          res.status(500).send({status: " Error with delete Admin", error: err.message});
      })
    })


router.route("/get/:id").get(async(req, res) => {

    let studentID = req.params.id;
    const user = await Admin.findById(studentID).then((Admin) => {
        res.status(200).send({status: " Admin fetched", Admin})
    }).catch(() => {
         console.log(err.message);
         res.status(500).send({status:"Error with get Admin" , error: err.message})
    })
})


router.route("/get/:email").get((req, res) => {

    Admin.findOne({email:email})
     .then((Admin) => {
        res.status(200).send({status: " Admin fetched", Admin})
    }).catch(() => {
         console.log(err.message);
         res.status(500).send({status:"Error with get user" , error: err.message})
    })
})




router.route("/signin").post((req,res) => {

const username = req.body.username;
    const email    = req.body.email;
    const phoneno  = Number(req.body.phoneno);
    const password   = req.body.password;
    
    const newAdmin = new Admin ({
        username,
        email, 
        phoneno,
        password,

    })

 if(!email || !password){
     res.status(422).json({error:"Please add email or password"})
 }
 Admin.findOne({email:email})
  .then(savedAdmin =>{
      if(!savedAdmin){
         return  res.status(422).json({error:"Invalid Email or Password"})

      }

      Admin.findOne({password:password})
      .then(savedAdmin =>{
        if(savedAdmin){
           
             res.json(Admin);
            
            
          }
          else{
              return res.status(422).json({error:"Invalid Email or Password"})
          }
      })
    .catch(err=>{
        console.log(err)
    })

  })
})



module.exports = router;
