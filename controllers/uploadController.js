

// const uploadImages = (req, res)=>{
//     // const event = new Event(req.body);
//     // event.save().then(record=>{
//     //     res.status(200).send({msg: 'Event Added Successfully'});
//     // }).catch((error)=>{
//     //     res.status(400).send({msg: 'Event could not be added:-'+ error});
//     // });;
//     const files = req.files;
//     debugger
//     console.log(files);
//     if(!files) {
//         res.status(400).send({msg: 'No files:-'});
//     }else{
//         res.status(200).send({msg: 'Files Uploaded Successfully'});
//     }
    
// }

// const uploadFiles = (req, res)=>{
//     // Event.find({}).then(records=>{
//     //     res.status(200).send(records);
//     // }).catch((error)=>{
//     //     res.status(400).send({msg: 'Could not get the events:-'+ error});
//     // });
//     res.status(200).send({msg: 'Files Uploaded Successfully'});
// }


const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/chapa/Desktop/temple_uploaded_images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Custom file upload middleware
const uploadImages = (req, res) => {

    //console.log(req);
  // Use multer upload instance
  upload.array('files', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
        console.log(err.message);
        return;
    } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == 'ExtensionError') {
            console.log('ExtensionError'+err.message);
            res.status(413).send({ error: { message: err.message } }).end();
        } else {
            console.log('unknownError'+err.message);
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
        }
        return;
    }

    // Everything went fine.
    // show file `req.files`
    // show body `req.body`
    res.status(200).end('Your files uploaded.');
  });
};

module.exports = {uploadImages};