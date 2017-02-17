const Homework = require("../model/homework");
const Section = require("../model/section");
const Paper = require("../model/paper");

const homeworkData = require("./fixture/homework");
const sectionData = require("./fixture/section");
const paperData = require("./fixture/paper");

const models = [
    Homework,
    Section,
    Paper
];

const data = {
  Homework:homeworkData,
  Section:sectionData,
  Paper:paperData
};

module.exports = (done)=>{
  models.forEach(model　=>{
    model.remove({},()=>{
       model.create(data[model.modelName], (err,doc)=>{
          if(models.indexOf(model) === models.length -1){
            console.log('refreshMongo success!');
            done();
          }
       })
    })
  });
};