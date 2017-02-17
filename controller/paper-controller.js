const Paper = require("../model/paper");
const async = require("async");
const constant = require("../config/constant");

class PaperController{
  getAll(req, res, next){
    async.series({
      papers:(done)=>{
         Paper.find({},done);
      },
      totalCount:(done)=>{
         Paper.count(done);
      }
    },(err, doc)=>{
      if(err){
       return next(err);
      }
       return res.status(constant.httpCode.OK).send(doc);
    })
  }

  getOne(req,res ,next){
    const paperId = req.params.paperId;
    Paper.findById(paperId, (err, doc)=>{
       if(err){
        return next(err);
       }
       if(!doc){
         return res.sendStaus(constant.httpCode.NOT_FOUND);
       }
       return res.status(constant.httpCode.OK).send(doc);
    })
  }

  create(req, res, next){
    Paper.create(req.body, (err, doc)=>{
      if(err){
       return next(err);
      }
      return res.status(constant.httpCode.CREATE).send({uri:`papers/${doc._id}`});

    })
  }

  delete(req, res, next){
    const paperId = req.params.paperId;
    Paper.findByIdAndRemove(paperId, (err, doc)=>{
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
    const paperId = req.params.paperId;
    Paper.findByIdAndUpdate(paperId, req.body, (err, doc)=>{
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

module.exports = PaperController;