const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desctiptions: String,
    author: String,
    comments: String,
    ratings: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    hidden: Boolean,
    image: String,
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
  
const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
