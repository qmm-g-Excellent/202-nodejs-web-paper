const Section = require("../model/section");
const constant = require("../config/constant");
const async = require("async");


class SectionController {
  getAll(req, res, next) {
    async.series({
      sections: (done)=> {
        Section.find({})
            .populate('paper')
            .exec((err, doc)=> {
              const sections = doc.map((item)=> {
                const section = item.toJSON();
                section.homeworks = section.homeworks.map((homework)=> {
                  return {uri: `homeworks/${homework}`}
                });
                return section;
              });
              done(err, sections);
            });
      },
      totalCount: (done)=> {
        Section.count(done);
      }
    }, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(doc);
    })
  }

  getOne(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findById(sectionId)
        .populate('paper')
        .exec(
            (err, doc)=> {
              if (err) {
                return next(err);
              }
              if (!doc) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
              }
              const section = doc.toJSON();
              section.homeworks = section.homeworks.map(item=>{
                return {uri: `homeworks/${item}`};
              });
              return res.status(constant.httpCode.OK).send(section);
            })
  }

  create(req, res, next) {
    Section.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATE).send({uri: `sections/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findByIdAndRemove(sectionId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }

  update(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findByIdAndUpdate(sectionId, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);

    })
  }
}

module.exports = SectionController;