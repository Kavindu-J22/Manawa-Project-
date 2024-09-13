
const multer = require("multer");
const path = require("path");


//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),

    fileFilter: (req, file, cb) =>{
        let ext = path.extname(file.originalname);
        //filters files which we want to allow
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".pdf"){
            cb(new Error("File type is not supported"), false);
            return;
        }
        //if file supported accepted file pass error as null
        cb(null, true);
    },
});