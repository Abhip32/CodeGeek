// model.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    Event: {
      type: String,
      required: true,
    },
    componylogo:String,
    AdminPic:String,
    Date: {
      type: Date,
      required: true,
    },
    Language: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    Submissions: [{
      type: Array,
    }],
  },{collection: 'Events'});

const eventModel = mongoose.model('Events', eventSchema);

module.exports = eventModel;
