const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// create schema and model

const EventSchema = new Schema({
    Id: Number,
    Subject: String,
    StartTime: String,
    EndTime: String,
    IsAllDay: Boolean,
    Description: String,
    RecurrenceRule: String,
    RecurrenceException: String,
    StartTimezone: String,
    EndTimezone: String,
    FollowingID: String,
    RecurrenceID: String,
    Guid: String,
    Location: String
});

const Event = mongoose.model('event', EventSchema);
const Alms = mongoose.model('alm', EventSchema);
module.exports = {Event, Alms};