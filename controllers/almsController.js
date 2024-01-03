const Alms = require("../models/event").Alms;

const addAlms = (req, res)=>{
    const alms = new Alms(req.body);
    alms.save().then(record=>{
        res.status(200).send({msg: 'Alms Added Successfully'});
    }).catch((error)=>{
        res.status(400).send({msg: 'Alms could not be added:-'+ error});
    });;
}

const getAllAlms = (req, res)=>{
    Alms.find({}).then(records=>{
        res.status(200).send(records);
    }).catch((error)=>{
        res.status(400).send({msg: 'Could not get the alms:-'+ error});
    });
}

const editAlms = (req, res)=>{
    Alms.findOneAndUpdate({Id: req.body.Id}, req.body).then(()=>{
        res.status(200).send({msg: 'Alms Edited Successfully'});
    }).catch((error)=>{
        res.status(400).send({msg: 'Alms could not be edited:-'+ error});
    });
}


const deleteAlms = (req, res)=>{
    Alms.findOneAndDelete({Id: req.body.Id}).then(record=>{
        res.status(200).send({msg: 'Alms Deleted Successfully'});
    }).catch((error)=>{
        res.status(400).send({msg: 'Alms could not be deleted:-'+ error});
    });;
}

module.exports = {addAlms, getAllAlms, editAlms, deleteAlms};