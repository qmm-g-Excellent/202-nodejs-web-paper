const Homework = require("../model/homework");
const constant = require("../config/constant");
const async = require("async");

class HomeContorller {
  getAll(req, res, next) {
    async.series({
      homeworks: (done)=> {
        Homework.find({}, done);
      },
      totalCount: (done)=> {
        Homework.count(done);
      }
    }, (err, docs)=> {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.OK).send(docs);
    });
  }

  getOne(req, res, next) {
    const homeworkId = req.params.homeworkId;
    Homework.findById(homeworkId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  create(req, res, next) {
    Homework.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send({uri:`homework/${doc._id}`});
    })
  }

  delete(req, res, next){
    const homeworkId　= req.params.homeworkId;
    console.log(homeworkId);
    Homework.findByIdAndRemove(homeworkId, (err, doc)=>{
      console.log(doc);
      console.log("恢复快点发货的客服");
       if(err){
        return next(err);
       }
       if(!doc){
         return res.sendStatus(constant.httpCode.NOT_FOUND);
       }
       return res.sendStatus(constant.httpCode.NODE_CONTENT);
    })
  }

  update(req, res, next){
    const homeworkId = req.params.homeworkId;
    Homework.findByIdAndUpdate(homeworkId,req.body, (err, doc)=>{
       if(err){
        return next(err);
       }
       if(!doc){
         return res.sendStatus(constant.httpCode.NOT_FOUND);
       }
       return res.sendStatus(constant.httpCode.NODE_CONTENT);
    })
  }

}


module.exports = HomeContorller;