const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const Student = require("../models/Student");

exports.registerStudent = async (req, res, next) => {
  const { studentID, name, email, contactNumber, password, ppEnc } = req.body;
  // let existingEmail = await findEmailDuplicates(email, res);
   //if (existingEmail === null)

  try {
    // const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
    //   upload_preset: "Profile_Pictures",
    // });
    const student = await Student.create({
      studentID,
      name,
      email,
      contactNumber,
      password,
    });
    sendToken(student, 200, res);
    // const token = await Student.getSignedToken();
    // res.status(201).json({ success: true, token, role: "student" }); <------
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registerstudent" + error,
    });
  }
};

exports.registerStaff = async (req, res, next) => {
  const { staffID, name, email,researchfield, password, role } = req.body;
  // let existingEmail = await findEmailDuplicates(email, res);
  // if (existingEmail === null)

  try {
    // const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
    //   upload_preset: "Profile_Pictures",
    // });
    const staff = await Staff.create({
      staffID,
      name,
      email,
      researchfield,
      password,
      role,
    });

    // const token = await Staff.getSignedToken();
    sendToken(staff, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registerstudent" + error,
    });
  }
};

exports.registerAdmin = async (req, res, next) => {
  const { email, phoneno, password } = req.body;
  // let existingEmail = await findEmailDuplicates(email, res);
  //if (existingEmail === null)

  try {
    // const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
    //   upload_preset: "Profile_Pictures",
    // });
    const admin = await Admin.create({
      email,
      phoneno,
      password,
    });
     const token = await Admin.getSignedToken();
    sendToken(admin, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registerstudent" + error,
    });
  }
};

exports.studentLogin = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      desc: "provide email, password",
    });
  }

  try {
    const student = await Student.findOne({ email: email }).select("+password");

    if (!student) {
      res.status(404).json({
        success: false,
        error: "invalid credentials",
      });
    }

    const isMatch = await student.matchPasswords(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(student, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.staffLogin = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      desc: "provide email, password and role ",
    });
  }

  try {
    const staff = await Staff.findOne({ email: email }).select("+password");

    if (!staff) {
      res.status(404).json({
        success: false,
        error: "invalid credentials",
      });
    }

    const isMatch = await staff.matchPasswords(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(staff, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      desc: "provide email, password and role ",
    });
  }

  try {
    const admin = await Admin.findOne({ email: email }).select("+password");

    if (!admin) {
      res.status(404).json({
        success: false,
        error: "invalid credentials",
      });
    }

    const isMatch = await admin.matchPasswords(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(admin, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, user });
};

// login controller function
// exports.login = async (req, res, next) => {
//   const { email, password, role } = req.body;
//   //check user
//   let user;
//   if (role === "admin") {
//     user = await Admin.findOne({ email: email }).select("+password");
//   } else if (role === "student") {
//     user = await Student.findOne({ email: email }).select("+password");
//   } else if (role === "supervisor") {
//     user = await Staff.findOne({ email: email }).select(
//       "+password"
//     );
//   } else if (role === "co-supervisor") {
//     user = await Staff.findOne({ email: email }).select(
//       "+password"
//     );
//   } else if (role === "pannel-member") {
//     user = await Staff.findOne({ email: email }).select(
//       "+password"
//     );
//   } else {
//     res.status(422).json({
//       success: false,
//       desc: "Can not find the user - Please check again",
//     });
//   }
//   //check password match
//   try {
//     const isMatch = await user.matchPasswords(password);

//     if (!isMatch) {
//       res.status(401).send({
//         success: false,
//         desc: "Invalid credentials - Please check again",
//       });
//     } else {
//       sendToken(user, 200, res);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
