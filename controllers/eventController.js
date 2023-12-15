const Event = require("../models/event");

const addEvent = (req, res)=>{
    const event = new Event(req.body);
    event.save().then(record=>{
        res.status(200).send({msg: 'Event Added Successfully'});
    }).catch((error)=>{
        res.status(400).send({msg: 'Event could not be added:-'+ error});
    });;
}

const getAllEvents = (req, res)=>{
    Event.find({}).then(records=>{
        res.status(200).send(records);
    }).catch((error)=>{
        res.status(400).send({msg: 'Could not get the events:-'+ error});
    });
}

const editEvent = (req, res)=>{
    Event.findOneAndUpdate({Id: req.body.Id}, req.body).then(()=>{
        res.status(200).send({msg: 'Event Edited Successfully'});
    }).catch((error)=>{
        res.status(400).send({msg: 'Event could not be edited:-'+ error});
    });
}


const deleteEvent = (req, res)=>{
    Event.findOneAndDelete({Id: req.body.Id}).then(record=>{
        res.status(200).send({msg: 'Event Deleted Successfully'});
    }).catch((error)=>{
        res.status(400).send({msg: 'Event could not be deleted:-'+ error});
    });;
}

module.exports = {addEvent, editEvent, deleteEvent, getAllEvents};