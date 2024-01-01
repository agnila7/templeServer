const fs = require("fs"); 
var constants = require("../helpers/constants");

// Function to get current filenames 
// in directory

const getFiles = (req, res) => {
    let filenames = fs.readdirSync(constants.UPLOADED_FILE_PATH);
    //let fileList = {};
    let fileList = [];
    filenames.forEach((filename) => {
        fileList.push({Name: filename.slice(14), url: constants.DOWNLOADABLE_FILE_URL + filename});
        //fileList[filename.slice(14)] = constants.DOWNLOADABLE_FILE_URL + filename;
    });
    
    res.status(200).send(fileList);
}

const getImages = (req, res) => {
    let filenames = fs.readdirSync(constants.UPLOADED_IMAGE_PATH);
    //let fileList = {};
    let fileList = [];
    filenames.forEach((filename) => {
        fileList.push({Name: filename.slice(14), url: constants.DOWNLOADABLE_IMAGE_URL + filename});
        //fileList[filename.slice(14)] = constants.DOWNLOADABLE_IMAGE_URL + filename;
    });
    
    res.status(200).send(fileList);
}

module.exports = {getFiles, getImages};