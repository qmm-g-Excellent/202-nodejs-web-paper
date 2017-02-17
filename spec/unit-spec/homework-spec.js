require('should');
const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const constant = require("../../config/constant");
const Homework = require("../../model/homework");

describe('HomeworkController', ()=> {
  it('GET /homeworks should return all homework', (done)=> {
    request
        .get('/homeworks')
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.totalCount.should.equal(3)
        })
        .end(done);
  });

  it('GET /homeworks/:homeworkId should return a homework', (done)=> {
    const homeworkId = '577f0f2586653d19297d40a1';
    request
        .get(`/homeworks/${homeworkId}`)
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.should.deepEqual({
            "_id": "577f0f2586653d19297d40a1",
            "name": "题目一",
            "description": "这是一道计算题",
            "__v": 0
          })
        })
        .end(done);
  });

  it('POST /homeworks should return 201', (done)=>{
    const homework = {
      name: "题目四--spec",
      description: "这是一道计算题--spec"
    };
    request
        .post('/homeworks')
        .send(homework)
        .expect(constant.httpCode.OK)
        .expect((res)=>{
           Homework.findOne(homework,(err,doc)=>{
              res.body.uri.should.equal(`homeworks/${doc._id}`)
           })
        })
        .end(done);
  });

  it('DELETE /homework/:homeworkId should return 204', (done)=>{
    const homeworkId = '577f0f2586653d19297d40a2';
     request
         .delete(`/homeworks/${homeworkId}`)
         .expect(constant.httpCode.NO_CONTENT)
         .end(done);
  });

  it('PUT /homeworks/:homeworkId should return 204', (done)=>{
    const homeworkId = '577f0f2586653d19297d40a3' ;
    const description = {description:"这是一道编程题"};
    request
        .put(`/homeworks/${homeworkId}`)
        .send(description)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });
});