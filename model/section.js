const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  name: String,
  homeworks: [
    {
      type: Schema.ObjectId,
      ref: 'Homework'
    }
  ],
  paper: {
    type: Schema.ObjectId,
    ref: 'Paper'
  }
});

const section = mongoose.model('Section', sectionSchema);

module.exports = section;