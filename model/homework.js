const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
  name:String,
  description:String
});
const homework = mongoose.model('Homework', homeworkSchema);

module.exports = homework;