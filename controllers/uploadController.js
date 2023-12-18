const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadedFilePath = 'C:/Users/chapa/Desktop/temple_uploaded_files/';
const uploadedImagePath = 'C:/Users/chapa/Desktop/temple_uploaded_images/';
// Configure multer storage and file name
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadedFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadedImagePath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });


// Create multer upload instance
const fileUpload = multer({ storage: fileStorage });
const imageUpload = multer({ storage: imageStorage });
// Custom file upload middleware
const uploadImages = (req, res) => {
  // Use multer upload instance
  imageUpload.array('files', 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
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
    const files = req.files;
    const errors = [];
    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/png','image/jpg', 'image/svg'];
      const maxSize = 15 * 1024 * 1024; // 15MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }
      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }
    res.status(200).send({msg: 'Your images uploaded.'});
  });
};


// Custom file upload middleware
const uploadFiles = (req, res) => {
    // Use multer upload instance
    fileUpload.array('files', 10)(req, res, (err) => {
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
      res.status(200).send({msg: 'Your files uploaded.'});
    });
  };

module.exports = {uploadImages, uploadFiles};