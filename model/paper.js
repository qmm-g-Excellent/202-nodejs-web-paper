const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paperSchema  = new　Schema({
   title:String,
   description:String
});

const paper = mongoose.model('Paper', paperSchema);
module.exports = paper;