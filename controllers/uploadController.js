const multer = require('multer');
const fs = require('fs');
var constants = require('../helpers/constants');

// Configure multer storage and file name
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('i am in file path');
    cb(null, constants.UPLOADED_FILE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create multer upload instance
const fileUpload = multer({ storage: fileStorage });
// Custom file upload middleware

// Custom file upload middleware
const uploadFiles = (req, res) => {
    // Use multer upload instance
    fileUpload.array('files', 10)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.status(500).send({ msg: `Multer uploading error: ${err.message}` }).end();
          return;
      } else if (err) {
          // An unknown error occurred when uploading.
          if (err.name == 'ExtensionError') {
              res.status(413).send({ msg: err.message }).end();
          } else {
              console.log('unknownError'+err.message);
              res.status(500).send( { msg: `unknown uploading error: ${err.message}`}).end();
          }
          return;
      }
      res.status(200).send({msg: 'Your files uploaded.'});
    });
  };

// Configure multer storage and file name
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('i am in file path');
    cb(null, constants.UPLOADED_IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create multer upload instance
const imageUpload = multer({ storage: imageStorage });
// Custom file upload middleware

// Custom file upload middleware
const uploadImages = (req, res) => {
    // Use multer upload instance
    imageUpload.array('files', 10)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.status(500).send({ msg: `Multer uploading error: ${err.message}` }).end();
          return;
      } else if (err) {
          // An unknown error occurred when uploading.
          if (err.name == 'ExtensionError') {
              res.status(413).send({ msg: err.message }).end();
          } else {
              console.log('unknownError'+err.message);
              res.status(500).send( { msg: `unknown uploading error: ${err.message}`}).end();
          }
          return;
      }
      res.status(200).send({msg: 'Your files uploaded.'});
    });
  };

module.exports = { uploadFiles, uploadImages};